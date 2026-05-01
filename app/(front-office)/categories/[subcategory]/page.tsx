import ProductPage from "@/components/product/product-page";

type PageProps = {
  params: Promise<{ subcategory: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  // Await both promises
  const { subcategory } = await params;
  const sParams = await searchParams;
const {q}=sParams

  return (
    <div>
      <ProductPage 
        slug={subcategory} 
        searchParams={q} 
      />
    </div>
  );
}
