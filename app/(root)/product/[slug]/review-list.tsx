"use client";

import { use } from "react";
import Link from "next/link";

import { Review } from "@/types";
import { Calendar, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Rating from "@/components/shared/product/rating";

import { formatDateTime } from "@/lib/utils";

import ReviewForm from "./review-form";

function ReviewList({
  userId,
  productId,
  productSlug,
  reviewsPromise,
}: {
  userId: string;
  productId: string;
  productSlug: string;
  reviewsPromise: Promise<{ data: Review[] }>;
}) {
  const reload = () => {
    console.log("Review submitted");
  };
  const reviewsData = use(reviewsPromise);
  const reviews = reviewsData.data;

  return (
    <div className="space-t-4">
      {reviews.length === 0 && <p>No reviews</p>}
      {userId ? (
        <ReviewForm
          productId={productId}
          userId={userId}
          onReviewSubmitted={reload}
        />
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
      <div className="flex fle-col gap-3 mt-10">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex-between">
                <CardTitle>{review.title}</CardTitle>
              </div>
              <CardDescription>{review.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <Rating value={review.rating} />
                <div className="flex items-center">
                  <User className="mr-1 size-3" />
                  {review.user ? review.user.name : "User"}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 size-3" />
                  {formatDateTime(review.createdAt).dateTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
