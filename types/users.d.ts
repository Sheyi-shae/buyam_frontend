
// types/user.d.ts or types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role?: string
  online?: boolean
  lastSeen?: Date
  avatar?: string;
  phone?: number | string
  storeName?: string
  storeDescription?: string
  googleId?: string;
  publicId:string
  createdAt: Date;
  updatedAt: Date;
  likedProducts?: ProductLike[]
  products?: Product[]
  reviews?: UserReview[]
  verifiedSeller?:boolean
}

// category type
// Category interface
export interface CategoryType {
  id: number | string |boolean
  name: string
  avatar?: string
  slug?: string
  
  description?: string
  
}



export interface CategoryD {
  id: number;
  name: string;
  avatar: string;
  slug: string;
  description: string;
  createdAt: Date;    
  updatedAt: string
  subcategories: SubCategory[];
  products:Product[]
}

export interface SubCategory {
  id: number;
  name: string;
  avatar: string;
  slug: string;
  description: string;
  productCount: number;
  productId: number;
  products: Product[];
  isActive: boolean;
  createdAt: string;
}

export interface Product {
   id: number
  name: string    
  price: number  
  avatar: string[]    
  description: string 
  isPremium:boolean 
  negotiable:  boolean 
  isSold: boolean 
  sellerPublicId:string
  slug: string    
  sellerId: number | undefined
  state?: string
  city?: string
  condition: string
  seller:User
  likes: ProductLike[]
  subCategory?: SubCategory
  
  conversations?: Conversation[]

  subCategoryId: number
  categoryId : number

  createdAt: Date
  updatedAt: Date

}


export interface ProductSuggestion {
  id?: number;
  name: string;
  subcategorySlug: string,
  subcategoryName:string,
  slug?: string;
}

interface LocationOptionProps{
  state: string; capital: string; major_cities: string[]; lgas: string[];
}


export interface ProductListing {
   id: number
  name: string    
  price: number  
  avatar: string[]    
  description: string 
  isPremium:boolean 
  negotiable:  boolean 
  isSold: boolean 
  sellerPublicId:string
  slug: string    
  sellerId: number 
  state: string
  city: string
  condition: string
  seller: User
  likes: ProductLike[]
  views: number
  
  conversations: Conversation[] 
  

  subCategoryId:number
  categoryId: number
  subCategory:SubCategory
  category:CategoryD

  createdAt: Date
  updatedAt: Date

}

export interface ProductListingCard {
   id: number
  name: string    
  price: number  
  avatar: string[]    
  description: string 
  isPremium:boolean 
  negotiable:  boolean 
  isSold: boolean 
  sellerPublicId:string
  slug: string    
  sellerId: number 
  state: string
  city: string
  condition: string
  seller: User
  likes: ProductLike
  views: number
  
  conversations: Conversation[] 
  

  subCategoryId:number
  categoryId: number
  subCategory:SubCategory
  category:CategoryD

  createdAt: Date
  updatedAt: Date

}
export interface ProductLike {
  id: number;
  userId: number;
  productId: number;
  product:ProductListing[]
  createdAt: Date;
}

export interface ProductDetail {
   id: number
  name: string    
  price: number  
  avatar: string[]  
  description: string 
  isPremium:boolean 
  negotiable:  boolean 
  isSold: boolean  
  sellerPublicId:string
  slug: string    
  sellerId: number | undefined
  state: string
  city: string
  condition: string
  seller: User
  likes: ProductLike[]
  views:number
  

  subCategoryId:number
  categoryId: number
  subCategory:SubCategory
  category:CategoryD

  createdAt: Date
  updatedAt: Date

}


export interface ProductReview {
  id: number;
  userId: number;
  productId: number;
  ratings: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}
export interface UserReview {
   id:number
  productId:number
  name:string
  userId:number
  ratings: number 
  user: User
  replies:UserReviewReply[]
  likes:UserReviewLike[]
  comment:string
  createdAt:Date
 
}

export interface UserReviewReply {
  id: number;
  reviewId: number;
  reply: string;
  name: string;
  createdAt: Date;
}
export interface UserReviewLike {
  id: number;
  reviewId: number;
  userId: number;
  createdAt: Date;
}


export interface VendorProfileProps  {
  id: number;
  name: string;
  email: string;
  avatar: string;
  products?: Product[]
  storeName?:string
  storeDescription?: string
  verifiedSeller?: boolean
  reviews?:UserReview[]
  publicId:string
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: number;
  buyerId: number;
  sellerId: number;
  lastMessage: string;
  lastMessageAt: Date;
  productId:number
  buyer: User
  seller: User
  user?:User
  lastMessageSenderId?:number
  product: ProductDetail
  messages:Message[]
  createdAt: Date;

}

export interface Message {
  id?:number |string
  conversationId?:number
  senderId?:number
  content:string
  isRead?:boolean
  createdAt:Date
  type:string
  avatar?:string
  conversation?:Conversation
  sender?: User   
  uploadProgress?: number;
}

export interface SelectedConversation {
    id: number,
    name: string,
    avatar?: string,
    lastMessage: string,
    lastMessageAt: Date,
    buyerId: number,
  sellerId: number,
  online?: boolean,
  lastMessageSenderId?: number,
    unread: boolean,
    buyer?: User,
  seller?: User,
  user?:User,
    product: ProductDetail,
    messages: Message[],
    createdAt: Date,
}