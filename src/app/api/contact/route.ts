import { NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend('re_fX4LaGZk_ADTywnrxWzDvZUCaAdomNMZy');
export async function GET() {
  return NextResponse.json({ message: "Hello from Contact API" });
}
export async function POST(req: Request) {
  try {
    // const { to, subject, message } = await req.json();
// 
    const to="abhipatel.svit@gmail.com"
    const subject="test"
    const message="This is test message"
    console.log("****test****")    


    const data = await resend.emails.send({
      from: "Your Name <onboarding@resend.dev>",
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success:false, error },
      { status: 500 }
    );
  }
}
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { name, email, phone, message } = body;

//     // Basic internal fallback validation (optional)
//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }





    
//     // Send email
//     await resend.emails.send({
//       from: "intakes@unveiledecho.com",
//       to: "intakes@unveiledecho.com",
//       subject: `New Contact Form Submission from ${name}`,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error("CONTACT API ERROR:", error);

//     return new NextResponse(
//       JSON.stringify({ success: false, error: String(error) }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
