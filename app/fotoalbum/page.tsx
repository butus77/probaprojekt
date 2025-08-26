import LightboxGallery from "@/components/LightboxGallery";
import { photos } from "@/lib/data";

export const metadata = { title: "Fotóalbum | Bernadetta – Webfejlesztés" };

export default function GalleryPage() {
  return (
    <section className="section">
      <h1>Fotóalbum</h1>
      <p className="mt-2">Pár hangulatkép – design, munka, inspiráció.</p>

      {/* A saját fotóid (public/photos/… és/vagy .webp is mehet) */}
      <LightboxGallery photos={photos as any} />
    </section>
  );
}
