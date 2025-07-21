let currentCodes = []; // 当前页面识别的股票代码
let isInitialized = false; // 初始化标志

// 初始化数据
async function initializeStorage() {
  let retryCount = 0;
  const maxRetries = 3;

  while (retryCount < maxRetries) {
    try {
      // 尝试获取存储数据
      const result = await new Promise((resolve, reject) => {
        chrome.storage.local.get(["savedData", "currentCodes"], (result) => {
          if (chrome.runtime.lastError) {
            reject(new Error(`获取存储数据失败: ${chrome.runtime.lastError.message}`));
          } else {
            resolve(result);
          }
        });
      });

      console.log('存储获取结果:', result);

      // 如果数据不存在，初始化数据
      if (!result || !result.savedData) {
        await new Promise((resolve, reject) => {
          chrome.storage.local.set({ savedData: { groups: [] } }, () => {
            if (chrome.runtime.lastError) {
              reject(new Error(`初始化数据失败: ${chrome.runtime.lastError.message}`));
            } else {
              console.log('初始化savedData完成');
              resolve();
            }
          });
        });
      }

      // 恢复保存的股票代码
      if (result && result.currentCodes) {
        currentCodes = result.currentCodes;
        console.log('恢复保存的股票代码:', currentCodes);
      }

      isInitialized = true;
      console.log('存储初始化成功');
      return;

    } catch (error) {
      retryCount++;
      console.error(`初始化存储失败 (尝试 ${retryCount}/${maxRetries}):`, error.message);
      
      if (retryCount === maxRetries) {
        console.error('初始化存储最终失败，已达到最大重试次数');
        break;
      }

      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

}

// 立即开始初始化
initializeStorage();

// 设置消息监听
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background 接受:', message);

  // 确保存储已初始化
  if (!isInitialized) {
    console.log('等待初始化完成...');
    sendResponse({ error: '系统正在初始化，请稍后重试' });
    return true;
  }

  if (message.action === "updateCodes") {
    currentCodes = message.codes || currentCodes;
    console.log('当前代码:', currentCodes);
    // 保存更新后的股票代码
    chrome.storage.local.set({ currentCodes }, () => {
      console.log('股票代码已保存到存储');
    });
    sendResponse({ success: true });
  } else if (message.action === "getCodes") {
    console.log('发送当前代码:', currentCodes);
    sendResponse({ codes: currentCodes });
  }
  return true; // 保持消息通道开放
});