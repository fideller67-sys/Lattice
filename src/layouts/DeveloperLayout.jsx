import React from 'react';
import { Outlet } from 'react-router-dom';
import DeveloperSidebar from '../components/DeveloperSidebar';

export default function DeveloperLayout() {
  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-sans selection:bg-blue-500/30 overflow-hidden">
      <DeveloperSidebar />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
