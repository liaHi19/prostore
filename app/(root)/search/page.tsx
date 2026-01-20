import Link from "next/link";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shared/header/product/product-card";

import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import { prices, ratings, sortOrders } from "@/lib/constants";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<
    Partial<{
      q: string;
      category: string;
      price: string;
      rating: string;
    }>
  >;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `
      Search ${isQuerySet ? q : ""} 
      ${isCategorySet ? `: Category ${category}` : ""}
      ${isPriceSet ? `: Price ${price}` : ""}
      ${isRatingSet ? `: Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

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

  const categories = await getAllCategories();
  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/* Category Links */}
        <h5 className="text-xl mb-2 mt-3">Department</h5>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={cn(
                  (category === "all" || category === "") && "font-bold"
                )}
                href={getFilterUrl({ c: "all" })}
              >
                Any
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.category}>
                <Link
                  className={cn(category === cat.category && "font-bold")}
                  href={getFilterUrl({ c: cat.category })}
                >
                  {cat.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Price Links */}
        <h5 className="text-xl mb-2 mt-8">Price</h5>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={cn(price === "all" && "font-bold")}
                href={getFilterUrl({ p: "all" })}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  className={cn(price === p.value && "font-bold")}
                  href={getFilterUrl({ p: p.value })}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Rating Links */}
        <h5 className="text-xl mb-2 mt-8">Customer Ratings</h5>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={cn(rating === "all" && "font-bold")}
                href={getFilterUrl({ r: "all" })}
              >
                Any
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  className={cn(rating === r.toString() && "font-bold")}
                  href={getFilterUrl({ r: `${r}` })}
                >
                  {`${r} stars & up`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4 space-y-4">
        <div className="flex flex-between flex-col md:flex-row my-4">
          <div className="flex items-center">
            {q !== "all" && q !== "" && "Query: " + q}
            {category !== "all" && category !== "" && " Category: " + category}
            {price !== "all" && " Price: " + price}
            {rating !== "all" && " Rating: " + rating + " stars & up"}
            &nbsp;
            {(q !== "all" && q !== "") ||
            (category !== "all" && category !== "") ||
            rating !== "all" ||
            price !== "all" ? (
              <Button variant={"link"} asChild>
                <Link href="/search">Clear</Link>
              </Button>
            ) : null}
          </div>
          <div>
            Sort by{" "}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={cn("mx-2", sort === s && "font-bold")}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
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
