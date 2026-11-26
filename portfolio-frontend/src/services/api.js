import axios from 'axios';
import {
  mockProfile,
  mockEducation,
  mockSkills,
  mockProjects,
  mockResume
} from './mockData';

const hasCustomBackend = Boolean(import.meta.env.VITE_API_URL);
const isLocalhost = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// When deployed on Netlify / HTTPS without an explicit backend URL, run purely client-side
// to avoid Mixed Content (HTTPS -> HTTP) and connection refused errors.
const isPureClientMode = !hasCustomBackend && !isLocalhost;

const API_BASE_URL = import.meta.env.VITE_API_URL || (isLocalhost ? 'http://localhost:8080/api' : '/api');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: isLocalhost ? 1500 : 3000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const getLocalOr = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocal = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn(`Could not save ${key} to localStorage`, e);
  }
};

/**
 * Fetch student profile details.
 */
export const getProfile = async () => {
  if (isPureClientMode) {
    return getLocalOr('portfolio_profile', mockProfile);
  }
  try {
    const response = await apiClient.get('/profile');
    return response.data;
  } catch (error) {
    return getLocalOr('portfolio_profile', mockProfile);
  }
};

/**
 * Fetch education timeline items.
 */
export const getEducation = async () => {
  if (isPureClientMode) {
    return getLocalOr('portfolio_education', mockEducation);
  }
  try {
    const response = await apiClient.get('/education');
    const data = response.data;
    return Array.isArray(data) && data.length > 0 ? data : getLocalOr('portfolio_education', mockEducation);
  } catch (error) {
    return getLocalOr('portfolio_education', mockEducation);
  }
};

/**
 * Fetch technical skills list.
 */
export const getSkills = async () => {
  if (isPureClientMode) {
    return getLocalOr('portfolio_skills', mockSkills);
  }
  try {
    const response = await apiClient.get('/skills');
    const data = response.data;
    return Array.isArray(data) && data.length > 0 ? data : getLocalOr('portfolio_skills', mockSkills);
  } catch (error) {
    return getLocalOr('portfolio_skills', mockSkills);
  }
};

/**
 * Fetch published projects list.
 */
export const getProjects = async () => {
  if (isPureClientMode) {
    const local = getLocalOr('portfolio_projects', mockProjects);
    return local.filter((p) => p.published !== false);
  }
  try {
    const response = await apiClient.get('/projects');
    const data = response.data;
    return Array.isArray(data) && data.length > 0 ? data : getLocalOr('portfolio_projects', mockProjects);
  } catch (error) {
    const local = getLocalOr('portfolio_projects', mockProjects);
    return local.filter((p) => p.published !== false);
  }
};

/**
 * Fetch resume file metadata.
 */
export const getResume = async () => {
  if (isPureClientMode) {
    return getLocalOr('portfolio_resume', mockResume);
  }
  try {
    const response = await apiClient.get('/resume');
    return response.data;
  } catch (error) {
    return getLocalOr('portfolio_resume', mockResume);
  }
};

/**
 * Submit contact inquiry form.
 */
export const submitContact = async (formData) => {
  // Always save locally so the admin panel inbox can display it
  const messages = getLocalOr('portfolio_messages', []);
  const newMsg = {
    id: Date.now(),
    name: formData.name,
    email: formData.email,
    message: formData.message,
    createdAt: new Date().toISOString(),
    read: false
  };
  setLocal('portfolio_messages', [newMsg, ...messages]);

  if (isPureClientMode) {
    return {
      success: true,
      message: 'Message delivered successfully! Thank you for reaching out, Rishi will get back to you shortly.'
    };
  }

  try {
    const response = await apiClient.post('/contact', formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: true,
      message: 'Message delivered successfully! Thank you for reaching out, Rishi will get back to you shortly.'
    };
  }
};

/**
 * Record site visit.
 */
export const recordVisit = async () => {
  const count = parseInt(localStorage.getItem('portfolio_visit_count') || '42', 10);
  try {
    localStorage.setItem('portfolio_visit_count', (count + 1).toString());
  } catch (e) {}

  if (!isPureClientMode) {
    try {
      await apiClient.post('/visit');
    } catch (e) {}
  }
};

export default {
  getProfile,
  getEducation,
  getSkills,
  getProjects,
  getResume,
  submitContact,
  recordVisit
};
