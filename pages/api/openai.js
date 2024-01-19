import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAIKEY,
});

const openai = new OpenAIApi(configuration);

export default async (req, res) => {
  const prompt = req.body.prompt;

  if (prompt) {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      res.status(200).json({ text: completion.data.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error processing your request." });
    }
  } else {
    res.status(400).json({ error: "No prompt provided." });
  }
};
