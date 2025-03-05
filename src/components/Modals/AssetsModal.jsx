import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFolder, FaCube, FaSearch, FaPlus } from 'react-icons/fa';

const AssetsModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('models');

  const assets = {
    models: [
      { id: 1, name: 'Cube', type: 'primitive' },
      { id: 2, name: 'Sphere', type: 'primitive' },
      { id: 3, name: 'Cylinder', type: 'primitive' },
      { id: 4, name: 'Character.fbx', type: 'model' },
      { id: 5, name: 'Tree.gltf', type: 'model' },
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-background-dark w-[800px] rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-gray-200">Assets Library</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">×</button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search assets..."
                className="w-full bg-surface pl-10 pr-4 py-2 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white">
              <FaPlus />
              <span>Import</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {assets.models.map(asset => (
              <motion.div
                key={asset.id}
                whileHover={{ scale: 1.05 }}
                className="bg-surface p-4 rounded-lg cursor-pointer hover:bg-surface-dark"
              >
                <div className="aspect-square bg-background rounded flex items-center justify-center mb-2">
                  <FaCube className="text-4xl text-gray-400" />
                </div>
                <div className="text-sm text-gray-300 truncate">{asset.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AssetsModal;