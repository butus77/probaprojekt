// app/api/contact/route.ts
import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;

    // Szerveroldali minimális validáció
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Hiányzó mezők." },
        { status: 400 }
      );
    }

    // Itt történne a tényleges feldolgozás:
    // - email küldés (pl. nodemailer)
    // - adatmentés adatbázisba / tárhelyre
    // Most: LOG → fejlesztéshez ideális, azonnal látható.
    console.log("[CONTACT] ▶", { name, email, message, at: new Date().toISOString() });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[CONTACT] ERROR ▶", err);
    return NextResponse.json(
      { ok: false, error: "Érvénytelen kérés." },
      { status: 400 }
    );
  }
}
