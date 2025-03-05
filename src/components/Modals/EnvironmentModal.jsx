import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaCloud, FaImage } from 'react-icons/fa';

const EnvironmentModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('skybox');

  const skyboxes = [
    { id: 1, name: 'Sunny Day', icon: FaSun },
    { id: 2, name: 'Night Sky', icon: FaMoon },
    { id: 3, name: 'Cloudy', icon: FaCloud },
    { id: 4, name: 'Custom', icon: FaImage }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-background-dark w-[800px] rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-gray-200">Environment Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">×</button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-gray-200 mb-4">Skybox</h3>
              <div className="grid grid-cols-2 gap-4">
                {skyboxes.map(skybox => (
                  <motion.div
                    key={skybox.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-surface p-4 rounded-lg cursor-pointer hover:bg-surface-dark"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <skybox.icon className="text-3xl text-primary" />
                      <span className="text-sm text-gray-300">{skybox.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-200 mb-4">Environment Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Ambient Light</label>
                  <input type="range" className="w-full" />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Fog Density</label>
                  <input type="range" className="w-full" />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Bloom Intensity</label>
                  <input type="range" className="w-full" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="shadows" />
                  <label htmlFor="shadows" className="text-sm text-gray-400">Enable Shadows</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnvironmentModal;