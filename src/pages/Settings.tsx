import React from 'react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and billing preferences</p>
      </div>

      <div className="space-y-6">
        {/* Organization Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name
              </label>
              <input
                type="text"
                defaultValue="Morrison & Associates"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Billing Email
              </label>
              <input
                type="email"
                defaultValue="billing@morrisonlaw.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Current Plan */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold text-gray-900">Professional Plan</div>
              <div className="text-sm text-gray-600">$299/month • 200 documents</div>
            </div>
            <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors">
              Change Plan
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Usage this month</span>
              <span className="font-medium">153/200 documents</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '77%' }} />
            </div>
          </div>
          
          <p className="text-sm text-gray-500">Next billing date: March 15, 2024</p>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email notifications for completed analyses</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Weekly usage reports</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Team collaboration notifications</span>
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Update Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}