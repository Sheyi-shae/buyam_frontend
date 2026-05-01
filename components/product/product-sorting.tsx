import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ProductListing } from "@/types/users";

interface ProductSortingProps {
  defaultProducts: ProductListing[],
    sortProductsByPriceLowToHigh: () => void,
    sortProductsByPriceHighToLow: () => void,
    sortProductsByMostPopular: () => void,
    sortProductsByMostRecent: () => void,
  setDefaultProducts: React.Dispatch<React.SetStateAction<ProductListing[]>>
}

export default function ProductSorting({ defaultProducts,sortProductsByMostPopular,sortProductsByMostRecent, sortProductsByPriceLowToHigh, sortProductsByPriceHighToLow, setDefaultProducts }: ProductSortingProps) {
  
  
    const sortProducts = (sortType: string) => {
    switch (sortType) {
      case "Price: Low to High":
        sortProductsByPriceLowToHigh();
        break;
      case "Price: High to Low":
        sortProductsByPriceHighToLow();
        break;
      case "Most Popular":
        sortProductsByMostPopular();
        break;
      case "Most Recent":
        sortProductsByMostRecent();
        break;
      default:
        setDefaultProducts(defaultProducts);
    }
  };
  return (
    <div className="mb-6 flex items-center justify-between">
   
        
        
          <Select onValueChange={(value) => sortProducts(value)}>
        <SelectTrigger className="w-[180px]" >
            <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem defaultValue={'Most Recent'} value={'Most Recent'} >Most Recent</SelectItem>
            <SelectItem value={'Price: Low to High'}>Price: Low to High</SelectItem>
            <SelectItem value={'Price: High to Low'}>Price: High to Low</SelectItem>
            <SelectItem value={'Most Popular'}>Most Popular</SelectItem>
        </SelectContent>
        </Select>
      </div>
  )
}
