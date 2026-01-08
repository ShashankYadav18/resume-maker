import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Add global styles to fix viewport issues
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.width = '100%';
    document.documentElement.style.overflowX = 'hidden';
    
    return () => {
      // Cleanup on unmount
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.width = '';
      document.body.style.overflowX = '';
      document.documentElement.style.width = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Reset status
    setSubmitStatus(null);
    setIsSubmitting(true);
    
    // Set timeout to handle cases where server might be unreachable
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), 8000)
    );

    try {
      // Race between actual request and timeout
      const response = await Promise.race([
        api.post('/feedback', formData),
        timeoutPromise
      ]);
      
      // If we get here, the API call succeeded
      const data = response.data;

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Store the feedback locally as backup
        try {
          const storedFeedback = JSON.parse(localStorage.getItem('pendingFeedback') || '[]');
          localStorage.setItem('pendingFeedback', JSON.stringify([
            ...storedFeedback,
            { ...formData, submittedAt: new Date().toISOString(), status: 'sent' }
          ]));
        } catch (err) {
          console.error('Failed to store feedback locally:', err);
        }
      } else {
        setSubmitStatus('error');
        console.error('Feedback submission failed:', data.message);
      }
    } catch (error) {
      console.error('Network error:', error.response?.data?.message || error.message);
      setSubmitStatus('error');
      
      // Store the feedback locally when server is down
      try {
        const storedFeedback = JSON.parse(localStorage.getItem('pendingFeedback') || '[]');
        localStorage.setItem('pendingFeedback', JSON.stringify([
          ...storedFeedback,
          { ...formData, submittedAt: new Date().toISOString(), status: 'pending' }
        ]));
      } catch (err) {
        console.error('Failed to store feedback locally:', err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc', 
      width: '100vw', 
      minHeight: '100vh',
      margin: 0, 
      padding: 0,
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        padding: '100px 24px', 
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="hero-grid" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          minHeight: '500px'
        }}>
          {/* Left Side - Text Content */}
          <div className="hero-text" style={{textAlign: 'left'}}>
            <h1 style={{
              color: 'white',
              fontSize: '52px',
              fontWeight: '900',
              marginBottom: '24px',
              lineHeight: '1.1',
              animation: 'slideInLeft 1s ease-out',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              Build Your <span style={{
                color: '#fbbf24', 
                background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Professional</span><br />
              Resume in Minutes
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '22px',
              marginBottom: '40px',
              lineHeight: '1.6',
              animation: 'slideInLeft 1s ease-out 0.2s both',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              Create ATS-friendly resumes that get you noticed by top companies like Google, Microsoft, Amazon and more.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              animation: 'slideInLeft 1s ease-out 0.4s both'
            }}>
              <Link 
                to="/builder" 
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#1f2937',
                  padding: '18px 36px',
                  borderRadius: '50px',
                  fontSize: '18px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 10px 30px rgba(251,191,36,0.4)',
                  transition: 'all 0.3s ease',
                  transform: 'perspective(1000px) rotateX(0deg)',
                  animation: 'pulse 2s infinite'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                  e.target.style.boxShadow = '0 15px 40px rgba(251,191,36,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0px) scale(1)';
                  e.target.style.boxShadow = '0 10px 30px rgba(251,191,36,0.4)';
                }}
              >
                Create Your Resume
              </Link>
              <Link 
                to="/search" 
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  padding: '18px 36px',
                  borderRadius: '50px',
                  fontSize: '18px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-block',
                  border: '2px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.25)';
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                  e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
                  e.target.style.transform = 'translateY(0px) scale(1)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                }}
              >
                Browse Templates
              </Link>
            </div>
          </div>

          {/* Right Side - Enhanced Resume Mockup */}
          <div className="resume-mockup" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            animation: 'slideInRight 1s ease-out 0.6s both'
          }}>
            {/* Floating Resume Cards */}
            <div style={{
              position: 'relative',
              width: '320px',
              height: '400px'
            }}>
              {/* Main Resume */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '20px',
                width: '260px',
                height: '340px',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                padding: '28px',
                zIndex: 3,
                animation: 'float 3s ease-in-out infinite',
                border: '2px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                transform: 'perspective(1000px) rotateY(-5deg)'
              }}>
                {/* Resume Header */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#7c3aed',
                  borderRadius: '50%',
                  marginBottom: '16px'
                }}></div>
                <div style={{
                  height: '16px',
                  backgroundColor: '#1f2937',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  width: '80%'
                }}></div>
                <div style={{
                  height: '12px',
                  backgroundColor: '#6b7280',
                  borderRadius: '4px',
                  marginBottom: '20px',
                  width: '60%'
                }}></div>
                
                {/* Resume Sections */}
                <div style={{marginBottom: '16px'}}>
                  <div style={{
                    height: '10px',
                    backgroundColor: '#7c3aed',
                    borderRadius: '2px',
                    marginBottom: '8px',
                    width: '50%'
                  }}></div>
                  <div style={{
                    height: '6px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '2px',
                    marginBottom: '4px'
                  }}></div>
                  <div style={{
                    height: '6px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '2px',
                    marginBottom: '4px',
                    width: '90%'
                  }}></div>
                  <div style={{
                    height: '6px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '2px',
                    width: '75%'
                  }}></div>
                </div>
                
                <div>
                  <div style={{
                    height: '10px',
                    backgroundColor: '#06b6d4',
                    borderRadius: '2px',
                    marginBottom: '8px',
                    width: '60%'
                  }}></div>
                  <div style={{
                    height: '6px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '2px',
                    marginBottom: '4px',
                    width: '85%'
                  }}></div>
                  <div style={{
                    height: '6px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '2px',
                    width: '70%'
                  }}></div>
                </div>
              </div>

              {/* Background Resume 1 */}
              <div style={{
                position: 'absolute',
                top: '40px',
                left: '0',
                width: '240px',
                height: '320px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                zIndex: 2,
                animation: 'float 3s ease-in-out infinite 1s',
                opacity: '0.8',
                border: '1px solid #f1f5f9'
              }}></div>

              {/* Background Resume 2 */}
              <div style={{
                position: 'absolute',
                top: '80px',
                left: '40px',
                width: '240px',
                height: '320px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                zIndex: 1,
                animation: 'float 3s ease-in-out infinite 2s',
                opacity: '0.6',
                border: '1px solid #f1f5f9'
              }}></div>

              {/* Enhanced Floating Icons */}
              <div style={{
                position: 'absolute',
                top: '-25px',
                right: '15px',
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 25px rgba(16,185,129,0.4)',
                animation: 'bounce 2s ease-in-out infinite',
                zIndex: 4,
                border: '3px solid rgba(255,255,255,0.3)'
              }}>
                <svg style={{color: 'white', width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '25px',
                right: '-15px',
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 20px rgba(251,191,36,0.4)',
                animation: 'bounce 2s ease-in-out infinite 1s',
                zIndex: 4,
                border: '3px solid rgba(255,255,255,0.3)'
              }}>
                <svg style={{color: 'white', width: '22px', height: '22px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          backdropFilter: 'blur(10px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '90px',
          height: '90px',
          background: 'linear-gradient(135deg, rgba(251,191,36,0.3), rgba(245,158,11,0.1))',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite 2s'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          width: '60px',
          height: '60px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
          animation: 'float 5s ease-in-out infinite 1s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '5%',
          width: '40px',
          height: '40px',
          background: 'rgba(251,191,36,0.2)',
          borderRadius: '50%',
          animation: 'float 7s ease-in-out infinite 3s'
        }}></div>
        
        {/* Geometric Shapes */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)',
          transform: 'rotate(45deg)',
          animation: 'rotate 20s linear infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '15%',
          width: '100px',
          height: '100px',
          border: '2px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          animation: 'float 8s ease-in-out infinite 1.5s'
        }}></div>
      </section>

      {/* Stats Section */}
      <section style={{
        backgroundColor: 'white',
        padding: '80px 24px',
        width: '100%',
        boxSizing: 'border-box',
        borderTop: '1px solid #f1f5f9'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '60px',
          textAlign: 'center'
        }}>
          {/* Stat 1 */}
          <div style={{
            animation: 'fadeInUp 0.8s ease-out 0.1s both'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#7c3aed',
              marginBottom: '12px',
              animation: 'countUp 2s ease-out 0.5s both'
            }}>50,000+</div>
            <div style={{
              fontSize: '18px',
              color: '#64748b',
              fontWeight: '600'
            }}>Resumes Created</div>
          </div>

          {/* Stat 2 */}
          <div style={{
            animation: 'fadeInUp 0.8s ease-out 0.2s both'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#10b981',
              marginBottom: '12px',
              animation: 'countUp 2s ease-out 0.7s both'
            }}>95%</div>
            <div style={{
              fontSize: '18px',
              color: '#64748b',
              fontWeight: '600'
            }}>Success Rate</div>
          </div>

          {/* Stat 3 */}
          <div style={{
            animation: 'fadeInUp 0.8s ease-out 0.3s both'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#f59e0b',
              marginBottom: '12px',
              animation: 'countUp 2s ease-out 0.9s both'
            }}>85</div>
            <div style={{
              fontSize: '18px',
              color: '#64748b',
              fontWeight: '600'
            }}>Template Designs</div>
          </div>

          {/* Stat 4 */}
          <div style={{
            animation: 'fadeInUp 0.8s ease-out 0.4s both'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#06b6d4',
              marginBottom: '12px',
              animation: 'countUp 2s ease-out 1.1s both'
            }}>24/7</div>
            <div style={{
              fontSize: '18px',
              color: '#64748b',
              fontWeight: '600'
            }}>AI Support</div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        padding: '100px 24px',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 style={{
            color: '#1f2937',
            fontSize: '48px',
            fontWeight: '900',
            marginBottom: '16px',
            animation: 'fadeInUp 0.8s ease-out'
          }}>Powerful Features</h2>
          <p style={{
            color: '#64748b',
            fontSize: '20px',
            maxWidth: '600px',
            margin: '0 auto',
            animation: 'fadeInUp 0.8s ease-out 0.2s both'
          }}>Everything you need to create professional resumes that stand out</p>
        </div>
        
        <div style={{
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '40px', 
          width: '100%'
        }}>
          {/* Feature 1 - AI Powered */}
          <div style={{
            textAlign: 'center',
            padding: '40px 32px',
            borderRadius: '16px',
            backgroundColor: 'white',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(124,58,237,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 24px rgba(124,58,237,0.3)'
            }}>
              <svg style={{color: 'white', width: '36px', height: '36px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 style={{
              color: '#1f2937',
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>AI-Powered Suggestions</h3>
            <p style={{
              color: '#64748b',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0
            }}>Get intelligent, context-aware suggestions for your resume sections using advanced AI models to enhance your professional profile.</p>
          </div>
          
          {/* Feature 2 - Multiple Templates */}
          <div style={{
            textAlign: 'center',
            padding: '40px 32px',
            borderRadius: '16px',
            backgroundColor: 'white',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(124,58,237,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 24px rgba(6,182,212,0.3)'
            }}>
              <svg style={{color: 'white', width: '36px', height: '36px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 style={{
              color: '#1f2937',
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>Professional Templates</h3>
            <p style={{
              color: '#64748b',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0
            }}>Choose from a curated collection of modern, ATS-friendly templates designed by professionals to make your resume stand out.</p>
          </div>
          
          {/* Feature 3 - One Click Download */}
          <div style={{
            textAlign: 'center',
            padding: '40px 32px',
            borderRadius: '16px',
            backgroundColor: 'white',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(124,58,237,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 24px rgba(16,185,129,0.3)'
            }}>
              <svg style={{color: 'white', width: '36px', height: '36px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 style={{
              color: '#1f2937',
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '16px',
              lineHeight: '1.3'
            }}>Instant Download</h3>
            <p style={{
              color: '#64748b',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0
            }}>Download your professionally formatted resume as a high-quality PDF with just one click, ready to impress employers.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        backgroundColor: '#f8fafc', 
        padding: '100px 24px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{
            color: '#1f2937',
            fontSize: '42px',
            fontWeight: '800',
            marginBottom: '16px'
          }}>What Our Users Say</h2>
          <p style={{
            color: '#64748b',
            fontSize: '18px',
            marginBottom: '60px',
            maxWidth: '600px',
            margin: '0 auto 60px auto'
          }}>Join thousands of professionals who've landed their dream jobs with ResumeGenie</p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginBottom: '80px'
          }}>
            {/* Testimonial 1 */}
            <div style={{
              backgroundColor: 'white',
              padding: '40px 32px',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9',
              animation: 'fadeInUp 0.8s ease-out 0.2s both',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
            }}>
              <div style={{
                color: '#fbbf24',
                fontSize: '24px',
                marginBottom: '16px'
              }}>★★★★★</div>
              <p style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '24px'
              }}>"ResumeGenie helped me land interviews at top tech companies. The AI suggestions were spot-on!"</p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600'
                }}>AS</div>
                <div>
                  <div style={{fontWeight: '600', color: '#1f2937'}}>Alex Smith</div>
                  <div style={{fontSize: '14px', color: '#64748b'}}>Software Engineer</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div style={{
              backgroundColor: 'white',
              padding: '40px 32px',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9',
              animation: 'fadeInUp 0.8s ease-out 0.4s both',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
            }}>
              <div style={{
                color: '#fbbf24',
                fontSize: '24px',
                marginBottom: '16px'
              }}>★★★★★</div>
              <p style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '24px'
              }}>"The templates are beautiful and professional. Got my dream job within 2 weeks!"</p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600'
                }}>MJ</div>
                <div>
                  <div style={{fontWeight: '600', color: '#1f2937'}}>Maria Johnson</div>
                  <div style={{fontSize: '14px', color: '#64748b'}}>Marketing Manager</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div style={{
              backgroundColor: 'white',
              padding: '40px 32px',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9',
              animation: 'fadeInUp 0.8s ease-out 0.6s both',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
            }}>
              <div style={{
                color: '#fbbf24',
                fontSize: '24px',
                marginBottom: '16px'
              }}>★★★★★</div>
              <p style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '24px'
              }}>"Simple, fast, and effective. This tool is a game-changer for job seekers!"</p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600'
                }}>DW</div>
                <div>
                  <div style={{fontWeight: '600', color: '#1f2937'}}>David Wilson</div>
                  <div style={{fontSize: '14px', color: '#64748b'}}>Product Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        backgroundColor: 'white', 
        padding: '100px 24px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{maxWidth: '600px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{
            color: '#1f2937',
            fontSize: '42px',
            fontWeight: '800',
            marginBottom: '16px'
          }}>Get In Touch</h2>
          <p style={{
            color: '#64748b',
            fontSize: '18px',
            marginBottom: '48px'
          }}>Have questions or feedback? We'd love to hear from you!</p>
          
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '48px',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            animation: 'fadeInUp 0.8s ease-out 0.3s both'
          }}>
            {/* Success/Error Messages */}
            {isSubmitting && (
              <div style={{
                backgroundColor: '#dbeafe',
                border: '2px solid #3b82f6',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid #bfdbfe',
                  borderRadius: '50%',
                  borderTop: '3px solid #3b82f6',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
                <div style={{
                  color: '#1d4ed8',
                  fontWeight: '500',
                  fontSize: '16px'
                }}>Sending your message...</div>
              </div>
            )}

            {submitStatus === 'success' && (
              <div style={{
                backgroundColor: '#d1fae5',
                border: '2px solid #10b981',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#10b981',
                  fontWeight: '600',
                  fontSize: '16px',
                  marginBottom: '4px'
                }}>✓ Message Sent Successfully!</div>
                <div style={{
                  color: '#059669',
                  fontSize: '14px'
                }}>Thank you for your feedback. We'll get back to you soon!</div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{
                backgroundColor: '#fee2e2',
                border: '2px solid #ef4444',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#ef4444',
                  fontWeight: '600',
                  fontSize: '16px',
                  marginBottom: '4px'
                }}>✗ Message Failed to Send</div>
                <div style={{
                  color: '#dc2626',
                  fontSize: '14px'
                }}>Our server might be down. Please try again later or contact us directly at support@resumegenie.com</div>
                <button 
                  onClick={() => setSubmitStatus(null)} 
                  style={{
                    marginTop: '12px',
                    background: 'none',
                    border: 'none',
                    color: '#6366f1',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Try again
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%', 
                    padding: '16px 20px', 
                    border: '2px solid #e2e8f0', 
                    borderRadius: '12px', 
                    fontSize: '16px',
                    color: '#1f2937',
                    backgroundColor: isSubmitting ? '#f9fafb' : 'white',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%', 
                    padding: '16px 20px', 
                    border: '2px solid #e2e8f0', 
                    borderRadius: '12px', 
                    fontSize: '16px',
                    color: '#1f2937',
                    backgroundColor: isSubmitting ? '#f9fafb' : 'white',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <textarea 
                name="message"
                placeholder="Your message..."
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                style={{
                  width: '100%', 
                  padding: '16px 20px', 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  fontSize: '16px', 
                  color: '#1f2937',
                  resize: 'vertical',
                  backgroundColor: isSubmitting ? '#f9fafb' : 'white',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              ></textarea>
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  background: isSubmitting 
                    ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' 
                    : 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  color: 'white', 
                  padding: '16px 32px', 
                  borderRadius: '12px', 
                  fontWeight: '600', 
                  border: 'none', 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  boxShadow: isSubmitting 
                    ? '0 4px 12px rgba(156,163,175,0.3)' 
                    : '0 8px 24px rgba(124,58,237,0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 32px rgba(124,58,237,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 24px rgba(124,58,237,0.3)';
                  }
                }}
              >
                {isSubmitting ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #ffffff40',
                      borderTop: '2px solid #ffffff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
        color: 'white',
        padding: '80px 24px 40px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '48px',
            marginBottom: '48px'
          }}>
            {/* Brand Section */}
            <div>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#7c3aed',
                marginBottom: '16px'
              }}>ResumeGenie</div>
              <p style={{
                color: '#94a3b8',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>Create professional resumes that get you noticed by top employers. Join thousands of successful job seekers.</p>
              <div style={{display: 'flex', gap: '16px'}}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#334155'}>
                  <svg style={{width: '20px', height: '20px'}} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#334155'}>
                  <svg style={{width: '20px', height: '20px'}} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#334155'}>
                  <svg style={{width: '20px', height: '20px'}} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.099.12.112.225.085.346-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '20px',
                color: 'white'
              }}>Quick Links</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <Link to="/" style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Home
                </Link>
                <Link to="/builder" style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Resume Builder
                </Link>
                <a href="#features" style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Features
                </a>
                <a href="#contact" style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Contact
                </a>
              </div>
            </div>
            
            {/* Support */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '20px',
                color: 'white'
              }}>Support</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <a href="#" style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Help Center
                </a>
                <a href="#" style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Privacy Policy
                </a>
                <a href="#" style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Terms of Service
                </a>
                <a href="mailto:support@resumegenie.com" style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  Contact Support
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid #334155',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{
              color: '#94a3b8',
              margin: 0,
              fontSize: '14px'
            }}>&copy; 2025 ResumeGenie. All rights reserved.</p>
            <div style={{
              display: 'flex',
              gap: '24px',
              fontSize: '14px'
            }}>
              <span style={{color: '#94a3b8'}}>Made with ❤️ for job seekers</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 10px 30px rgba(251,191,36,0.4);
          }
          50% {
            box-shadow: 0 15px 40px rgba(251,191,36,0.6);
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(45deg);
          }
          100% {
            transform: rotate(405deg);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes countUp {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          
          .hero-text {
            text-align: center !important;
          }
          
          .resume-mockup {
            margin-top: 40px;
          }
        }
      `}</style>
    </div>
  );
}