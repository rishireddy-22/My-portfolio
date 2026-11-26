import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiSave,
  FiX
} from 'react-icons/fi';
import GlassCard from '../../components/GlassCard';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import {
  getAdminSkills,
  saveSkill,
  deleteSkill
} from '../services/adminApi';

const emptySkill = {
  name: '',
  level: 85,
  category: 'Languages & Querying',
  note: ''
};

export default function SkillsManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState(emptySkill);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    const data = await getAdminSkills();
    setCategories(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setFormData(emptySkill);
    setEditingSkill(null);
    setShowForm(true);
  };

  const handleOpenEdit = (skill, category) => {
    setFormData({
      ...skill,
      category
    });
    setEditingSkill(skill);
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveSkill({
        ...formData,
        level: parseInt(formData.level, 10),
        id: editingSkill ? editingSkill.id : undefined
      });
      showToast(editingSkill ? 'Skill updated!' : 'New skill added!');
      setShowForm(false);
      loadData();
    } catch (err) {
      showToast('Error saving skill.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteSkill(deleteTarget.id);
    showToast('Skill removed.');
    setDeleteTarget(null);
    loadData();
  };

  return (
    <div>
      <AdminHeader
        title="Technical Skills Competencies"
        subtitle="Manage programming languages, BI platforms, database systems, and statistical methodologies."
        actions={
          <button onClick={handleOpenAdd} className="btn btn-primary">
            <FiPlus size={16} />
            <span>Add Skill</span>
          </button>
        }
      />

      {/* Add / Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <GlassCard style={{ padding: '2.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {editingSkill ? 'Edit Skill Competency' : 'Add New Skill'}
                </h3>
                <button onClick={() => setShowForm(false)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>
                  <FiX size={16} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Skill Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Power BI, SQL, Pandas"
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={inputStyle}
                    >
                      <option value="Languages & Querying">Languages & Querying</option>
                      <option value="Analysis Libraries">Analysis Libraries</option>
                      <option value="BI Tools">BI Tools</option>
                      <option value="Database">Database</option>
                      <option value="Concepts">Concepts</option>
                    </select>
                  </div>

                  {/* Note */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Subtitle / Specialty Tag
                    </label>
                    <input
                      type="text"
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="e.g. DAX, Data Modeling, KPI Cards"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Level Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                      Proficiency Level
                    </label>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {formData.level}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <FiSave size={16} />
                    <span>{editingSkill ? 'Save Skill' : 'Add Skill'}</span>
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grouped Skills Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {categories.map((catGroup) => (
          <GlassCard key={catGroup.category} style={{ padding: '1.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {catGroup.category}
              </h3>
              <span className="badge" style={{ fontSize: '0.75rem' }}>
                {catGroup.skills?.length || 0}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {catGroup.skills?.map((skill) => (
                <div key={skill.id || skill.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, marginRight: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{skill.name}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{skill.level}%</span>
                    </div>
                    {skill.note && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block' }}>
                        {skill.note}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button
                      onClick={() => handleOpenEdit(skill, catGroup.category)}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.55rem' }}
                    >
                      <FiEdit2 size={12} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(skill)}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.55rem', color: '#ef4444' }}
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Skill"
        message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
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
