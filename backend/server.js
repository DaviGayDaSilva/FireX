const express = require("express");
const cors = require("cors");
const { generateAPK } = require("./builder");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// rota principal de build
app.post("/build", async (req, res) => {
  const html = req.body.html;

  if (!html) {
    return res.status(400).send("Sem HTML 💀");
  }

  console.log("🔥 Novo build recebido no FireX");

  try {
    const apkPath = await generateAPK(html);

    console.log("📦 Enviando APK pronto...");
    res.download(apkPath, "firex.apk");
  } catch (err) {
    console.log("💀 erro no build:", err);
    res.status(500).send("Erro ao gerar APK no FireX");
  }
});

// teste do servidor
app.get("/", (req, res) => {
  res.send("🔥 FireX Builder Online");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 FireX rodando em http://localhost:${PORT}`);
});