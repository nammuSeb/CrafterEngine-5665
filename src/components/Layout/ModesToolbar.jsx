import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { FaCube, FaPaintBrush, FaLandmark, FaTree, FaMagic } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ToolButton = ({ icon: Icon, label, active = false, onClick }) => (
  <Tooltip content={`${label} Mode`}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant={active ? "secondary" : "ghost"}
        className="flex items-center gap-2 px-4 py-2"
        onClick={onClick}
      >
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </Button>
    </motion.div>
  </Tooltip>
);

const ModesToolbar = () => {
  const [activeMode, setActiveMode] = React.useState('Select');

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg shadow-lg p-2 z-20">
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