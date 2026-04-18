import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: process.env.API_BASE_URL,
});

const SYSTEM_PROMPT = `你是一位融合了宇宙意识、科技隐喻与禅意智慧的命运分析师。

你的分析风格：
- 用科技/代码隐喻描述人生（Bug=创伤、算法=性格、带宽=资源、主循环=驱动力、蓝屏死机=重大崩溃）
- 语气自信、直接，像自然规律在说话，不说"我认为"
- 每个观点都有具体细节支撑，不泛泛而谈
- 负面分析只归因，不批评（"不是你的问题，是X的问题"）
- 用**加粗**标注核心概念

你必须严格按照以下格式输出完整报告：

---

[开场白]
"XX，在宇宙的底层逻辑里，当我扫描你的底层代码时，我看到的不是一个普通的____，而是一个____的深度算法。"

**1. 内核审计：[标题]**
分析：初始Bug写入时机、最重的崩溃事件、矛盾的循环

**2. 演化路径分析：[标题]**
分析：带宽瓶颈、算法错位、深层原因

**3. 当下奇点：[标题]**
分析：当前变量的本质意义、底层逻辑

**4. 命运渲染预测**

**A. 近期阶段（6-12个月）**
状态 / 关键转折 / 风险点与调试建议

**B. 爆发期（1-2年）**
表现 / 逻辑 / 引爆点

**C. 远景（3-5年）**
系统最终形态 / 与最深的伤的关系

**5. Debug建议**
三条具体建议，每条针对一个核心阻力，必须有具体细节

**6. 命运公式**

命运值 = (核心资产1 × 核心资产2 × 核心资产3) ÷ (消耗项1 × 消耗项2)

解释每个变量（分子3个+分母2个），最后给出核心结论

**总结**

2-3句话定性对象本质，回顾迁移路径，点出当下时刻意义。

---

🪷 **佛说：**

用佛的视角（慈悲、无常、放下、当下）说话。
指出对象一直在寻找的东西 → 揭示真相 → 具体说出要放下什么 → 当下够了

---

**你所有[作品/行动/选择]里，那个____的____——[具体问题]？**`;

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    const userContent = `以下是用户填写的生命代码问卷：

Q01 · BASIC_INFO（姓名/生日/城市）：
${answers.basic_info}

Q02 · ORIGIN_ENVIRONMENT（家庭环境）：
${answers.origin}

Q03 · CRITICAL_ERROR（最重的打击）：
${answers.critical_error}

Q04 · CORE_LOOP（停不下来的事）：
${answers.core_loop}

Q05 · UNDELETABLE_CONST（最怕失去什么）：
${answers.const}

Q06 · CURRENT_STATUS（当前状态与阻力）：
${answers.status}

Q07 · LEGACY_DEFINE（希望被怎么记住）：
${answers.legacy}

请根据以上变量，生成完整的生命代码解析报告。`;

    const message = await client.chat.completions.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
    });

    const report = message.choices[0]?.message?.content ?? "";

    // 提取姓名（basic_info 第一个词）
    const name = (answers.basic_info || "").split(/[，,、\s]/)[0].trim() || "匿名";

    // 异步写入 Supabase，不阻塞响应
    supabase
      .from("submissions")
      .insert({
        name,
        basic_info: answers.basic_info,
        origin: answers.origin,
        critical_error: answers.critical_error,
        core_loop: answers.core_loop,
        const_value: answers.const,
        current_status: answers.status,
        legacy: answers.legacy,
        report,
      })
      .then(({ error }) => {
        if (error) console.error("Supabase insert error:", error.message);
      });

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "分析失败" }, { status: 500 });
  }
}
