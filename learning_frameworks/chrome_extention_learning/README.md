# Title



好的！根据你的需求，我将帮你设计并引导你开发一个简单的Chrome插件Demo。这个插件的目标是从炒股网站中提取股票代码，并提供保存、分组和添加笔记的功能。相比安卓原生开发，Chrome插件的开发环境更简单，且无需处理复杂的权限问题，非常适合快速实现和验证概念。下面是详细的功能设计和开发步骤。

---

## 功能设计

### 目标
开发一个Chrome插件，能够在用户访问炒股网站时，自动识别页面中的股票代码，并允许用户保存、分组和添加笔记。

### 核心功能
1. **自动识别股票代码**
   - 当用户访问炒股网站时，插件扫描页面内容，提取股票代码。
   - 支持常见的股票代码格式，例如6位数字（如“600000”）。

2. **保存和分组**
   - 用户可以选择将识别到的股票代码保存到插件中。
   - 支持创建分组，用户可以将股票分配到不同分组（如“自选股”或“观察股”）。

3. **添加笔记**
   - 用户可以为每个股票代码添加自定义笔记，用于记录分析或提醒。

4. **用户界面**
   - **插件图标**：显示在浏览器工具栏，点击后弹出功能菜单。
   - **弹出菜单**：展示识别到的股票代码列表，提供保存、分组和笔记编辑功能。

### 辅助功能（可选）
- **搜索**：在保存的股票列表中搜索。
- **导出/导入**：将股票数据导出为JSON文件，或从文件导入。
- **设置**：允许用户指定启用插件的网站。

为了保持Demo的简单性，我们先专注于核心功能，辅助功能可以在后续扩展。

---

## 技术选型
- **前端**：使用HTML、CSS和JavaScript开发UI。
- **存储**：使用`chrome.storage` API保存股票数据。
- **DOM操作**：通过JavaScript扫描网页内容并提取股票代码。
- **通信**：插件不同部分（如内容脚本和弹出窗口）通过`chrome.runtime` API通信。

---

## 开发步骤

### 1. 准备开发环境
- **安装Chrome浏览器**：确保使用最新版本。
- **启用开发者模式**：
  1. 打开Chrome，点击右上角“三点菜单” > “更多工具” > “扩展程序”。
  2. 打开右上角的“开发者模式”开关。
