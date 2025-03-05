import React from 'react';
import { FaPalette, FaImage, FaAdjust, FaCube } from 'react-icons/fa';

const MaterialEditor = () => {
  return (
    <div className="absolute right-0 top-0 w-80 h-full bg-surface border-l border-gray-700 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-200">Material Editor</h2>
      
      <div className="space-y-4">
        <div className="bg-background-dark rounded-lg p-3">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Base Properties</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Albedo</span>
              <div className="flex items-center gap-2">
                <input type="color" className="w-8 h-8 rounded cursor-pointer" />
                <button className="p-1.5 hover:bg-surface-dark rounded">
                  <FaImage className="text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Metallic</span>
              <input type="range" className="w-32" min="0" max="1" step="0.1" />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Roughness</span>
              <input type="range" className="w-32" min="0" max="1" step="0.1" />
            </div>
          </div>
        </div>

        <div className="bg-background-dark rounded-lg p-3">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Maps</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-2 hover:bg-surface-dark rounded">
              <span className="text-sm text-gray-400">Normal Map</span>
              <FaImage className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-2 hover:bg-surface-dark rounded">
              <span className="text-sm text-gray-400">AO Map</span>
              <FaImage className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialEditor;