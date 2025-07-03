import ProductCarousel from "@/components/shared/header/product/product-carousel";
import ProductList from "@/components/shared/header/product/product-list";

import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

export default async function Home() {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {featuredProducts.length > 0 && <ProductCarousel data={featuredProducts} />}
      <ProductList data={latestProducts} title="Newest arrivals" limit={4} />
    </>
  );
}
