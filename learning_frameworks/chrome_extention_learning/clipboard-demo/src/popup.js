import StockList from './components/StockList/index.js';
import GroupList from './components/GroupList/index.js';
import SaveModal from './components/SaveModal/index.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log('Popup页面加载完成');
  
  // 初始化股票列表组件
  const stockListContainer = document.querySelector('.stock-list-section');
  const stockList = new StockList(stockListContainer);
  stockList.loadCodes();

  // 初始化分组列表组件
  const groupListContainer = document.querySelector('.group-list-section');
  console.log('GroupList组件初始化');
  const groupList = new GroupList(groupListContainer);
  groupList.loadGroups();
  // 初始化保存模态框
  const saveModal = new SaveModal();
  // 批量保存按钮事件处理
  const saveAllBtn = document.getElementById('saveAllBtn');
  saveAllBtn.addEventListener('click', () => {
    saveModal.show('batch');
  });
  // 为每个股票项添加单独保存按钮
  const addSaveButtonToStockItems = () => {
    const stockItems = document.querySelectorAll('#codeList li');
    stockItems.forEach(item => {
      const stockCode = item.querySelector('.stock-info').textContent.split(' - ')[0];
      const saveBtn = document.createElement('button');
      saveBtn.className = 'save-btn';
      saveBtn.textContent = '保存';
      saveBtn.addEventListener('click', () => {
        saveModal.show('single', stockCode);
      });
      item.appendChild(saveBtn);
    });
  };
  // 监听股票列表更新
  const observer = new MutationObserver(() => {
    addSaveButtonToStockItems();
  });
  observer.observe(document.getElementById('codeList'), {
    childList: true,
    subtree: true
  });
});
