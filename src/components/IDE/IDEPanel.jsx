import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from './CodeEditor';
import GamePreview from './GamePreview';
import { FaCode, FaGamepad } from 'react-icons/fa';

const IDEPanel = () => {
  const [activeTab, setActiveTab] = useState('code');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute bottom-0 left-0 right-0 h-[40vh] bg-background-dark border-t border-gray-800"
    >
      <div className="flex items-center gap-2 p-1 bg-surface">
        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            activeTab === 'code' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-surface-dark'
          }`}
        >
          <FaCode />
          <span>Code</span>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            activeTab === 'preview' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-surface-dark'
          }`}
        >
          <FaGamepad />
          <span>Preview</span>
        </button>
      </div>
      
      <div className="h-[calc(40vh-40px)]">
        {activeTab === 'code' ? <CodeEditor /> : <GamePreview />}
      </div>
    </motion.div>
  );
};

export default IDEPanel;