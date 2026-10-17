import { Suspense } from "react";
import { Leaf, Truck, Wheat } from "lucide-react";
import { LoadingContainer } from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/HeroProducts";
import Hero from "@/components/home/Hero";
import Categories from "@/components/category/categories";

const features = [
  { icon: Wheat, title: "يخبز كل صباح", text: "ما نبيع شي من أمس، كل المخبوزات طازجة." },
  { icon: Leaf, title: "مكونات طبيعية", text: "زبدة حقيقية وفستق حلبي وتمر عراقي." },
  { icon: Truck, title: "توصيل لباب البيت", text: "خلال ساعة داخل بغداد، ومجاناً." },
];

export default function Home() {
  return (
    <div className="space-y-24">
      <Hero />

      <section className="grid gap-4 rounded-[2rem] bg-secondary/60 p-6 sm:grid-cols-3 sm:p-8">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-background text-primary shadow-sm">
              <Icon className="size-6" />
            </span>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </section>

      <Suspense fallback={<LoadingContainer />}>
        <Categories />
      </Suspense>

      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
