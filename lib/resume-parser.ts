// import { PDFExtract } from "pdf.js-extract"
import mammoth from "mammoth"

interface ParsedResume {
  personalInfo: {
    name?: string
    email?: string
    phone?: string
    location?: string
  }
  skills: string[]
  experience: Array<{
    title: string
    company: string
    location?: string
    startDate?: Date
    endDate?: Date
    current: boolean
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    location?: string
    startDate?: Date
    endDate?: Date
    current: boolean
  }>
  summary?: string
  fileUrl: string
}

export async function parseResume(file: File): Promise<ParsedResume> {
  const buffer = await file.arrayBuffer()
  let text = ""

  try {
    if (file.type === "application/pdf") {
      text = await parsePDF(buffer)
    } else if (file.type.includes("word")) {
      text = await parseWord(buffer)
    } else {
      throw new Error("Unsupported file type")
    }

    // Extract structured data from text
    const parsedData = extractResumeData(text)

    // Save file and get URL (implement file storage)
    const fileUrl = await saveResumeFile(file, buffer)

    return {
      ...parsedData,
      fileUrl,
    }
  } catch (error) {
    console.error("Resume parsing error:", error)
    throw new Error("Failed to parse resume")
  }
}

async function parsePDF(buffer: ArrayBuffer): Promise<string> {
  const pdfExtract = new PDFExtract()
  return new Promise((resolve, reject) => {
    pdfExtract.extractBuffer(Buffer.from(buffer), {}, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      const text = data.pages.map((page) => page.content.map((item) => item.str).join(" ")).join("\n")

      resolve(text)
    })
  })
}

async function parseWord(buffer: ArrayBuffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) })
  return result.value
}

function extractResumeData(text: string): Omit<ParsedResume, "fileUrl"> {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  return {
    personalInfo: extractPersonalInfo(text),
    skills: extractSkills(text),
    experience: extractExperience(text),
    education: extractEducation(text),
    summary: extractSummary(text),
  }
}

function extractPersonalInfo(text: string) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/

  const email = text.match(emailRegex)?.[0]
  const phone = text.match(phoneRegex)?.[0]

  // Extract name (usually first line or before email)
  const lines = text.split("\n").filter(Boolean)
  const name = lines[0]?.trim()

  return {
    name,
    email,
    phone,
  }
}

function extractSkills(text: string): string[] {
  const skillsSection = text.match(/(?:skills|technologies|technical skills)(.*?)(?:\n\n|\n[A-Z])/is)?.[1] || ""

  const commonSkills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Git",
    "TypeScript",
    "Angular",
    "Vue.js",
    "PHP",
    "C++",
    "C#",
    "Ruby",
    "Go",
    "Kubernetes",
    "Jenkins",
    "Linux",
    "Windows",
    "MacOS",
    "Figma",
    "Photoshop",
    "Illustrator",
    "Sketch",
    "InDesign",
    "After Effects",
    "Premiere Pro",
    "Excel",
    "PowerPoint",
    "Word",
    "Salesforce",
    "HubSpot",
    "Google Analytics",
    "SEO",
    "SEM",
    "Social Media Marketing",
    "Content Marketing",
    "Email Marketing",
    "Project Management",
    "Agile",
    "Scrum",
    "Jira",
    "Trello",
    "Slack",
    "Microsoft Teams",
    "Zoom",
  ]

  const foundSkills = commonSkills.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()))

  return [...new Set(foundSkills)]
}

function extractExperience(text: string): ParsedResume["experience"] {
  // This is a simplified extraction - in production, you'd use more sophisticated NLP
  const experienceSection =
    text.match(/(?:experience|work history|employment)(.*?)(?:education|skills|\n\n)/is)?.[1] || ""

  // Extract job titles, companies, and dates
  const experiences: ParsedResume["experience"] = []

  // Simple pattern matching for common formats
  const jobPattern = /([A-Za-z\s]+)\s*(?:at|@)\s*([A-Za-z\s&.,]+)\s*(\d{4})\s*-\s*(\d{4}|present)/gi
  let match

  while ((match = jobPattern.exec(experienceSection)) !== null) {
    experiences.push({
      title: match[1].trim(),
      company: match[2].trim(),
      startDate: new Date(Number.parseInt(match[3]), 0),
      endDate: match[4] === "present" ? undefined : new Date(Number.parseInt(match[4]), 0),
      current: match[4] === "present",
      description: "",
    })
  }

  return experiences
}

function extractEducation(text: string): ParsedResume["education"] {
  const educationSection = text.match(/(?:education|academic background)(.*?)(?:experience|skills|\n\n)/is)?.[1] || ""

  const education: ParsedResume["education"] = []

  // Simple pattern for degree and institution
  const eduPattern = /([A-Za-z\s]+)\s*(?:in|of)\s*([A-Za-z\s]+)\s*(?:from|at)\s*([A-Za-z\s&.,]+)\s*(\d{4})/gi
  let match

  while ((match = eduPattern.exec(educationSection)) !== null) {
    education.push({
      degree: `${match[1].trim()} in ${match[2].trim()}`,
      institution: match[3].trim(),
      endDate: new Date(Number.parseInt(match[4]), 0),
      current: false,
    })
  }

  return education
}

function extractSummary(text: string): string {
  const summarySection = text.match(/(?:summary|objective|profile)(.*?)(?:\n\n|\n[A-Z])/is)?.[1]
  return summarySection?.trim() || ""
}

async function saveResumeFile(file: File, buffer: ArrayBuffer): Promise<string> {
  // In production, save to cloud storage (AWS S3, Google Cloud, etc.)
  // For now, return a placeholder URL
  return `/uploads/resumes/${Date.now()}-${file.name}`
}

export function calculateCandidateScore(resumeData: ParsedResume): number {
  let score = 0

  // Experience scoring (40 points max)
  const experienceYears = resumeData.experience.reduce((total, exp) => {
    if (exp.startDate && exp.endDate) {
      const years = (exp.endDate.getTime() - exp.startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
      return total + years
    }
    return total
  }, 0)

  score += Math.min(experienceYears * 5, 40)

  // Skills scoring (30 points max)
  score += Math.min(resumeData.skills.length * 2, 30)

  // Education scoring (20 points max)
  score += Math.min(resumeData.education.length * 10, 20)

  // Job stability scoring (10 points max)
  const avgJobDuration = experienceYears / Math.max(resumeData.experience.length, 1)
  if (avgJobDuration >= 2) {
    score += 10
  } else if (avgJobDuration >= 1) {
    score += 5
  }

  return Math.min(Math.round(score), 100)
}
