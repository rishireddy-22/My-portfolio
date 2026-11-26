import axios from 'axios';
import {
  mockProfile,
  mockEducation,
  mockSkills,
  mockProjects,
  mockResume
} from '../../services/mockData';

const hasCustomBackend = Boolean(import.meta.env.VITE_API_URL);
const isLocalhost = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Pure client mode on Netlify / production without backend
const isPureClientMode = !hasCustomBackend && !isLocalhost;

const API_BASE_URL = import.meta.env.VITE_API_URL || (isLocalhost ? 'http://localhost:8080/api' : '/api');
const TOKEN_KEY = 'portfolio_admin_token';
const EXPIRY_KEY = 'portfolio_admin_token_expiry';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: isLocalhost ? 2000 : 4000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor for 401 auto logout (only if not mock token)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const isMock = token && token.startsWith('mock_jwt_token_');
    if (error.response && error.response.status === 401 && !isMock) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EXPIRY_KEY);
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

/* ===================================================================
   LOCAL STORAGE DATA HELPERS (Ensures Admin works 100% standalone)
   =================================================================== */

const getStored = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStored = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn(`Could not save ${key} to localStorage:`, e);
  }
};

// Activity logger helper
const logActivity = (action, entity) => {
  const logs = getStored('portfolio_activities', [
    { id: 1, action: 'Initial portfolio system setup', entity: 'System', createdAt: new Date(Date.now() - 86400000).toISOString() }
  ]);
  const newLog = {
    id: Date.now(),
    action,
    entity,
    createdAt: new Date().toISOString()
  };
  setStored('portfolio_activities', [newLog, ...logs].slice(0, 25));
};

/* ================= AUTH API ================= */

export const login = async (username, password) => {
  if (isPureClientMode) {
    const savedAdmin = getStored('portfolio_admin_creds', { username: 'admin', password: 'admin123' });
    if (username === savedAdmin.username && password === savedAdmin.password) {
      const mockToken = 'mock_jwt_token_' + Date.now();
      const expiresAt = Date.now() + 8 * 60 * 60 * 1000;
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(EXPIRY_KEY, expiresAt.toString());
      logActivity('Admin logged in', 'Security');
      return { success: true, token: mockToken };
    }
    throw new Error('Invalid username or password. Default is admin / admin123');
  }

  try {
    const res = await apiClient.post('/auth/login', { username, password });
    const { token } = res.data;
    const expiresAt = Date.now() + 8 * 60 * 60 * 1000; // 8 hours
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRY_KEY, expiresAt.toString());
    logActivity('Admin logged in', 'Security');
    return { success: true, token };
  } catch (err) {
    const savedAdmin = getStored('portfolio_admin_creds', { username: 'admin', password: 'admin123' });
    if (username === savedAdmin.username && password === savedAdmin.password) {
      const mockToken = 'mock_jwt_token_' + Date.now();
      const expiresAt = Date.now() + 8 * 60 * 60 * 1000;
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(EXPIRY_KEY, expiresAt.toString());
      logActivity('Admin logged in (standalone)', 'Security');
      return { success: true, token: mockToken };
    }
    throw new Error('Invalid username or password. Default is admin / admin123');
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
  logActivity('Admin logged out', 'Security');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);
  if (!token || !expiry) return false;
  if (Date.now() > parseInt(expiry, 10)) {
    logout();
    return false;
  }
  return true;
};

export const changePassword = async (oldPassword, newPassword) => {
  const savedAdmin = getStored('portfolio_admin_creds', { username: 'admin', password: 'admin123' });
  if (savedAdmin.password !== oldPassword) {
    throw new Error('Current password does not match.');
  }
  setStored('portfolio_admin_creds', { ...savedAdmin, password: newPassword });
  logActivity('Admin password changed', 'Security');

  if (!isPureClientMode) {
    try {
      await apiClient.post('/admin/change-password', { oldPassword, newPassword });
    } catch (e) {}
  }
  return { success: true, message: 'Password updated successfully!' };
};

/* ================= PROFILE API ================= */

export const getAdminProfile = async () => {
  if (isPureClientMode) {
    return getStored('portfolio_profile', mockProfile);
  }
  try {
    const res = await apiClient.get('/admin/profile');
    return res.data;
  } catch (err) {
    return getStored('portfolio_profile', mockProfile);
  }
};

export const updateProfile = async (profileData) => {
  setStored('portfolio_profile', profileData);
  logActivity('Profile information updated', 'Profile');

  if (!isPureClientMode) {
    try {
      const res = await apiClient.put('/admin/profile', profileData);
      return res.data;
    } catch (err) {}
  }
  return profileData;
};

