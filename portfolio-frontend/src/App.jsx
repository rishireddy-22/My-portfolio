import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';

// Admin imports
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import Dashboard from './admin/pages/Dashboard';
import ProfileManager from './admin/pages/ProfileManager';
import EducationManager from './admin/pages/EducationManager';
import SkillsManager from './admin/pages/SkillsManager';
import ProjectsManager from './admin/pages/ProjectsManager';
import ResumeManager from './admin/pages/ResumeManager';
import MessagesManager from './admin/pages/MessagesManager';
import SettingsManager from './admin/pages/SettingsManager';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<Home />} />

          {/* Admin Authentication Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Secure Admin Control Panel */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<ProfileManager />} />
            <Route path="education" element={<EducationManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="resume" element={<ResumeManager />} />
            <Route path="messages" element={<MessagesManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>

          {/* Catch-all fallback to public home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
