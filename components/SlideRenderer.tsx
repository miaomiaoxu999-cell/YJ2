
import React from 'react';
import { Slide, SlideLayout } from '../types';

interface SlideRendererProps {
  slide: Slide;
  projectName: string;
  index: number;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, projectName, index }) => {
  const { layout, content } = slide;

  const Header = () => (
    <div className="flex justify-between items-center border-b-2 border-indigo-900 pb-3 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-900 flex items-center justify-center rounded">
          <span className="text-white font-bold text-xs">SB</span>
        </div>
        <div className="text-xs font-bold text-indigo-900 tracking-widest uppercase">{projectName} | 银团贷款融资</div>
      </div>
      <div className="text-[10px] text-gray-500 font-medium tracking-tight">Strictly Private & Confidential | Page {index + 1}</div>
    </div>
  );

  const KeyTakeaway = ({ text }: { text: string }) => (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span className="text-xs font-black text-amber-800 uppercase tracking-widest">Key Takeaway</span>
      </div>
      <p className="text-sm font-bold text-gray-800 leading-relaxed">{text}</p>
    </div>
  );

  const DataHighlight = ({ label, value, unit, trend }: { label: string; value: string; unit?: string; trend?: 'up' | 'down' | 'neutral' }) => (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-black text-indigo-950">{value}</span>
        {unit && <span className="text-xs text-gray-500 font-medium">{unit}</span>}
        {trend && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
            trend === 'up' ? 'bg-green-100 text-green-700' : 
            trend === 'down' ? 'bg-red-100 text-red-700' : 
            'bg-gray-100 text-gray-700'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
    </div>
  );

  const renderLayout = () => {
    switch (layout) {
      case SlideLayout.TITLE_COVER:
        return (
          <div className="h-full flex flex-col justify-center items-start text-left bg-indigo-950 text-white rounded-lg p-16 relative overflow-hidden">
            {/* Geometric accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900 transform skew-x-12 translate-x-32 opacity-20"></div>
            <div className="absolute bottom-10 left-16 w-32 h-1 bg-amber-500"></div>
            
            <div className="z-10 max-w-2xl">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-6 text-amber-400">Project Finance & Syndication</h2>
              <h1 className="text-5xl font-extrabold mb-4 leading-tight border-l-8 border-amber-500 pl-8">
                {content.title || projectName}
              </h1>
              <h3 className="text-2xl text-indigo-100 font-light mb-16 pl-10">银团贷款融资方案建议书</h3>
              
              <div className="flex gap-12 mt-20 pl-10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-indigo-300 mb-1">Prepared For</p>
                  <p className="text-sm font-bold uppercase">{projectName} Management</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-indigo-300 mb-1">Date</p>
                  <p className="text-sm font-bold">{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-12 right-12 text-right">
              <p className="text-xs font-bold tracking-widest text-amber-500">Syndicate Pitch PRO</p>
              <p className="text-[10px] text-indigo-300">Global Investment Banking Division</p>
            </div>
          </div>
        );

      case SlideLayout.GANTT:
        return (
          <div className="h-full flex flex-col">
            <Header />
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">{content.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{content.subtitle}</p>
            {content.keyTakeaway && <KeyTakeaway text={content.keyTakeaway} />}
            
            <div className="flex-1 border border-gray-100 rounded-lg overflow-hidden flex flex-col">
              <div className="flex bg-gray-50 border-b border-gray-200">
                <div className="w-1/3 p-3 text-xs font-bold text-gray-500 border-r border-gray-200">关键里程碑 / 阶段</div>
                {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className="flex-1 p-3 text-center text-[10px] font-bold text-gray-400 border-r border-gray-200 last:border-0">W{i+1}</div>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto">
                {content.ganttData?.map((item, i) => (
                  <div key={i} className="flex border-b border-gray-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <div className="w-1/3 p-3 text-xs font-medium text-gray-700 border-r border-gray-200 flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${i % 3 === 0 ? 'bg-indigo-600' : i % 3 === 1 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                      {item.task}
                    </div>
                    <div className="flex-1 flex relative items-center px-1">
                      {Array.from({length: 12}).map((_, j) => (
                        <div key={j} className="flex-1 h-full border-r border-gray-50 last:border-0"></div>
                      ))}
                      <div 
                        className={`absolute h-6 rounded shadow-sm flex items-center px-2 text-[9px] font-bold text-white transition-all
                          ${i % 3 === 0 ? 'bg-indigo-800' : i % 3 === 1 ? 'bg-amber-600' : 'bg-emerald-600'}`}
                        style={{
                          left: `${(item.startWeek / 12) * 100}%`,
                          width: `${(item.duration / 12) * 100}%`
                        }}
                      >
                        <span className="truncate">{item.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <div className="w-3 h-3 bg-indigo-800 rounded"></div> 启动与筹备
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <div className="w-3 h-3 bg-amber-600 rounded"></div> 市场路演
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <div className="w-3 h-3 bg-emerald-600 rounded"></div> 签约与提款
              </div>
            </div>
          </div>
        );

      case SlideLayout.DISTRIBUTION_CHART:
        return (
          <div className="h-full flex flex-col">
            <Header />
            <h2 className="text-2xl font-bold text-indigo-900 mb-2">{content.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{content.subtitle}</p>
            {content.keyTakeaway && <KeyTakeaway text={content.keyTakeaway} />}
            
            <div className="flex-1 flex items-center justify-around gap-12">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  {content.chartData?.reduce((acc, curr, i) => {
                    const start = acc.offset;
                    const stroke = (curr.value / 100) * 100;
                    acc.elements.push(
                      <circle
                        key={i}
                        cx="18" cy="18" r="15.915"
                        fill="transparent"
                        stroke={curr.color || (i === 0 ? '#1e1b4b' : i === 1 ? '#f59e0b' : '#10b981')}
                        strokeWidth="5"
                        strokeDasharray={`${stroke} ${100 - stroke}`}
                        strokeDashoffset={-start}
                        className="transition-all duration-1000"
                      />
                    );
                    acc.offset += stroke;
                    return acc;
                  }, { offset: 0, elements: [] as any[] }).elements}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-indigo-950">100%</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Allocation</span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 gap-4 max-w-xs">
                {content.chartData?.map((data, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-indigo-900 shadow-sm transition-transform hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color || (i === 0 ? '#1e1b4b' : i === 1 ? '#f59e0b' : '#10b981') }}></div>
                      <span className="text-sm font-bold text-gray-700">{data.label}</span>
                    </div>
                    <span className="text-lg font-black text-indigo-900">{data.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100 italic text-xs text-indigo-800 leading-relaxed">
              <strong>分析结论:</strong> {content.body || "基于当前市场流动性环境，建议采取分层分销策略，优先锁定核心基石银行。"}
            </div>
          </div>
        );

      case SlideLayout.BANK_LIST:
        return (
          <div className="h-full flex flex-col">
            <Header />
            <h2 className="text-2xl font-bold text-indigo-900 mb-2">{content.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{content.subtitle}</p>
            {content.keyTakeaway && <KeyTakeaway text={content.keyTakeaway} />}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
              {content.bankTargets?.map((bank, i) => (
                <div key={i} className="group border border-gray-200 rounded-xl p-5 bg-white flex flex-col shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-default">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black px-2 py-1 bg-indigo-100 text-indigo-700 rounded uppercase tracking-tighter">{bank.tier}</span>
                    <svg className="w-5 h-5 text-gray-200 group-hover:text-amber-500 transition-colors" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>
                  <div className="text-base font-bold text-gray-900 mb-2 leading-tight h-10 line-clamp-2">{bank.name}</div>
                  <div className="mt-auto pt-3 border-t border-gray-50">
                    <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">拟定邀请角色</p>
                    <p className="text-xs font-medium text-indigo-600">{bank.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case SlideLayout.TABLE:
        return (
          <div className="h-full flex flex-col">
            <Header />
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold text-indigo-900">{content.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{content.subtitle}</p>
              </div>
              <div className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold rounded uppercase">Indicative Terms Only</div>
            </div>
            {content.keyTakeaway && <KeyTakeaway text={content.keyTakeaway} />}
            <div className="overflow-hidden border border-indigo-100 rounded-xl shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-950">
                  <tr>
                    {content.tableData?.headers.map((h, i) => (
                      <th key={i} className="px-6 py-4 text-left text-[10px] font-black text-white uppercase tracking-[0.2em]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {content.tableData?.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      {row.map((cell, j) => (
                        <td key={j} className={`px-6 py-4 text-sm font-medium ${j === 0 ? 'text-indigo-900 font-bold' : 'text-gray-600'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full flex flex-col">
            <Header />
            <h2 className="text-3xl font-bold text-indigo-950 mb-4">{content.title}</h2>
            {content.subtitle && <p className="text-lg text-indigo-600/70 font-light mb-6 italic">{content.subtitle}</p>}
            {content.keyTakeaway && <KeyTakeaway text={content.keyTakeaway} />}
            
            {content.metrics && content.metrics.length > 0 && (
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {content.metrics.map((metric, i) => (
                  <DataHighlight 
                    key={i}
                    label={metric.label}
                    value={metric.value}
                    unit={metric.unit}
                    trend={metric.trend}
                  />
                ))}
              </div>
            )}
            
            <div className="flex-1 grid grid-cols-12 gap-10">
              <div className="col-span-7 space-y-6">
                {content.points?.map((p, i) => (
                  <div key={i} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100">
                    <div className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-black shadow-sm group-hover:scale-110 transition-transform">{i+1}</div>
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{p}</p>
                  </div>
                ))}
              </div>
              <div className="col-span-5 flex flex-col gap-6">
                <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full -mr-16 -mt-16 opacity-10 group-hover:scale-150 transition-transform duration-700"></div>
                  <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest mb-4">Strategic Summary</h3>
                  <p className="text-sm leading-loose text-indigo-100 font-light">
                    {content.body || "本章节重点阐述了交易的战略意义及对市场的潜在影响。基于严谨的数据分析与行业洞察。"}
                  </p>
                </div>
                <div className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center group hover:border-indigo-300 transition-colors">
                  <svg className="w-12 h-12 text-gray-300 mb-4 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Benchmark Comparison</p>
                  <p className="text-[10px] text-gray-400 mt-1">Market standard data visualization placeholder</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] rounded-xl p-12 slide-aspect-ratio w-full max-w-6xl mx-auto my-12 slide-page border border-gray-50 flex flex-col transition-all duration-500 hover:scale-[1.01]">
      {renderLayout()}
    </div>
  );
};

export default SlideRenderer;
