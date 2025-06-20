import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';
import Navigation from './Navigation';
import { Building2, Menu, X } from 'lucide-react';

export default function Layout() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn, navigate]);

  if (!isSignedIn) {
    return null; // Will redirect via useEffect
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Building2 className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-blue-600">Clerqa</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <Navigation />
          </nav>

          {/* Right Side - User Info & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* User Info - Hidden on small screens */}
            <span className="text-sm text-gray-600 hidden sm:block">
              {user?.organizationMemberships?.[0]?.organization?.name || 'Personal Account'}
            </span>
            
            {/* User Button */}
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-blue-600 p-2 rounded-lg transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Panel */}
        <div className={`fixed top-16 right-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full bg-white/60 backdrop-blur-sm">
            {/* Mobile Navigation Links */}
            <div className="flex-1 px-6 py-8">
              <div className="space-y-6">
                <Navigation mobile onNavigate={() => setIsMobileMenuOpen(false)} />
              </div>
            </div>

            {/* Mobile User Info */}
            <div className="px-6 py-6 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Signed in as:</div>
              <div className="font-medium text-gray-900">
                {user?.organizationMemberships?.[0]?.organization?.name || 'Personal Account'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}