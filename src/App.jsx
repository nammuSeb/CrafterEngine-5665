import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './components/Layout/TopBar';
import Sidebar from './components/Layout/Sidebar';
import ModesToolbar from './components/Layout/ModesToolbar';
import Viewport3D from './components/Viewport/Viewport3D';
import LayersPanel from './components/Layout/LayersPanel';
import IDEPanel from './components/IDE/IDEPanel';
import StatusBar from './components/Layout/StatusBar';
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
        <AnimatePresence>
          <LayersPanel />
          <IDEPanel />
        </AnimatePresence>
      </div>
      <StatusBar />
    </motion.div>
  );
}

export default App;