import PptxGenJS from 'pptxgenjs';
import { PitchDeck, SlideLayout } from './types';

const COLORS = {
  primary: '0F172A',
  primaryLight: '1E293B',
  accent: 'F59E0B',
  accentLight: 'FBBF24',
  white: 'FFFFFF',
  gray: '475569',
  grayLight: '94A3B8',
  success: '059669',
  warning: 'D97706',
  danger: 'DC2626',
  bgGray: 'F8FAFC',
  bgLight: 'F1F5F9',
  border: 'E2E8F0',
  textPrimary: '1E293B',
  textSecondary: '64748B',
  textLight: '94A3B8'
};

const FONTS = {
  title: { size: 36, bold: true, color: COLORS.primary },
  subtitle: { size: 22, bold: false, color: COLORS.primaryLight },
  body: { size: 13, bold: false, color: COLORS.textPrimary },
  small: { size: 10, bold: false, color: COLORS.textSecondary },
  header: { size: 11, bold: true, color: COLORS.white },
  caption: { size: 9, bold: false, color: COLORS.textLight }
};

const BODY_STYLES = {
  fontSize: 11,
  color: COLORS.textPrimary,
  align: 'left',
  lineSpacing: 18,
  bullet: false
};

export const exportToPPT = (deck: PitchDeck, projectName: string) => {
  const pptx = new PptxGenJS();
  
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Syndicate Pitch PRO';
  pptx.company = 'Global Investment Banking Division';
  pptx.subject = `${projectName} - 银团贷款融资方案`;

  deck.slides.forEach((slide, index) => {
    const pptSlide = pptx.addSlide();
    
    switch (slide.layout) {
      case SlideLayout.TITLE_COVER:
        renderTitleCover(pptSlide, slide, projectName);
        break;
      case SlideLayout.GANTT:
        renderGantt(pptSlide, slide, projectName);
        break;
      case SlideLayout.DISTRIBUTION_CHART:
        renderDistributionChart(pptSlide, slide, projectName);
        break;
      case SlideLayout.BANK_LIST:
        renderBankList(pptSlide, slide, projectName);
        break;
      case SlideLayout.TABLE:
        renderTable(pptSlide, slide, projectName);
        break;
      default:
        renderDefault(pptSlide, slide, projectName);
    }
  });

  pptx.writeFile({ fileName: `${projectName}_银团贷款融资方案.pptx` });
};

const renderTitleCover = (slide: any, content: any, projectName: string) => {
  slide.background = { color: COLORS.primary };
  
  slide.addText('PROJECT FINANCE & SYNDICATION', {
    x: 0.5, y: 0.5, w: 9, h: 0.4,
    fontSize: 9, color: COLORS.accent, bold: true, align: 'left', letterSpacing: 2
  });
  
  slide.addText(content.title || projectName, {
    x: 0.5, y: 1.1, w: 9, h: 1.4,
    fontSize: 48, color: COLORS.white, bold: true, align: 'left'
  });
  
  slide.addText('银团贷款融资方案建议书', {
    x: 0.5, y: 2.5, w: 9, h: 0.6,
    fontSize: 22, color: 'E0E7FF', bold: false, align: 'left'
  });
  
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5, y: 4.2, w: 2.5, h: 0,
    line: { color: COLORS.accent, width: 3 }
  });
  
  slide.addText(`Prepared For: ${projectName} Management`, {
    x: 0.5, y: 4.6, w: 4, h: 0.4,
    fontSize: 11, color: 'C7D2FE', bold: true, align: 'left'
  });
  
  slide.addText(`Date: ${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}`, {
    x: 0.5, y: 5.1, w: 4, h: 0.4,
    fontSize: 11, color: 'C7D2FE', bold: true, align: 'left'
  });
  
  slide.addText('Syndicate Pitch PRO', {
    x: 7.2, y: 6.2, w: 2.3, h: 0.35,
    fontSize: 10, color: COLORS.accent, bold: true, align: 'right'
  });
  
  slide.addText('Global Investment Banking Division', {
    x: 7.2, y: 6.6, w: 2.3, h: 0.25,
    fontSize: 8, color: 'C7D2FE', bold: false, align: 'right'
  });
  
  slide.addText('CONFIDENTIAL', {
    x: 7.2, y: 7.0, w: 2.3, h: 0.2,
    fontSize: 7, color: '94A3B8', bold: true, align: 'right', letterSpacing: 1
  });
};

