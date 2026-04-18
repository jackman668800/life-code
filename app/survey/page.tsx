"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const QUESTIONS = [
  {
    id: "basic_info",
    code: "Q01 · BASIC_INFO",
    comment: "// 地理坐标决定了你运行过的环境版本",
    label: "姓名 / 生日 / 出生城市 / 成长城市 / 现居城市",
    placeholder: "例：小明，1990.3.15，出生河南，成长北京，现居上海",
    multiline: false,
  },
  {
    id: "origin",
    code: "Q02 · ORIGIN_ENVIRONMENT",
    comment: "// 原生系统配置（Origin Config）——决定了你底层安全感的来源",
    label: "你在什么样的家庭环境里长大？父母是做什么的？家里的氛围是什么感觉？",
    placeholder: "温暖 / 压抑 / 忙碌 / 缺爱 / 过度保护……",
    multiline: true,
  },
  {
    id: "critical_error",
    code: "Q03 · CRITICAL_ERROR",
    comment: "// Bug（创伤），是命运的起点——它决定了你所有驱动力的来源",
    label: "你这辈子最重的一次打击是什么？",
    placeholder: "写第一个浮现的，不用修饰",
    multiline: true,
  },
  {
    id: "core_loop",
    code: "Q04 · CORE_LOOP",
    comment: "// while(true) 主循环——停不下来的事，是你和宇宙签的合同",
    label: "被生活打断一百次，你还会回来做的那件事是什么？",
    placeholder: "",
    multiline: true,
  },
  {
    id: "const",
    code: "Q05 · UNDELETABLE_CONST",
    comment: "// CONST（不可变常量）——一旦被删除，整个程序就会崩溃",
    label: "你最怕失去什么？",
    placeholder: "",
    multiline: false,
  },
  {
    id: "status",
    code: "Q06 · CURRENT_STATUS",
    comment: "// 实时进程状态——主进程是什么，ERROR 报在哪里",
    label: "你现在在做什么？最大的阻力是什么？",
    placeholder: "",
    multiline: true,
  },
  {
    id: "legacy",
    code: "Q07 · LEGACY_DEFINE",
    comment: "// 程序终止前的最后一行 // 注释——你想留下什么",
    label: "你希望死的时候，别人怎么记住你？",
    placeholder: "",
    multiline: true,
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allFilled = QUESTIONS.every((q) => (answers[q.id] || "").trim().length > 0);

  const handleSubmit = async () => {
    if (!allFilled) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error("分析失败，请重试");
      const data = await res.json();
      sessionStorage.setItem("life_code_result", data.report);
      router.push("/result");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "未知错误");
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen px-4 py-12"
      style={{ background: "radial-gradient(ellipse at top, #061206 0%, #050a05 60%)" }}
    >
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs" style={{ color: "#1e4a1e" }}>
            LIFE_CODE_SCANNER · MINIMAL · v1.0
          </div>
          <h1 className="text-xl font-bold" style={{ color: "#00ff88" }}>
            变量采集中
            <span className="cursor" />
          </h1>
          <p className="text-xs" style={{ color: "#2d5a2d" }}>
            // 写第一个浮现的答案，不用修饰，越真实越准
          </p>
        </div>

        {/* Progress */}
        <div className="text-xs flex justify-between" style={{ color: "#1e4a1e" }}>
          <span>
            {Object.values(answers).filter((v) => v.trim()).length} / {QUESTIONS.length} 已填写
          </span>
          <span style={{ color: allFilled ? "#00ff88" : "#1e4a1e" }}>
            {allFilled ? "READY TO SCAN" : "COLLECTING..."}
          </span>
        </div>

        {/* Questions */}
        {QUESTIONS.map((q, i) => (
          <div
            key={q.id}
            className="space-y-2 animate-fade-up"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: "forwards" }}
          >
            <div className="text-sm font-bold" style={{ color: "#00ff88" }}>{q.code}</div>
            <div className="text-xs" style={{ color: "#1e4a1e" }}>{q.comment}</div>
            <div className="text-sm" style={{ color: "#94a3b8" }}>{q.label}</div>

            {q.multiline ? (
              <textarea
                rows={3}
                placeholder={q.placeholder}
                value={answers[q.id] || ""}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                className="w-full p-3 text-sm rounded-sm"
                style={{
                  background: "#0a150a",
                  border: `1px solid ${answers[q.id]?.trim() ? "#1e5a1e" : "#0f2a0f"}`,
                  color: "#e2e8f0",
                  fontFamily: "Courier New, monospace",
                  resize: "vertical",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00ff8866")}
                onBlur={(e) => (e.target.style.borderColor = answers[q.id]?.trim() ? "#1e5a1e" : "#0f2a0f")}
              />
            ) : (
              <input
                type="text"
                placeholder={q.placeholder}
                value={answers[q.id] || ""}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                className="w-full p-3 text-sm rounded-sm"
                style={{
                  background: "#0a150a",
                  border: `1px solid ${answers[q.id]?.trim() ? "#1e5a1e" : "#0f2a0f"}`,
                  color: "#e2e8f0",
                  fontFamily: "Courier New, monospace",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00ff8866")}
                onBlur={(e) => (e.target.style.borderColor = answers[q.id]?.trim() ? "#1e5a1e" : "#0f2a0f")}
              />
            )}
          </div>
        ))}

        {/* Submit */}
        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="pt-4 pb-16">
          <button
            onClick={handleSubmit}
            disabled={!allFilled || loading}
            className="w-full py-4 text-base font-bold tracking-widest transition-all duration-300"
            style={{
              border: `1px solid ${allFilled ? "#00ff88" : "#1a3a1a"}`,
              color: allFilled ? "#00ff88" : "#1a3a1a",
              background: "transparent",
              letterSpacing: "0.15em",
              cursor: allFilled && !loading ? "pointer" : "not-allowed",
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!allFilled || loading) return;
              e.currentTarget.style.background = "#00ff88";
              e.currentTarget.style.color = "#050a05";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = allFilled ? "#00ff88" : "#1a3a1a";
            }}
          >
            {loading ? "SCANNING..." : "// 提交完成，开始扫描 →"}
          </button>

          {loading && (
            <div className="mt-4 space-y-1">
              {["读取变量...", "分析底层代码...", "渲染命运公式...", "生成解析报告..."].map((msg, i) => (
                <div
                  key={i}
                  className="text-xs animate-fade-in"
                  style={{ color: "#1e5a1e", animationDelay: `${i * 0.8}s`, opacity: 0, animationFillMode: "forwards" }}
                >
                  &gt; {msg}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
