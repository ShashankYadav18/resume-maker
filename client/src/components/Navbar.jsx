import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 24px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px'}}>
          {/* Logo */}
          <Link to="/" style={{textDecoration: 'none'}}>
            <span style={{fontSize: '24px', fontWeight: 'bold', color: '#7c3aed'}}>
              ResumeDost
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{display: 'flex', alignItems: 'center', gap: '32px'}}>
            <div style={{display: 'flex', gap: '24px'}}>
              <Link 
                to="/" 
                style={{
                  textDecoration: 'none',
                  color: isActive('/') ? '#7c3aed' : '#6b7280',
                  fontWeight: isActive('/') ? '600' : '400',
                  padding: '8px 0',
                  borderBottom: isActive('/') ? '2px solid #7c3aed' : 'none'
                }}
              >
                Home
              </Link>
              <Link 
                to="/builder" 
                style={{
                  textDecoration: 'none',
                  color: isActive('/builder') ? '#7c3aed' : '#6b7280',
                  fontWeight: isActive('/builder') ? '600' : '400',
                  padding: '8px 0',
                  borderBottom: isActive('/builder') ? '2px solid #7c3aed' : 'none'
                }}
              >
                Builder
              </Link>
              <Link 
                to="/search" 
                style={{
                  textDecoration: 'none',
                  color: isActive('/search') ? '#7c3aed' : '#6b7280',
                  fontWeight: isActive('/search') ? '600' : '400',
                  padding: '8px 0',
                  borderBottom: isActive('/search') ? '2px solid #7c3aed' : 'none'
                }}
              >
                Search
              </Link>
            </div>

            {/* CTA Button */}
            <Link 
              to="/builder" 
              style={{
                backgroundColor: '#7c3aed',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Create Resume
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
            className="mobile-menu-btn"
          >
            <div style={{width: '24px', height: '2px', backgroundColor: '#6b7280'}}></div>
            <div style={{width: '24px', height: '2px', backgroundColor: '#6b7280'}}></div>
            <div style={{width: '24px', height: '2px', backgroundColor: '#6b7280'}}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{
            display: 'none',
            flexDirection: 'column',
            gap: '16px',
            padding: '16px 0',
            borderTop: '1px solid #e5e7eb'
          }} className="mobile-menu">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: isActive('/') ? '#7c3aed' : '#6b7280',
                fontWeight: isActive('/') ? '600' : '400',
                padding: '8px 0'
              }}
            >
              Home
            </Link>
            <Link 
              to="/builder" 
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: isActive('/builder') ? '#7c3aed' : '#6b7280',
                fontWeight: isActive('/builder') ? '600' : '400',
                padding: '8px 0'
              }}
            >
              Builder
            </Link>
            <Link 
              to="/search" 
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: isActive('/search') ? '#7c3aed' : '#6b7280',
                fontWeight: isActive('/search') ? '600' : '400',
                padding: '8px 0'
              }}
            >
              Search
            </Link>
            <Link 
              to="/builder" 
              onClick={() => setIsMenuOpen(false)}
              style={{
                backgroundColor: '#7c3aed',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
                marginTop: '8px'
              }}
            >
              Create Resume
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-menu {
            display: flex !important;
          }
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
