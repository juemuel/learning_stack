// 分组列表组件
import StockService from '../../services/stockService.js';

export default class GroupList {
  constructor(container) {
    this.container = container;
    this.groupList = document.createElement('div');
    this.groupList.id = 'groupList';
    this.searchInput = document.createElement('input');
    this.searchInput.type = 'text';
    this.searchInput.id = 'searchInput';
    this.searchInput.placeholder = '搜索股票代码或标签';
    
    this.container.appendChild(this.searchInput);
    this.container.appendChild(this.groupList);
    
    this.stockService = new StockService();
    this.initSearchHandler();
  }

  // 初始化搜索处理函数
  initSearchHandler() {
    this.searchInput.addEventListener('input', () => {
      const searchTerm = this.searchInput.value.toLowerCase();
      this.searchGroups(searchTerm);
    });
  }

  // 搜索分组
  async searchGroups(searchTerm) {
    const savedData = await this.getSavedData();
    this.groupList.innerHTML = '';
    
    if (searchTerm === '') {
      this.loadGroups();
      return;
    }
    
    savedData.groups.forEach(group => {
      const matchGroupName = group.name.toLowerCase().includes(searchTerm);
      
      if (matchGroupName) {
        const groupDiv = this.createGroupElement(group.name, group.stocks);
        this.groupList.appendChild(groupDiv);
        return;
      }
      
      const filteredStocks = group.stocks.filter(stock => {
        const matchCode = stock.code.toLowerCase().includes(searchTerm);
        const matchTags = stock.tags ? stock.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm)) : false;
        return matchCode || matchTags;
      });
      
      if (filteredStocks.length > 0) {
        const groupDiv = this.createGroupElement(group.name, filteredStocks);
        this.groupList.appendChild(groupDiv);
      }
    });
  }
  // 加载分组
  async loadGroups() {
    console.log('开始加载分组');
    try {
      let retryCount = 0;
      let savedData;
      
      while (retryCount < 3) {
        try {
          savedData = await this.getSavedData();
          if (savedData && savedData.groups) {
            break;
          }
          console.log(`重试获取数据 (${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, 500));
          retryCount++;
        } catch (error) {
          console.error('获取数据失败，准备重试:', error);
          retryCount++;
          if (retryCount >= 3) throw error;
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
  this.groupList.innerHTML = '';
      
      if (!savedData || !savedData.groups) {
        console.warn('没有找到有效的分组数据');
        return;
      }
  
      savedData.groups.forEach(group => {
        const groupDiv = this.createGroupElement(group.name, group.stocks);
        this.groupList.appendChild(groupDiv);
      });
    } catch (error) {
      console.error('加载分组失败:', error);
      this.groupList.innerHTML = '<div class="error-message">加载分组失败，请刷新页面重试</div>';
    }
  }
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
  // 创建分组元素
  createGroupElement(groupName, stocks) {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'group';
    
    const header = this.createGroupHeader(groupName, stocks);
    const stockPreview = this.createStockPreview(stocks);
    const modal = this.createModal(groupName, stocks);
    
    groupDiv.appendChild(header);
    groupDiv.appendChild(stockPreview);
    groupDiv.appendChild(modal);
    
    return groupDiv;
  }

  // 创建分组头部
  createGroupHeader(groupName, stocks) {
    const header = document.createElement('div');
    header.className = 'group-header';
    header.innerHTML = `
      <span class="group-name">${groupName}</span>
      <div class="header-right">
        <span class="stock-count">(${stocks.length})</span>
        <span class="manage-icon">⚙️</span>
      </div>
    `;

    // 为管理图标添加点击事件
    const manageIcon = header.querySelector('.manage-icon');
    if (manageIcon) {
      manageIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const groupDiv = header.closest('.group');
        const modal = groupDiv.querySelector('.modal');
        if (modal) {
          modal.style.display = 'block';
        }
      });
    }

    header.addEventListener('click', (e) => {
      if (!e.target.classList.contains('manage-icon')) {
        const preview = header.nextElementSibling;
        preview.style.display = preview.style.display === 'none' ? 'block' : 'none';
      }
    });

    return header;
  }
  // 创建股票预览
  async createStockPreview(stocks) {
    const stockPreview = document.createElement('div');
    stockPreview.className = 'stock-preview';
    stockPreview.style.display = 'none';
    
    const stockInfos = await this.stockService.batchGetStockInfo(stocks.map(stock => stock.code));
    const stocksWithInfo = stocks.map((stock, index) => ({
      ...stock,
      name: stockInfos[index].name || stock.code
    }));

    stockPreview.innerHTML = `
      <div class="preview-stocks">
        ${stocksWithInfo.map(stock => `<div class="preview-stock-item">${stock.code} - ${stock.name}</div>`).join('')}
      </div>
    `;
    return stockPreview;
  }

  // 创建股票项
  async createStockItem(groupName, stock) {
    const stockInfo = await this.stockService.getStockInfo(stock.code);
    const stockItem = document.createElement('div');
    stockItem.className = 'stock-item';
    stockItem.innerHTML = `
      <div class="stock-info">
        <span class="stock-code">${stock.code} - ${stockInfo.name || stock.code}</span>
        <div class="stock-tags">
          ${(stock.tags || []).map(tag => `
            <span class="tag">
              ${tag}
              <span class="remove-tag">×</span>
            </span>
          `).join('')}
          <span class="add-tag">+ 添加标签</span>
        </div>
      </div>
      <button class="delete-btn">删除</button>
    `;

    this.setupStockItemEvents(stockItem, groupName, { ...stock, name: stockInfo.name });
    return stockItem;
  }
  // 创建模态框
  createModal(groupName, stocks) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">${groupName} - 管理股票</h3>
          <span class="close-modal">×</span>
        </div>
        <div class="stock-list"></div>
      </div>
    `;
  this.setupModalEvents(modal, groupName, stocks);
    return modal;
  }
  // 设置模态框事件
  setupModalEvents(modal, groupName, stocks) {
    console.log('开始设置模态框事件', { groupName, stocksCount: stocks.length });
    // 确保模态框初始状态为隐藏
    modal.style.display = 'none';
    console.log('模态框初始状态已设置为隐藏');
  const stockList = modal.querySelector('.stock-list');
    console.log('获取到股票列表容器:', stockList ? '成功' : '失败');
    stocks.forEach(stock => {
      const stockItem = this.createStockItem(groupName, stock);
      stockList.appendChild(stockItem);
    });
    console.log(`已添加 ${stocks.length} 个股票项到列表`);
  // 绑定关闭按钮事件
    const closeBtn = modal.querySelector('.close-modal');
    console.log('获取到关闭按钮:', closeBtn ? '成功' : '失败');
    closeBtn.addEventListener('click', (e) => {
      console.log('关闭按钮被点击');
      e.preventDefault();
      modal.style.display = 'none';
      console.log('模态框显示状态已设置为隐藏');
    });
  // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        console.log('点击了模态框外部');
        modal.style.display = 'none';
        console.log('模态框显示状态已设置为隐藏');
      }
    });
    console.log('模态框事件设置完成');
  }
  // 设置股票项事件
  setupStockItemEvents(stockItem, groupName, stock) {
    // 删除按钮事件
    const deleteBtn = stockItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => this.handleDeleteStock(stockItem, groupName, stock));

    // 添加标签事件
    const addTagBtn = stockItem.querySelector('.add-tag');
    addTagBtn.addEventListener('click', () => this.handleAddTag(stockItem, groupName, stock));

    // 为现有标签添加删除事件
    stockItem.querySelectorAll('.tag').forEach(tagElement => {
      const removeBtn = tagElement.querySelector('.remove-tag');
      const tagText = tagElement.textContent.trim().slice(0, -1);
      removeBtn.addEventListener('click', () => 
        this.handleRemoveTag(groupName, stock, tagText, tagElement));
    });
  }
  // 处理删除股票
  async handleDeleteStock(stockItem, groupName, stock) {
    const savedData = await this.getSavedData();
    const group = savedData.groups.find(g => g.name === groupName);
    if (group) {
      group.stocks = group.stocks.filter(s => s.code !== stock.code);
      await this.setSavedData(savedData);
      stockItem.remove();
      const header = stockItem.closest('.group')?.querySelector('.stock-count');
      if (header) {
        header.textContent = `(${group.stocks.length})`;
      }
    }
  }
  // 处理添加标签
  async handleAddTag(stockItem, groupName, stock) {
    const newTag = prompt('请输入新标签：');
    if (newTag?.trim()) {
      const savedData = await this.getSavedData();
      const group = savedData.groups.find(g => g.name === groupName);
      if (group) {
        const stockToUpdate = group.stocks.find(s => s.code === stock.code);
        if (stockToUpdate) {
          stockToUpdate.tags = [...(stockToUpdate.tags || []), newTag.trim()];
          if (stockToUpdate.tags.length > 10) {
            alert('标签数量不能超过10个');
            return;
          }
          await this.setSavedData(savedData);
          this.updateTagsUI(stockItem, newTag.trim(), stockToUpdate);
        }
      }
    }
  }
  // 处理删除标签
  async handleRemoveTag(groupName, stock, tagToRemove, tagElement) {
    const savedData = await this.getSavedData();
    const group = savedData.groups.find(g => g.name === groupName);
    if (group) {
      const stockToUpdate = group.stocks.find(s => s.code === stock.code);
      if (stockToUpdate) {
        stockToUpdate.tags = (stockToUpdate.tags || []).filter(tag => tag !== tagToRemove);
        await this.setSavedData(savedData);
        tagElement.remove();
      }
    }
  }
  // 更新标签UI
  updateTagsUI(stockItem, newTag, stock) {
    const tagsContainer = stockItem.querySelector('.stock-tags');
    const addTagBtn = tagsContainer.querySelector('.add-tag');
    const newTagElement = document.createElement('span');
    newTagElement.className = 'tag';
    newTagElement.innerHTML = `
      ${newTag}
      <span class="remove-tag">×</span>
    `;
    tagsContainer.insertBefore(newTagElement, addTagBtn);

    const removeBtn = newTagElement.querySelector('.remove-tag');
    removeBtn.addEventListener('click', () => 
      this.handleRemoveTag(stock.groupName, stock, newTag, newTagElement));
  }
  // 保存数据
  setSavedData(savedData) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ savedData }, resolve);
    });
  }
}