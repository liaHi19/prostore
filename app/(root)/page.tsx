import sampleData from "@/db/sample-data"

import ProductList from "@/components/shared/header/product/product-list"

export default function Home() {
  console.log(sampleData)
  return (
    <>
      <ProductList
        data={sampleData.products}
        title="Newest arrivals"
        limit={4}
      />
    </>
  )
}
