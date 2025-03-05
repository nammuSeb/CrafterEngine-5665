import React from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaStreetView, FaVideo } from 'react-icons/fa';

const CameraModal = ({ onClose }) => {
  const cameraTypes = [
    {
      icon: FaCamera,
      name: 'Arc Rotate Camera',
      description: 'Orbits around a target point'
    },
    {
      icon: FaStreetView,
      name: 'Free Camera',
      description: 'First-person perspective camera'
    },
    {
      icon: FaVideo,
      name: 'Follow Camera',
      description: 'Follows a target object'
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
          <h2 className="text-lg font-semibold text-gray-200">Add Camera</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">×</button>
        </div>

        <div className="p-4">
          <div className="grid gap-4">
            {cameraTypes.map(camera => (
              <motion.div
                key={camera.name}
                whileHover={{ scale: 1.02 }}
                className="bg-surface p-4 rounded-lg cursor-pointer hover:bg-surface-dark"
              >
                <div className="flex items-center gap-4">
                  <camera.icon className="text-2xl text-primary" />
                  <div>
                    <h3 className="text-gray-200">{camera.name}</h3>
                    <p className="text-sm text-gray-400">{camera.description}</p>
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

export default CameraModal;