import  React from 'react';

import App from './App';
import { createRoot } from 'react-dom/client';
import { ContextProvider } from './SocketContext';
import  './styles.css';

// ReactDOM 在 react18后已弃用，详情见https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis
// import ReactDOM from 'react-dom'
// ReactDOM.render(<App />,document.getElementById('root'))
const root = createRoot(document.getElementById('root')); 
root.render(
    <React.StrictMode> 
        <ContextProvider>
            <App />
        </ContextProvider> 
    </React.StrictMode>
);