import React from 'react';
import { Outlet } from 'react-router-dom';
import DirectorSidebar from '../components/DirectorSidebar';

export default function DirectorLayout() {
  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden text-gray-200">
      <DirectorSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
