import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Kapcsolat | Bernadetta – Webfejlesztés",
  description: "Írj üzenetet – kapcsolatfelvételi űrlap.",
};

export default function KapcsolatPage() {
  return (
    <section className="section max-w-2xl">
      <h1>Kapcsolat</h1>
      <p className="mt-2">Írj nekem, és hamarosan válaszolok.</p>
      <div className="mt-6">
        <ContactForm />
      </div>
    </section>
  );
}
