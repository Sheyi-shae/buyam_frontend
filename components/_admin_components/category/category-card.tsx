"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Edit, 
  Trash2, 
  List,
  Plus,
  ArrowRight,
  ArrowRightCircle
} from "lucide-react";

import { CategoryType } from "@/types/users";
import { SimpleDeleteDialog } from "../delete-dialog";
import { useState } from "react";
import Link from "next/link";

import { getInitials } from "@/utils/get-initials";

interface CategoryCardProps {
  category: CategoryType;
  onEdit?: (category: CategoryType) => void;
  onDelete?: (category: CategoryType) => void;
  onView?: (category: CategoryType) => void;
  onArchive?: (category: CategoryType) => void;
}

export function CategoryCard({ 
  category, 
  onEdit, 

  onView, 

}: CategoryCardProps) {


  const getColorVariant = (id: number) => {
    return id % 2 === 0 ? "emerald" : "amber";
  };

  const colorVariant = getColorVariant(Number(category.id));
  
  const colorClasses = {
    emerald: {
      bg: "bg-emerald-50 border-emerald-200",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      button: "bg-emerald-600 hover:bg-emerald-700 text-white",
          gradient: "from-emerald-400 to-emerald-600",
      hover: "hover:bg-amber-600"
    },
    amber: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-700",
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      button: "bg-amber-600 hover:bg-amber-700 text-white",
        gradient: "from-amber-400 to-amber-600",
      hover: "hover:bg-emerald-600"
    }
  };

    const colors = colorClasses[colorVariant];
    // deletet state
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const handleDialogToggle = () => {
      setIsDeleteDialogOpen(!isDeleteDialogOpen);
    };

  return (
    <Card className={`group relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${colors.bg}`}>
     
      <CardContent className="p-6">
        {/* Header with avatar and actions */}
        <div className="flex items-start justify-between ">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-white shadow-md">
              <AvatarImage 
                src={category.avatar} 
                alt={category.name}
                className="object-cover"
              />
              <AvatarFallback className={`${colors.text} font-semibold`}>
                {getInitials(category?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-lg truncate ${colors.text}`}>
                {category.name}
              </h3>
              <Badge 
                variant="secondary" 
                className={`mt-1 ${colors.badge} font-medium`}
              >
                {category.slug}
              </Badge>
            </div>
          </div>

        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {category.description}
        </p>
      </CardContent>

      {/* Footer with action buttons */}
      <CardFooter className="px-6 py-4 bg-white/50 border-t border-gray-100">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-gray-500 font-medium">
            ID: #{category.id}
          </span>
          
                  {/* action buttions */}
          <div className="flex items-center space-x-2">
            
            
            <Button
              size="sm"
              onClick={() => onEdit?.(category)}
              className={colors.button}>
              <Edit  />
             </Button>
             <Button
              size="sm"
              onClick={handleDialogToggle}
              className={'bg-red-600'}>
            <Trash2  />
                      </Button>
                      <Button
              size="sm"
              onClick={() => onEdit?.(category)}
              className={'bg-blue-600'}>
            <Plus />
            </Button>
            
              <Link href={`/admin/category/${category.slug}`}><Button
              size="sm"
              variant="outline"
              onClick={() => onView?.(category)}
              className={colors.hover}
            >
              <ArrowRightCircle  />
              
                      </Button></Link>
                      
                      {/* delete modal */}
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
      </CardFooter>
    </Card>
  );
}