/* ================= EDUCATION API ================= */

export const getAdminEducation = async () => {
  if (isPureClientMode) {
    return getStored('portfolio_education', mockEducation);
  }
  try {
    const res = await apiClient.get('/admin/education');
    return Array.isArray(res.data) && res.data.length > 0 ? res.data : getStored('portfolio_education', mockEducation);
  } catch (err) {
    return getStored('portfolio_education', mockEducation);
  }
};

export const saveEducation = async (eduData) => {
  const isEdit = Boolean(eduData.id);
  const list = getStored('portfolio_education', mockEducation);
  let updated;
  let savedItem;

  if (isEdit) {
    updated = list.map((item) => (item.id === eduData.id ? { ...item, ...eduData } : item));
    savedItem = eduData;
  } else {
    savedItem = { ...eduData, id: Date.now() };
    updated = [savedItem, ...list];
  }

  setStored('portfolio_education', updated);
  logActivity(`${isEdit ? 'Updated' : 'Added'} education: ${eduData.degree}`, 'Education');

  if (!isPureClientMode) {
    try {
      const res = isEdit
        ? await apiClient.put(`/admin/education/${eduData.id}`, eduData)
        : await apiClient.post('/admin/education', eduData);
      return res.data;
    } catch (err) {}
  }

  return savedItem;
};

export const deleteEducation = async (id) => {
  const list = getStored('portfolio_education', mockEducation);
  const updated = list.filter((item) => item.id !== id);
  setStored('portfolio_education', updated);
  logActivity(`Deleted education entry #${id}`, 'Education');

  if (!isPureClientMode) {
    try {
      await apiClient.delete(`/admin/education/${id}`);
    } catch (err) {}
  }
};

export const reorderEducation = async (newList) => {
  setStored('portfolio_education', newList);
  if (!isPureClientMode) {
    try {
      await apiClient.put('/admin/education/reorder', newList);
    } catch (e) {}
  }
};

/* ================= SKILLS API ================= */

export const getAdminSkills = async () => {
  if (isPureClientMode) {
    return getStored('portfolio_skills', mockSkills);
  }
  try {
    const res = await apiClient.get('/admin/skills');
    return Array.isArray(res.data) && res.data.length > 0 ? res.data : getStored('portfolio_skills', mockSkills);
  } catch (err) {
    return getStored('portfolio_skills', mockSkills);
  }
};

export const saveSkill = async (skillData) => {
  const isEdit = Boolean(skillData.id);
  const categories = getStored('portfolio_skills', mockSkills);

  let found = false;
  const updatedCategories = categories.map((cat) => {
    if (cat.category === skillData.category) {
      let catSkills = cat.skills || [];
      if (isEdit) {
        catSkills = catSkills.map((s) => (s.id === skillData.id ? { ...s, ...skillData } : s));
      } else {
        catSkills = [...catSkills, { ...skillData, id: Date.now() }];
      }
      found = true;
      return { ...cat, skills: catSkills };
    } else if (isEdit) {
      return { ...cat, skills: (cat.skills || []).filter((s) => s.id !== skillData.id) };
    }
    return cat;
  });

  if (!found) {
    updatedCategories.push({
      category: skillData.category,
      skills: [{ ...skillData, id: Date.now() }]
    });
  }

  setStored('portfolio_skills', updatedCategories);
  logActivity(`${isEdit ? 'Updated' : 'Added'} skill: ${skillData.name}`, 'Skills');

  if (!isPureClientMode) {
    try {
      const res = isEdit
        ? await apiClient.put(`/admin/skills/${skillData.id}`, skillData)
        : await apiClient.post('/admin/skills', skillData);
      return res.data;
    } catch (e) {}
  }

  return skillData;
};

export const deleteSkill = async (id) => {
  const categories = getStored('portfolio_skills', mockSkills);
  const updated = categories.map((cat) => ({
    ...cat,
    skills: (cat.skills || []).filter((s) => s.id !== id)
  })).filter((cat) => cat.skills.length > 0);

  setStored('portfolio_skills', updated);
  logActivity(`Deleted skill #${id}`, 'Skills');

  if (!isPureClientMode) {
    try {
      await apiClient.delete(`/admin/skills/${id}`);
    } catch (e) {}
  }
};

/* ================= PROJECTS API ================= */

