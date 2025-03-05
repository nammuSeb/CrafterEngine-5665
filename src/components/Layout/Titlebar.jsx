import React from 'react';
import { FaWindowMinimize, FaWindowMaximize, FaTimes } from 'react-icons/fa';

const Titlebar = () => {
  return (
    <div className="h-8 bg-background-dark flex items-center justify-between px-2 drag-handle select-none">
      <div className="flex items-center gap-2 px-2">
        <img src="/favicon.png" alt="logo" className="w-4 h-4" />
        <span className="text-xs text-gray-400">CrafterEngine</span>
      </div>
      <div className="flex items-center">
        <button className="px-3 py-1 hover:bg-surface-dark text-gray-400 hover:text-gray-200">
          <FaWindowMinimize className="text-xs" />
        </button>
        <button className="px-3 py-1 hover:bg-surface-dark text-gray-400 hover:text-gray-200">
          <FaWindowMaximize className="text-xs" />
        </button>
        <button className="px-3 py-1 hover:bg-red-500 text-gray-400 hover:text-white">
          <FaTimes className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default Titlebar;