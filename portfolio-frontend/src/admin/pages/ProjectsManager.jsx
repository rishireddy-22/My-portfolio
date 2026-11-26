import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiStar,
  FiSave,
  FiX,
  FiSearch,
  FiLayers,
  FiUploadCloud
} from 'react-icons/fi';
import GlassCard from '../../components/GlassCard';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import {
  getAdminProjects,
  saveProject,
  deleteProject,
  toggleProjectPublish
} from '../services/adminApi';

const emptyProject = {
  title: '',
  category: 'Power BI',
  shortDescription: '',
  fullDescription: '',
  techStack: ['Power BI', 'SQL'],
  thumbnailUrl: '/projects/project1_retail_sales_dashboard.png',
  images: ['/projects/project1_retail_sales_dashboard.png'],
  liveUrl: '',
  githubUrl: '',
  problemStatement: '',
  approach: '',
  insights: ['First key insight', 'Second outcome'],
  published: true,
  featured: false
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState(emptyProject);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  // Chip input state for tech stack & insights
  const [newTech, setNewTech] = useState('');
  const [newInsight, setNewInsight] = useState('');

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    const data = await getAdminProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setFormData(emptyProject);
    setEditingProject(null);
    setShowForm(true);
  };

  const handleOpenEdit = (project) => {
    setFormData({
      ...project,
      techStack: project.techStack || [],
      insights: project.insights || [],
      images: project.images || [project.thumbnailUrl]
    });
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTech = () => {
    if (!newTech.trim()) return;
    setFormData((prev) => ({
      ...prev,
      techStack: [...prev.techStack, newTech.trim()]
    }));
    setNewTech('');
  };

  const handleRemoveTech = (index) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index)
    }));
  };

  const handleAddInsight = () => {
    if (!newInsight.trim()) return;
    setFormData((prev) => ({
      ...prev,
      insights: [...prev.insights, newInsight.trim()]
    }));
    setNewInsight('');
  };

  const handleRemoveInsight = (index) => {
    setFormData((prev) => ({
      ...prev,
      insights: prev.insights.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result;
        setFormData((prev) => ({
          ...prev,
          thumbnailUrl: url,
          images: [url, ...prev.images]
        }));
        showToast('Image uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProject({
        ...formData,
        id: editingProject ? editingProject.id : undefined
      });
      showToast(editingProject ? 'Project updated successfully!' : 'New project added!');
      setShowForm(false);
      loadData();
    } catch (err) {
      showToast('Error saving project.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProject(deleteTarget.id);
      showToast('Project removed.');
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      showToast('Error deleting project.', 'error');
    }
  };

  const handleTogglePublish = async (id) => {
    await toggleProjectPublish(id);
    loadData();
    showToast('Visibility toggled.');
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    const matchesCategory = filterCategory === 'All' || p.category?.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <AdminHeader
        title="Project Management"
        subtitle="Create, edit, toggle visibility, and showcase case studies with screenshots & metrics."
        actions={
          <button onClick={handleOpenAdd} className="btn btn-primary">
            <FiPlus size={16} />
            <span>Add Project</span>
          </button>
        }
      />

      {/* Add / Edit Form Card */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <GlassCard style={{ padding: '2.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {editingProject ? 'Edit Project Details' : 'Create New Case Study'}
                </h3>
                <button onClick={() => setShowForm(false)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>
                  <FiX size={16} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {/* Title */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      placeholder="e.g. Retail Sales Performance Dashboard"
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Primary Tool / Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      style={inputStyle}
                    >
                      <option value="Power BI">Power BI</option>
                      <option value="Python">Python</option>
                      <option value="Tableau">Tableau</option>
                      <option value="SQL">SQL</option>
                      <option value="Excel">Excel</option>
                    </select>
                  </div>

                  {/* Live URL */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Live Project / Demo Link
                    </label>
                    <input
                      type="url"
                      name="liveUrl"
                      value={formData.liveUrl}
                      onChange={handleFormChange}
                      placeholder="https://..."
                      style={inputStyle}
                    />
                  </div>

                  {/* GitHub URL */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleFormChange}
                      placeholder="https://github.com/..."
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Short Summary (Card Preview) *
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleFormChange}
                    placeholder="Brief 1-sentence teaser shown on the project card"
                    required
                    style={inputStyle}
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Full Description (Modal View) *
                  </label>
                  <textarea
                    name="fullDescription"
                    rows={4}
                    value={formData.fullDescription}
                    onChange={handleFormChange}
                    placeholder="Comprehensive explanation of what the project accomplished and why it matters..."
                    required
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                {/* Problem Statement & Approach */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Business Problem Statement
                    </label>
                    <textarea
                      name="problemStatement"
                      rows={3}
                      value={formData.problemStatement}
                      onChange={handleFormChange}
                      placeholder="What friction, loss, or lack of visibility prompted this analysis?"
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Analytical Approach & Methodology
                    </label>
                    <textarea
                      name="approach"
                      rows={3}
                      value={formData.approach}
                      onChange={handleFormChange}
                      placeholder="How did you clean, transform, model, or validate the dataset?"
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>
                </div>

                {/* Tech Stack Chips Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Technologies & Libraries
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="e.g. Scikit-learn, DAX, MySQL"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTech(); } }}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button type="button" onClick={handleAddTech} className="btn btn-secondary">
                      Add
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {formData.techStack.map((tech, idx) => (
                      <span key={idx} className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span>{tech}</span>
                        <FiX size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveTech(idx)} />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Insights List */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Key Insights & Results (Bullet Points)
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="e.g. Identified 18.4% profit margin improvement in Q4"
                      value={newInsight}
                      onChange={(e) => setNewInsight(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddInsight(); } }}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button type="button" onClick={handleAddInsight} className="btn btn-secondary">
                      Add Bullet
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {formData.insights.map((ins, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.8rem', background: 'var(--badge-bg)', borderRadius: '6px', fontSize: '0.85rem' }}>
                        <span>&bull; {ins}</span>
                        <FiX size={14} style={{ cursor: 'pointer' }} onClick={() => handleRemoveInsight(idx)} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Thumbnail / Image Upload */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Dashboard Screenshot / Cover Image
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    {formData.thumbnailUrl && (
                      <img
                        src={formData.thumbnailUrl}
                        alt="Preview"
                        style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                      />
                    )}
                    <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                      <FiUploadCloud size={16} />
                      <span>Upload New Image</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>

                {/* Published & Featured checkboxes */}
                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleFormChange}
                    />
                    <span>Publish live on public site</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleFormChange}
                    />
                    <span>Highlight as Featured Project</span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <FiSave size={16} />
                    <span>{editingProject ? 'Save Project Changes' : 'Create Case Study'}</span>
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', minWidth: '260px' }}>
          <FiSearch style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.4rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['All', 'Power BI', 'Python', 'Tableau', 'SQL', 'Excel'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className="btn"
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.82rem',
                background: filterCategory === cat ? 'var(--button-primary-bg)' : 'var(--glass-bg)',
                color: filterCategory === cat ? 'var(--button-primary-text)' : 'var(--text-secondary)',
                border: '1px solid var(--glass-border)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {filteredProjects.map((p) => (
          <GlassCard key={p.id} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '170px', background: 'var(--bg-secondary)' }}>
              <img
                src={p.thumbnailUrl}
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <span className="badge" style={{ background: 'var(--bg-primary)' }}>
                  <FiLayers size={12} />
                  {p.category}
                </span>
              </div>
            </div>

            <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {p.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                {p.shortDescription}
              </p>

              {/* Status Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '0.85rem', marginTop: 'auto' }}>
                <button
                  onClick={() => handleTogglePublish(p.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: p.published !== false ? 'var(--text-primary)' : 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {p.published !== false ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                  <span>{p.published !== false ? 'Published' : 'Draft'}</span>
                </button>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => handleOpenEdit(p)} className="btn btn-secondary" style={{ padding: '0.45rem 0.65rem' }}>
                    <FiEdit2 size={13} />
                  </button>
                  <button onClick={() => setDeleteTarget(p)} className="btn btn-secondary" style={{ padding: '0.45rem 0.65rem', color: '#ef4444' }}>
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Project"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: 'var(--radius-md)',
  background: 'var(--badge-bg)',
  border: '1px solid var(--glass-border)',
  color: 'var(--text-primary)',
  fontSize: '0.92rem',
  outline: 'none',
  fontFamily: 'inherit'
};
