import Link from "next/link";
import { references } from "@/lib/portfolio";
import ReferenceGrid from "@/components/ReferenceGrid";

export const metadata = {
  title: "Referenciák",
  description: "Tekintse meg referencia munkáinkat és ismerje meg projektjeinket.",
};

export default function ReferenciakPage() {
  return (
    <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 text-center">
        Referenciák
      </h1>

      <p className="mt-3 text-base md:text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
        Referenciáim egyszerre mutatják meg a webfejlesztésben szerzett tapasztalataimat és az e-book formájában szerkesztett hitoktatói munkáimat – két terület, amelyben közös a kreatív, értékteremtő szemlélet.
      </p>

      {/* A tényleges kártyarácsot egy kliens komponens rendereli */}
      <ReferenceGrid items={references} />
    </section>
  );
}