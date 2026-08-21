import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { question, code, language, context } = req.body || {};

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        error: "Question is required"
      });
    }

    const prompt = `
You are Codegenius AI, a friendly senior programming mentor.

Your job is to TEACH students instead of simply giving copy-paste answers.

Student question:
${question}

Programming language:
${language || "Not specified"}

Student code:
${code || "No code provided"}

Additional context:
${context || "None"}

Rules:
1. Explain the concept clearly.
2. Identify the student's mistake if there is one.
3. Give hints before giving a complete solution.
4. Explain why the solution works.
5. Use small examples when useful.
6. Encourage the student to think.
7. Never pretend that code was executed if it wasn't.
`;

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: prompt
    });

    return res.status(200).json({
      success: true,
      answer: response.output_text
    });

  } catch (error) {
    console.error("OpenAI error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to contact the AI mentor."
    });
  }
}
