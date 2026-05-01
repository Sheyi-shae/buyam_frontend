'use client';

import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import {
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/components/ui/field';
import TextInputField, { SelectInput,  TextAreaField } from '@/components/forms/_reuseable-form-components/text-input-field';
import { useFetchPrivateData } from '@/utils/fetch-hooks';
import { CategoryD,  } from '@/types/users';
import location from '@/location.json'
import { formatCurrency } from '@/utils/format-currency';
import { getFileFingerprint } from '@/utils/image-fingerprint';
import ImageUploadArea from './image-upload-area';
import ProductPreview from './product-preview';
import { useAuthStore } from '@/stores/auth-stores';
import apiPrivate, { parseErrorMessage } from '@/utils/api-private';
import { Spinner } from '@/components/ui/spinner';
import { is } from 'zod/v4/locales';




// zod 
// form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string(),
  negotiable: z.string(),
  isPremium: z.boolean().optional(),
   subCategoryId:z.string(),
  categoryId: z.string(),
  condition: z.string(),
  state: z.string(),
  city:z.string(),
});

type FormData = z.infer<typeof formSchema>
type MediaItem = {
  url: string;
  fingerprint: string;
};

// negotiation
const NEGOTIATE = [
    { id: true, name: "Yes" ,},
    {id:false , name: "No", }
]
// condition
const CONDITION = [
  { id: "New", name: "New", },
    {id:"Fairly-used",name:"Fairly used"},
    {id:"Used" , name: "Used", }
]
export default function SellProductForm() {
  const [formStep, setFormStep] = useState(1);
  
    const [hoveredImage, setHoveredImage] = useState<number | null>(null);
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [mediaPreview, setMediaPreview] = useState<MediaItem[]>([])
  const { user } = useAuthStore()
 
  // fetch categories
    const { data,isLoading } = useFetchPrivateData(
    {
        queryKey: "category-public",
        requestUrl: `/category/all-category`,
    }
    )
    // memoize fetched data category
    const category = useMemo(
        () => (data as CategoryD[]) || null,
        [data]
        );
 
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    description: "",
    price: "",
    negotiable: "",
    isPremium: false,
    subCategoryId:"",
    categoryId:"",
    condition: "",
    state: "",
    city:"",
  },
  shouldUnregister: false, 
});
  
  // use watch funtion to watch selected category
  const watchCategory = form.watch("categoryId");
  const watchSub = form.watch("subCategoryId")
  // watch step 1 fields
  const step1Fields = form.watch([
  "name",
  "categoryId",
  "subCategoryId",
  ]);
  
  // watch step 2 fields
  const step2Fields = form.watch([
  "price",
  "condition",
  "negotiable",
  "description",
  "state",
  "city",
]);

const isStep2Complete = step2Fields.every(Boolean);;
  
const selectedCategory = category?.find(
  (cat) => String(cat.id) === String(watchCategory)
  );
 

  // memoize subcategory 
 
  const subcategories = useMemo(() => {
  return selectedCategory?.subcategories || [];
}, [selectedCategory]);

const SubcategoryName = useMemo(() => {
  return subcategories.find(sub => String(sub.id) === String(watchSub))?.name || "";
}, [subcategories, watchSub]);

const selectedState = form.watch("state");


