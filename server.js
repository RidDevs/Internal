const express = require("express");
const multer = require("multer");
const fs = require("fs").promises;
const pdfParse = require("pdf-parse");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(cors({
origin: ["https://riddevs.github.io/Internal/upload.html"], 
methods: ["POST"],
allowedHeaders: ["Content-Type"]
}));

const upload = multer({ dest: "uploads/" });

const SKILLS_LIST = [
    "Python", "JavaScript", "React", "Node.js", "Machine Learning",
    "Data Science", "SQL", "Java", "C++", "Docker", "Kubernetes",
    "AWS", "HTML", "CSS", "MongoDB", "TensorFlow", "Flask", "Django"
];

function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function extractSkillsFromResume(buffer) {
    try {
        const data = await pdfParse(buffer);
        const resumeText = data.text;

        const foundSkills = SKILLS_LIST.filter(skill => {
            const escapedSkill = escapeRegExp(skill);
            const regex = new RegExp(`\\b${escapedSkill}\\b`, "gi");
            return regex.test(resumeText);
        });

        return foundSkills;
    } catch (parseError) {
        console.error("Error parsing PDF:", parseError);
        return [];
    }
}

app.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = req.file.path;
        const fileBuffer = await fs.readFile(filePath);
        const skills = await extractSkillsFromResume(fileBuffer);

        await fs.unlink(filePath);

        res.json({ skills });
    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ error: "Failed to process resume" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});