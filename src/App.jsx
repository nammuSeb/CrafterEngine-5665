import React from 'react';
import { motion } from 'framer-motion';
import TopBar from './components/Layout/TopBar';
import Sidebar from './components/Layout/Sidebar';
import ModesToolbar from './components/Layout/ModesToolbar';
import Viewport3D from './components/Viewport/Viewport3D';
import LayersPanel from './components/Layout/LayersPanel';
import IDEPanel from './components/IDE/IDEPanel';
import './App.css';

function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="app-container"
    >
      <TopBar />
      <div className="main-content">
        <ModesToolbar />
        <Sidebar />
        <main className="viewport">
          <Viewport3D />
        </main>
        <LayersPanel />
        <IDEPanel />
      </div>
      <div className="status-bar">
        <div className="status-item">Ready</div>
        <div className="status-item">FPS: 60</div>
        <div className="status-item">Memory: 124MB</div>
      </div>
    </motion.div>
  );
}

export default App;