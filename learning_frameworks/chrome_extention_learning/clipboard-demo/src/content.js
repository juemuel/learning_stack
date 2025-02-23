document.addEventListener('copy', async (e) => {
  console.log('复制事件触发');
  try {
    // 等待一小段时间确保剪贴板内容已更新
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 读取剪贴板文本内容
    const text = await navigator.clipboard.readText();
    console.log('剪贴板内容:', text);
    
    // 从剪贴板内容中提取股票代码
    const regex = /(?:\((?:sh|sz)?[0-9]{6}\))|(?:^|\s)(?:sh|sz)?[0-9]{6}(?:\s|$)|(?:[0-9]{4,5}\.(?:HK|hk))(?:\s|$)/gi; // 更严格的股票代码匹配
    const clipboardCodes = [...new Set(text.match(regex) || [])].map(code => {
      // 提取括号内的内容，如果有的话
      const bracketMatch = code.match(/\(([^)]+)\)/);
      if (bracketMatch) {
        code = bracketMatch[1];
      }
      // 清理代码，移除多余的空格
      code = code.trim();
      // 如果代码已经包含sh或sz前缀，先移除它
      code = code.replace(/^(sh|sz)/i, '');
      // 如果代码是6位数字，根据规则添加前缀
      if (/^\d{6}$/.test(code)) {
        code = code.startsWith('6') ? 'sh' + code : 'sz' + code;
      }
      return code;
    });
    console.log('从剪贴板提取的原始匹配:', text.match(regex));
    console.log('处理后的股票代码:', clipboardCodes);
    
    if (clipboardCodes.length > 0) {
      // 将新识别的股票代码与页面上已有的代码合并
      const pageCodes = extractStockCodes();
      console.log('页面上已有的股票代码:', pageCodes);
      const allCodes = [...new Set([...clipboardCodes, ...pageCodes])];
      console.log('合并后的股票代码:', allCodes);
      // 发送更新消息到background脚本
      chrome.runtime.sendMessage({ action: "updateCodes", codes: allCodes });
    }
  } catch (error) {
    console.error('获取剪贴板内容失败:', error);
  }
});
// 扫描页面，提取股票代码
function extractStockCodes() {
  console.log('开始扫描页面文本');
  const regex = /(?:\((sh|sz)?(\d{6})\))|(?:^|\s)((sh|sz)?(\d{6}))(?:\s|$)|(?:([0-9]{4,5}\.(HK|hk)))(?:\s|$)/gi; // 更严格的股票代码匹配
  const text = document.body.innerText;
  console.log('页面文本内容:', text.substring(0, 200) + '...');
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
      let code;
      if (match[1] && match[2]) { // 匹配到 (sh/sz)123456
          code = match[1] + match[2];
      } else if (match[3] && match[4]) { // 匹配到 sh/sz123456
          code = match[3] + match[4];
      } else if (match[5] && match[6]) { // 匹配到 1234.HK
          code = match[5];
      } else if (match[2]) { // 匹配到 (123456)
          code = 'sz' + match[2];
      } else if (match[4]) { // 匹配到 123456
          code = 'sz' + match[4];
      } else if (match[5]) { // 匹配到 1234.HK
          code = match[5];
      }
      matches.push(code);
  }
  const uniqueMatches = [...new Set(matches)];
  console.log('从页面提取的原始匹配:', matches);
  console.log('处理后的股票代码:', uniqueMatches);
  return uniqueMatches;
}
  
  // 当页面加载完成时，发送股票代码到背景脚本
  window.addEventListener("load", () => {
    console.log('加载完成');
    const codes = extractStockCodes();
    chrome.runtime.sendMessage({ action: "updateCodes", codes: codes });
  });