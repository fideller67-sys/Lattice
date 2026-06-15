import React from 'react';
import { Outlet } from 'react-router-dom';
import ProductManagerSidebar from '../components/ProductManagerSidebar';

export default function ProductManagerLayout() {
  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-sans selection:bg-blue-500/30 overflow-hidden">
      <ProductManagerSidebar />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
