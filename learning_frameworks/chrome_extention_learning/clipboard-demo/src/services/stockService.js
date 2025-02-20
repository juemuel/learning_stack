// 股票数据服务
export default class StockService {
  constructor() {
    this.stockCache = new Map();
  }

  // 获取股票信息
  async getStockInfo(code) {
    // 检查缓存
    if (this.stockCache.has(code)) {
      return this.stockCache.get(code);
    }

    try {
      // 格式化股票代码（添加市场前缀）
      const formattedCode = this.formatStockCode(code);
      
      // 使用腾讯股票API
      const response = await fetch(`https://qt.gtimg.cn/q=${formattedCode}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`获取股票数据失败: ${response.status} ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      const text = new TextDecoder('gbk').decode(buffer);
      console.log(text)
      if (!text || text.includes('v_pv_none_match')) {
        throw new Error('获取股票数据失败：未找到股票信息');
      }
      
      // 解析返回数据
      const stockInfo = this.parseStockData(text, code);
      
      // 存入缓存
      this.stockCache.set(code, stockInfo);
      
      return stockInfo;
    } catch (error) {
      console.error('获取股票信息失败:', error);
      return {
        code,
        name: code,
        price: 0,
        change: 0,
        changePercent: '0.00',
        error: true,
        errorMessage: error.message || '获取股票数据失败'
      };
    }
  }

  // 格式化股票代码
  formatStockCode(code) {
    // 移除可能存在的市场前缀
    const pureCode = code.replace(/^(sh|sz)/, '');
    
    // 根据编号规则判断市场
    if (pureCode.startsWith('6')) {
      return `sh${pureCode}`;
    } else if (pureCode.startsWith('0') || pureCode.startsWith('3')) {
      return `sz${pureCode}`;
    }
    return pureCode;
  }

  // 解析股票数据
  parseStockData(responseText, originalCode) {
    try {
      // 腾讯接口返回格式：v_sh600000="1~浦发银行~600000~...~"
      const match = responseText.match(/="([^"]+)"/)?.[1];
      if (!match) {
        throw new Error('无效的响应数据');
      }

      const data = match.split('~');
      if (data.length < 4) {
        throw new Error('响应数据格式错误');
      }

      const price = parseFloat(data[3]) || 0;
      const prevClose = parseFloat(data[4]) || price;
      const change = price - prevClose;
      const changePercent = prevClose ? (change / prevClose * 100).toFixed(2) : '0.00';

      return {
        code: originalCode,
        name: data[1] || originalCode,
        price,
        change,
        changePercent
      };
    } catch (error) {
      console.error('解析股票数据失败:', error);
      return {
        code: originalCode,
        name: originalCode,
        price: 0,
        change: 0,
        changePercent: '0.00',
        error: true,
        errorMessage: error.message || '解析股票数据失败'
      };
    }
  }

  // 批量获取股票信息
  async batchGetStockInfo(codes) {
    return Promise.all(codes.map(code => this.getStockInfo(code)));
  }
}