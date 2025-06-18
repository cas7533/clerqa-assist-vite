import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react';
import Navigation from './Navigation';
import { Building2 } from 'lucide-react';

export default function Layout() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Clerqa</h1>
            </div>
            <p className="text-gray-600">AI-Powered Contract Analysis for Legal Teams</p>
          </div>
          <div className="flex justify-center">
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Sign In to Continue
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-blue-600">Clerqa</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Navigation />
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              {user?.organizationMemberships?.[0]?.organization?.name || 'Personal Account'}
            </span>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}