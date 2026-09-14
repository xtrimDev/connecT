import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { CommunicationPage } from './pages/CommunicationPage';
import { ChannelDetailsPage } from './pages/ChannelDetailsPage';
import { GroupDetailsPage } from './pages/GroupDetailsPage';
import { TasksPage } from './pages/TasksPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { EventsPage } from './pages/EventsPage';
import { GitHubPage } from './pages/GitHubPage';
import { AIPage } from './pages/AIPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
            <Route path="/communication" element={<CommunicationPage />} />
            <Route path="/channels/:channelId" element={<ChannelDetailsPage />} />
            <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/github" element={<GitHubPage />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AppLayout>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
