import express from "express";

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from Pollinations.ai Routes" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}`;

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Erro na Pollinations: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageBase64 = buffer.toString('base64');
    res.status(200).json({ photo: imageBase64 });

  } catch (error) {
    console.error("Error image generator:", error);
    res.status(500).json({ message: "Something is wrong." });
  }
});

export default router;