const renderHeader = (slide: any, projectName: string, pageNum: number) => {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.85,
    fill: { color: COLORS.primary }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 0.2, w: 0.5, h: 0.5,
    fill: { color: COLORS.accent }
  });
  
  slide.addText('SB', {
    x: 0.3, y: 0.25, w: 0.5, h: 0.4,
    fontSize: 11, color: COLORS.primary, bold: true, align: 'center', valign: 'middle'
  });
  
  slide.addText(`${projectName} | 银团贷款融资方案`, {
    x: 0.9, y: 0.35, w: 6, h: 0.25,
    fontSize: 10, color: COLORS.white, bold: true, align: 'left'
  });
  
  slide.addText(`Strictly Private & Confidential`, {
    x: 0.9, y: 0.6, w: 6, h: 0.15,
    fontSize: 7, color: '94A3B8', bold: false, align: 'left'
  });
  
  slide.addText(`Page ${pageNum}`, {
    x: 9.2, y: 0.35, w: 0.5, h: 0.25,
    fontSize: 10, color: COLORS.accent, bold: true, align: 'right'
  });
  
  slide.addShape(pptx.ShapeType.line, {
    x: 0, y: 0.85, w: 10, h: 0,
    line: { color: COLORS.accent, width: 2 }
  });
};

const renderKeyTakeaway = (slide: any, text: string, yPos: number) => {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: yPos, w: 9, h: 0.75,
    fill: { color: 'FFFBEB' },
    line: { color: COLORS.accent, width: 3, side: 'left' }
  });
  
  slide.addText('KEY TAKEAWAY', {
    x: 0.7, y: yPos + 0.08, w: 9, h: 0.18,
    fontSize: 8, color: '92400E', bold: true, align: 'left', letterSpacing: 1
  });
  
  slide.addText(text, {
    x: 0.7, y: yPos + 0.28, w: 8.8, h: 0.4,
    fontSize: 11, color: '1F2937', bold: true, align: 'left'
  });
  
  return yPos + 0.9;
};

const renderGantt = (slide: any, content: any, projectName: string) => {
  renderHeader(slide, projectName, 1);
  
  let yPos = 1.15;
  slide.addText(content.title, {
    x: 0.5, y: yPos, w: 9, h: 0.45,
    fontSize: 26, color: COLORS.primary, bold: true, align: 'left'
  });
  
  yPos += 0.55;
  slide.addText(content.subtitle || '', {
    x: 0.5, y: yPos, w: 9, h: 0.25,
    fontSize: 11, color: COLORS.textSecondary, align: 'left'
  });
  
  if (content.keyTakeaway) {
    yPos = renderKeyTakeaway(slide, content.keyTakeaway, yPos + 0.25);
  }
  
  const tableY = yPos + 0.25;
  const tableData = [['关键里程碑 / 阶段', ...Array.from({length: 12}, (_, i) => `W${i+1}`)]];
  
  content.ganttData?.forEach((item: any, i: number) => {
    const row = [item.task];
    for (let j = 0; j < 12; j++) {
      if (j >= item.startWeek && j < item.startWeek + item.duration) {
        row.push('■');
      } else {
        row.push('');
      }
    }
    tableData.push(row);
  });
  
  const table = slide.addTable(tableData, {
    x: 0.5, y: tableY, w: 9, h: 2.3,
    border: { type: 'solid', color: COLORS.border, pt: 1, pr: 1, pb: 1, pl: 1 },
    fill: { color: COLORS.white },
    align: 'center',
    valign: 'middle',
    fontSize: 8,
    color: COLORS.textPrimary
  });
  
  table.rows[0].fill = { color: COLORS.bgLight };
  table.rows[0].fontSize = 8;
  table.rows[0].color = COLORS.textSecondary;
  table.rows[0].bold = true;
  
  const legendY = tableY + 2.6;
  slide.addText('图例:', {
    x: 0.5, y: legendY, w: 0.8, h: 0.25,
    fontSize: 9, color: COLORS.textSecondary, bold: true
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.4, y: legendY + 0.03, w: 0.18, h: 0.18,
    fill: { color: COLORS.primary }
  });
  slide.addText('启动与筹备', {
    x: 1.7, y: legendY, w: 1.4, h: 0.25,
    fontSize: 9, color: COLORS.textSecondary
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: 3.3, y: legendY + 0.03, w: 0.18, h: 0.18,
    fill: { color: COLORS.accent }
  });
  slide.addText('市场路演', {
    x: 3.6, y: legendY, w: 1.4, h: 0.25,
    fontSize: 9, color: COLORS.textSecondary
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.2, y: legendY + 0.03, w: 0.18, h: 0.18,
    fill: { color: COLORS.success }
  });
  slide.addText('签约与提款', {
    x: 5.5, y: legendY, w: 1.4, h: 0.25,
    fontSize: 9, color: COLORS.textSecondary
  });
  
  if (content.body) {
    const bodyY = legendY + 0.5;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: bodyY, w: 9, h: 1.2,
      fill: { color: COLORS.bgGray },
      line: { color: COLORS.border, width: 1 }
    });
    
    slide.addText('详细说明', {
      x: 0.7, y: bodyY + 0.1, w: 8.6, h: 0.2,
      fontSize: 9, color: COLORS.textSecondary, bold: true, uppercase: true
    });
    
    slide.addText(content.body, {
      x: 0.7, y: bodyY + 0.35, w: 8.6, h: 0.75,
      ...BODY_STYLES
    });
  }
};

