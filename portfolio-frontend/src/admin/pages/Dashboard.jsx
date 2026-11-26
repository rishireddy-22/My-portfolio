import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import {
  FiFolder,
  FiCheckCircle,
  FiMail,
  FiEye,
  FiClock,
  FiPlus,
  FiArrowUpRight,
  FiActivity
} from 'react-icons/fi';
import GlassCard from '../../components/GlassCard';
import AdminHeader from '../components/AdminHeader';
import { getDashboardStats } from '../services/adminApi';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div style={{ color: 'var(--text-secondary)' }}>Loading dashboard statistics...</div>;
  }

  const statCards = [
    { label: 'Published Projects', value: stats.totalProjects, icon: <FiFolder size={20} />, link: '/admin/projects' },
    { label: 'Technical Skills', value: stats.totalSkills, icon: <FiCheckCircle size={20} />, link: '/admin/skills' },
    { label: 'Unread Inquiries', value: stats.unreadMessages, icon: <FiMail size={20} />, link: '/admin/messages' },
    { label: 'Total Site Visits', value: stats.siteVisits, icon: <FiEye size={20} /> },
    { label: 'Resume Active', value: stats.resumeUpdatedAt, icon: <FiClock size={20} />, link: '/admin/resume' }
  ];

  return (
    <div>
      <AdminHeader
        title="Portfolio Overview"
        subtitle="Live telemetry, analytics performance, and content quick actions."
        actions={
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/admin/projects" className="btn btn-primary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.88rem' }}>
              <FiPlus size={16} />
              <span>Add New Project</span>
            </Link>
            <Link to="/admin/education" className="btn btn-secondary" style={{ padding: '0.6rem 1.1rem', fontSize: '0.88rem' }}>
              <FiPlus size={16} />
              <span>Update Education</span>
            </Link>
          </div>
        }
      />

      {/* Quick Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}
      >
        {statCards.map((card, i) => (
          <GlassCard key={i} style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                {card.label}
              </span>
              <div style={{ color: 'var(--text-primary)', padding: '6px', borderRadius: '50%', background: 'var(--badge-bg)' }}>
                {card.icon}
              </div>
            </div>

            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {card.value}
            </div>

            {card.link && (
              <Link
                to={card.link}
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 500
                }}
              >
                <span>Manage</span>
                <FiArrowUpRight size={13} />
              </Link>
            )}
          </GlassCard>
        ))}
      </div>

      {/* Grid: Traffic Chart & Recent Activities */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}
        className="dashboard-analytics-grid"
      >
        {/* Visit Traffic Chart */}
        <GlassCard style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Site Visits & Engagement
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Traffic trajectory across the last 7 days
              </p>
            </div>
            <span className="badge">
              <span className="pulse-dot" />
              Active
            </span>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.visitTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-line)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-line)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--glass-border)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="visits" stroke="var(--chart-line)" strokeWidth={2} fill="url(#adminChartGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Recent Activities Log */}
        <GlassCard style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <FiActivity size={18} color="var(--text-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Recent Changes Log
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stats.recentActivities?.map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  paddingBottom: '0.85rem',
                  borderBottom: '1px solid var(--glass-border)',
                  fontSize: '0.88rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                    {act.action}
                  </div>
                  <span className="badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                    {act.entity}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
                  {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .dashboard-analytics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
