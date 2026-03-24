export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  CV_STORAGE: `${API_BASE_URL}/api/cvs`,
  PARSER: `${API_BASE_URL}/api/parse`,
  ANALYZER: `${API_BASE_URL}/api/analyze`,
  AI: {
    COVER_LETTER: `${API_BASE_URL}/api/ai/generate-cover-letter`,
    LINKEDIN: `${API_BASE_URL}/api/ai/analyze-linkedin`,
    TRANSLATE: `${API_BASE_URL}/api/ai/translate-cv`,
    INTERVIEW_PREP: `${API_BASE_URL}/api/ai/interview-prep`,
  },
  EXPORT: {
    PDF: `${API_BASE_URL}/api/export/pdf`,
    DOCX: `${API_BASE_URL}/api/export/docx`,
    PREVIEW: `${API_BASE_URL}/api/export/preview`,
  },
  LEADS: `${API_BASE_URL}/api/leads`,
};