export const getAdminProjects = async () => {
  if (isPureClientMode) {
    return getStored('portfolio_projects', mockProjects);
  }
  try {
    const res = await apiClient.get('/admin/projects');
    return Array.isArray(res.data) && res.data.length > 0 ? res.data : getStored('portfolio_projects', mockProjects);
  } catch (err) {
    return getStored('portfolio_projects', mockProjects);
  }
};

export const saveProject = async (projectData) => {
  const isEdit = Boolean(projectData.id);
  const list = getStored('portfolio_projects', mockProjects);
  let updated;
  let savedProj;

  if (isEdit) {
    updated = list.map((item) => (item.id === projectData.id ? { ...item, ...projectData } : item));
    savedProj = projectData;
  } else {
    savedProj = {
      ...projectData,
      id: Date.now(),
      published: projectData.published ?? true,
      featured: projectData.featured ?? false,
      createdAt: new Date().toISOString()
    };
    updated = [savedProj, ...list];
  }

  setStored('portfolio_projects', updated);
  logActivity(`${isEdit ? 'Updated' : 'Added'} project: ${projectData.title}`, 'Projects');

  if (!isPureClientMode) {
    try {
      const res = isEdit
        ? await apiClient.put(`/admin/projects/${projectData.id}`, projectData)
        : await apiClient.post('/admin/projects', projectData);
      return res.data;
    } catch (err) {}
  }

  return savedProj;
};

export const deleteProject = async (id) => {
  const list = getStored('portfolio_projects', mockProjects);
  const updated = list.filter((p) => p.id !== id);
  setStored('portfolio_projects', updated);
  logActivity(`Deleted project #${id}`, 'Projects');

  if (!isPureClientMode) {
    try {
      await apiClient.delete(`/admin/projects/${id}`);
    } catch (err) {}
  }
};

export const toggleProjectPublish = async (id) => {
  const list = getStored('portfolio_projects', mockProjects);
  const updated = list.map((p) => (p.id === id ? { ...p, published: !p.published } : p));
  setStored('portfolio_projects', updated);
  logActivity(`Toggled publish status for project #${id}`, 'Projects');

  if (!isPureClientMode) {
    try {
      await apiClient.patch(`/admin/projects/${id}/publish`);
    } catch (e) {}
  }
  return updated.find((p) => p.id === id);
};

/* ================= RESUME API ================= */

export const getAdminResume = async () => {
  if (isPureClientMode) {
    const active = getStored('portfolio_resume', mockResume);
    const history = getStored('portfolio_resume_history', [
      { id: 1, fileName: 'Rishi_Swar_Resume.pdf', fileUrl: '/resume.pdf', uploadedAt: '2026-11-26T18:29:00Z', active: true }
    ]);
    return { active, history };
  }
  try {
    const res = await apiClient.get('/admin/resume');
    return res.data;
  } catch (err) {
    const active = getStored('portfolio_resume', mockResume);
    const history = getStored('portfolio_resume_history', [
      { id: 1, fileName: 'Rishi_Swar_Resume.pdf', fileUrl: '/resume.pdf', uploadedAt: '2026-11-26T18:29:00Z', active: true }
    ]);
    return { active, history };
  }
};

export const uploadResumeFile = async (file) => {
  if (file.type !== 'application/pdf') {
    throw new Error('Only PDF files are supported for resume uploads.');
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Resume file size cannot exceed 5 MB.');
  }

  // Convert to persistent Base64 Data URL so it does not expire like blob URLs
  const fileUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });

  const newResume = {
    id: Date.now(),
    fileName: file.name,
    fileUrl,
    uploadedAt: new Date().toISOString(),
    active: true
  };

  const history = getStored('portfolio_resume_history', [
    { id: 1, fileName: 'Rishi_Swar_Resume.pdf', fileUrl: '/resume.pdf', uploadedAt: '2026-11-26T18:29:00Z', active: false }
  ]).map((r) => ({ ...r, active: false }));

  const updatedHistory = [newResume, ...history];
  setStored('portfolio_resume_history', updatedHistory);
  setStored('portfolio_resume', {
    fileUrl,
    updatedAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  });

  logActivity(`Uploaded new resume: ${file.name}`, 'Resume');

  if (!isPureClientMode) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await apiClient.post('/admin/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } catch (e) {}
  }

  return newResume;
};

