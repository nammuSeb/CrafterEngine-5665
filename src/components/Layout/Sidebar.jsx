import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLayerGroup, FaPalette, FaLightbulb, FaCamera, FaMountain, FaPlus } from 'react-icons/fa';
import AssetsModal from '../Modals/AssetsModal';
import LightsModal from '../Modals/LightsModal';
import CameraModal from '../Modals/CameraModal';
import EnvironmentModal from '../Modals/EnvironmentModal';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => {
    setActiveModal(type);
    setActiveItem(type);
  };

  return (
    <>
      <div className="w-64 bg-background-dark border-r border-gray-800 p-4 flex flex-col h-full">
        <div className="mb-4">
          <button 
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white"
            onClick={() => openModal('Assets')}
          >
            <FaPlus />
            <span>Add Asset</span>
          </button>
        </div>

        <nav className="space-y-1 flex-1">
          <SidebarItem 
            icon={FaLayerGroup} 
            label="Assets" 
            active={activeItem === 'Assets'}
            onClick={() => openModal('Assets')}
          />
          <SidebarItem 
            icon={FaLightbulb} 
            label="Lighting" 
            active={activeItem === 'Lighting'}
            onClick={() => openModal('Lighting')}
          />
          <SidebarItem 
            icon={FaCamera} 
            label="Cameras" 
            active={activeItem === 'Cameras'}
            onClick={() => openModal('Cameras')}
          />
          <SidebarItem 
            icon={FaMountain} 
            label="Environment" 
            active={activeItem === 'Environment'}
            onClick={() => openModal('Environment')}
          />
        </nav>
      </div>

      {activeModal === 'Assets' && <AssetsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'Lighting' && <LightsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'Cameras' && <CameraModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'Environment' && <EnvironmentModal onClose={() => setActiveModal(null)} />}
    </>
  );
};

export default Sidebar;