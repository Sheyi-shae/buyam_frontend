
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/types/users";
import { Pencil, Plus, Trash2 } from "lucide-react";

interface CategoryOptionsProps {
  category: CategoryType; // Single category, not array
}

export default function CategoryOptions({ category }: CategoryOptionsProps ) {
    const handleDelete=async()=>{
        console.log("delete")
    }
  return (
      <div className="flex justify-end gap-1 mt-4">
           <Button variant="default" className=" text-slate-50 bg-red-500">
                    <Trash2/>
                        </Button>
                  
                         <Button variant="default" className=" text-slate-50 bg-blue-600">
                    <Plus/>
                        </Button>
                        <Button variant="default" className=" text-slate-50 bg-amber-300">
                    <Pencil/>
          </Button>
          <Button variant="default" className=" text-black bg-emerald-100">
                    {">>"}
                        </Button>
                       
                        
   
                        
                </div>
  )
}