const states = useMemo(() => location.map(d => d.state), []);
  const current = useMemo(() => {
    return location.find(item => item.state.toLowerCase() === selectedState?.toLowerCase());
  }, [selectedState]);



  // callback for multiple image upload
  const handleFiles = useCallback(async (fileList: FileList) => {

    
     // filter out files starting with "screenshot"
  const invalidFiles = Array.from(fileList).filter(file =>
    file.name.toLowerCase().startsWith("screenshot") ||
    file.name.toLowerCase().startsWith("download")
    );
    // filter out duplicate images using filename only
     if (invalidFiles.length > 0) {
    toast.error("Files starting with 'screenshot' cannot be uploaded.");
    return;
    }
    
 
  const validFiles = Array.from(fileList).filter(
    (file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024
    );

    for (const file of validFiles) {
      const fingerprint = getFileFingerprint(file);

    const isDuplicate = mediaPreview.some(
      (item) => item.fingerprint === fingerprint
    );

      if (isDuplicate) {
        toast.error("Duplicate image detected.");
      
      continue;
    }

   await uploadSingleFile(file, fingerprint); // handle each file individually
  }
}, [mediaPreview]);

const uploadSingleFile = async (file: File, fingerprint: string) => {
  try {
    setUploading(true);
   
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload/public`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
       
      }
    );

    const url = response.data.url || URL.createObjectURL(file);
        setMediaPreview((prev) => [...prev, { url, fingerprint }]);
    toast.success("File uploaded successfully");
  } catch (error) {
    toast.error("Upload failed, please try again later");
    console.error(error);
  } finally {
    setUploading(false);
  }
};

  // handle file change
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {

      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files)
      }
      
    
    },
      [handleFiles]
    )

  const removeFile = useCallback((index:number) => {
    setMediaPreview((prev) => prev.filter((_, i) => i !== index));

}, []);

 // Step validation
  const isStep1Complete =
  mediaPreview.length > 1 &&
  step1Fields.every(Boolean);

  console.log(isStep2Complete)
  const canPublish =
    Boolean(isStep1Complete) &&
    Boolean(isStep2Complete)
   
  const canProceedToStep2 = isStep1Complete;
  
  // extract url from media preview as an array
  const avatar = mediaPreview.map((item) => item.url);
    //  handle form submission

  async function onSubmit(data: FormData) {
    
    const productData = { avatar, sellerId: user?.id, ...data,sellerPublicId:user?.publicId }
    console.log(productData)
    try {
      setLoading(true)
      const { data } = await apiPrivate.post('/product/post', productData)
      toast.success(data.message)
      
    } catch (error: unknown) {
      toast.error(parseErrorMessage(error))
      
    } finally {
      setLoading(false)
    }
  }
 

  return (
    <div className="min-h-screen ">
     

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <form onSubmit={form.handleSubmit(onSubmit)}>
              {formStep === 1 && (
                <div className="space-y-6">
                  <Card className="border-gray-200 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Photos & Basics</h2>
                      <p className="text-gray-600 mb-8">Add photos and basic information about your product</p>

                      <div className="space-y-8">
                        {/* image upload area */}
                        <ImageUploadArea
                          uploading={uploading}
                          mediaPreview={mediaPreview}
                          handleFileChange={handleFileChange}
                          removeFile={removeFile}
                          hoveredImage={hoveredImage}
                          setHoveredImage={setHoveredImage}
                        />
                      
{/* input field starts here */}
                        <div className="pt-6 border-t border-gray-200 space-y-6">
                          <FieldGroup>
                      <TextInputField
                        form={form}
                        name="name"
                        label="Product Name"
                        placeholder="Samsung Galaxy s10"
                              />

                              <div className='grid sm:grid-cols-2 space-x-2 gap-2 space-y-2'>
                                <SelectInput
                                  form={form}
                                  label='Product Category'
                                  name='categoryId'
                                  placeholder='Select your product category'
                                  options={category}
                                  loading={isLoading}
                                />

                                <SelectInput
                                  form={form}
                                  label='Sub category'
                                  name='subCategoryId'
                                  placeholder='Select sub category'
                                  options={subcategories}
                                  
                                />



                              </div>
                            </FieldGroup>

                          
                        </div>
                      </div>

                      <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                        
                        <Button
                          onClick={() => setFormStep(2)}
                          disabled={!canProceedToStep2}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50"
                        >
                          Continue to Pricing
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-6">
                  <Card className="border-gray-200 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Pricing & Details</h2>
                      <p className="text-gray-600 mb-8">Set your price and provide detailed information</p>

                       <FieldGroup className='grid grid-cols-2 mb-5'>
                                
                        <SelectInput
                        form={form}
                          name="state"
                          label="State"
                          placeholder="Select State"
                          options={states.map(s => ({ id: s, name: s }))}
                          />
                          <SelectInput
                            form={form}
                            name="city"
                            label="City"
                            placeholder="Select City"
                            options={(current?.major_cities ?? []).map(c => ({ id: c, name: c }))}
                            loading={!current}
                          />


                                </FieldGroup>
                        
                        

                        {/* description */}
                        <FieldGroup className='mt-5'> 
                          {/* negotiation and price */}
                          <div className='flex w-full gap-2'>
                            <div className='w-3/4'>
                              <TextInputField
                                form={form}
                                label='Price'
                                name='price'
                                placeholder={formatCurrency(2000)}
                              type='number'/>
                            </div>
                            <div className=''>
                              <SelectInput
                                form={form}
                                label='Negotiable?'
                                name='negotiable'
                                placeholder='Negotiable?'
                                options={NEGOTIATE}
                              />
                               
                            </div>
                          </div>
                          <SelectInput
                                form={form}
                                label='Conditon'
                                name='condition'
                                placeholder='select a condition'
                                options={CONDITION}
                              />
                          <TextAreaField
                            form={form}
                            label={`${SubcategoryName} Description`}
                            name='description'
                            placeholder='Explicitly description you item here'
                          />
                          </FieldGroup>

                        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                          
                          

                        <Button
                          onClick={() => setFormStep(1)}
                          variant="outline"
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          disabled={!canPublish || loading}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                            {loading ?<><Spinner/> Please wait..</>  :'Publish Product' }
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                )}
                </form>
            </div>
          </div>

         <ProductPreview
         formStep={formStep}
         isStep1Complete={isStep1Complete}
         isStep2Complete={isStep2Complete}
         mediaPreview={mediaPreview}/>
        </div>
      </div>
    </div>
  );
}
