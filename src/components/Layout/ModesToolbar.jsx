import React from 'react';
import { FaCube, FaPaintBrush, FaLandmark, FaTree, FaMagic } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ToolButton = ({ icon: Icon, label, active = false, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
      active ? 'bg-primary text-white' : 'hover:bg-surface-dark text-gray-400'
    }`}
  >
    <Icon className="text-lg" />
    <span className="text-sm">{label}</span>
  </motion.button>
);

const ModesToolbar = () => {
  const [activeMode, setActiveMode] = React.useState('Select');

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-background-dark rounded-b-lg shadow-lg p-2 z-20">
      <div className="flex items-center gap-2">
        <ToolButton
          icon={FaCube}
          label="Select"
          active={activeMode === 'Select'}
          onClick={() => setActiveMode('Select')}
        />
        <ToolButton
          icon={FaPaintBrush}
          label="Paint"
          active={activeMode === 'Paint'}
          onClick={() => setActiveMode('Paint')}
        />
        <ToolButton
          icon={FaLandmark}
          label="Landscape"
          active={activeMode === 'Landscape'}
          onClick={() => setActiveMode('Landscape')}
        />
        <ToolButton
          icon={FaTree}
          label="Foliage"
          active={activeMode === 'Foliage'}
          onClick={() => setActiveMode('Foliage')}
        />
        <ToolButton
          icon={FaMagic}
          label="Effects"
          active={activeMode === 'Effects'}
          onClick={() => setActiveMode('Effects')}
        />
      </div>
    </div>
  );
};

export default ModesToolbar;