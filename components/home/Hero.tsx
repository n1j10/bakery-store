import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { links } from "@/utils/links";

function Hero() {
  return (
    <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Text (first in RTL = right side) */}
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
          <span className="size-2 rounded-full bg-honey animate-pulse" />
          طازج من الفرن اليوم
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-[1.3] sm:text-5xl lg:text-6xl">
          حلاوة كل يوم
          <br />
          <span className="relative inline-block text-primary">
            تبدأ من مخبزنا
            <svg className="absolute -bottom-2 start-0 w-full text-honey" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden>
              <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="mt-8 max-w-lg text-lg leading-8 text-muted-foreground">
          كيك المناسبات، البقلاوة والكليجة العراقية، الكرواسون بالزبدة والخبز الحار من التنور.
          نخبز كل شي بإيدينا وبمكونات طبيعية، ونوصله لباب بيتك.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href={links.PRODUCTS.href} className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base gap-2")}>
            اطلب الآن
            <ArrowLeft className="size-4" />
          </Link>
          <Link href="#categories" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full px-7 text-base")}>
            تصفح الأقسام
          </Link>
        </div>

        <dl className="mt-12 flex gap-8 sm:gap-12">
          <div>
            <dt className="text-sm text-muted-foreground">سنوات خبرة</dt>
            <dd className="font-heading text-3xl font-bold">+15</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">صنف يومياً</dt>
            <dd className="font-heading text-3xl font-bold">+40</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">تقييم الزبائن</dt>
            <dd className="flex items-center gap-1 font-heading text-3xl font-bold">
              4.9 <Star className="size-5 fill-honey text-honey" />
            </dd>
          </div>
        </dl>
      </div>

      {/* Image collage */}
      <div className="relative mx-auto w-full max-w-xl">
        <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-honey/25 rotate-3" />
        <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-2xl sm:aspect-square">
          <Image
            src="/hero-bakery.jpg"
            alt="رفوف المخبز مليانة خبز ومعجنات طازجة"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="absolute -bottom-6 -start-4 hidden w-44 overflow-hidden rounded-3xl border-4 border-background shadow-xl sm:block">
          <div className="relative aspect-square">
            <Image src="/hero-pastries.jpg" alt="معجنات وكرواسون" fill sizes="180px" className="object-cover" />
          </div>
        </div>

        <div className="absolute top-6 -end-3 rounded-2xl bg-card px-4 py-3 shadow-lg ring-1 ring-foreground/5">
          <p className="text-xs text-muted-foreground">يفتح يومياً</p>
          <p className="font-bold">7 ص — 11 م</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
