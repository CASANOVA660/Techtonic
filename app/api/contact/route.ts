import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Recipient email address
const RECIPIENT_EMAIL = "mohamedaminn.bouali@gmail.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, description, date } = body

    // Validate input
    if (!email || !description || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Log the submission
    console.log("[v0] New contact form submission:", {
      email,
      description,
      date,
      timestamp: new Date().toISOString(),
    })

    // Send email notification
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: "Contact Form <onboarding@resend.dev>", // You can change this to your verified domain
          to: RECIPIENT_EMAIL,
          subject: `New Contact Request from ${email}`,
          html: `
            <h2>New Meeting Request</h2>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Preferred Date:</strong> ${date}</p>
            <p><strong>Description:</strong></p>
            <p>${description.replace(/\n/g, "<br>")}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toISOString()}</small></p>
          `,
        })
        console.log(`[v0] Email sent successfully to ${RECIPIENT_EMAIL}`)
      } else {
        console.warn("[v0] RESEND_API_KEY not set. Email not sent. Please set RESEND_API_KEY in .env.local")
      }
    } catch (emailError) {
      console.error("[v0] Error sending email:", emailError)
      // Continue even if email fails - don't fail the request
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your request has been received. We'll contact you soon!",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
