import React, { useState } from 'react';
import { generatePitchDeck } from './geminiService';
import { PitchDeck } from './types';
import SlideRenderer from './components/SlideRenderer';
import { exportToPPT } from './pptxExportService';
import { SimpleChat } from './components/SimpleChat';
import { ChatSidebar } from './components/ChatSidebar';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ppt' | 'chat'>('ppt');
  const [prompt, setPrompt] = useState<string>('');
  const [files, setFiles] = useState<{ data: string, mimeType: string, name: string }[]>([]);
  const [deck, setDeck] = useState<PitchDeck | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      fileList.forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            setFiles(prev => [...prev, { 
              data: ev.target!.result as string, 
              mimeType: file.type,
              name: file.name
            }]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && files.length === 0) {
      setError('请输入项目描述或上传参考文件');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await generatePitchDeck(prompt, files.map(f => ({ data: f.data, mimeType: f.mimeType })));
      setDeck(result);
    } catch (err: any) {
      setError(err.message || '生成方案失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100">
      <nav className="bg-indigo-950 text-white px-8 py-5 shadow-2xl flex justify-between items-center sticky top-0 z-50 no-print border-b border-indigo-900">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500 flex items-center justify-center rounded-lg rotate-3 shadow-lg">
            <svg className="w-6 h-6 text-indigo-950" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
          </div>
          <div>
            <span className="text-xl font-black tracking-tighter block leading-none">Syndicate Pitch <span className="text-amber-500 italic">PRO</span></span>
            <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">Investment Banking Solutions</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {activeTab === 'ppt' && deck && (
            <div className="flex gap-2">
              <button 
                onClick={() => setDeck(null)}
                className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 rounded-lg text-xs font-bold transition-all border border-indigo-800"
              >
                返回编辑
              </button>
              <button 
                onClick={() => deck && exportToPPT(deck, deck.projectName)}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-indigo-950 rounded-lg text-xs font-black shadow-lg transition-all transform active:scale-95"
              >
                导出 PPT 方案
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="bg-indigo-900/50 backdrop-blur-sm border-b border-indigo-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('ppt')}
              className={`px-6 py-3 font-bold transition-all ${
                activeTab === 'ppt'
                  ? 'bg-amber-500 text-indigo-950'
                  : 'text-indigo-300 hover:text-white hover:bg-indigo-800/50'
              }`}
            >
              PPT生成
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-3 font-bold transition-all ${
                activeTab === 'chat'
                  ? 'bg-amber-500 text-indigo-950'
                  : 'text-indigo-300 hover:text-white hover:bg-indigo-800/50'
              }`}
            >
              知识库问答
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-8">
        {activeTab === 'ppt' && (
          <>
            {!deck ? (
              <div className="max-w-3xl mx-auto mt-8 bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] overflow-hidden no-print border border-gray-100">
                <div className="bg-gradient-to-r from-indigo-950 to-indigo-900 p-10 text-white relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9l-7-7zm0 1.5L18.5 9H13V3.5zM6 20V4h6v6h6v10H6z"></path></svg>
                  </div>
                  <h2 className="text-3xl font-black mb-3">构建顶级银团融资方案</h2>
                  <p className="text-indigo-300 text-sm max-w-lg leading-relaxed font-medium">
                    输入您的项目参数或上传初步的 Term Sheet，AI 将基于国际投行标准为您自动生成包含时间线、分销策略和市场分析的全套 Pitch Book。
                  </p>
                </div>
                <div className="p-10 space-y-8">
                  <div className="group">
                    <label className="block text-xs font-black text-indigo-900 mb-3 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      项目摘要与核心提示
                    </label>
                    <textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="请输入：融资主体背景、融资金额(USD/RMB)、期限(Tenor)、主要用途。
如：某科技巨头30亿美金海外并购融资，5年期，计划引入3-5家核心承销行。需要重点展示市场比较分析和详细的8周提款时间表..."
                      className="w-full h-48 p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-400 outline-none transition-all resize-none text-gray-700 font-medium leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-indigo-900 mb-3 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      深度参考文件 (Term Sheet / Profile)
                    </label>
                    <div className="relative">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-indigo-100 border-dashed rounded-2xl cursor-pointer bg-indigo-50/30 hover:bg-indigo-50 hover:border-indigo-300 transition-all group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                          </div>
                          <p className="text-sm font-bold text-indigo-900">拖拽或点击上传文件</p>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase font-black tracking-tighter">PDF, JPEG, PNG supported</p>
                        </div>
                        <input type="file" className="hidden" multiple onChange={handleFileUpload} />
                      </label>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        {files.map((f, i) => (
                          <div key={i} className="flex items-center gap-3 bg-white border border-indigo-100 text-indigo-900 px-4 py-2 rounded-xl text-xs font-bold shadow-sm animate-in fade-in slide-in-from-bottom-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="truncate max-w-[200px]">{f.name}</span>
                            <button onClick={() => removeFile(i)} className="p-1 hover:bg-red-50 hover:text-red-500 rounded transition-colors">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-3 animate-shake">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                      {error}
                    </div>
                  )}

                  <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-indigo-950 hover:bg-black disabled:bg-slate-300 text-white font-black py-5 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 w-1/4 h-full bg-white/5 skew-x-[45deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000"></div>
                    {loading ? (
                      <>
                        <svg className="animate-spin h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="tracking-widest uppercase text-xs">生成投行级方案中...</span>
                      </>
                    ) : (
                      <>
                        <span className="tracking-widest uppercase text-xs">立即生成 Pitch Book</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12 px-6 no-print">
                  <div>
                    <h2 className="text-2xl font-black text-indigo-950 tracking-tight">方案预览</h2>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Generated Draft: {deck.projectName}</p>
                  </div>
                  <div className="flex gap-4">
                     <button 
                      onClick={() => setDeck(null)}
                      className="px-6 py-2 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors text-xs font-black uppercase tracking-widest"
                    >
                      修改数据
                    </button>
                    <div className="px-6 py-2 bg-indigo-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl">
                      {deck.slides.length} SLIDES
                    </div>
                  </div>
                </div>
                <div className="slide-container">
                  {deck.slides.map((slide, idx) => (
                    <SlideRenderer key={slide.id} slide={slide} projectName={deck.projectName} index={idx} />
                  ))}
                </div>
                
                <div className="py-20 flex flex-col items-center justify-center no-print">
                  <div className="w-16 h-1 bg-amber-500 mb-6"></div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.4em]">End of Suggestion</p>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'chat' && (
          <div className="h-[calc(100vh-200px)]">
            <SimpleChat />
          </div>
        )}
      </main>

      <footer className="p-10 text-center text-gray-400 text-[10px] font-bold tracking-[0.3em] uppercase border-t border-gray-100 no-print">
        © 2024 Syndicate Pitch PRO | Powered by Gemini 3 Pro | Financial grade encryption & safety
      </footer>

      {/* Floating Chat Button */}
      <button
        onClick={() => setChatSidebarOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center z-30 no-print"
        title="打开 AI 助手"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Sidebar */}
      <ChatSidebar isOpen={chatSidebarOpen} onClose={() => setChatSidebarOpen(false)} />
    </div>
  );
};

export default App;