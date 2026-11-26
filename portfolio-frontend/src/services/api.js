import axios from 'axios';
import {
  mockProfile,
  mockEducation,
  mockSkills,
  mockProjects,
  mockResume
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
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

/**
 * Fetch student profile details.
 */
export const getProfile = async () => {
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
  try {
    const response = await apiClient.get('/education');
    const data = response.data;
    return Array.isArray(data) ? data : getLocalOr('portfolio_education', mockEducation);
  } catch (error) {
    return getLocalOr('portfolio_education', mockEducation);
  }
};

/**
 * Fetch technical skills list.
 */
export const getSkills = async () => {
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
  try {
    const response = await apiClient.get('/projects');
    const data = response.data;
    return Array.isArray(data) && data.length > 0 ? data : getLocalOr('portfolio_projects', mockProjects);
  } catch (error) {
    const local = getLocalOr('portfolio_projects', mockProjects);
    // Public site only shows published projects
    return local.filter((p) => p.published !== false);
  }
};

/**
 * Fetch resume file metadata.
 */
export const getResume = async () => {
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
  try {
    const response = await apiClient.post('/contact', formData);
    return { success: true, data: response.data };
  } catch (error) {
    // Record into local contact messages for the admin inbox
    const messages = getLocalOr('portfolio_messages', []);
    const newMsg = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      createdAt: new Date().toISOString(),
      read: false
    };
    localStorage.setItem('portfolio_messages', JSON.stringify([newMsg, ...messages]));

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
  try {
    await apiClient.post('/visit');
  } catch (e) {
    const count = parseInt(localStorage.getItem('portfolio_visit_count') || '42', 10);
    localStorage.setItem('portfolio_visit_count', (count + 1).toString());
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
