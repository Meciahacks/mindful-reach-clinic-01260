import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1),
});

const resend = new Resend('re_de7DUg1N_ADa1MEdiB6i33JgQ4XRhtNkN');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    // Send the email using Resend
    await resend.emails.send({
      from: "intake@yourdomain.com",
      to: "intakes@unveiledecho.com",
      subject: `New Contact Form Submission from ${validated.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validated.name}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Phone:</strong> ${validated.phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${validated.message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
