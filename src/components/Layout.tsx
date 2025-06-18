import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';
import Navigation from './Navigation';
import { Building2 } from 'lucide-react';

export default function Layout() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn, navigate]);

  if (!isSignedIn) {
    return null; // Will redirect via useEffect
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