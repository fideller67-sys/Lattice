import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import BoardPage from './pages/BoardPage';
import VerifyEmail from './pages/VerifyEmail';
import SetupWorkspace from './pages/SetupWorkspace';
import SetupProfile from './pages/SetupProfile';
import InviteTeammates from './pages/InviteTeammates';
import ConnectGithub from './pages/ConnectGithub';
import AuthCallback from './pages/AuthCallback';
import DeveloperLayout from './layouts/DeveloperLayout';
import Dashboard from './pages/common/Dashboard';
import Inbox from './pages/common/Inbox';
import MyTasks from './pages/common/MyTasks';
import PlatformEng from './pages/developer/PlatformEng';
import SprintBoard from './pages/developer/SprintBoard';
import QaAutomation from './pages/developer/QaAutomation';
import InfraOps from './pages/developer/InfraOps';
import DesignReview from './pages/developer/DesignReview';
import ReleaseTrain from './pages/developer/ReleaseTrain';
import ProjectDetails from './pages/developer/ProjectDetails';
import GenericChannel from './pages/common/GenericChannel';

// PM Role Imports
import ProductManagerLayout from './layouts/ProductManagerLayout';
import ProductDashboard from './pages/pm/ProductDashboard';
import ProductInbox from './pages/pm/ProductInbox';
import ProductTasks from './pages/pm/ProductTasks';
import ProductPlatformEng from './pages/pm/ProductPlatformEng';
import ProductSprintBoard from './pages/pm/ProductSprintBoard';
import ProductDesignReview from './pages/pm/ProductDesignReview';
import ProductInfraOps from './pages/pm/ProductInfraOps';
import ProductQaAutomation from './pages/pm/ProductQaAutomation';
import ProductReleaseTrain from './pages/pm/ProductReleaseTrain';

// Director Role Imports
import DirectorLayout from './layouts/DirectorLayout';
import DirectorDashboard from './pages/director/DirectorDashboard';
import DirectorInbox from './pages/director/DirectorInbox';
import DirectorTasks from './pages/director/DirectorTasks';
import DirectorPlatformEng from './pages/director/DirectorPlatformEng';
import DirectorSprintBoard from './pages/director/DirectorSprintBoard';
import DirectorDesignReview from './pages/director/DirectorDesignReview';
import DirectorInfraOps from './pages/director/DirectorInfraOps';
import DirectorQaAutomation from './pages/director/DirectorQaAutomation';
import DirectorReleaseTrain from './pages/director/DirectorReleaseTrain';
import DirectorWorkspaceAdmin from './pages/director/DirectorWorkspaceAdmin';
import DirectorAuditLogs from './pages/director/DirectorAuditLogs';

import ProtectedRoute from './components/ProtectedRoute';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#111116',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/board-demo" element={<BoardPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/setup-workspace" element={<SetupWorkspace />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
        <Route path="/invite-teammates" element={<InviteTeammates />} />
        <Route path="/connect-github" element={<ConnectGithub />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Developer Role Routes */}
        <Route element={<ProtectedRoute allowedRoles={['developer']} />}>
          <Route path="/developer" element={<DeveloperLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="tasks" element={<MyTasks />} />
            <Route path="board" element={<SprintBoard />} />
            <Route path="channel/platform-eng" element={<PlatformEng />} />
            <Route path="channel/design-review" element={<DesignReview />} />
            <Route path="channel/infra-ops" element={<InfraOps />} />
            <Route path="channel/qa-automation" element={<QaAutomation />} />
            <Route path="channel/release-train" element={<ReleaseTrain />} />
            <Route path="channel/:channelId" element={<GenericChannel />} />
            <Route path="project/:projectSlug" element={<ProjectDetails />} />
          </Route>
        </Route>

        <Route path="/board" element={<Navigate to="/developer/dashboard" replace />} />
        
        {/* Product Manager Role Routes */}
        <Route element={<ProtectedRoute allowedRoles={['pm']} />}>
          <Route path="/pm" element={<ProductManagerLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ProductDashboard />} />
            <Route path="inbox" element={<ProductInbox />} />
            <Route path="tasks" element={<ProductTasks />} />
            <Route path="channel/platform-eng" element={<ProductPlatformEng />} />
            <Route path="channel/sprint-14-board" element={<ProductSprintBoard />} />
            <Route path="channel/design-review" element={<ProductDesignReview />} />
            <Route path="channel/infra-ops" element={<ProductInfraOps />} />
            <Route path="channel/qa-automation" element={<ProductQaAutomation />} />
            <Route path="channel/release-train" element={<ProductReleaseTrain />} />
            <Route path="channel/:channelId" element={<GenericChannel />} />
            <Route path="project/:projectSlug" element={<ProjectDetails />} />
          </Route>
        </Route>

        {/* Director Role Routes */}
        <Route element={<ProtectedRoute allowedRoles={['director', 'admin']} />}>
          <Route path="/director" element={<DirectorLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DirectorDashboard />} />
            <Route path="inbox" element={<DirectorInbox />} />
            <Route path="tasks" element={<DirectorTasks />} />
            <Route path="channel/platform-eng" element={<DirectorPlatformEng />} />
            <Route path="channel/sprint-14-board" element={<DirectorSprintBoard />} />
            <Route path="channel/design-review" element={<DirectorDesignReview />} />
            <Route path="channel/infra-ops" element={<DirectorInfraOps />} />
            <Route path="channel/qa-automation" element={<DirectorQaAutomation />} />
            <Route path="channel/release-train" element={<DirectorReleaseTrain />} />
            <Route path="channel/:channelId" element={<GenericChannel />} />
            <Route path="project/:projectSlug" element={<ProjectDetails />} />
            <Route path="admin" element={<DirectorWorkspaceAdmin />} />
            <Route path="admin/audit-logs" element={<DirectorAuditLogs />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
