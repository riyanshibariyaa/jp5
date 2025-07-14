import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("accessToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = await verifyToken(token)
    if (!user || user.userType !== "employer") {
      return NextResponse.json({ error: "Employer access required" }, { status: 403 })
    }

    const body = await request.json()
    const { message, context } = body

    // AI Chatbot Integration (using OpenAI API)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for JobPortal ATS system. Help recruiters with:
            - Candidate evaluation and screening
            - Interview questions suggestions
            - Job posting optimization
            - Hiring process guidance
            - Resume analysis insights
            
            Context: ${context || "General recruiting assistance"}`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    const aiResponse = await response.json()

    if (!response.ok) {
      throw new Error("AI service unavailable")
    }

    return NextResponse.json({
      message: aiResponse.choices[0].message.content,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chatbot error:", error)
    return NextResponse.json(
      {
        message: "I'm currently unavailable. Please try again later or contact support.",
        error: true,
      },
      { status: 500 },
    )
  }
}