const renderDistributionChart = (slide: any, content: any, projectName: string) => {
  renderHeader(slide, projectName, 1);
  
  let yPos = 1.15;
  slide.addText(content.title, {
    x: 0.5, y: yPos, w: 9, h: 0.45,
    fontSize: 26, color: COLORS.primary, bold: true, align: 'left'
  });
  
  yPos += 0.55;
  slide.addText(content.subtitle || '', {
    x: 0.5, y: yPos, w: 9, h: 0.25,
    fontSize: 11, color: COLORS.textSecondary, align: 'left'
  });
  
  if (content.keyTakeaway) {
    yPos = renderKeyTakeaway(slide, content.keyTakeaway, yPos + 0.25);
  }
  
  const chartY = yPos + 0.4;
  const chartData = content.chartData?.map((d: any) => ({
    name: d.label,
    labels: [d.label],
    values: [d.value]
  })) || [];
  
  slide.addChart(pptx.ChartType.pie, chartData, {
    x: 0.5, y: chartY, w: 3.8, h: 2.8,
    chartColors: [COLORS.primary, COLORS.accent, COLORS.success, COLORS.primaryLight],
    showLegend: false,
    dataLabelFormatCode: '#,##0"%"',
    dataLabelPosition: 'bestFit'
  });
  
  const legendX = 5;
  let legendY = chartY;
  
  content.chartData?.forEach((data: any, i: number) => {
    const color = data.color || (i === 0 ? COLORS.primary : i === 1 ? COLORS.accent : COLORS.success);
    
    slide.addShape(pptx.ShapeType.rect, {
      x: legendX, y: legendY, w: 0.25, h: 0.25,
      fill: { color: color }
    });
    
    slide.addText(`${data.label}`, {
      x: legendX + 0.35, y: legendY, w: 2.2, h: 0.25,
      fontSize: 11, color: COLORS.textPrimary, bold: true, align: 'left'
    });
    
    slide.addText(`${data.value}%`, {
      x: legendX + 2.6, y: legendY, w: 0.8, h: 0.25,
    fontSize: 14, color: COLORS.primary, bold: true, align: 'right'
    });
    
    legendY += 0.5;
  });
  
  const summaryY = chartY + 3.1;
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: summaryY, w: 9, h: 0.55,
    fill: { color: 'EEF2FF' },
    line: { color: 'C7D2FE', width: 1 }
  });
  
  slide.addText(`分析结论: ${content.body || '基于当前市场流动性环境，建议采取分层分销策略，优先锁定核心基石银行。'}`, {
    x: 0.7, y: summaryY + 0.08, w: 8.6, h: 0.4,
    fontSize: 10, color: '3730A3', italic: true, align: 'left'
  });
  
  if (content.body && content.body.length > 50) {
    const detailY = summaryY + 0.7;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: detailY, w: 9, h: 1.0,
      fill: { color: COLORS.bgGray },
      line: { color: COLORS.border, width: 1 }
    });
    
    slide.addText('详细说明', {
      x: 0.7, y: detailY + 0.1, w: 8.6, h: 0.2,
      fontSize: 9, color: COLORS.textSecondary, bold: true, uppercase: true
    });
    
    slide.addText(content.body, {
      x: 0.7, y: detailY + 0.35, w: 8.6, h: 0.55,
      ...BODY_STYLES
    });
  }
};

