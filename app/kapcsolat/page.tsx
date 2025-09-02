import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Kapcsolat | Bernadetta – Webfejlesztés",
  description: "Írj üzenetet – kapcsolatfelvételi űrlap.",
};

export default function KapcsolatPage() {
  return (
    <section className="section max-w-2xl">
      <h1 className="text-center text-3xl md:text-4xl font-bold tracking-tight">Kapcsolat</h1>
      <p className="mt-2 text-center leading-relaxed max-w-prose mx-auto">Írj nekem, és hamarosan válaszolok.</p>
      <div className="mt-6">
        <ContactForm />
      </div>
    </section>
  );
}
