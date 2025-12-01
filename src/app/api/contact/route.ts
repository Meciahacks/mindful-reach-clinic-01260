import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend('re_de7DUg1N_ADa1MEdiB6i33JgQ4XRhtNkN');

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, message } = body;

    // Basic internal fallback validation (optional)
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }





    
    // Send email
    await resend.emails.send({
      from: "intakes@unveiledecho.com",
      to: "intakes@unveiledecho.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("CONTACT API ERROR:", error);

    return new NextResponse(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
