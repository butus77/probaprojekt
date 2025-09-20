import LightboxGallery, { type Photo } from "@/components/LightboxGallery";
import data from "@/src/data/photos.json";


// Development: always use fresh JSON
export const revalidate = 0;

export const metadata = {
  title: "Fotóalbum",
  description: "Képgaléria",
};

export default function FotoalbumPage() {
  const photos = data as Photo[];
  return (
    <section className="section">
      <h1 className="text-3xl md:text-4xl font-extrabold">Fotóalbum</h1>
      <LightboxGallery photos={photos} thumbHeightClass="h-56" />
      {/* debug aid – remove later */}
      {/* <pre className="text-xs mt-4">{JSON.stringify(photos.slice(0,3), null, 2)}</pre> */}
    </section>
  );
}
