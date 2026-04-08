import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { User, Bell, DollarSign, Mail } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'coverage', label: 'Coverage Defaults', icon: DollarSign },
    { id: 'templates', label: 'Email Templates', icon: Mail },
  ];

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Tabs */}
        <div className="sm:w-48 flex sm:flex-col gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-shield-50 text-shield-700 border border-shield-200'
                  : 'text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
          {activeTab === 'profile' && (
            <div className="space-y-4 max-w-md">
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
              <div>
                <label htmlFor="settings-full_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="settings-full_name"
                  type="text"
                  defaultValue={user?.full_name}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400"
                />
              </div>
              <div>
                <label htmlFor="settings-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="settings-email"
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400"
                />
              </div>
              <div>
                <label htmlFor="settings-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  id="settings-phone"
                  type="text"
                  defaultValue={user?.phone}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400"
                />
              </div>
              <div>
                <label htmlFor="settings-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  id="settings-password"
                  type="password"
                  placeholder="Leave blank to keep current"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400"
                />
              </div>
              <button onClick={handleSave} className="px-5 py-2 text-sm font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4 max-w-md">
              <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
              <p className="text-sm text-gray-500">Configure when and how you receive alerts.</p>
              <div className="space-y-3">
                {[
                  { label: 'Email alerts for expiring policies (30 days)', defaultChecked: true },
                  { label: 'Email alerts for expired policies', defaultChecked: true },
                  { label: 'Email alerts for completed verifications', defaultChecked: false },
                  { label: 'Daily compliance digest', defaultChecked: false },
                  { label: 'Weekly compliance summary', defaultChecked: true },
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={item.defaultChecked}
                      className="w-4 h-4 rounded border-gray-300 text-shield-600 focus:ring-shield-500"
                    />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
              <button onClick={handleSave} className="px-5 py-2 text-sm font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 transition-colors">
                Save Preferences
              </button>
            </div>
          )}

          {activeTab === 'coverage' && (
            <div className="space-y-4 max-w-md">
              <h2 className="text-lg font-semibold text-gray-900">Default Coverage Requirements</h2>
              <p className="text-sm text-gray-500">Set default minimums for new general contractors. Individual GCs can override these.</p>
              <div>
                <label htmlFor="settings-gl_occurrence" className="block text-sm font-medium text-gray-700 mb-1">GL Per Occurrence Minimum ($)</label>
                <input
                  id="settings-gl_occurrence"
                  type="number"
                  defaultValue={1000000}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400"
                />
                <p className="text-xs text-gray-500 mt-1">Idaho industry standard: $1,000,000 (statutory minimum: $300,000)</p>
              </div>
              <div>
                <label htmlFor="settings-gl_aggregate" className="block text-sm font-medium text-gray-700 mb-1">GL Aggregate Minimum ($)</label>
                <input
                  id="settings-gl_aggregate"
                  type="number"
                  defaultValue={2000000}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400"
                />
              </div>
              <div>
                <label htmlFor="settings-wc_liability" className="block text-sm font-medium text-gray-700 mb-1">WC Employer Liability Minimum ($)</label>
                <input
                  id="settings-wc_liability"
                  type="number"
                  defaultValue={500000}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400"
                />
                <p className="text-xs text-gray-500 mt-1">Standard: $500K/$500K/$500K employer liability</p>
              </div>
              <button onClick={handleSave} className="px-5 py-2 text-sm font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 transition-colors">
                Save Defaults
              </button>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Email Templates</h2>
              <p className="text-sm text-gray-500">Customize the email templates used for agent verification requests.</p>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Initial Verification Request</h3>
                <textarea
                  rows={8}
                  defaultValue={`Dear {{agent_name}},\n\nWe are writing to request verification of insurance coverage for {{sub_company_name}}, a subcontractor working with {{gc_company_name}}.\n\nPlease verify the following coverage is current and active:\n- General Liability: Minimum \${{gl_minimum}} per occurrence\n- Workers' Compensation: Minimum \${{wc_minimum}} per accident\n\nThank you,\n{{consultant_name}}`}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 font-mono"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Available variables: {'{{agent_name}}'}, {'{{sub_company_name}}'}, {'{{gc_company_name}}'}, {'{{gl_minimum}}'}, {'{{wc_minimum}}'}, {'{{consultant_name}}'}, {'{{magic_link}}'}
                </p>
              </div>
              <button onClick={handleSave} className="px-5 py-2 text-sm font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 transition-colors">
                Save Template
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
