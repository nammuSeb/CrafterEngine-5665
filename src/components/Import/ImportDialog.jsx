import React from 'react';
import { FaFile, FaFileImport, FaFolder } from 'react-icons/fa';

const ImportDialog = ({ onClose }) => {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file import
      console.log('Importing file:', file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface w-[500px] rounded-lg shadow-xl">
        <div className="border-b border-gray-700 p-4">
          <h2 className="text-lg font-semibold text-gray-200">Import 3D Model</h2>
        </div>
        
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".fbx,.obj,.gltf"
              className="hidden"
              id="model-upload"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="model-upload"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <FaFileImport className="text-4xl text-gray-400" />
              <span className="text-gray-300">
                Drop your 3D model here or click to browse
              </span>
              <span className="text-sm text-gray-500">
                Supported formats: .fbx, .obj, .gltf
              </span>
            </label>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Import Options</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-400">Import materials</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-400">Import textures</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 p-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-200"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark rounded text-white">
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportDialog;