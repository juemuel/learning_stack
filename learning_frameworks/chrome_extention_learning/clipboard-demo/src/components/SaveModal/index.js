// 保存模态框组件
import StockService from '../../services/stockService.js';

export default class SaveModal {
  constructor() {
    this.modal = this.createModal();
    document.body.appendChild(this.modal);
    this.stockService = new StockService();
    this.setupEventListeners();
  }

  createModal() {
    const modal = document.createElement('div');
    modal.className = 'save-modal modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">保存股票</h3>
          <span class="close-modal">×</span>
        </div>
        <div class="modal-body">
          <div class="stock-selection" style="display: none;">
            <h4>选择要保存的股票</h4>
            <div class="stock-list"></div>
          </div>
          <div class="group-section">
            <h4>选择或创建分组</h4>
            <div class="group-selection">
              <select id="groupSelect">
                <option value="">新建分组</option>
              </select>
              <input type="text" id="newGroupName" placeholder="新分组名称">
            </div>
          </div>
          <div class="tags-section">
            <h4>添加标签</h4>
            <input type="text" id="stockTags" placeholder="添加标签（用逗号分隔，最多10个）">
          </div>
        </div>
        <div class="modal-footer">
          <button class="save-btn">保存</button>
          <button class="cancel-btn">取消</button>
        </div>
      </div>
    `;
    return modal;
  }

  setupEventListeners() {
    const closeBtn = this.modal.querySelector('.close-modal');
    const cancelBtn = this.modal.querySelector('.cancel-btn');
    const saveBtn = this.modal.querySelector('.save-btn');
    const groupSelect = this.modal.querySelector('#groupSelect');
    const newGroupInput = this.modal.querySelector('#newGroupName');

    closeBtn.addEventListener('click', () => this.hide());
    cancelBtn.addEventListener('click', () => this.hide());
    saveBtn.addEventListener('click', () => this.handleSave());

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.hide();
    });

    groupSelect.addEventListener('change', () => {
      newGroupInput.style.display = groupSelect.value === '' ? 'block' : 'none';
    });
  }

  async show(mode = 'batch', stockCode = null) {
    this.mode = mode;
    this.currentStockCode = stockCode;
    
    const stockSelection = this.modal.querySelector('.stock-selection');
    stockSelection.style.display = mode === 'batch' ? 'block' : 'none';

    await this.loadGroups();
    if (mode === 'batch') {
      await this.loadStockList();
    }

    this.modal.style.display = 'block';
  }

  hide() {
    this.modal.style.display = 'none';
  }

  async loadGroups() {
    const groupSelect = this.modal.querySelector('#groupSelect');
    const savedData = await this.getSavedData();
    
    // 保留新建分组选项
    groupSelect.innerHTML = '<option value="">新建分组</option>';
    
    savedData.groups.forEach(group => {
      const option = document.createElement('option');
      option.value = group.name;
      option.textContent = group.name;
      groupSelect.appendChild(option);
    });
  }

  async loadStockList() {
    const stockList = this.modal.querySelector('.stock-list');
    const response = await new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getCodes' }, resolve);
    });

    const codes = response.codes || [];
    stockList.innerHTML = '';

    for (const code of codes) {
      const stockInfo = await this.stockService.getStockInfo(code);
      const stockItem = document.createElement('div');
      stockItem.className = 'stock-item';
      stockItem.innerHTML = `
        <label>
          <input type="checkbox" value="${code}" checked>
          <span>${code} - ${stockInfo?.name || code}</span>
        </label>
      `;
      stockList.appendChild(stockItem);
    }
  }

  async handleSave() {
    const groupSelect = this.modal.querySelector('#groupSelect');
    const newGroupInput = this.modal.querySelector('#newGroupName');
    const tagsInput = this.modal.querySelector('#stockTags');

    const groupName = groupSelect.value || newGroupInput.value.trim();
    if (!groupName) {
      alert('请选择或输入分组名称');
      return;
    }

    const tags = tagsInput.value.trim()
      ? tagsInput.value.trim().split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      : [];

    if (tags.length > 10) {
      alert('标签数量不能超过10个');
      return;
    }

    try {
      const savedData = await this.getSavedData();
      let group = savedData.groups.find(g => g.name === groupName);
      
      if (!group) {
        group = { name: groupName, stocks: [] };
        savedData.groups.push(group);
      }

      const stocksToSave = this.mode === 'batch'
        ? Array.from(this.modal.querySelectorAll('.stock-item input:checked')).map(input => input.value)
        : [this.currentStockCode];

      for (const code of stocksToSave) {
        if (!group.stocks.some(s => s.code === code)) {
          const stockInfo = await this.stockService.getStockInfo(code);
          group.stocks.push({
            code,
            name: stockInfo?.name || code,
            tags
          });
        }
      }

      await this.setSavedData(savedData);
      alert('保存成功！');
      this.hide();

      // 触发分组更新事件
      const event = new CustomEvent('groupsUpdated');
      document.dispatchEvent(event);
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败，请重试');
    }
  }

  getSavedData() {
    return new Promise((resolve) => {
      chrome.storage.local.get('savedData', (result) => {
        resolve(result.savedData || { groups: [] });
      });
    });
  }

  setSavedData(savedData) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ savedData }, resolve);
    });
  }
}