- **学习基础**：如果你不熟悉Chrome插件开发，可以快速浏览[Chrome插件开发者文档](https://developer.chrome.com/docs/extensions/)，了解基本概念（如`manifest.json`、内容脚本等）。

### 2. 创建项目结构
创建一个文件夹（如“StockPluginDemo”），并包含以下文件：

```
StockPluginDemo/
├── manifest.json       # 插件配置文件
├── background.js       # 背景脚本
├── content.js          # 内容脚本，扫描网页
├── popup.html          # 弹出窗口UI
├── popup.js            # 弹出窗口逻辑
└── popup.css           # 弹出窗口样式
```

#### manifest.json
```json
{
  "manifest_version": 3,
  "name": "Stock Assistant",
  "version": "1.0",
  "description": "A Chrome extension to assist with stock websites.",
  "permissions": ["storage", "activeTab"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"], // 暂时匹配所有网站，后续可限定为炒股网站
      "js": ["content.js"]
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png" // 可选：准备一个16x16的图标文件
  }
}
```

### 3. 实现自动识别股票代码
在`content.js`中编写代码，扫描页面并提取股票代码，然后发送给背景脚本。

#### content.js
```javascript
// 扫描页面，提取6位数字的股票代码
function extractStockCodes() {
  const regex = /\b\d{6}\b/g; // 匹配6位数字
  const text = document.body.innerText;
  const matches = [...new Set(text.match(regex) || [])]; // 去重
  return matches;
}

// 当页面加载完成时，发送股票代码到背景脚本
window.addEventListener("load", () => {
  const codes = extractStockCodes();
  chrome.runtime.sendMessage({ action: "updateCodes", codes: codes });
});
```

### 4. 处理数据（背景脚本）
在`background.js`中接收内容脚本发送的股票代码，并存储数据。

#### background.js
```javascript
let currentCodes = []; // 当前页面识别的股票代码
let savedData = { groups: [] }; // 保存的分组和股票数据

// 监听内容脚本的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateCodes") {
    currentCodes = message.codes;
  }
});

// 初始化时加载保存的数据
chrome.storage.local.get("savedData", (result) => {
  if (result.savedData) {
    savedData = result.savedData;
  }
});
```

### 5. 实现弹出窗口UI
设计一个简单的弹出窗口，展示股票代码并提供交互功能。

#### popup.html
```html
<!DOCTYPE html>
<html>
<head>
  <title>Stock Assistant</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <h3>识别到的股票代码</h3>
  <ul id="codeList"></ul>
  <input type="text" id="groupName" placeholder="分组名称">
  <button id="saveBtn">保存到分组</button>
  <script src="popup.js"></script>
</body>
</html>
```

#### popup.css
```css
body {
  width: 300px;
  padding: 10px;
  font-family: Arial, sans-serif;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
input {
  width: 100%;
  margin: 10px 0;
}
button {
  width: 100%;
}
```

#### popup.js
```javascript
document.addEventListener("DOMContentLoaded", () => {
  const codeList = document.getElementById("codeList");
  const groupNameInput = document.getElementById("groupName");
  const saveBtn = document.getElementById("saveBtn");

  // 获取当前页面的股票代码
  chrome.runtime.sendMessage({ action: "getCodes" }, (response) => {
    const codes = response.codes || [];
    codes.forEach((code) => {
      const li = document.createElement("li");
      li.textContent = code;
      codeList.appendChild(li);
    });
  });

  // 保存到分组
  saveBtn.addEventListener("click", () => {
    const groupName = groupNameInput.value.trim();
    if (!groupName) {
      alert("请输入分组名称");
      return;
    }

    chrome.runtime.sendMessage({ action: "getCodes" }, (response) => {
      const codes = response.codes || [];
      chrome.storage.local.get("savedData", (result) => {
        let savedData = result.savedData || { groups: [] };
        const group = savedData.groups.find(g => g.name === groupName) || { name: groupName, stocks: [] };
        codes.forEach(code => {
          if (!group.stocks.some(s => s.code === code)) {
            group.stocks.push({ code, notes: "" });
          }
        });
        if (!savedData.groups.some(g => g.name === groupName)) {
          savedData.groups.push(group);
        }
        chrome.storage.local.set({ savedData }, () => {
          alert("保存成功！");
        });
      });
    });
  });
});

// 响应popup的请求
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCodes") {
    chrome.runtime.sendMessage({ action: "updateCodes" }); // 触发更新
    sendResponse({ codes: currentCodes });
  }
});
```

### 6. 测试插件
1. 打开Chrome，进入“扩展程序”页面。
2. 点击“加载已解压的扩展程序”，选择“StockPluginDemo”文件夹。
3. 访问一个包含股票代码的网页（或创建一个测试HTML页面），点击插件图标查看效果。

---

## 开发建议
1. **从简单开始**：先实现识别和展示功能，再逐步添加保存和分组。
2. **调试技巧**：
   - 使用Chrome开发者工具（F12）检查`popup.html`和`content.js`。
   - 在`background.js`中用`console.log`输出调试信息。
3. **扩展方向**：
   - 添加笔记编辑：在`popup.html`中为每个股票代码增加输入框。
   - 限定网站：在`manifest.json`的`matches`字段中指定炒股网站URL。

---

## 总结
这个Demo实现了一个简单的Chrome插件，能够从炒股网站提取股票代码并支持保存到分组。开发过程简单且直观，非常适合学习和验证概念。完成这个基础版本后，你可以根据需要添加更多功能（如笔记、搜索等）。祝你开发顺利，期待你的成果！如果有任何问题，随时告诉我！
