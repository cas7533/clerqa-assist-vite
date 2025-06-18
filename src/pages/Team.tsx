import React from 'react';
import { Plus } from 'lucide-react';

const mockTeamMembers = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Legal Operations Manager',
    permission: 'Admin',
    initials: 'SC',
    status: 'Active',
    lastActive: null
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Senior Associate',
    permission: 'User',
    initials: 'MR',
    status: 'Active',
    lastActive: null
  },
  {
    id: '3',
    name: 'Jennifer Williams',
    role: 'Managing Partner',
    permission: 'Admin',
    initials: 'JW',
    status: 'Active',
    lastActive: null
  },
  {
    id: '4',
    name: 'Alex Liu',
    role: 'Associate',
    permission: 'User',
    initials: 'AL',
    status: 'Inactive',
    lastActive: 'Last active 3 days ago'
  }
];

const mockUsageStats = [
  { label: 'Documents Processed', value: '153' },
  { label: 'Active Users', value: '4' },
  { label: 'Documents Remaining', value: '47' }
];

export default function Team() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h1>
        <p className="text-gray-600">Manage your organization's users and permissions</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-4 w-4" />
          Invite User
        </button>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
        {mockTeamMembers.map((member, index) => (
          <div
            key={member.id}
            className={`flex items-center gap-4 p-4 ${
              index !== mockTeamMembers.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="font-semibold text-gray-600">{member.initials}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600">
                {member.role} • {member.permission}
              </p>
            </div>

            <div className="text-right">
              {member.status === 'Active' ? (
                <span className="text-sm font-medium text-green-600">Active</span>
              ) : (
                <div className="text-sm text-gray-500">
                  <div>{member.lastActive}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Usage Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockUsageStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}