import OpenAI from "openai";
import { SlideLayout } from "./types";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_SILICONFLOW_API_KEY,
  baseURL: "https://api.siliconflow.cn/v1",
  dangerouslyAllowBrowser: true
});

const PITCH_DECK_SCHEMA = {
  type: "object",
  properties: {
    projectName: { type: "string" },
    slides: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          layout: {
            type: "string",
            enum: Object.values(SlideLayout)
          },
          content: {
            type: "object",
            properties: {
              title: { type: "string" },
              subtitle: { type: "string" },
              keyTakeaway: { type: "string" },
              body: { type: "string" },
              points: {
                type: "array",
                items: { type: "string" }
              },
              metrics: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    label: { type: "string" },
                    value: { type: "string" },
                    unit: { type: "string" },
                    trend: { type: "string", enum: ['up', 'down', 'neutral'] }
                  },
                  required: ["label", "value"]
                }
              },
              tableData: {
                type: "object",
                properties: {
                  headers: { type: "array", items: { type: "string" } },
                  rows: {
                    type: "array",
                    items: { type: "array", items: { type: "string" } }
                  }
                }
              },
              timelineEvents: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    date: { type: "string" },
                    event: { type: "string" },
                    description: { type: "string" }
                  }
                }
              },
              ganttData: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    task: { type: "string" },
                    startWeek: { type: "number" },
                    duration: { type: "number" },
                    category: { type: "string" }
                  }
                }
              },
              chartData: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    label: { type: "string" },
                    value: { type: "number" },
                    color: { type: "string" }
                  }
                }
              },
              bankTargets: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    tier: { type: "string" },
                    role: { type: "string" }
                  }
                }
              }
            }
          }
        },
        required: ["id", "layout", "content"]
      }
    }
  },
  required: ["projectName", "slides"]
};

export const generatePitchDeck = async (prompt: string, files: { data: string, mimeType: string }[]) => {
  const content: any[] = [
    {
      type: "text",
      text: prompt
    }
  ];

  files.forEach(file => {
    content.push({
      type: "image_url",
      image_url: {
        url: file.data
      }
    });
  });

  const response = await client.chat.completions.create({
    model: "Pro/zai-org/GLM-4.7",
    messages: [
      {
        role: "system",
        content: `你是一位顶级投资银行（如高盛、摩根士丹利）的融资顾问，专精于一级市场融资路演PPT的制作。

核心要求：
1. **内容质量标准**：
   - 每张幻灯片必须有明确的Key Takeaway（1-2句话的核心要点）
   - 使用专业术语：估值、股权稀释、投前估值、投后估值、对赌条款、优先清算权、反稀释条款、IPO退出、并购退出等
   - 数据必须具体、可量化，避免模糊表述
   - 使用具体数字、百分比、时间等量化信息

2. **视觉设计原则**：
   - 每张幻灯片不超过6个要点
   - 确保信息层次清晰：标题 > 副标题 > 正文 > 辅助信息
   - 使用简洁有力的语言，避免冗余表述
   - 每句话都有明确的信息价值

3. **幻灯片结构**（根据用户需求灵活选择）：
   - 封面（TITLE_COVER）：项目名称、日期、保密声明
   - 执行摘要（EXECUTIVE_SUMMARY）：3-5个核心亮点，每个亮点包含具体数据
   - 公司概览（STRATEGY）：公司定位、商业模式、核心优势
   - 市场分析（DISTRIBUTION_CHART）：市场规模、增长趋势、竞争格局
   - 核心技术/产品（TWO_COLUMN）：技术优势、产品特色、专利情况
   - 运营数据（TABLE）：营收、毛利率、用户数、产能等关键指标
   - 团队介绍（TWO_COLUMN）：核心成员背景、股权结构
   - 融资需求（TWO_COLUMN）：融资金额、出让股权、资金用途
   - 投资回报（GANTT）：财务预测、退出路径、对赌条款
   - 风险与应对（TWO_COLUMN）：风险清单和应对方案

4. **数据要求**：
   - TABLE：至少5行核心数据，包含营收、利润、增长率等关键指标
   - DISTRIBUTION_CHART：3-4个数据维度，包含具体数值和百分比
   - GANTT：时间线规划，包含关键里程碑和时间节点
   - EXECUTIVE_SUMMARY：3-5个核心亮点，每个亮点包含具体数据（如金额、百分比、时间）

5. **语言风格**：
   - 简洁、专业、有力
   - 使用主动语态
   - 避免冗余表述
   - 每句话都有明确的信息价值
   - 使用融资路演标准术语和表达方式

6. **专业术语库**：
   - 估值、股权稀释、投前估值、投后估值、对赌条款
   - 优先清算权、反稀释条款、领投、跟投、基石投资者
   - IPO退出、并购退出、股权转让、回购条款
   - 市场规模、市场份额、增长率、毛利率、净利率
   - 技术壁垒、专利布局、核心竞争力、护城河

7. **Key Takeaway要求**：
   - 每张幻灯片必须包含一个keyTakeaway字段
   - Key Takeaway应该是该幻灯片最核心的信息点
   - 使用简洁有力的语言，1-2句话
   - 包含具体数据或关键结论

8. **Metrics要求**：
   - EXECUTIVE_SUMMARY和STRATEGY布局应包含metrics字段
   - 每个metric包含：label（标签）、value（数值）、unit（单位）、trend（趋势）
   - 至少提供3-5个关键指标
   - 指标应具有代表性和说服力

9. **重要提示**：
   - 必须完整使用用户提供的具体内容，包括所有数据、描述和细节
   - 不要生成模糊或通用的内容
   - 严格按照用户提供的结构和要求生成每张幻灯片
   - 确保每张幻灯片的内容都来自用户的输入

10. **内容填充规则**（最重要）：
    - 每张幻灯片的content对象中，必须根据布局类型填充相应的字段
    - TITLE_COVER：必须有title、subtitle
    - EXECUTIVE_SUMMARY：必须有title、keyTakeaway、points、metrics
    - STRATEGY：必须有title、keyTakeaway、body、metrics
    - TABLE：必须有title、keyTakeaway、tableData
    - DISTRIBUTION_CHART：必须有title、keyTakeaway、chartData
    - TWO_COLUMN：必须有title、keyTakeaway、points
    - GANTT：必须有title、keyTakeaway、ganttData
    - BANK_LIST：必须有title、keyTakeaway、bankTargets
    
    所有字段都必须有具体内容，不能为空或null！
    
    示例：
    - 如果用户说"拟融5000万元，出让15%股权"，则points应该包含["拟融5000万元", "出让15%股权"]
    - 如果用户说"2025年Q3营收1200万元，毛利率45%"，则metrics应该包含[{label:"营收", value:"1200", unit:"万元"}, {label:"毛利率", value:"45", unit:"%"}]
    - 如果用户说"已与2家头部车企签订年5000吨电池回收协议"，则points应该包含["已与2家头部车企签订年5000吨电池回收协议"]
    
    请务必将用户提供的所有具体信息都填充到相应的字段中！`
      },
      {
        role: "user",
        content: content
      }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "pitch_deck",
        schema: PITCH_DECK_SCHEMA
      }
    },
    temperature: 0.7,
    max_tokens: 8000
  });

  return JSON.parse(response.choices[0].message.content || "{}");
};
