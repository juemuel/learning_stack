// 股票列表组件
import StockService from '../../services/stockService.js';
import SaveModal from '../SaveModal/index.js';

export default class StockList {
  constructor(container) {
    this.container = container;
    this.codeList = document.createElement('ul');
    this.codeList.id = 'codeList';
    this.container.appendChild(this.codeList);
    this.stockService = new StockService();
  }
  // 更新股票代码列表
  async updateCodes(codes) {
    this.codeList.innerHTML = '';
    for (const code of codes) {
      const li = document.createElement('li');
      const stockInfo = await this.stockService.getStockInfo(code);
      
      li.innerHTML = `
        <div class="stock-info">
          <span class="stock-code">${code}</span>
          <span class="stock-name">${stockInfo?.name || code}</span>
          <span class="add-to-group-icon">+</span>
        </div>
      `;
      
      // 为添加按钮绑定事件
      const addButton = li.querySelector('.add-to-group-icon');
      addButton.addEventListener('click', () => {
        const saveModal = new SaveModal();
        saveModal.show('single', code);
      });
      
      this.codeList.appendChild(li);
    }
    
    // 添加批量保存按钮
    const batchSaveDiv = document.createElement('div');
    batchSaveDiv.className = 'batch-save';
    batchSaveDiv.innerHTML = `
      <button class="batch-save-btn">批量添加到分组</button>
    `;
    
    // 为批量保存按钮绑定事件
    const batchSaveBtn = batchSaveDiv.querySelector('.batch-save-btn');
    batchSaveBtn.addEventListener('click', () => {
      const saveModal = new SaveModal();
      saveModal.show('batch');
    });
    
    this.container.appendChild(batchSaveDiv);
}
  // 获取当前页面的股票代码
  async loadCodes() {
    console.log('正在请求股票代码...');
    try {
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: 'getCodes' }, resolve);
      });
      console.log('收到股票代码响应:', response);
      const codes = response.codes || [];
      console.log('处理股票代码列表:', codes);
      await this.updateCodes(codes);
    } catch (error) {
      console.error('获取股票代码失败:', error);
    }
  }
  // 获取保存的数据
  getSavedData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('savedData', (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        resolve(result.savedData || { groups: [] });
      });
    });
  }
  // 保存数据
  setSavedData(savedData) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ savedData }, resolve);
    });
  }
}