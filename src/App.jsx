import { BrowserRouter, Routes, Route, Navigate, NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { Shield, LayoutDashboard, Users, Building2, UserCheck, FileCheck, Settings as SettingsIcon, LogOut, Bell, Menu, X } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import Login from './pages/Login';
import ConsultantDashboard from './pages/ConsultantDashboard';
import GcDashboard from './pages/GcDashboard';
import SubcontractorList from './pages/SubcontractorList';
import GcList from './pages/GcList';
import GcDetail from './pages/GcDetail';
import AgentList from './pages/AgentList';
import DrawVerification from './pages/DrawVerification';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function Toasts() {
  const { toasts, removeToast } = useToast();
  if (toasts.length === 0) return null;

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-amber-600',
    info: 'bg-shield-600',
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${colors[t.type] || colors.info} text-white text-sm px-4 py-3 rounded-lg shadow-lg max-w-sm cursor-pointer`}
          onClick={() => removeToast(t.id)}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function Dashboard() {
  const { isAdmin } = useAuth();
  return isAdmin ? <ConsultantDashboard /> : <GcDashboard />;
}

function AppLayout() {
  const { user, logout, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, show: true },
    { to: '/subcontractors', label: 'Subcontractors', icon: Users, show: true },
    { to: '/general-contractors', label: 'Contractors', icon: Building2, show: isAdmin },
    { to: '/agents', label: 'Agents', icon: UserCheck, show: isAdmin },
    { to: '/draw-verification', label: 'Draw Verify', icon: FileCheck, show: true },
    { to: '/settings', label: 'Settings', icon: SettingsIcon, show: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-1 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/dashboard" className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-shield-500" />
          <span className="font-bold text-gray-900">SubShield</span>
        </Link>
        <div className="w-6" />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <SidebarContent
              navItems={navItems}
              user={user}
              logout={logout}
              onNavClick={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-1 bg-white border-r border-gray-200">
            <SidebarContent navItems={navItems} user={user} logout={logout} />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 lg:ml-60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subcontractors" element={<SubcontractorList />} />
              {isAdmin && <Route path="/general-contractors" element={<GcList />} />}
              {isAdmin && <Route path="/general-contractors/:gcId" element={<GcDetail />} />}
              {isAdmin && <Route path="/agents" element={<AgentList />} />}
              <Route path="/draw-verification" element={<DrawVerification />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ navItems, user, logout, onNavClick }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-gray-100">
        <Link to="/dashboard" className="flex items-center gap-2.5" onClick={onNavClick}>
          <div className="w-9 h-9 rounded-xl bg-shield-500 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">SubShield</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.filter((n) => n.show).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-shield-50 text-shield-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-4.5 h-4.5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-shield-100 text-shield-700 flex items-center justify-center text-sm font-semibold">
            {user?.full_name?.charAt(0) || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.full_name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <DataProvider>
            <Toasts />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/*"
                element={
                  <RequireAuth>
                    <AppLayout />
                  </RequireAuth>
                }
              />
            </Routes>
          </DataProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
