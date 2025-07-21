import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [risks, setRisks] = useState("");
  const [simpleExplanation, setSimpleExplanation] = useState("");
  const [actionSuggestions, setActionSuggestions] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const truncateFileName = (name) => {
    const ext = name.slice(name.lastIndexOf("."));
    const base = name.slice(0, name.lastIndexOf("."));
    if (base.length <= 16) return name;
    return base.slice(0, 12) + "..." + ext;
  };

  // Download Result as PDF
  const downloadPDF = async () => {
    const cards = document.querySelectorAll(".card");
    if (!cards.length) return;

    const pdf = new jsPDF("p", "mm", "a4");

    const topMargin = 20;
    const bottomMargin = 10;
    const leftMargin = 10;
    const rightMargin = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const usableWidth = pageWidth - leftMargin - rightMargin;
    const usableHeight =
      pdf.internal.pageSize.getHeight() - topMargin - bottomMargin;

    // Add DocGuard branding to first page
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("DocGuard Report", pageWidth / 2, 20, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text("AI-powered document insights & risk defence", pageWidth / 2, 28, {
      align: "center",
    });

    // Add a little gap before first card
    let currentY = 40;

    for (let i = 0; i < cards.length; i++) {
      const canvas = await html2canvas(cards[i], { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);

      const scaledHeight = (imgProps.height * usableWidth) / imgProps.width;

      if (i > 0) {
        pdf.addPage();
        currentY = topMargin;
      }

      pdf.addImage(
        imgData,
        "PNG",
        leftMargin,
        currentY,
        usableWidth,
        scaledHeight
      );
    }

    pdf.save("docguard-summary.pdf");
  };

  const formatGeminiText = (text) =>
    text
      ?.split("\n")
      .filter((l) => l.trim())
      .map((line, i) => {
        const clean = line.replace(/\*\*/g, "").trim();
        const bullet = clean.match(/^[-*]\s*(.+?):\s*(.+)/);
        if (bullet)
          return (
            <li key={i}>
              <strong>{bullet[1].trim()}:</strong> {bullet[2].trim()}
            </li>
          );
        if (/^[-*]\s*/.test(clean))
          return <li key={i}>{clean.replace(/^[-*]\s*/, "")}</li>;
        const colon = clean.match(/^(.+?):\s*(.+)/);
        if (colon)
          return (
            <p key={i}>
              <strong>{colon[1].trim()}:</strong> {colon[2].trim()}
            </p>
          );
        return <p key={i}>{clean}</p>;
      });

  const handleUpload = async () => {
    if (!pdfFile) return setError("Please select a PDF file.");
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("pdfFile", pdfFile);
      const { data } = await axios.post(
        "http://localhost:5002/api/pdf/upload",
        fd
      );
      setSummary(data.summary);
      setRisks(data.risks);
      setSimpleExplanation(data.simpleExplanation);
      setActionSuggestions(data.actionSuggestions);
      setIsAnalyzed(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!userQuestion.trim()) return;
    try {
      const { data } = await axios.post("http://localhost:5002/api/pdf/ask", {
        question: userQuestion,
      });
      setAnswer(data.answer);
    } catch {
      setAnswer("❌ Couldn't find an answer. Try rephrasing.");
    }
  };

  return (
    <>
      {/* ---------- Hero / Header ---------- */}
      <header className="hero">
        <div className="hero-content">
          <h1>
            <span className="brand-gradient">DOCCU</span>
          </h1>
          <p className="tagline">
            AI‑powered document insights &amp; risk defence — in one click.
          </p>
          <div className="cta-wrapper">
            <label
              className="file-label"
              title={pdfFile ? pdfFile.name : "Upload PDF"}
            >
              📎 {pdfFile ? truncateFileName(pdfFile.name) : "Choose PDF"}
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
              />
            </label>
            <button
              className="primary-btn"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? <span className="spinner" /> : "Analyze"}
            </button>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <p className="subnote">
            <strong>Private &amp; secure:</strong> files never leave our
            encrypted server.
          </p>
        </div>
      </header>

      {/* ---------- Results ---------- */}
      <main className="results-area">
        {isAnalyzed && (
          <>
            <div id="pdf-content">
              {summary && (
                <Card color="green" title="Document Summary">
                  {formatGeminiText(summary)}
                </Card>
              )}
              {risks && (
                <Card color="red" title="Risk Alerts">
                  <ul>{formatGeminiText(risks)}</ul>
                </Card>
              )}
              {simpleExplanation && (
                <Card color="yellow" title="Explained Simply">
                  {formatGeminiText(simpleExplanation)}
                </Card>
              )}
              {actionSuggestions && (
                <Card color="blue" title="Recommended Actions">
                  <ul>{formatGeminiText(actionSuggestions)}</ul>
                </Card>
              )}
              {userQuestion && answer && (
                <section className="qa-box">
                  <h3>Ask your document</h3>
                  <p>
                    <strong>Q:</strong> {userQuestion}
                  </p>
                  <div className="answer">{formatGeminiText(answer)}</div>
                </section>
              )}
            </div>

            <button className="primary-btn download-btn" onClick={downloadPDF}>
              📄 Download Result as PDF
            </button>
          </>
        )}

        {/* ---------- Q&A ---------- */}
        {isAnalyzed && (
          <section className="qa-box">
            <h3>Ask about your document</h3>
            <input
              className="qa-input"
              placeholder="e.g. Is there a refund policy?"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
            />
            <button className="primary-btn small" onClick={handleAsk}>
              Ask
            </button>
          </section>
        )}
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="site-footer">
        &copy; {new Date().getFullYear()} DOCCU&nbsp;&middot; All rights
        reserved.
      </footer>
    </>
  );
}

function Card({ color, title, children }) {
  return (
    <article className={`card ${color}`}>
      <h2>{title}</h2>
      <div>{children}</div>
    </article>
  );
}
