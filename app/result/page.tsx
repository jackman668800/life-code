"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ResultPage() {
  const router = useRouter();
  const [report, setReport] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("life_code_result");
    if (!saved) {
      router.replace("/");
      return;
    }
    setReport(saved);
    setTimeout(() => setVisible(true), 300);
  }, [router]);

  if (!report) return null;

  return (
    <main
      className="min-h-screen px-4 py-12"
      style={{ background: "radial-gradient(ellipse at top, #061206 0%, #050a05 60%)" }}
    >
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div
          className={`space-y-2 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="text-xs" style={{ color: "#1e4a1e" }}>
            LIFE_CODE_SCANNER · REPORT GENERATED
          </div>
          <div
            className="text-xs px-3 py-2 border"
            style={{ borderColor: "#1a3a1a", background: "#0a150a", color: "#00ff8877" }}
          >
            <span style={{ color: "#1e4a1e" }}>&gt; </span>
            SCANNING COMPLETE · 生命代码解析报告已生成
          </div>
        </div>

        {/* Report */}
        <div
          className={`transition-opacity duration-700 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{
            background: "#080e08",
            border: "1px solid #0f2a0f",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          <div className="prose prose-invert max-w-none text-sm leading-relaxed"
            style={{ fontFamily: "Courier New, monospace" }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 style={{ color: "#00ff88", fontSize: "1.25rem", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 style={{ color: "#00ff88", fontSize: "1rem", marginTop: "1.5rem", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 style={{ color: "#00cc6a", fontSize: "0.9rem", marginTop: "1rem", marginBottom: "0.25rem" }}>
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p style={{ color: "#94a3b8", marginBottom: "0.75rem", lineHeight: "1.8" }}>
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong style={{ color: "#e2e8f0" }}>{children}</strong>
                ),
                code: ({ children }) => (
                  <code style={{ color: "#00ff88", background: "#0a1a0a", padding: "0 4px", borderRadius: "2px" }}>
                    {children}
                  </code>
                ),
                blockquote: ({ children }) => (
                  <blockquote style={{ borderLeft: "2px solid #00ff8833", paddingLeft: "1rem", color: "#4a7a4a", fontStyle: "italic" }}>
                    {children}
                  </blockquote>
                ),
                hr: () => (
                  <hr style={{ borderColor: "#0f2a0f", margin: "1.5rem 0" }} />
                ),
                li: ({ children }) => (
                  <li style={{ color: "#94a3b8", marginBottom: "0.25rem" }}>{children}</li>
                ),
              }}
            >
              {report}
            </ReactMarkdown>
          </div>
        </div>

        {/* Actions */}
        <div
          className={`flex gap-4 pb-16 transition-opacity duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={() => {
              sessionStorage.removeItem("life_code_result");
              router.push("/survey");
            }}
            className="flex-1 py-3 text-sm font-bold tracking-wider transition-all duration-200"
            style={{ border: "1px solid #1a3a1a", color: "#2d5a2d", background: "transparent", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#00ff8844"; e.currentTarget.style.color = "#00ff8877"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a3a1a"; e.currentTarget.style.color = "#2d5a2d"; }}
          >
            重新扫描
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-3 text-sm font-bold tracking-wider transition-all duration-200"
            style={{ border: "1px solid #1a3a1a", color: "#2d5a2d", background: "transparent", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#00ff8844"; e.currentTarget.style.color = "#00ff8877"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a3a1a"; e.currentTarget.style.color = "#2d5a2d"; }}
          >
            返回首页
          </button>
        </div>
      </div>
    </main>
  );
}
