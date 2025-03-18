import { BackgroundBeams } from "@/components/modules/landing/BackgroundBeams";
import { HeroContainerScroll } from "@/components/modules/landing/HeroContainerScroll";
import HoverPriceCard from "@/components/modules/landing/HoverPriceCard";
import { InfiniteMovingCards } from "@/components/modules/landing/InfiniteMovingCards";
import { StickyScroll } from "@/components/modules/landing/StickyScroll";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

      {/* Testimonials Section  */}
      <section className="w-full mt-10 md:mt-20">
        <InfiniteMovingCards pauseOnHover={false} speed="slow" />
      </section>

      {/* Features Section  */}
      <section className="w-full mt-10 md:mt-20">
        <MaxWidthWrapper>
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-4xl text-center font-medium">
              Explore new features
            </h2>
            <div className="text-muted-foreground text-center">
              <p>
                Zendo does everything possible to provide you with a convenient
                tool for managing your agency.
              </p>
              <p>Here are just a few tools that may interest you.</p>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="py-10">
          <StickyScroll />
        </div>
      </section>


      <div className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Join Zendo
          </h1>
          <p></p>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Discover the power of seamless agency management with Zendo Agency
            CRM. Experience the difference today and revolutionize the way you
            manage your agency with Zendo.
          </p>
          <div className="flex justify-center mt-8">
            <Link
              href="/agency"
              className={cn(buttonVariants({ variant: "secondary" }), "w-20 cursor-pointer")}
            >
              Join
            </Link>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </div>
  );
}
