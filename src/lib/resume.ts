export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

export const RESUME_ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function sanitizeResumeFileName(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? "resume";
  return base.replace(/[^\w.\-()+ ]+/g, "_").slice(0, 120) || "resume.pdf";
}

export function assertResumeFile(file: File): string | null {
  if (!file || file.size <= 0) {
    return "A resume file is required.";
  }
  if (file.size > RESUME_MAX_BYTES) {
    return "Resume must be 5 MB or smaller.";
  }
  const type = file.type || "";
  const lower = file.name.toLowerCase();
  const byExt =
    lower.endsWith(".pdf") ||
    lower.endsWith(".doc") ||
    lower.endsWith(".docx");
  if (!RESUME_ALLOWED_TYPES.has(type) && !byExt) {
    return "Resume must be a PDF or Word document (.pdf, .doc, .docx).";
  }
  return null;
}
