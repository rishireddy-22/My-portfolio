import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiBookOpen,
  FiCalendar,
  FiAward,
  FiSave,
  FiX,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';
import GlassCard from '../../components/GlassCard';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import MarkCompletedModal from '../components/MarkCompletedModal';
import {
  getAdminEducation,
  saveEducation,
  deleteEducation,
  reorderEducation
} from '../services/adminApi';

const emptyForm = {
  degree: '',
  institution: '',
  university: '',
  startYear: new Date().getFullYear(),
  endYear: '',
  status: 'ONGOING', // ONGOING or COMPLETED
  score: '',
  scoreType: 'CGPA',
  description: ''
};

export default function EducationManager() {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null); // null = not editing
  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [markTarget, setMarkTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    const data = await getAdminEducation();
    setEducationList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setFormData(emptyForm);
    setEditingItem(null);
    setShowForm(true);
  };

  const handleOpenEdit = (item) => {
    setFormData({
      ...item,
      endYear: item.endYear || '',
      score: item.score || ''
    });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        startYear: parseInt(formData.startYear, 10),
        endYear: formData.status === 'ONGOING' ? null : parseInt(formData.endYear, 10),
        id: editingItem ? editingItem.id : undefined
      };

      await saveEducation(payload);
      showToast(editingItem ? 'Education record updated!' : 'New education entry added!');
      setShowForm(false);
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save education record.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteEducation(deleteTarget.id);
      showToast('Education record deleted.');
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      showToast('Failed to delete education record.', 'error');
    }
  };

  const handleMarkCompletedSave = async (updatedItem) => {
    try {
      await saveEducation(updatedItem);
      showToast(`${updatedItem.degree} marked as Completed!`);
      loadData();
    } catch (err) {
      showToast('Error updating degree status.', 'error');
    }
  };

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= educationList.length) return;
    const newList = [...educationList];
    const temp = newList[index];
    newList[index] = newList[targetIndex];
    newList[targetIndex] = temp;
    setEducationList(newList);
    await reorderEducation(newList);
  };

  return (
    <div>
      <AdminHeader
        title="Education Credentials"
        subtitle="Manage academic qualifications, ongoing courses, scores, and completion status."
        actions={
          <button onClick={handleOpenAdd} className="btn btn-primary">
            <FiPlus size={16} />
            <span>Add Qualification</span>
          </button>
        }
      />

      {/* Add / Edit Form Modal / Card */}
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
                  {editingItem ? 'Edit Qualification' : 'Add New Academic Entry'}
                </h3>
                <button onClick={() => setShowForm(false)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>
                  <FiX size={16} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {/* Degree */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Degree / Program *
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleFormChange}
                      placeholder="e.g. MCA (Master of Computer Applications)"
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* Institution */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      College / Institution *
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleFormChange}
                      placeholder="e.g. SVIS College"
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* University */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      University / Board
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleFormChange}
                      placeholder="e.g. SK University, Anantapur"
                      style={inputStyle}
                    />
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Current Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      style={inputStyle}
                    >
                      <option value="ONGOING">Currently Studying (Ongoing)</option>
                      <option value="COMPLETED">Graduated (Completed)</option>
                    </select>
                  </div>

                  {/* Start Year */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Start Year *
                    </label>
                    <input
                      type="number"
                      name="startYear"
                      value={formData.startYear}
                      onChange={handleFormChange}
                      min={2000}
                      max={2035}
                      required
                      style={inputStyle}
                    />
                  </div>

                  {/* End Year (Hidden/Disabled if ONGOING) */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Completion Year {formData.status === 'COMPLETED' ? '*' : '(Disabled while Ongoing)'}
                    </label>
                    <input
                      type="number"
                      name="endYear"
                      value={formData.status === 'ONGOING' ? '' : formData.endYear}
                      onChange={handleFormChange}
                      placeholder={formData.status === 'ONGOING' ? 'Present (Ongoing)' : 'e.g. 2024'}
                      disabled={formData.status === 'ONGOING'}
                      required={formData.status === 'COMPLETED'}
                      min={formData.startYear || 2000}
                      max={2035}
                      style={{
                        ...inputStyle,
                        opacity: formData.status === 'ONGOING' ? 0.5 : 1,
                        cursor: formData.status === 'ONGOING' ? 'not-allowed' : 'text'
                      }}
                    />
                  </div>

                  {/* Score */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Score {formData.status === 'ONGOING' ? '(Optional: leave blank for "Will be updated")' : '*'}
                    </label>
                    <input
                      type="text"
                      name="score"
                      value={formData.score}
                      onChange={handleFormChange}
                      placeholder={formData.status === 'ONGOING' ? 'Leave empty or enter current CGPA' : 'e.g. 7.8'}
                      required={formData.status === 'COMPLETED'}
                      style={inputStyle}
                    />
                  </div>

                  {/* Score Type */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Score Type
                    </label>
                    <select
                      name="scoreType"
                      value={formData.scoreType}
                      onChange={handleFormChange}
                      style={inputStyle}
                    >
                      <option value="CGPA">CGPA</option>
                      <option value="PERCENTAGE">Percentage (%)</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Description & Key Focus
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Brief highlights of coursework, core subjects, or specializations..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <FiSave size={16} />
                    <span>{editingItem ? 'Save Changes' : 'Create Entry'}</span>
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Education List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {educationList.map((item, index) => {
          const isOngoing = item.status === 'ONGOING';
          return (
            <GlassCard key={item.id} style={{ padding: '1.8rem 2rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.degree}
                    </h3>

                    {isOngoing ? (
                      <span className="badge" style={{ borderColor: 'var(--text-primary)' }}>
                        <span className="pulse-dot" />
                        Currently Studying
                      </span>
                    ) : (
                      <span className="badge">
                        Completed
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.98rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    {item.institution}
                    {item.university && ` \u2022 ${item.university}`}
                  </p>

                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--text-tertiary)', marginBottom: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <FiCalendar size={14} />
                      {item.startYear} &ndash; {isOngoing ? 'Present' : item.endYear}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <FiAward size={14} />
                      {item.score ? `${item.scoreType || 'CGPA'}: ${item.score}` : 'CGPA: Will be updated'}
                    </span>
                  </div>

                  {item.description && (
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {isOngoing && (
                    <button
                      onClick={() => setMarkTarget(item)}
                      className="btn btn-secondary"
                      style={{ padding: '0.5rem 0.85rem', fontSize: '0.82rem', borderColor: 'var(--text-primary)' }}
                      title="One-click graduation update"
                    >
                      <FiCheckCircle size={14} />
                      <span>Mark as Completed</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                    title="Edit Record"
                  >
                    <FiEdit2 size={14} />
                  </button>

                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#ef4444' }}
                    title="Delete Record"
                  >
                    <FiTrash2 size={14} />
                  </button>

                  {/* Move Up / Down */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginLeft: '0.25rem' }}>
                    <button
                      disabled={index === 0}
                      onClick={() => handleMove(index, -1)}
                      style={{ opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'default' : 'pointer' }}
                    >
                      <FiArrowUp size={14} />
                    </button>
                    <button
                      disabled={index === educationList.length - 1}
                      onClick={() => handleMove(index, 1)}
                      style={{ opacity: index === educationList.length - 1 ? 0.3 : 1, cursor: index === educationList.length - 1 ? 'default' : 'pointer' }}
                    >
                      <FiArrowDown size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Confirmation & Modal Dialogs */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Qualification"
        message={`Are you sure you want to remove "${deleteTarget?.degree}"? This will also remove it from the public portfolio.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <MarkCompletedModal
        isOpen={Boolean(markTarget)}
        educationItem={markTarget}
        onClose={() => setMarkTarget(null)}
        onSave={handleMarkCompletedSave}
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
