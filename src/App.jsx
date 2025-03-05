import React from 'react';
import { motion } from 'framer-motion';
import TopBar from './components/Layout/TopBar';
import Sidebar from './components/Layout/Sidebar';
import ModesToolbar from './components/Layout/ModesToolbar';
import Viewport3D from './components/Viewport/Viewport3D';
import LayersPanel from './components/Layout/LayersPanel';
import IDEPanel from './components/IDE/IDEPanel';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen bg-background text-gray-100 flex flex-col overflow-hidden"
    >
      <TopBar />
      <div className="flex flex-1 relative">
        <ModesToolbar />
        <Sidebar />
        <main className="flex-1">
          <Viewport3D />
        </main>
        <LayersPanel />
        <IDEPanel />
      </div>
    </motion.div>
  );
}

export default App;