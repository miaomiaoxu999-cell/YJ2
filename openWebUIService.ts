// 从环境变量读取配置，支持 Zeabur 部署
const OPEN_WEBUI_URL = import.meta.env.VITE_OPEN_WEBUI_URL || 'http://localhost:8080';
const API_KEY = import.meta.env.VITE_OPEN_WEBUI_API_KEY || '';

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
}

export interface Source {
  name: string;
  type: 'knowledge' | 'web';
  url?: string;
  page?: number;
}

export interface ChatResponse {
  answer: string;
  sources: Source[];
}

export type SearchMode = 'knowledge' | 'web' | 'hybrid';

export interface Model {
  id: string;
  name: string;
}

export interface QueryOptions {
  mode: SearchMode;
  knowledgeBaseId?: string;
  temperature: number;
  model: string;
}

export async function queryOpenWebUI(
  question: string,
  options: QueryOptions
): Promise<ChatResponse> {
  try {
    const { mode, knowledgeBaseId, temperature, model } = options;

    const body: any = {
      model: model,
      messages: [
        {
          role: 'user',
          content: question,
        },
      ],
      temperature: temperature,
      stream: false,
    };

    // 根据模式设置参数
    if ((mode === 'knowledge' || mode === 'hybrid') && knowledgeBaseId) {
      body.files = [
        {
          type: 'collection',
          id: knowledgeBaseId,
        },
      ];
    }

    if (mode === 'web' || mode === 'hybrid') {
      // 启用网络搜索
      body.features = {
        web_search: true,
      };
    }

    console.log('Sending request:', JSON.stringify(body, null, 2));

    const response = await fetch(`${OPEN_WEBUI_URL}/api/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    // 解析来源信息
    const sources: Source[] = [];
    if (data.sources) {
      for (const src of data.sources) {
        if (src.metadata) {
          for (const meta of src.metadata) {
            sources.push({
              name: meta.name || meta.source || 'Unknown',
              type: 'knowledge',
              page: meta.page_label ? parseInt(meta.page_label) : undefined,
            });
          }
        }
        if (src.urls) {
          for (const url of src.urls) {
            sources.push({
              name: url.title || url.url,
              type: 'web',
              url: url.url,
            });
          }
        }
      }
    }

    // 检查 citations 字段（某些版本的 Open WebUI 使用这个）
    if (data.citations) {
      for (const citation of data.citations) {
        if (citation.source) {
          sources.push({
            name: citation.source.name || citation.document || 'Unknown',
            type: citation.source.type === 'web' ? 'web' : 'knowledge',
            url: citation.url,
            page: citation.page,
          });
        }
      }
    }

    // 去重
    const uniqueSources = sources.filter((src, index, self) =>
      index === self.findIndex((s) => s.name === src.name && s.page === src.page)
    );

    return {
      answer: data.choices[0].message.content,
      sources: uniqueSources,
    };
  } catch (error) {
    console.error('Error querying Open WebUI:', error);
    throw error;
  }
}

export async function getKnowledgeBases(): Promise<KnowledgeBase[]> {
  try {
    const response = await fetch(`${OPEN_WEBUI_URL}/api/v1/knowledge/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error getting knowledge bases:', error);
    throw error;
  }
}

export async function getModels(): Promise<Model[]> {
  try {
    const response = await fetch(`${OPEN_WEBUI_URL}/api/models`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    // Open WebUI 返回的模型列表格式
    const models: Model[] = (data.data || data || []).map((m: any) => ({
      id: m.id || m.model,
      name: m.name || m.id || m.model,
    }));
    return models;
  } catch (error) {
    console.error('Error getting models:', error);
    throw error;
  }
}
