// app/fotoalbum/page.tsx
import LightboxGallery from "@/components/LightboxGallery";
import { readPhotos } from "@/lib/photos";

export const metadata = { title: "Fotóalbum | Bernadetta – Webfejlesztés" };
export const runtime = "nodejs"; // fontos: fs-hez Node runtime kell
// export const dynamic = "force-static"; // ha build-kor fixálni akarod

export default async function GalleryPage() {
  const photos = await readPhotos(); // public/photos → automatikus beolvasás
  return (
    <section className="section">
      <h1 className="text-2xl font-semibold">Fotóalbum</h1>
      <p className="mt-2 text-sm opacity-80">
        Pár hangulatkép – design, munka, inspiráció.
      </p>
      <div className="mt-6">
        <LightboxGallery photos={photos as any} />
      </div>
    </section>
  );
}
  