export const activateResume = async (id) => {
  const history = getStored('portfolio_resume_history', []).map((r) => ({
    ...r,
    active: r.id === id
  }));
  const activeItem = history.find((r) => r.id === id);
  if (activeItem) {
    setStored('portfolio_resume_history', history);
    setStored('portfolio_resume', {
      fileUrl: activeItem.fileUrl,
      updatedAt: new Date(activeItem.uploadedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });
    logActivity(`Activated resume version: ${activeItem.fileName}`, 'Resume');
  }

  if (!isPureClientMode) {
    try {
      await apiClient.put(`/admin/resume/${id}/activate`);
    } catch (e) {}
  }
};

export const deleteResume = async (id) => {
  const history = getStored('portfolio_resume_history', []).filter((r) => r.id !== id);
  setStored('portfolio_resume_history', history);
  logActivity(`Deleted resume version #${id}`, 'Resume');

  if (!isPureClientMode) {
    try {
      await apiClient.delete(`/admin/resume/${id}`);
    } catch (e) {}
  }
};

/* ================= CONTACT MESSAGES API ================= */

export const getAdminMessages = async () => {
  if (isPureClientMode) {
    return getStored('portfolio_messages', [
      {
        id: 1,
        name: 'Alex Johnson',
        email: 'alex@analytics-corp.com',
        message: 'Hi Rishi, loved your Power BI dashboard case study. We are looking for a Data Analyst to join our team.',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        read: false
      }
    ]);
  }
  try {
    const res = await apiClient.get('/admin/messages');
    return res.data;
  } catch (err) {
    return getStored('portfolio_messages', [
      {
        id: 1,
        name: 'Alex Johnson',
        email: 'alex@analytics-corp.com',
        message: 'Hi Rishi, loved your Power BI dashboard case study. We are looking for a Data Analyst to join our team.',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        read: false
      }
    ]);
  }
};

export const markMessageRead = async (id) => {
  const list = getStored('portfolio_messages', []);
  const updated = list.map((m) => (m.id === id ? { ...m, read: true } : m));
  setStored('portfolio_messages', updated);

  if (!isPureClientMode) {
    try {
      await apiClient.put(`/admin/messages/${id}/read`);
    } catch (e) {}
  }
};

export const deleteMessage = async (id) => {
  const list = getStored('portfolio_messages', []);
  const updated = list.filter((m) => m.id !== id);
  setStored('portfolio_messages', updated);
  logActivity(`Deleted contact message #${id}`, 'Messages');

  if (!isPureClientMode) {
    try {
      await apiClient.delete(`/admin/messages/${id}`);
    } catch (e) {}
  }
};

/* ================= DASHBOARD STATS API ================= */

export const getDashboardStats = async () => {
  const projects = getStored('portfolio_projects', mockProjects);
  const skills = getStored('portfolio_skills', mockSkills);
  const messages = getStored('portfolio_messages', []);
  const unreadMessages = messages.filter((m) => !m.read).length;
  const resume = getStored('portfolio_resume', mockResume);
  const visits = getStored('portfolio_visit_count', 42);
  const activities = getStored('portfolio_activities', []);

  let totalSkills = 0;
  skills.forEach((g) => {
    totalSkills += (g.skills || []).length;
  });

  return {
    totalProjects: projects.length,
    totalSkills,
    unreadMessages,
    siteVisits: visits,
    resumeUpdatedAt: resume.updatedAt || 'Recent',
    recentActivities: activities.slice(0, 8),
    visitTrends: [
      { day: 'Mon', visits: 12 },
      { day: 'Tue', visits: 19 },
      { day: 'Wed', visits: 15 },
      { day: 'Thu', visits: 28 },
      { day: 'Fri', visits: 34 },
      { day: 'Sat', visits: 22 },
      { day: 'Sun', visits: 42 }
    ]
  };
};

/* ================= BACKUP IMPORT / EXPORT ================= */

export const exportPortfolioData = () => {
  const backup = {
    profile: getStored('portfolio_profile', mockProfile),
    education: getStored('portfolio_education', mockEducation),
    skills: getStored('portfolio_skills', mockSkills),
    projects: getStored('portfolio_projects', mockProjects),
    resume: getStored('portfolio_resume', mockResume),
    exportedAt: new Date().toISOString()
  };
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  logActivity('Exported full portfolio JSON backup', 'Backup');
};

export const importPortfolioData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (data.profile) setStored('portfolio_profile', data.profile);
    if (data.education) setStored('portfolio_education', data.education);
    if (data.skills) setStored('portfolio_skills', data.skills);
    if (data.projects) setStored('portfolio_projects', data.projects);
    if (data.resume) setStored('portfolio_resume', data.resume);
    logActivity('Imported portfolio data from JSON backup', 'Backup');
    return true;
  } catch (e) {
    throw new Error('Invalid JSON backup file structure.');
  }
};
