import ProductCard from "@/components/shared/header/product/product-card";

import { getAllProducts } from "@/lib/actions/product.actions";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<
    Partial<{
      q: string;
      category: string;
      price: string;
      rating: string;
      sort: string;
      page: string;
    }>
  >;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await searchParams;
  // construct the filter url

  const getFilterUrl = ({
    c,
    p,
    r,
    s,
    pg,
  }: Partial<{
    c: string;
    p: string;
    r: string;
    s: string;
    pg: string;
  }>) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (s) params.sort = s;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });
  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">{/* Filters */}</div>
      <div className="md:col-span-4 space-y-4">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
          {products.data.length === 0 && <p> No products found</p>}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
