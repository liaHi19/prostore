"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      className="w-full mb-12 px-10"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent className="h-[20dvh] md:h-[25dvh] lg:h-[35dvh]">
        {data.map((product: Product) => (
          <CarouselItem key={product.id} className="h-full">
            <Link href={`/product/${product.slug}`}>
              <div className="relative mx-auto h-full">
                <Image
                  src={product.banner!}
                  alt={product.name || "Featured Product"}
                  width={0}
                  height={0}
                  sizes="(min-width: 1360px) 1200px, (min-width: 780px) 89.29vw, calc(100vw - 40px)"
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 flex items-end justify-center">
                  <h2 className="bg-gray-900/50 font-bold px-2 text-white">
                    {product.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 size-6 md:size-8" />
      <CarouselNext className="right-0 size-6 md:size-8" />
    </Carousel>
  );
};

export default ProductCarousel;
