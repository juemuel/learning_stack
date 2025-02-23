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
});
