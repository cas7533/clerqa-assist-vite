import React from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  FileText, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  Zap,
  Target,
  Award,
  Search,
  BarChart3,
  Link2,
  Menu,
  X
} from 'lucide-react';

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (isSignedIn) {
      navigate('/app/dashboard');
    }
  }, [isSignedIn, navigate]);

  React.useEffect(() => {
    // Scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    // FAQ functionality
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(question => {
      question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');
        
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
          answer.style.opacity = '0';
          answer.style.paddingTop = '0';
          icon.style.transform = 'rotate(0deg)';
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.opacity = '1';
          answer.style.paddingTop = '12px';
          icon.style.transform = 'rotate(45deg)';
        }
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .animate-on-scroll.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }

        .hero-title {
          animation: fadeInUp 1s ease-out;
        }

        .hero-subtitle {
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.3s forwards;
        }

        .hero-cta {
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.6s forwards;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0);
          background-size: 20px 20px;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #2563eb;
          transition: width 0.3s ease;
        }

        .nav-item:hover::after {
          width: 100%;
        }

        .feature-card:hover {
          transform: translateY(-8px);
        }

        .feature-icon {
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .pricing-card.featured {
          transform: scale(1.05);
        }

        .pricing-card:hover {
          transform: translateY(-12px) scale(1.02);
        }

        .pricing-card.featured:hover {
          transform: translateY(-12px) scale(1.07);
        }

        .testimonial-card:hover {
          transform: translateY(-6px);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          padding-top: 0;
          transition: all 0.3s ease;
        }

        .security-features li {
          opacity: 0;
          animation: fadeInLeft 0.6s ease-out forwards;
        }

        .security-features li:nth-child(1) { animation-delay: 0.1s; }
        .security-features li:nth-child(2) { animation-delay: 0.2s; }
        .security-features li:nth-child(3) { animation-delay: 0.3s; }
        .security-features li:nth-child(4) { animation-delay: 0.4s; }
        .security-features li:nth-child(5) { animation-delay: 0.5s; }
        .security-features li:nth-child(6) { animation-delay: 0.6s; }
        .security-features li:nth-child(7) { animation-delay: 0.7s; }

        .flow-step:hover {
          transform: translateX(8px);
        }

        .flow-step::after {
          content: '↓';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          color: #2563eb;
          font-weight: 600;
          font-size: 16px;
        }

        .flow-step:last-child::after {
          display: none;
        }

        .mobile-menu-enter {
          animation: slideInRight 0.3s ease-out forwards;
        }

        .mobile-menu-exit {
          animation: slideOutRight 0.3s ease-out forwards;
        }

        .mobile-menu-backdrop {
          backdrop-filter: blur(4px);
          background: rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 767px) {
          .mobile-menu-item {
            transform: translateX(20px);
            opacity: 0;
            animation: fadeInLeft 0.3s ease-out forwards;
          }

          .mobile-menu-item:nth-child(1) { animation-delay: 0.1s; }
          .mobile-menu-item:nth-child(2) { animation-delay: 0.2s; }
          .mobile-menu-item:nth-child(3) { animation-delay: 0.3s; }
          .mobile-menu-item:nth-child(4) { animation-delay: 0.4s; }
          .mobile-menu-item:nth-child(5) { animation-delay: 0.5s; }
          .mobile-menu-item:nth-child(6) { animation-delay: 0.6s; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50" style={{ animation: 'slideDown 0.8s ease-out' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">Clerqa</span>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center gap-8">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="nav-item text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative py-2"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('security')}
                  className="nav-item text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative py-2"
                >
                  Security
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="nav-item text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative py-2"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="nav-item text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 relative py-2"
                >
                  Testimonials
                </button>
              </div>
            </div>

            {/* Desktop Right Side Buttons */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              <SignInButton mode="modal">
                <button className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5">
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                  Start Free Trial
                </button>
              </SignInButton>
            </div>

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
            className="fixed inset-0 z-40 md:hidden mobile-menu-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Panel */}
        <div className={`fixed top-16 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Navigation Links */}
            <div className="flex-1 px-6 py-8 space-y-6">
              <button 
                onClick={() => scrollToSection('features')}
                className="mobile-menu-item block w-full text-left text-lg font-medium text-gray-700 hover:text-blue-600 py-3 border-b border-gray-100 transition-colors duration-300"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('security')}
                className="mobile-menu-item block w-full text-left text-lg font-medium text-gray-700 hover:text-blue-600 py-3 border-b border-gray-100 transition-colors duration-300"
              >
                Security
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="mobile-menu-item block w-full text-left text-lg font-medium text-gray-700 hover:text-blue-600 py-3 border-b border-gray-100 transition-colors duration-300"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="mobile-menu-item block w-full text-left text-lg font-medium text-gray-700 hover:text-blue-600 py-3 border-b border-gray-100 transition-colors duration-300"
              >
                Testimonials
              </button>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="mobile-menu-item px-6 py-6 border-t border-gray-200 space-y-4">
              <SignInButton mode="modal">
                <button 
                  className="w-full text-blue-600 border border-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Free Trial
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-600 text-white py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Unlock The Power Of <br />
            <span className="text-blue-300">AI-Powered Legal</span> <br />
            Contract Analysis
          </h1>
          <p className="hero-subtitle text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform hours of manual contract review into minutes with enterprise-grade AI that identifies risks, extracts clauses, and provides actionable insights for mid-size law firms.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <SignInButton mode="modal">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl" style={{ animation: 'pulse 2s infinite 2s' }}>
                Start Free Analysis
              </button>
            </SignInButton>
            <button 
              onClick={() => scrollToSection('features')}
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Instant Contract Intelligence with AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI analyzes contracts 80% faster than manual review, identifying critical clauses, risks, and compliance issues with 95% accuracy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card animate-on-scroll stagger-1 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center transition-all duration-400 hover:shadow-xl hover:border-blue-500 hover:bg-white">
              <div className="feature-icon w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300 hover:text-blue-600">
                Intelligent Clause Extraction
              </h3>
              <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                Automatically identify and categorize 15+ clause types including termination, indemnification, liability limitations, and IP rights with confidence scoring.
              </p>
            </div>

            <div className="feature-card animate-on-scroll stagger-2 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center transition-all duration-400 hover:shadow-xl hover:border-blue-500 hover:bg-white">
              <div className="feature-icon w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300 hover:text-blue-600">
                Lightning-Fast Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                Process 20-page contracts in under 30 seconds. What used to take 2-4 hours of associate time now takes minutes with our AI engine.
              </p>
            </div>

            <div className="feature-card animate-on-scroll stagger-3 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center transition-all duration-400 hover:shadow-xl hover:border-blue-500 hover:bg-white">
              <div className="feature-icon w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300 hover:text-blue-600">
                Risk Assessment & Scoring
              </h3>
              <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                Get comprehensive risk analysis with detailed explanations, recommendations, and industry benchmarking to make informed decisions.
              </p>
            </div>

            <div className="feature-card animate-on-scroll stagger-4 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center transition-all duration-400 hover:shadow-xl hover:border-blue-500 hover:bg-white">
              <div className="feature-icon w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300 hover:text-blue-600">
                Team Collaboration
              </h3>
              <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                Share analyses, add comments, and collaborate with team members through role-based access control and real-time updates.
              </p>
            </div>

            <div className="feature-card animate-on-scroll stagger-5 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center transition-all duration-400 hover:shadow-xl hover:border-blue-500 hover:bg-white">
              <div className="feature-icon w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300 hover:text-blue-600">
                Analytics & Insights
              </h3>
              <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                Track time saved, cost reduction, and processing volume with detailed analytics and ROI reporting for your firm.
              </p>
            </div>

            <div className="feature-card animate-on-scroll stagger-6 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center transition-all duration-400 hover:shadow-xl hover:border-blue-500 hover:bg-white">
              <div className="feature-icon w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Link2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300 hover:text-blue-600">
                Seamless Integration
              </h3>
              <p className="text-gray-600 leading-relaxed transition-colors duration-300">
                Export results to CSV, JSON, or PDF. Integrate with popular practice management systems through our comprehensive API.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Enterprise-Grade Security & Privacy
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Clerqa implements a privacy-first architecture that minimizes data exposure while maximizing AI accuracy. Your sensitive legal documents are protected through multiple layers of security.
              </p>
              <ul className="security-features space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  Contract ID system replaces raw document storage
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  PII redaction before AI processing
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  Enterprise OpenAI with no model training
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  Row-level security with Clerk authentication
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  Encrypted storage with signed URLs
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  Full audit trails and right-to-erasure
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  SOC 2 and GDPR compliance ready
                </li>
              </ul>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1">
                Learn About Our Security
              </button>
            </div>
            
            <div className="animate-on-scroll stagger-2">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                  Privacy-First AI Processing
                </h3>
                <div className="space-y-4">
                  <div className="flow-step bg-blue-50 border border-blue-200 rounded-lg p-4 relative transition-all duration-300 hover:bg-blue-100 hover:shadow-md cursor-pointer">
                    <div className="font-semibold text-blue-600 mb-1">1. Document Upload</div>
                    <div className="text-sm text-gray-600">Secure upload with virus scanning</div>
                  </div>
                  <div className="flow-step bg-blue-50 border border-blue-200 rounded-lg p-4 relative transition-all duration-300 hover:bg-blue-100 hover:shadow-md cursor-pointer">
                    <div className="font-semibold text-blue-600 mb-1">2. PII Redaction</div>
                    <div className="text-sm text-gray-600">Strip sensitive data before AI</div>
                  </div>
                  <div className="flow-step bg-blue-50 border border-blue-200 rounded-lg p-4 relative transition-all duration-300 hover:bg-blue-100 hover:shadow-md cursor-pointer">
                    <div className="font-semibold text-blue-600 mb-1">3. AI Analysis</div>
                    <div className="text-sm text-gray-600">Process with enterprise OpenAI</div>
                  </div>
                  <div className="flow-step bg-blue-50 border border-blue-200 rounded-lg p-4 relative transition-all duration-300 hover:bg-blue-100 hover:shadow-md cursor-pointer">
                    <div className="font-semibold text-blue-600 mb-1">4. Store Results</div>
                    <div className="text-sm text-gray-600">Save only extracted insights</div>
                  </div>
                  <div className="flow-step bg-blue-50 border border-blue-200 rounded-lg p-4 relative transition-all duration-300 hover:bg-blue-100 hover:shadow-md cursor-pointer">
                    <div className="font-semibold text-blue-600 mb-1">5. User Access</div>
                    <div className="text-sm text-gray-600">Role-based secure access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Predictable Pricing. No Surprises.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your firm's size and needs. All plans include enterprise-grade security and our core AI features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="pricing-card animate-on-scroll stagger-1 bg-white border-2 border-gray-200 rounded-xl p-8 text-center transition-all duration-400 hover:shadow-xl hover:border-blue-500">
              <div className="text-xl font-semibold text-gray-900 mb-2">Starter</div>
              <div className="text-gray-600 mb-6">Perfect for small firms getting started with AI</div>
              <div className="text-5xl font-bold text-gray-900 mb-2">$99</div>
              <div className="text-gray-600 mb-8">per month</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">50 documents per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">10 clause types extraction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Basic risk assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Email support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">1 primary user + 2 read-only</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Export to CSV/PDF</span>
                </li>
              </ul>
              <SignInButton mode="modal">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-semibold transition-all duration-300">
                  Get Started
                </button>
              </SignInButton>
            </div>

            {/* Professional Plan */}
            <div className="pricing-card featured animate-on-scroll stagger-2 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-xl p-8 text-center relative transition-all duration-400 hover:shadow-xl">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold" style={{ animation: 'pulse 2s infinite' }}>
                  Most Popular
                </span>
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Professional</div>
              <div className="text-gray-600 mb-6">Ideal for growing mid-size firms</div>
              <div className="text-5xl font-bold text-gray-900 mb-2">$299</div>
              <div className="text-gray-600 mb-8">per month</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">200 documents per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">15+ clause types extraction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advanced risk assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority email + phone support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Up to 5 active users</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Team collaboration features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Usage analytics</span>
                </li>
              </ul>
              <SignInButton mode="modal">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300">
                  Start Free Trial
                </button>
              </SignInButton>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card animate-on-scroll stagger-3 bg-white border-2 border-gray-200 rounded-xl p-8 text-center transition-all duration-400 hover:shadow-xl hover:border-blue-500">
              <div className="text-xl font-semibold text-gray-900 mb-2">Enterprise</div>
              <div className="text-gray-600 mb-6">For large firms with advanced needs</div>
              <div className="text-5xl font-bold text-gray-900 mb-2">$599</div>
              <div className="text-gray-600 mb-8">per month</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">500 documents per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Custom clause training</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advanced analytics & reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Dedicated customer success</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited users</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">SSO integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Custom integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">SLA guarantees</span>
                </li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-semibold transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Law Firms
            </h2>
            <p className="text-xl text-gray-600">
              See how legal professionals are transforming their contract review process with Clerqa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="testimonial-card animate-on-scroll stagger-1 bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-500">
              <p className="text-gray-700 mb-6 italic relative">
                "Clerqa has revolutionized our contract review process. What used to take our associates 3-4 hours now takes 30 minutes. The AI accuracy is impressive and the risk assessments are spot-on."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300">
                  <span className="font-semibold text-gray-600">SC</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-sm text-gray-600">Legal Operations Manager, Morrison & Associates</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-on-scroll stagger-2 bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-500">
              <p className="text-gray-700 mb-6 italic relative">
                "The team collaboration features are fantastic. Our entire legal team can now review and comment on contracts in real-time. It has improved our efficiency and reduced errors significantly."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300">
                  <span className="font-semibold text-gray-600">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Michael Rodriguez</div>
                  <div className="text-sm text-gray-600">Senior Associate, Hamilton Legal Group</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-on-scroll stagger-3 bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-500">
              <p className="text-gray-700 mb-6 italic relative">
                "As a managing partner, I love the ROI dashboard. We have saved over $50K in the first quarter alone. The pricing is transparent and the value is undeniable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300">
                  <span className="font-semibold text-gray-600">JW</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Jennifer Williams</div>
                  <div className="text-sm text-gray-600">Managing Partner, Williams & Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            <div className="animate-on-scroll stagger-1 border-b border-gray-200 pb-6 transition-all duration-300 hover:bg-blue-50/30 hover:px-4 hover:py-4 hover:rounded-lg hover:border-transparent">
              <div className="faq-question flex justify-between items-center cursor-pointer font-semibold text-gray-900 transition-all duration-300 hover:text-blue-600">
                How accurate is the AI contract analysis?
                <span className="faq-icon text-blue-600 text-xl font-light transition-transform duration-300">+</span>
              </div>
              <div className="faq-answer text-gray-600 leading-relaxed">
                Our AI achieves 95%+ accuracy in clause extraction and risk assessment. Each analysis includes confidence scores, and we continuously improve our models based on feedback from legal professionals.
              </div>
            </div>

            <div className="animate-on-scroll stagger-2 border-b border-gray-200 pb-6 transition-all duration-300 hover:bg-blue-50/30 hover:px-4 hover:py-4 hover:rounded-lg hover:border-transparent">
              <div className="faq-question flex justify-between items-center cursor-pointer font-semibold text-gray-900 transition-all duration-300 hover:text-blue-600">
                What types of contracts does Clerqa support?
                <span className="faq-icon text-blue-600 text-xl font-light transition-transform duration-300">+</span>
              </div>
              <div className="faq-answer text-gray-600 leading-relaxed">
                Clerqa supports a wide range of commercial contracts including service agreements, NDAs, employment contracts, licensing agreements, and more. We handle both PDF and DOCX formats up to 50MB.
              </div>
            </div>

            <div className="animate-on-scroll stagger-3 border-b border-gray-200 pb-6 transition-all duration-300 hover:bg-blue-50/30 hover:px-4 hover:py-4 hover:rounded-lg hover:border-transparent">
              <div className="faq-question flex justify-between items-center cursor-pointer font-semibold text-gray-900 transition-all duration-300 hover:text-blue-600">
                How secure is my data with Clerqa?
                <span className="faq-icon text-blue-600 text-xl font-light transition-transform duration-300">+</span>
              </div>
              <div className="faq-answer text-gray-600 leading-relaxed">
                Security is our top priority. We use enterprise-grade encryption, PII redaction, and store only analysis results - not your raw documents. Our platform is SOC 2 and GDPR compliant.
              </div>
            </div>

            <div className="animate-on-scroll stagger-4 border-b border-gray-200 pb-6 transition-all duration-300 hover:bg-blue-50/30 hover:px-4 hover:py-4 hover:rounded-lg hover:border-transparent">
              <div className="faq-question flex justify-between items-center cursor-pointer font-semibold text-gray-900 transition-all duration-300 hover:text-blue-600">
                Can I integrate Clerqa with my existing practice management system?
                <span className="faq-icon text-blue-600 text-xl font-light transition-transform duration-300">+</span>
              </div>
              <div className="faq-answer text-gray-600 leading-relaxed">
                Yes! Clerqa offers comprehensive APIs and pre-built integrations with popular practice management systems like Clio, MyCase, and PracticePanther. We also support custom integrations.
              </div>
            </div>

            <div className="animate-on-scroll stagger-5 border-b border-gray-200 pb-6 transition-all duration-300 hover:bg-blue-50/30 hover:px-4 hover:py-4 hover:rounded-lg hover:border-transparent">
              <div className="faq-question flex justify-between items-center cursor-pointer font-semibold text-gray-900 transition-all duration-300 hover:text-blue-600">
                Do you offer a free trial?
                <span className="faq-icon text-blue-600 text-xl font-light transition-transform duration-300">+</span>
              </div>
              <div className="faq-answer text-gray-600 leading-relaxed">
                Yes, we offer a 14-day free trial with full access to our Professional plan features. No credit card required to start your trial.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">System Status</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-blue-400">Clerqa</span>
            </div>
            <p>&copy; 2024 Clerqa by Techvaultlabs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}