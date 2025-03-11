"use server";

import { PrismaClient } from "@prisma/client";

import { LATEST_PRODUCT_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";

export async function getLatestProducts() {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCT_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  const transformedData = data.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));

  return convertToPlainObject(transformedData);
}
