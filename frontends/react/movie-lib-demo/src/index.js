import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';


import App from './App'

// react18后已弃用，详情见https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis
// ReactDOM.render(<App />,document.getElementById('root'))

// 使用以下方式
const root = createRoot(document.getElementById('root')); 
root.render(<App />);