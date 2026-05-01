"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CategoryD } from "@/types/users";
import { FolderOpen, MoreVertical, Trash } from "lucide-react";
import { AddSubCategoryDialog } from "./add-sub-category";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";
import formatReadableDate from "@/utils/date-format";
import { EmptyState } from "../empty-state";
import { SimpleDeleteDialog } from "../delete-dialog";
import { useState } from "react";

export default function DisplaySubCategories({ category }: { category: CategoryD }) {

       const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
        const handleDialogToggle = () => {
          setIsDeleteDialogOpen(!isDeleteDialogOpen);
        };
  return (
      <div>
           <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4 border-b bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FolderOpen className="h-6 w-6 text-gray-700" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Sub-categories</h3>
                      <p className="text-gray-600 text-sm">
                        Manage sub-categories under <span className="font-semibold">{category.name}</span>
                      </p>
                    </div>
                  </div>
                  <AddSubCategoryDialog
                    categoryId={category.id}
                    slug={category.slug}
                    categoryName={category.name}
                  />
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                {/* Active Sub-categories */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Active Sub categories</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {category.subcategories.length} Active
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.subcategories.map((subCategory) => (
                        <div key={subCategory.id}>
                      <Card  className="border border-gray-200 hover:border-gray-300 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                              <Avatar className="h-10 w-10 border">
                                <AvatarImage src={subCategory.avatar} alt={subCategory.name} />
                                <AvatarFallback className="text-xs">
                                  {getInitials(subCategory.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold line-clamp-1 text-gray-900 truncate">
                                  {subCategory.name}
                                </h5>
                                <p className="text-gray-600 line-clamp-2 text-sm line-clamp-1 mt-1">
                                  {subCategory.description}
                                </p>
                                <div className="flex items-center space-x-3 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {0} products
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    Created {formatReadableDate(subCategory.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button onClick={handleDialogToggle} variant="ghost" size="icon" className="bg-red-600 h-8 w-8">
                              <Trash className="h-4 w-4 text-white" />
                            </Button>
                          </div>
                            </CardContent>
                            
                                  </Card>
                                  <SimpleDeleteDialog
                                name={subCategory.name}
                                open={isDeleteDialogOpen}
                                queryKey="category-details"
                                 onOpenChange={handleDialogToggle}
                                title={`Are you sure you want to delete?`}
                                deleteUrl={`/sub_category/${subCategory.slug}`}
                                 />
                        </div>
                    ))}
                  </div>
                </div>

             

                {/* Empty State */}
                {category.subcategories.length === 0 && (
                  <div className="text-center py-12">
                    <EmptyState
                      description={`Get started by creating your first sub-category under ${category.name}`}
                      component={ <AddSubCategoryDialog
                    categoryId={category.id}
                    slug={category.slug}
                    categoryName={category.name}
                      />}
                      title="No Sub-categories"
                    />
                    
    
                  </div>
                )}
              </CardContent>
          </Card>
          
    </div>
  )
}
