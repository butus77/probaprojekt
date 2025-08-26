type Photo = { id: string; alt: string; src: string };

export default function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <figcaption className="p-3 text-sm text-gray-600 dark:text-gray-400">
        {photo.alt}
      </figcaption>
    </figure>
  );
}

