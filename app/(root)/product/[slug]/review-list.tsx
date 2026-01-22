"use client";

import { useState } from "react";
import Link from "next/link";

import { Review } from "@/types";

function ReviewList({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <div className="space-t-4">
      {reviews.length === 0 && <p>No reviews</p>}
      {userId ? (
        <>{/* Review Form here */}</>
      ) : (
        <div>
          Please
          <Link
            className="text-blue-700 px-2"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          to write a review
        </div>
      )}
      <div className="flex fle-col gap-3">{/* Reviews */}</div>
    </div>
  );
}

export default ReviewList;
