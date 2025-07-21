# DOCCU

DOCCU is an AI-powered document analysis tool that helps users extract insights, identify risks, and understand complex documents in simple terms. It supports PDF uploads and provides an interactive Q&A feature to ask questions directly to the document.

## 🚀 Features

- 📎 Upload and analyze PDF documents
- 🧠 AI-generated:
  - Document summary
  - Risk alerts
  - Simplified explanation ("Explain like I'm 5")
  - Recommended actions
- 🤖 Ask questions about the document and get instant answers
- 📄 Download full analysis as a PDF
- 🔐 Secure — Files are processed privately and never stored

## 📂 Project Structure

DOCCU/
├── client/ # Frontend React app
├── server/ # Backend Node.js/Express API
├── README.md # Project documentation
└── .gitignore

 
## 🛠️ Tech Stack

**Frontend (client)**  
- React
- Axios
- jsPDF & html2canvas (PDF generation)
- CSS Modules / Custom CSS

**Backend (server)**  
- Node.js + Express
- Multer (PDF file upload)
- Google Gemini API (document insights)
- OpenAI-compatible document Q&A logic (if integrated)

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/DOCCU.git
cd DOCCU

Create a .env file in the root of server directory and add your Gemini API key


# Made with love from Rushikesh Mahadev Raval