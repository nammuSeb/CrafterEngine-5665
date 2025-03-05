import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaSun, FaRegLightbulb } from 'react-icons/fa';

const LightsModal = ({ onClose }) => {
  const lightTypes = [
    { 
      icon: FaLightbulb,
      name: 'Point Light',
      description: 'Emits light in all directions from a single point'
    },
    {
      icon: FaSun,
      name: 'Directional Light',
      description: 'Parallel rays of light, like sunlight'
    },
    {
      icon: FaRegLightbulb,
      name: 'Spot Light',
      description: 'Cone of light from a single point'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-background-dark w-[600px] rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-gray-200">Add Light</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">×</button>
        </div>

        <div className="p-4">
          <div className="grid gap-4">
            {lightTypes.map(light => (
              <motion.div
                key={light.name}
                whileHover={{ scale: 1.02 }}
                className="bg-surface p-4 rounded-lg cursor-pointer hover:bg-surface-dark"
              >
                <div className="flex items-center gap-4">
                  <light.icon className="text-2xl text-primary" />
                  <div>
                    <h3 className="text-gray-200">{light.name}</h3>
                    <p className="text-sm text-gray-400">{light.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LightsModal;