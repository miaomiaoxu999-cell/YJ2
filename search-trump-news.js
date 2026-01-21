const { chromium } = require('playwright');

(async () => {
  // 启动浏览器（非无头模式，这样你可以看到）
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500 // 稍微放慢速度，便于观察
  });

  const page = await browser.newPage();

  // 访问百度搜索
  await page.goto('https://www.baidu.com');

  // 在搜索框输入关键词
  await page.fill('#kw', '特朗普 最新新闻 2025');

  // 点击搜索按钮
  await page.click('#su');

  // 等待搜索结果加载
  await page.waitForSelector('.result', { timeout: 10000 });

  console.log('搜索完成！浏览器将保持打开状态，请手动关闭。');

  // 保持浏览器打开60秒供用户浏览
  await page.waitForTimeout(60000);

  await browser.close();
})();
