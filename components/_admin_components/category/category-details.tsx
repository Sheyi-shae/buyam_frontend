"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Edit, 
  Trash2, 
  ArrowLeft,
  Calendar,
  FileText,
  Package,
  Users,
  Eye,
  Plus,
  
} from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useFetchPrivateData } from "@/utils/fetch-hooks";
import LoadingSpinners from "@/components/loading-spinners";
import formatReadableDate from "@/utils/date-format";
import { CategoryD,  } from "@/types/users";
import { ParamValue } from "next/dist/server/request/params";
import { getInitials } from "@/utils/get-initials";
import DisplaySubCategories from "../sub-category/display-sub-categories";
import { SimpleDeleteDialog } from "../delete-dialog";
import { useRouter } from "next/navigation";



export function CategoryDetails({ slug }: {slug:ParamValue}) {
   // deletet state
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const handleDialogToggle = () => {
      setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };
  
  const router= useRouter()
 
  const { data, isLoading, error } = useFetchPrivateData({
    queryKey: "category-details",
    requestUrl: `/category/${slug}/admin`,
  });

  const category = useMemo(
    () => (data as CategoryD) || null,
    [data]
  );

  
  if (isLoading) return <LoadingSpinners />;
  if (error || !category) return <div>Error loading category</div>;

  const colorVariant = category.id % 2 === 0 ? "emerald" : "amber";
  
  const colorClasses = {
    emerald: {
      bg: "bg-emerald-50 border-emerald-200",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      button: "bg-emerald-600 hover:bg-emerald-700 text-white",
      gradient: "from-emerald-400 to-emerald-600",
      light: "bg-emerald-500/10 text-emerald-700",
    },
    amber: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-700",
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      button: "bg-amber-500 hover:bg-amber-700 text-white",
      gradient: "from-amber-400 to-amber-600",
      light: "bg-amber-500/10 text-amber-700",
    }
  };

  const colors = colorClasses[colorVariant];



 

 

 
  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className={`border-b ${colors.bg} py-6`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
             
                <Button onClick={router.back} variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
             
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {category.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  {category.subcategories.length} sub-categories • {category.products.length} total products
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
                onClick={() => window.history.back()}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              
              <Button
                className={colors.button}
                onClick={() => console.log('Edit category:', category)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Category
              </Button>
              
              <Button
                variant="destructive"
                onClick={handleDialogToggle}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Category Info & Sub-categories */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Info Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className={`pb-4 border-b ${colors.bg}`}>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                    <AvatarImage 
                      src={category.avatar} 
                      alt={category.name}
                      className="object-cover"
                    />
                    <AvatarFallback className={`text-lg font-bold ${colors.text}`}>
                      {getInitials(category.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {category.name}
                    </h2>
                    <Badge className={`mt-2 text-sm ${colors.badge}`}>
                      {category.slug}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                   
                    <div>
                      <span className="font-medium text-gray-600">Sub-categories:</span>
                      <p className="text-gray-900">{category.subcategories.length}</p>
                    </div>
                    <div>
                      <span className="font-medium capitalize text-gray-600">date created :</span>
                      <p className="text-gray-900">{formatReadableDate(category.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sub-categories Section */}
            <DisplaySubCategories category={category}/>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              <Card className={`border-0 ${colors.bg} shadow-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${colors.light}`}>
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {category.products.length || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-0 ${colors.bg} shadow-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${colors.light}`}>
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Products</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-0 ${colors.bg} shadow-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${colors.light}`}>
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Updated</p>
                      <p className="text-sm font-bold text-gray-900">
                        {formatReadableDate(category.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4 border-b">
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => console.log('Add product to category')}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-amber-200 text-amber-700 hover:bg-amber-50"
                    onClick={() => console.log('View products in category')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Products
                  </Button>

                  <Button 
                    className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => console.log('Add sub-category')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sub-category
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-300"
                    onClick={() => console.log('Export category data')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Category Information Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4 border-b">
                <h3 className="font-semibold text-gray-900">Category Information</h3>
              </CardHeader>
              <CardContent className="pt-6">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Status</dt>
                    <dd>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Sub-categories</dt>
                    <dd className="text-gray-900">{category.subcategories.length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Active Sub-categories</dt>
                    <dd className="text-gray-900">{category.subcategories.length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Created</dt>
                    <dd className="text-gray-900">{ formatReadableDate(category.createdAt)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Last Modified</dt>
                    <dd className="text-gray-900">{ formatReadableDate(category?.updatedAt)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Visibility</dt>
                    <dd className="text-gray-900">Public</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Danger Zone Card */}
            <Card className="border-0 border-l-4 border-l-red-500 shadow-lg">
              <CardHeader className="pb-4">
                <h3 className="font-semibold text-red-700">Danger Zone</h3>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-sm text-gray-600 mb-4">
                  Once you delete a category, there is no going back. Please be certain.
                </p>
                <Button
                  variant="destructive"
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={handleDialogToggle}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Category
                </Button>
              </CardContent>
            </Card>
            <SimpleDeleteDialog
                                      deleteUrl={`/category/${category.slug}`}
                                      name={category.name}
                                      queryKey="categories"
                                      open={isDeleteDialogOpen}
                                      onOpenChange={handleDialogToggle}
                                      title={`Are you sure you want to delete?`}
                                  />
          </div>
        </div>
      </div>
    </div>
  );
}