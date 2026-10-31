const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");
const dataDir = path.join(__dirname, "data");
const messagesFile = path.join(dataDir, "messages.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

// Contact form API: saves submitted messages locally in data/messages.json.
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: "Name, email aur message zaroori hain." });
  }

  const entry = {
    id: Date.now(),
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject || "").trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  };

  try {
    fs.mkdirSync(dataDir, { recursive: true });
    const messages = fs.existsSync(messagesFile)
      ? JSON.parse(fs.readFileSync(messagesFile, "utf8"))
      : [];
    messages.push(entry);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    res.status(201).json({ ok: true, message: "Shukriya! Aap ka message receive ho gaya." });
  } catch (error) {
    console.error("Message save error:", error);
    res.status(500).json({ ok: false, message: "Message save nahi ho saka. Dobara try karein." });
  }
});

// Send unknown page requests to the home page.
app.get("*", (req, res) => res.sendFile(path.join(publicDir, "index.html")));

app.listen(PORT, () => {
  console.log(`Waqas Web Design is running at http://localhost:${PORT}`);
});
