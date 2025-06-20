import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, FileSearch, Users, Settings } from 'lucide-react';

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/upload', label: 'Upload', icon: Upload },
  { to: '/app/analysis/1', label: 'Analysis', icon: FileSearch },
  { to: '/app/team', label: 'Team', icon: Users },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

interface NavigationProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function Navigation({ mobile = false, onNavigate }: NavigationProps) {
  if (mobile) {
    return (
      <>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left text-lg font-medium py-3 px-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </>
    );
  }

  return (
    <>
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </>
  );
}