import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaLockOpen, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const LayerItem = ({ layer, onToggleVisibility, onToggleLock, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center gap-2 p-2 hover:bg-surface-dark rounded-lg group"
    >
      <button onClick={() => onToggleVisibility(layer.id)}>
        {layer.visible ? (
          <FaEye className="text-gray-400 hover:text-gray-200" />
        ) : (
          <FaEyeSlash className="text-gray-600 hover:text-gray-400" />
        )}
      </button>
      <button onClick={() => onToggleLock(layer.id)}>
        {layer.locked ? (
          <FaLock className="text-gray-400 hover:text-gray-200" />
        ) : (
          <FaLockOpen className="text-gray-600 hover:text-gray-400" />
        )}
      </button>
      <span className="flex-1 text-sm text-gray-300">{layer.name}</span>
      <button
        onClick={() => onDelete(layer.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500"
      >
        <FaTrash className="text-sm" />
      </button>
    </motion.div>
  );
};

const LayersPanel = () => {
  const [layers, setLayers] = useState([
    { id: 1, name: 'Ground', visible: true, locked: false },
    { id: 2, name: 'Props', visible: true, locked: false },
    { id: 3, name: 'Lights', visible: true, locked: true }
  ]);

  const toggleVisibility = (id) => {
    setLayers(layers.map(layer =>
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const toggleLock = (id) => {
    setLayers(layers.map(layer =>
      layer.id === id ? { ...layer, locked: !layer.locked } : layer
    ));
  };

  const deleteLayer = (id) => {
    setLayers(layers.filter(layer => layer.id !== id));
  };

  return (
    <div className="w-64 bg-background-dark border-l border-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-200">Layers</h2>
        <button className="px-2 py-1 text-xs bg-surface hover:bg-surface-dark rounded">
          + New Layer
        </button>
      </div>
      <div className="space-y-1">
        <AnimatePresence>
          {layers.map(layer => (
            <LayerItem
              key={layer.id}
              layer={layer}
              onToggleVisibility={toggleVisibility}
              onToggleLock={toggleLock}
              onDelete={deleteLayer}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LayersPanel;