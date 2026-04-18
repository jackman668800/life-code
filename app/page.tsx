"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BOOT_LINES = [
  "INITIALIZING LIFE_CODE_SCANNER v1.0...",
  "LOADING: 宇宙底层逻辑模块",
  "LOADING: 命运渲染引擎",
  "LOADING: 生命密度分析器",
  "LOADING: 禅意解码器",
  "ALL SYSTEMS READY.",
];

export default function HomePage() {
  const router = useRouter();
  const [lines, setLines] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setReady(true), 400);
      }
    }, 340);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: "radial-gradient(ellipse at center, #061206 0%, #050a05 70%)" }}
    >
      {/* Boot log */}
      <div className="w-full max-w-xl mb-12 space-y-1 min-h-[160px]">
        {lines.map((line, i) => (
          <div
            key={i}
            className="animate-fade-in text-xs"
            style={{ color: i === lines.length - 1 ? "#00ff88" : "#1e4a1e" }}
          >
            <span style={{ color: "#0f2a0f" }}>&gt; </span>{line}
          </div>
        ))}
      </div>

      {/* Main content */}
      {ready && (
        <div className="text-center space-y-10 animate-fade-up max-w-2xl w-full">
          <div
            className="inline-block px-3 py-1 text-xs border rounded-sm"
            style={{ borderColor: "#1a3a1a", color: "#00ff8877", background: "#0a1a0a" }}
          >
            LIFE_CODE_SCANNER · MINIMAL · v1.0
          </div>

          <div className="space-y-4">
            <h1
              className="text-3xl md:text-4xl font-bold leading-snug animate-glow-pulse"
              style={{ color: "#00ff88", letterSpacing: "0.02em" }}
            >
              如果宇宙是写好的代码
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#e2e8f0" }}>
              你想不想知道你的
              <span style={{ color: "#00ff88" }}>生命代码</span>
              是什么？
            </h2>
          </div>

          <div className="space-y-2 text-sm" style={{ color: "#2d5a2d" }}>
            <p><span style={{ color: "#1a3a1a" }}>// </span>七个问题，足够扫描你的底层逻辑</p>
            <p><span style={{ color: "#1a3a1a" }}>// </span>你的伤、你的驱动力、你的命运公式</p>
            <p><span style={{ color: "#1a3a1a" }}>// </span>越真实，越准确</p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => router.push("/survey")}
              className="px-10 py-4 text-base font-bold transition-all duration-300"
              style={{
                border: "1px solid #00ff88",
                color: "#00ff88",
                background: "transparent",
                letterSpacing: "0.15em",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#00ff88";
                e.currentTarget.style.color = "#050a05";
                e.currentTarget.style.boxShadow = "0 0 30px #00ff8844";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#00ff88";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              开始扫描 →
            </button>
          </div>

          <p className="text-xs" style={{ color: "#1a3a1a" }}>
            // EST_TIME: 5–8 min · OUTPUT: 生命代码解析报告 + 命运公式 + 命运预测
          </p>
        </div>
      )}
    </main>
  );
}
