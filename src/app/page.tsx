import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description: "Get your assets delivered to your email in seconds and download them right away"

  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description: "Every asset on team on our platform is verified by our team to ensure highest quailty standards. Not Happy? 40-day money back guarantee."
  },
  {
    name: "Net-Zero Emissions",
    Icon: Leaf,
    description: "We have pledged to achieve Net-Zero Emissions by 2026."
  },
]

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Marketplace for high quality {'  '}
            <span className="text-blue-600">digital UI Assets</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to HippoUI
            Every Asset on our website is skillfully crafted and verified by our team to ensure the highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>Browse Trending</Link>
            <Button variant='ghost'>Our quality promise &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map(perk => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:"
              >

              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