const renderBankList = (slide: any, content: any, projectName: string) => {
  renderHeader(slide, projectName, 1);
  
  let yPos = 1.15;
  slide.addText(content.title, {
    x: 0.5, y: yPos, w: 9, h: 0.45,
    fontSize: 26, color: COLORS.primary, bold: true, align: 'left'
  });
  
  yPos += 0.55;
  slide.addText(content.subtitle || '', {
    x: 0.5, y: yPos, w: 9, h: 0.25,
    fontSize: 11, color: COLORS.textSecondary, align: 'left'
  });
  
  if (content.keyTakeaway) {
    yPos = renderKeyTakeaway(slide, content.keyTakeaway, yPos + 0.25);
  }
  
  const cardY = yPos + 0.35;
  const cardWidth = 2.2;
  const cardHeight = 1.4;
  const gap = 0.25;
  
  content.bankTargets?.forEach((bank: any, i: number) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.5 + col * (cardWidth + gap);
    const y = cardY + row * (cardHeight + gap);
    
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: cardWidth, h: cardHeight,
      fill: { color: COLORS.white },
      line: { color: COLORS.border, width: 1 }
    });
    
    slide.addText(bank.tier, {
      x: x + 0.08, y: y + 0.08, w: cardWidth - 0.16, h: 0.28,
      fontSize: 8, color: '4338CA', bold: true, align: 'left',
      fill: { color: 'EEF2FF' }
    });
    
    slide.addText(bank.name, {
      x: x + 0.08, y: y + 0.45, w: cardWidth - 0.16, h: 0.45,
      fontSize: 11, color: COLORS.textPrimary, bold: true, align: 'left'
    });
    
    slide.addText('拟定邀请角色:', {
      x: x + 0.08, y: y + 1.0, w: cardWidth - 0.16, h: 0.14,
      fontSize: 7, color: COLORS.textLight, bold: true, align: 'left'
    });
    
    slide.addText(bank.role, {
      x: x + 0.08, y: y + 1.15, w: cardWidth - 0.16, h: 0.2,
      fontSize: 9, color: '4F46E5', align: 'left'
    });
  });
  
  if (content.body) {
    const bodyY = cardY + Math.ceil((content.bankTargets?.length || 0) / 4) * (cardHeight + gap) + 0.3;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: bodyY, w: 9, h: 1.2,
      fill: { color: COLORS.bgGray },
      line: { color: COLORS.border, width: 1 }
    });
    
    slide.addText('详细说明', {
      x: 0.7, y: bodyY + 0.1, w: 8.6, h: 0.2,
      fontSize: 9, color: COLORS.textSecondary, bold: true, uppercase: true
    });
    
    slide.addText(content.body, {
      x: 0.7, y: bodyY + 0.35, w: 8.6, h: 0.75,
      ...BODY_STYLES
    });
  }
};

const renderTable = (slide: any, content: any, projectName: string) => {
  renderHeader(slide, projectName, 1);
  
  let yPos = 1.15;
  slide.addText(content.title, {
    x: 0.5, y: yPos, w: 9, h: 0.45,
    fontSize: 26, color: COLORS.primary, bold: true, align: 'left'
  });
  
  yPos += 0.55;
  slide.addText(content.subtitle || '', {
    x: 0.5, y: yPos, w: 9, h: 0.25,
    fontSize: 11, color: COLORS.textSecondary, align: 'left'
  });
  
  if (content.keyTakeaway) {
    yPos = renderKeyTakeaway(slide, content.keyTakeaway, yPos + 0.25);
  }
  
  const tableY = yPos + 0.4;
  const tableData = [content.tableData?.headers || [], ...(content.tableData?.rows || [])];
  
  const table = slide.addTable(tableData, {
    x: 0.5, y: tableY, w: 9, h: 3.3,
    border: { type: 'solid', color: COLORS.border, pt: 2, pr: 2, pb: 2, pl: 2 },
    fill: { color: COLORS.white },
    align: 'left',
    valign: 'middle',
    fontSize: 10,
    color: COLORS.textPrimary
  });
  
  table.rows[0].fill = { color: COLORS.primary };
  table.rows[0].fontSize = 9;
  table.rows[0].color = COLORS.white;
  table.rows[0].bold = true;
  table.rows[0].align = 'left';
  
  table.rows.forEach((row: any, i: number) => {
    if (i > 0 && i % 2 === 0) {
      row.fill = { color: COLORS.bgGray };
    }
    if (i > 0) {
      row.cells[0].color = COLORS.primary;
      row.cells[0].bold = true;
    }
  });
  
  slide.addText('Indicative Terms Only', {
    x: 7.5, y: 1.15, w: 2, h: 0.25,
    fontSize: 8, color: '92400E', bold: true, align: 'right',
    fill: { color: 'FEF3C7' }
  });
  
  if (content.body) {
    const bodyY = tableY + 3.6;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: bodyY, w: 9, h: 1.2,
      fill: { color: COLORS.bgGray },
      line: { color: COLORS.border, width: 1 }
    });
    
    slide.addText('详细说明', {
      x: 0.7, y: bodyY + 0.1, w: 8.6, h: 0.2,
      fontSize: 9, color: COLORS.textSecondary, bold: true, uppercase: true
    });
    
    slide.addText(content.body, {
      x: 0.7, y: bodyY + 0.35, w: 8.6, h: 0.75,
      ...BODY_STYLES
    });
  }
};

