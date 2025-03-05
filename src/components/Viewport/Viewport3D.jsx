import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ViewportToolbar from './ViewportToolbar';
import BabylonScene from './BabylonScene';
import MaterialEditor from '../Materials/MaterialEditor';
import ImportDialog from '../Import/ImportDialog';
import { FaFileImport } from 'react-icons/fa';

const Viewport3D = () => {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showMaterialEditor, setShowMaterialEditor] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full bg-background-dark rounded-lg shadow-lg relative"
    >
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/30 to-transparent p-4 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-200 font-semibold text-sm">Perspective</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowImportDialog(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg hover:bg-surface-dark"
            >
              <FaFileImport className="text-gray-400" />
              <span className="text-sm text-gray-300">Import</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>FPS: 60</span>
              <span>|</span>
              <span>Draw Calls: 157</span>
            </div>
          </div>
        </div>
      </div>

      <ViewportToolbar onToggleMaterialEditor={() => setShowMaterialEditor(!showMaterialEditor)} />
      
      <div className="w-full h-[calc(100vh-12rem)]">
        <BabylonScene />
      </div>

      {showMaterialEditor && <MaterialEditor />}
      {showImportDialog && <ImportDialog onClose={() => setShowImportDialog(false)} />}
    </motion.div>
  );
};

export default Viewport3D;