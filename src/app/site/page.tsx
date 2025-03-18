import { BackgroundBeams } from "@/components/modules/landing/BackgroundBeams";
import { HeroContainerScroll } from "@/components/modules/landing/HeroContainerScroll";
import HoverPriceCard from "@/components/modules/landing/HoverPriceCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { pricingCards } from "@/lib/constants";
import { stripe } from "@/lib/stripe";
import clsx from "clsx";
import { Check } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const prices = await stripe.prices.list({
    product: process.env.NEXT_ZENDO_PRODUCT_ID,
    active: true,
  });

  return (
    <div className="h-full">
      {/* Hero Section  */}
      <section className="w-full relative">
        <MaxWidthWrapper>
          <HeroContainerScroll />
        </MaxWidthWrapper>
        <BackgroundBeams />
      </section>

      {/* Pricing Section  */}
      <section>
        <MaxWidthWrapper className="flex items-center flex-col gap-4 md:mt-20">
          <h2 className="text-4xl text-center font-medium">
            Choose what fits you right
          </h2>
          <p className="text-muted-foreground text-center">
            Our straightforward pricing plans are tailored to meet your needs.
            If you&apos;re not ready to commit you can get started for free.
          </p>
          <HoverPriceCard />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
