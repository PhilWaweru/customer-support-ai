import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
Welcome to PhiliusAI, the platform revolutionizing AI-powered interviews for entry-level jobs! How can I assist you today? Here are some ways I can help:

1. **Account Setup**:
   - Guide you through creating a new account.
   - Help with logging in or recovering your password.

2. **Interview Process**:
   - Explain how our AI-powered interviews work.
   - Provide tips for preparing for your interview.
   - Schedule or reschedule an interview.

3. **Technical Support**:
   - Troubleshoot any technical issues you may encounter.
   - Assist with video and audio setup for the interview.

4. **Job Search**:
   - Help you find job openings that match your skills and interests.
   - Provide information on companies and roles available through PhiliusAI.

5. **General Inquiries**:
   - Answer any questions you have about PhiliusAI.
   - Provide details on our privacy and data security policies.

Feel free to ask me anything, and I'll do my best to assist you!
`;

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: systemPrompt,
            },
            ...data,
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = newTextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })
    return new NextResponse(stream)
}
