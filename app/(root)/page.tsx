import ProductList from "@/components/shared/header/product/product-list";

import { getLatestProducts } from "@/lib/actions/product.actions";

export default async function Home() {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList data={latestProducts} title="Newest arrivals" limit={4} />
    </>
  );
}
