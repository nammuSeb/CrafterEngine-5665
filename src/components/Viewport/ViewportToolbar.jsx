import React from 'react';
import { FaCamera, FaExpand, FaCompress, FaEye, FaCube, FaPalette } from 'react-icons/fa';
import { MdGridOn } from 'react-icons/md';

const ViewportButton = ({ icon: Icon, onClick, active }) => (
  <button 
    className={`p-1.5 hover:bg-surface rounded-lg ${active ? 'bg-surface' : ''}`}
    onClick={onClick}
  >
    <Icon className={`text-sm ${active ? 'text-primary' : 'text-gray-400'}`} />
  </button>
);

const ViewportToolbar = ({ onToggleMaterialEditor }) => {
  return (
    <div className="absolute top-2 right-2 bg-background-dark rounded-lg shadow-lg z-10">
      <div className="flex items-center gap-1 p-1">
        <ViewportButton icon={FaCamera} />
        <ViewportButton icon={FaCube} />
        <ViewportButton icon={MdGridOn} />
        <ViewportButton icon={FaEye} />
        <ViewportButton icon={FaPalette} onClick={onToggleMaterialEditor} />
        <ViewportButton icon={FaExpand} />
      </div>
    </div>
  );
};

export default ViewportToolbar;