const renderDefault = (slide: any, content: any, projectName: string) => {
  renderHeader(slide, projectName, 1);
  
  let yPos = 1.1;
  slide.addText(content.title, {
    x: 0.5, y: yPos, w: 9, h: 0.5,
    fontSize: 28, color: COLORS.primary, bold: true, align: 'left'
  });
  
  if (content.subtitle) {
    yPos += 0.6;
    slide.addText(content.subtitle, {
      x: 0.5, y: yPos, w: 9, h: 0.4,
      fontSize: 16, color: '6366F1', italic: true, align: 'left'
    });
  }
  
  if (content.keyTakeaway) {
    yPos = renderKeyTakeaway(slide, content.keyTakeaway, yPos + 0.3);
  }
  
  if (content.metrics && content.metrics.length > 0) {
    yPos += 0.3;
    const metricWidth = 2.1;
    const gap = 0.2;
    
    content.metrics.forEach((metric: any, i: number) => {
      const x = 0.5 + (i % 4) * (metricWidth + gap);
      const y = yPos + Math.floor(i / 4) * 0.8;
      
      slide.addShape(pptx.ShapeType.rect, {
        x, y, w: metricWidth, h: 0.7,
        fill: { color: 'FFFFFF' },
        line: { color: 'E2E8F0', width: 1 }
      });
      
      slide.addText(metric.label, {
        x: x + 0.1, y: y + 0.1, w: metricWidth - 0.2, h: 0.2,
        fontSize: 8, color: '9CA3AF', bold: true, align: 'left', uppercase: true
      });
      
      const trendIcon = metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→';
      const trendColor = metric.trend === 'up' ? '10B981' : metric.trend === 'down' ? 'EF4444' : '9CA3AF';
      
      slide.addText(`${metric.value}${metric.unit || ''} ${trendIcon}`, {
        x: x + 0.1, y: y + 0.35, w: metricWidth - 0.2, h: 0.3,
        fontSize: 20, color: COLORS.primary, bold: true, align: 'left'
      });
    });
    
    yPos += Math.ceil(content.metrics.length / 4) * 0.8 + 0.3;
  }
  
  if (content.points && content.points.length > 0) {
    yPos += 0.2;
    content.points.forEach((point: string, i: number) => {
      slide.addShape(pptx.ShapeType.ellipse, {
        x: 0.6, y: yPos + i * 0.45 + 0.15, w: 0.25, h: 0.25,
        fill: { color: COLORS.accent }
      });
      
      slide.addText(`${i + 1}`, {
        x: 0.6, y: yPos + i * 0.45 + 0.15, w: 0.25, h: 0.25,
        fontSize: 10, color: COLORS.white, bold: true, align: 'center', valign: 'middle'
      });
      
      slide.addText(point, {
        x: 1, y: yPos + i * 0.45, w: 8, h: 0.4,
        fontSize: 12, color: '374151', align: 'left'
      });
    });
    
    yPos += content.points.length * 0.45 + 0.3;
  }
  
  if (content.body) {
    slide.addShape(pptx.ShapeType.rect, {
      x: 5.5, y: yPos, w: 4, h: 1.5,
      fill: { color: COLORS.primary },
      line: { color: COLORS.primary, width: 0 }
    });
    
    slide.addText('Strategic Summary', {
      x: 5.7, y: yPos + 0.1, w: 3.6, h: 0.2,
      fontSize: 9, color: COLORS.accent, bold: true, align: 'left', uppercase: true
    });
    
    slide.addText(content.body, {
      x: 5.7, y: yPos + 0.4, w: 3.6, h: 1,
      fontSize: 11, color: 'E0E7FF', align: 'left', lineSpacing: 16
    });
  }
  
  if (content.body && content.body.length > 100) {
    const extendedBodyY = yPos + 1.7;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: extendedBodyY, w: 9, h: 1.2,
      fill: { color: COLORS.bgGray },
      line: { color: COLORS.border, width: 1 }
    });
    
    slide.addText('详细说明', {
      x: 0.7, y: extendedBodyY + 0.1, w: 8.6, h: 0.2,
      fontSize: 9, color: COLORS.textSecondary, bold: true, uppercase: true
    });
    
    slide.addText(content.body, {
      x: 0.7, y: extendedBodyY + 0.35, w: 8.6, h: 0.75,
      ...BODY_STYLES
    });
  }
};
