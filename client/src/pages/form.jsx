import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Builder() {
  const location = useLocation();
  const templateData = location.state?.templateData;
  const templateTitle = location.state?.templateTitle;

  // Personal Information
  const [fullName, setFullName] = useState(templateData?.personalInfo?.name || "");
  const [email, setEmail] = useState(templateData?.personalInfo?.email || "");
  const [phone, setPhone] = useState(templateData?.personalInfo?.phone || "");
  const [address, setAddress] = useState(templateData?.personalInfo?.address || "");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [githubProfile, setGithubProfile] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [photoPosition, setPhotoPosition] = useState('center');
  const [photoBorderStyle, setPhotoBorderStyle] = useState('circle');

  // Font Customization
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('14');
  const [fontColor, setFontColor] = useState('#000000');
  const [headingColor, setHeadingColor] = useState('#7c3aed');
  const [companyColor, setCompanyColor] = useState('#7c3aed');

  // Professional Summary
  const [careerObjective, setCareerObjective] = useState(templateData?.summary || "");

  // Technical Skills
  const [skills, setSkills] = useState(templateData?.skills?.join(", ") || "");

  // Work Experience
  const [experiences, setExperiences] = useState(templateData?.experience || [
    {
      position: "",
      company: "",
      duration: "",
      description: ""
    }
  ]);

  // Projects
  const [projects, setProjects] = useState([
    {
      title: "",
      description: ""
    }
  ]);

  // Education
  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      year: "",
      gpa: ""
    }
  ]);

  // Achievements
  const [achievements, setAchievements] = useState([""]);

  // Languages
  const [languages, setLanguages] = useState([
    {
      language: "",
      fluency: ""
    }
  ]);

  // Add global styles to fix viewport issues
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.width = '100%';
    document.documentElement.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.width = '';
      document.body.style.overflowX = '';
      document.documentElement.style.width = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  const addExperience = () => {
    setExperiences([...experiences, { position: "", company: "", duration: "", description: "" }]);
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      const newExperiences = experiences.filter((_, i) => i !== index);
      setExperiences(newExperiences);
    }
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "" }]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      const newProjects = projects.filter((_, i) => i !== index);
      setProjects(newProjects);
    }
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "", gpa: "" }]);
  };

  const removeEducation = (index) => {
    if (education.length > 1) {
      const newEducation = education.filter((_, i) => i !== index);
      setEducation(newEducation);
    }
  };

  const addAchievement = () => {
    setAchievements([...achievements, ""]);
  };

  const removeAchievement = (index) => {
    if (achievements.length > 1) {
      const newAchievements = achievements.filter((_, i) => i !== index);
      setAchievements(newAchievements);
    }
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: "", fluency: "" }]);
  };

  const removeLanguage = (index) => {
    if (languages.length > 1) {
      const newLanguages = languages.filter((_, i) => i !== index);
      setLanguages(newLanguages);
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePhoto = () => {
    setProfilePhoto(null);
    setProfilePhotoPreview(null);
  };

  const handleSave = async () => {
    try {
      const resumeData = {
        personalInfo: {
          name: fullName,
          email: email,
          phone: phone,
          address: address,
          linkedin: linkedinProfile,
          github: githubProfile,
          profilePhoto: profilePhotoPreview
        },
        summary: careerObjective,
        skills: skills,
        experience: experiences,
        projects: projects,
        education: education,
        achievements: achievements,
        templateTitle: templateTitle,
        savedAt: new Date().toISOString()
      };

      // Save to localStorage as draft
      const savedDrafts = JSON.parse(localStorage.getItem('resumeDrafts') || '[]');
      const draftId = `draft_${Date.now()}`;
      const newDraft = {
        id: draftId,
        name: fullName || 'Untitled Resume',
        data: resumeData,
        savedAt: new Date().toISOString()
      };

      savedDrafts.push(newDraft);
      localStorage.setItem('resumeDrafts', JSON.stringify(savedDrafts));

      console.log('Saving resume data:', resumeData);
      
      // Show success feedback
      alert(`Resume draft saved successfully! \nDraft ID: ${draftId}\nSaved at: ${new Date().toLocaleString()}\n\nYour draft is saved locally and will be available for future editing.`);
      
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Error saving resume draft. Please try again.');
    }
  };

  const handleGenerateResume = () => {
    // Create resume data object
    const resumeData = {
      personalInfo: {
        name: fullName,
        email: email,
        phone: phone,
        address: address,
        linkedin: linkedinProfile,
        github: githubProfile,
        profilePhoto: profilePhotoPreview,
        photoPosition: photoPosition,
        photoBorderStyle: photoBorderStyle
      },
      summary: careerObjective,
      skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      experience: experiences.filter(exp => exp.position || exp.company),
      projects: projects.filter(proj => proj.title || proj.description),
      education: education.filter(edu => edu.degree || edu.institution),
      achievements: achievements.filter(achievement => achievement.trim()),
      languages: languages.filter(lang => lang.language),
      fontSettings: {
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontColor: fontColor,
        headingColor: headingColor,
        companyColor: companyColor
      }
    };

    // Generate HTML resume
    const resumeHTML = generateResumeHTML(resumeData);
    
    // Create and download PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(resumeHTML);
    printWindow.document.close();
    
    // Auto-print to save as PDF
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const generateResumeHTML = (data) => {
    // Get font settings
    const fontSettings = data.fontSettings || {};
    const selectedFontFamily = fontSettings.fontFamily || 'Arial';
    const selectedFontSize = fontSettings.fontSize || '14';
    const selectedFontColor = fontSettings.fontColor || '#000000';
    const selectedHeadingColor = fontSettings.headingColor || '#7c3aed';
    const selectedCompanyColor = fontSettings.companyColor || '#7c3aed';

    // Get photo styles based on user preferences
    const getPhotoStyles = () => {
      const position = data.personalInfo.photoPosition || 'center';
      const borderStyle = data.personalInfo.photoBorderStyle || 'circle';
      
      let photoCSS = {
        width: '120px',
        height: '120px',
        border: '3px solid #7c3aed',
        objectFit: 'cover',
        display: 'block'
      };
      
      // Apply border style
      if (borderStyle === 'circle') {
        photoCSS.borderRadius = '50%';
      } else if (borderStyle === 'square') {
        photoCSS.borderRadius = '8px';
      } else if (borderStyle === 'passport') {
        photoCSS.width = '100px';
        photoCSS.height = '130px';
        photoCSS.borderRadius = '4px';
      }
      
      // Apply position
      if (position === 'left') {
        photoCSS.margin = '0 20px 20px 0';
        photoCSS.float = 'left';
      } else if (position === 'right') {
        photoCSS.margin = '0 0 20px 20px';
        photoCSS.float = 'right';
      } else {
        photoCSS.margin = '0 auto 20px auto';
      }
      
      return Object.entries(photoCSS).map(([key, value]) => 
        `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`
      ).join('; ');
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Resume</title>
      <style>
        @media print {
          @page {
            margin: 0.5in;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          /* Remove headers and footers */
          @page :first {
            margin-top: 0.5in;
          }
          @page :left {
            margin-left: 0.5in;
            margin-right: 0.5in;
          }
          @page :right {
            margin-left: 0.5in;
            margin-right: 0.5in;
          }
        }
        
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        body { 
          font-family: '${selectedFontFamily}', Arial, sans-serif; 
          font-size: ${selectedFontSize}px;
          line-height: 1.6; 
          color: ${selectedFontColor}; 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 40px;
          background: white;
        }
        
        .header { 
          text-align: ${data.personalInfo.photoPosition === 'left' || data.personalInfo.photoPosition === 'right' ? 'left' : 'center'}; 
          margin-bottom: 30px; 
          border-bottom: 3px solid ${selectedHeadingColor}; 
          padding-bottom: 20px;
          overflow: hidden;
        }
        
        .profile-photo {
          ${getPhotoStyles()}
        }
        
        .header-content {
          ${data.personalInfo.photoPosition === 'left' || data.personalInfo.photoPosition === 'right' ? 'display: inline-block; vertical-align: top;' : ''}
        }
        
        .name { 
          font-family: '${selectedFontFamily}', Arial, sans-serif;
          font-size: 32px; 
          font-weight: bold; 
          color: ${selectedFontColor}; 
          margin-bottom: 10px; 
        }
        
        .contact { 
          color: #6b7280; 
          font-size: 14px; 
          display: flex; 
          ${data.personalInfo.photoPosition === 'center' ? 'justify-content: center;' : 'justify-content: flex-start;'}
          gap: 20px; 
          flex-wrap: wrap;
        }
        
        .contact a {
          color: ${selectedHeadingColor};
          text-decoration: none;
        }
        
        .contact a:hover {
          text-decoration: underline;
        }
        
        .section { 
          margin-bottom: 25px; 
          clear: both;
        }
        
        .section-title { 
          font-family: '${selectedFontFamily}', Arial, sans-serif;
          font-size: 20px; 
          font-weight: bold; 
          color: ${selectedHeadingColor}; 
          margin-bottom: 12px; 
          border-bottom: 1px solid #e5e7eb; 
          padding-bottom: 5px; 
        }
        
        .experience-item, .education-item, .project-item { 
          margin-bottom: 15px; 
        }
        
        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .job-title { 
          font-family: '${selectedFontFamily}', Arial, sans-serif;
          font-size: 16px; 
          font-weight: bold; 
          color: ${selectedFontColor}; 
        }
        
        .company { 
          color: ${selectedCompanyColor}; 
          font-weight: 600; 
          margin-bottom: 5px; 
        }
        
        .duration { 
          color: #6b7280; 
          font-size: 14px; 
          font-weight: 500;
          text-align: right;
          white-space: nowrap;
        }
        
        .description { 
          color: #374151; 
          font-size: 14px; 
          margin-bottom: 8px; 
        }
        
        .skills { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 10px; 
        }
        
        .skill-tag { 
          background: #f0f4ff; 
          color: ${selectedHeadingColor}; 
          padding: 6px 12px; 
          border-radius: 20px; 
          font-size: 12px; 
          font-weight: 500; 
        }
        
        .achievements ul { 
          list-style: none; 
          padding-left: 0; 
        }
        
        .achievements li { 
          margin-bottom: 8px; 
          position: relative; 
          padding-left: 20px; 
        }
        
        .achievements li:before { 
          content: "•"; 
          color: ${selectedHeadingColor}; 
          font-weight: bold; 
          position: absolute; 
          left: 0; 
        }
      </style>
    </head>
    <body>
      <div class="header">
        ${data.personalInfo.profilePhoto ? `<img src="${data.personalInfo.profilePhoto}" alt="Profile Photo" class="profile-photo">` : ''}
        <div class="header-content">
          <h1 class="name">${data.personalInfo.name || 'Your Name'}</h1>
          <div class="contact">
            ${data.personalInfo.email ? `<span> <a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a></span>` : ''}
            ${data.personalInfo.phone ? `<span> ${data.personalInfo.phone}</span>` : ''}
            ${data.personalInfo.address ? `<span> ${data.personalInfo.address}</span>` : ''}
            ${data.personalInfo.linkedin ? `<span> <a href="${data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : 'https://linkedin.com/in/' + data.personalInfo.linkedin}" target="_blank">${data.personalInfo.linkedin}</a></span>` : ''}
            ${data.personalInfo.github ? `<span> <a href="${data.personalInfo.github.startsWith('http') ? data.personalInfo.github : 'https://github.com/' + data.personalInfo.github}" target="_blank">${data.personalInfo.github}</a></span>` : ''}
          </div>
        </div>
      </div>

      ${data.summary ? `
        <div class="section">
          <h2 class="section-title">Professional Summary</h2>
          <p class="description">${data.summary}</p>
        </div>
      ` : ''}

      ${data.skills && data.skills.length ? `
        <div class="section">
          <h2 class="section-title">Technical Skills</h2>
          <div class="skills">
            ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${data.experience && data.experience.length ? `
        <div class="section">
          <h2 class="section-title">Work Experience</h2>
          ${data.experience.map(exp => `
            <div class="experience-item">
              <div class="experience-header">
                <div>
                  <div class="job-title">${exp.position || ''}</div>
                  <div class="company">${exp.company || ''}</div>
                </div>
                <div class="duration">${exp.duration || ''}</div>
              </div>
              <div class="description">${exp.description || ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.projects && data.projects.length ? `
        <div class="section">
          <h2 class="section-title">Projects</h2>
          ${data.projects.map(proj => `
            <div class="project-item">
              <div class="job-title">${proj.title || ''}</div>
              <div class="description">${proj.description || ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education && data.education.length ? `
        <div class="section">
          <h2 class="section-title">Education</h2>
          ${data.education.map(edu => `
            <div class="education-item">
              <div class="job-title">${edu.degree || ''}</div>
              <div class="company">${edu.institution || ''}</div>
              <div class="duration">${edu.year || ''} ${edu.gpa ? `• GPA: ${edu.gpa}` : ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.achievements && data.achievements.length ? `
        <div class="section achievements">
          <h2 class="section-title">Achievements & Certifications</h2>
          <ul>
            ${data.achievements.map(achievement => `<li>${achievement || ''}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${data.languages && data.languages.length ? `
        <div class="section">
          <h2 class="section-title">Languages</h2>
          <div class="skills">
            ${data.languages.map(lang => `<span class="skill-tag">${lang.language}${lang.fluency ? ` - ${lang.fluency}` : ''}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    </body>
    </html>
    `;
  };

  return (
    <>
      <style>{`
        .resume-form input, 
        .resume-form textarea, 
        .resume-form select {
          color: #000000 !important;
          background-color: #ffffff !important;
        }
        .resume-form input::placeholder, 
        .resume-form textarea::placeholder {
          color: #6b7280 !important;
        }
      `}</style>
      <div style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '24px',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}>
      <div className="resume-form" style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '2px solid #f1f5f9'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#7c3aed',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <svg style={{color: 'white', width: '28px', height: '28px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '8px'
          }}>Fill Your Details</h1>
          {templateTitle && (
            <p style={{
              color: '#7c3aed',
              fontSize: '16px',
              fontWeight: '500'
            }}>Using template: {templateTitle}</p>
          )}
        </div>

        <form style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
          {/* Personal Information */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#7c3aed',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Personal Information
            </h2>

            {/* Profile Photo Section */}
            <div style={{
              marginBottom: '24px',
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '2px dashed #d1d5db'
            }}>
              <label style={{
                display: 'block',
                marginBottom: '12px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '16px'
              }}>
                Profile Photo
              </label>
              
              {profilePhotoPreview ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <img
                    src={profilePhotoPreview}
                    alt="Profile Preview"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #7c3aed'
                    }}
                  />
                  <div>
                    <button
                      type="button"
                      onClick={removeProfilePhoto}
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginRight: '8px'
                      }}
                    >
                      Remove Photo
                    </button>
                    <label
                      style={{
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'inline-block'
                      }}
                    >
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePhotoChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <svg width="32" height="32" fill="none" stroke="#9ca3af" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}>
                    Upload a professional headshot (optional)
                  </p>
                  <label
                    style={{
                      backgroundColor: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'inline-block',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#6d28d9'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#7c3aed'}
                  >
                    Choose Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}
              
              {/* Photo Customization Options */}
              {profilePhotoPreview && (
                <div style={{
                  marginTop: '20px',
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    margin: '0 0 16px 0',
                    color: '#374151',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Photo Settings
                  </h4>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px'
                  }}>
                    {/* Photo Position */}
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#6b7280'
                      }}>
                        Position
                      </label>
                      <select
                        value={photoPosition}
                        onChange={(e) => setPhotoPosition(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          backgroundColor: 'white',
                          fontSize: '12px',
                          color: '#374151'
                        }}
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    
                    {/* Photo Border Style */}
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#6b7280'
                      }}>
                        Border Style
                      </label>
                      <select
                        value={photoBorderStyle}
                        onChange={(e) => setPhotoBorderStyle(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          backgroundColor: 'white',
                          fontSize: '12px',
                          color: '#374151'
                        }}
                      >
                        <option value="circle">Circle</option>
                        <option value="square">Square</option>
                        <option value="passport">Passport Size</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Font Customization Section */}
            <div style={{
              marginBottom: '24px',
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '2px dashed #d1d5db'
            }}>
              <h4 style={{
                margin: '0 0 16px 0',
                color: '#374151',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Font Customization
              </h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '16px',
                marginBottom: '16px'
              }}>
                {/* Font Family */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280'
                  }}>
                    Font Style
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                      fontSize: '12px',
                      color: '#374151'
                    }}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                </div>
                
                {/* Font Size */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280'
                  }}>
                    Font Size
                  </label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                      fontSize: '12px',
                      color: '#374151'
                    }}
                  >
                    <option value="12">12px</option>
                    <option value="13">13px</option>
                    <option value="14">14px</option>
                    <option value="15">15px</option>
                    <option value="16">16px</option>
                    <option value="18">18px</option>
                  </select>
                </div>
                
                {/* Text Color */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280'
                  }}>
                    Text Color
                  </label>
                  <select
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                      fontSize: '12px',
                      color: '#374151'
                    }}
                  >
                    <option value="#000000">Black</option>
                    <option value="#374151">Dark Gray</option>
                    <option value="#6b7280">Gray</option>
                    <option value="#1f2937">Charcoal</option>
                    <option value="#7c3aed">Purple</option>
                    <option value="#2563eb">Blue</option>
                    <option value="#059669">Green</option>
                    <option value="#dc2626">Red</option>
                    <option value="#d97706">Orange</option>
                    <option value="#7c2d12">Brown</option>
                  </select>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
              }}>
                {/* Heading Color */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280'
                  }}>
                    Heading Color
                  </label>
                  <select
                    value={headingColor}
                    onChange={(e) => setHeadingColor(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                      fontSize: '12px',
                      color: '#374151'
                    }}
                  >
                    <option value="#000000">Black</option>
                    <option value="#374151">Dark Gray</option>
                    <option value="#6b7280">Gray</option>
                    <option value="#1f2937">Charcoal</option>
                    <option value="#7c3aed">Purple</option>
                    <option value="#2563eb">Blue</option>
                    <option value="#059669">Green</option>
                    <option value="#dc2626">Red</option>
                    <option value="#d97706">Orange</option>
                    <option value="#7c2d12">Brown</option>
                  </select>
                </div>
                
                {/* Company Color */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280'
                  }}>
                    Company Color
                  </label>
                  <select
                    value={companyColor}
                    onChange={(e) => setCompanyColor(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                      fontSize: '12px',
                      color: '#374151'
                    }}
                  >
                    <option value="#000000">Black</option>
                    <option value="#374151">Dark Gray</option>
                    <option value="#6b7280">Gray</option>
                    <option value="#1f2937">Charcoal</option>
                    <option value="#7c3aed">Purple</option>
                    <option value="#2563eb">Blue</option>
                    <option value="#059669">Green</option>
                    <option value="#dc2626">Red</option>
                    <option value="#d97706">Orange</option>
                    <option value="#7c2d12">Brown</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                  Full Name*
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease',
                    color: '#000000',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              
              <div>
                <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                  Phone Number*
                </label>
                <input
                  type="tel"
                  placeholder="+1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div>
              <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                Email*
              </label>
              <input
                type="email"
                placeholder="john.doe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  marginBottom: '16px',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div>
              <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                Address
              </label>
              <input
                type="text"
                placeholder="City, State, Country"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  marginBottom: '16px',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                  LinkedIn Profile (Optional)
                </label>
                <input
                  type="url"
                  placeholder="linkedin.com/in/profile"
                  value={linkedinProfile}
                  onChange={(e) => setLinkedinProfile(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              
              <div>
                <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                  GitHub Profile (Optional)
                </label>
                <input
                  type="url"
                  placeholder="github.com/profile"
                  value={githubProfile}
                  onChange={(e) => setGithubProfile(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#7c3aed',
              marginBottom: '20px'
            }}>Professional Summary</h2>
            
            <div>
              <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                Career Objective / Summary*
              </label>
              <textarea
                placeholder="e.g. Software Engineer with 7 years of experience..."
                value={careerObjective}
                onChange={(e) => setCareerObjective(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#7c3aed',
              marginBottom: '20px'
            }}>Technical Skills</h2>
            
            <div>
              <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                Skills*
              </label>
              <input
                type="text"
                placeholder="e.g. JavaScript, React, Node.js, Python, SQL"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button
                type="button"
                style={{
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginTop: '8px',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
                onClick={() => alert("AI skill generation coming soon!")}
              >
                ✨ AI Generate Skills
              </button>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#7c3aed',
              marginBottom: '20px'
            }}>Work Experience</h2>
            
            {experiences.map((exp, index) => (
              <div key={index} style={{
                border: '2px solid #f3f4f6',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '16px',
                position: 'relative'
              }}>
                {/* Delete Button */}
                {experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(239,68,68,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ef4444';
                      e.target.style.transform = 'translateY(0px)';
                    }}
                    title="Delete Experience"
                  >
                    Delete
                  </button>
                )}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                      Role/Position*
                    </label>
                    <input
                      type="text"
                      placeholder="Software Engineer"
                      value={exp.position}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].position = e.target.value;
                        setExperiences(newExperiences);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease',
                        color: '#000000',
                        backgroundColor: '#ffffff'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  <div>
                    <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                      Company*
                    </label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].company = e.target.value;
                        setExperiences(newExperiences);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease',
                        color: '#000000',
                        backgroundColor: '#ffffff'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>
                
                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                    Duration*
                  </label>
                  <input
                    type="text"
                    placeholder="June 2020 - Present"
                    value={exp.duration}
                    onChange={(e) => {
                      const newExperiences = [...experiences];
                      newExperiences[index].duration = e.target.value;
                      setExperiences(newExperiences);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                    Description*
                  </label>
                  <textarea
                    placeholder="Describe your key responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) => {
                      const newExperiences = [...experiences];
                      newExperiences[index].description = e.target.value;
                      setExperiences(newExperiences);
                    }}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addExperience}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              + Add Experience
            </button>
          </div>

          {/* Projects */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#7c3aed',
              marginBottom: '20px'
            }}>Projects</h2>
            
            {projects.map((project, index) => (
              <div key={index} style={{
                border: '2px solid #f3f4f6',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '16px',
                position: 'relative'
              }}>
                {/* Delete Button */}
                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(239,68,68,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ef4444';
                      e.target.style.transform = 'translateY(0px)';
                    }}
                    title="Delete Project"
                  >
                    Delete
                  </button>
                )}
                <div style={{marginBottom: '16px'}}>
                  <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                    Project Title*
                  </label>
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={project.title}
                    onChange={(e) => {
                      const newProjects = [...projects];
                      newProjects[index].title = e.target.value;
                      setProjects(newProjects);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                    Project Description*
                  </label>
                  <textarea
                    placeholder="Describe your project, technologies used, and achievements..."
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...projects];
                      newProjects[index].description = e.target.value;
                      setProjects(newProjects);
                    }}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addProject}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              + Add Project
            </button>
          </div>

          {/* Education */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#7c3aed',
              marginBottom: '20px'
            }}>Education</h2>
            
            {education.map((edu, index) => (
              <div key={index} style={{
                border: '2px solid #f3f4f6',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '16px',
                position: 'relative'
              }}>
                {/* Delete Button */}
                {education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(239,68,68,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ef4444';
                      e.target.style.transform = 'translateY(0px)';
                    }}
                    title="Delete Education"
                  >
                    Delete
                  </button>
                )}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                      Degree/Course*
                    </label>
                    <input
                      type="text"
                      placeholder="B.S. Computer Science"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...education];
                        newEducation[index].degree = e.target.value;
                        setEducation(newEducation);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  <div>
                    <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                      Institution*
                    </label>
                    <input
                      type="text"
                      placeholder="University Name"
                      value={edu.institution}
                      onChange={(e) => {
                        const newEducation = [...education];
                        newEducation[index].institution = e.target.value;
                        setEducation(newEducation);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  <div>
                    <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                      Year*
                    </label>
                    <input
                      type="text"
                      placeholder="2020"
                      value={edu.year}
                      onChange={(e) => {
                        const newEducation = [...education];
                        newEducation[index].year = e.target.value;
                        setEducation(newEducation);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  <div>
                    <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                      GPA/Percentage
                    </label>
                    <input
                      type="text"
                      placeholder="3.8/4.0"
                      value={edu.gpa}
                      onChange={(e) => {
                        const newEducation = [...education];
                        newEducation[index].gpa = e.target.value;
                        setEducation(newEducation);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addEducation}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              + Add Education
            </button>
          </div>

          {/* Achievements */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#7c3aed',
              marginBottom: '20px'
            }}>Achievements & Certifications</h2>
            
            {achievements.map((achievement, index) => (
              <div key={index} style={{
                border: '2px solid #f3f4f6',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '16px',
                position: 'relative'
              }}>
                {/* Delete Button */}
                {achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(239,68,68,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ef4444';
                      e.target.style.transform = 'translateY(0px)';
                    }}
                    title="Delete Achievement"
                  >
                    Delete
                  </button>
                )}
                <input
                  type="text"
                  placeholder="Achievement/Certification"
                  value={achievement}
                  onChange={(e) => {
                    const newAchievements = [...achievements];
                    newAchievements[index] = e.target.value;
                    setAchievements(newAchievements);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            ))}
            
            <button
              type="button"
              onClick={addAchievement}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              + Add Achievement
            </button>
          </div>

          {/* Languages Section */}
          <div style={{
            marginBottom: '32px',
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#7c3aed',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>Languages</h2>
            
            {languages.map((lang, index) => (
              <div key={index} style={{
                border: '2px solid #f3f4f6',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '16px',
                position: 'relative'
              }}>
                {/* Delete Button */}
                {languages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(239,68,68,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ef4444';
                      e.target.style.transform = 'translateY(0px)';
                    }}
                    title="Delete Language"
                  >
                    Delete
                  </button>
                )}
                
                <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                      Language*
                    </label>
                    <select
                      value={lang.language}
                      onChange={(e) => {
                        const newLanguages = [...languages];
                        newLanguages[index].language = e.target.value;
                        setLanguages(newLanguages);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    >
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Korean">Korean</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Portuguese">Portuguese</option>
                      <option value="Russian">Russian</option>
                      <option value="Italian">Italian</option>
                      <option value="Dutch">Dutch</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Kannada">Kannada</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="Urdu">Urdu</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151'}}>
                      Fluency (Optional)
                    </label>
                    <select
                      value={lang.fluency}
                      onChange={(e) => {
                        const newLanguages = [...languages];
                        newLanguages[index].fluency = e.target.value;
                        setLanguages(newLanguages);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    >
                      <option value="">Select Fluency</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Basic">Basic</option>
                      <option value="Beginner">Beginner</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addLanguage}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              + Add Language
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            paddingTop: '32px',
            borderTop: '2px solid #f1f5f9'
          }}>
            <button
              type="button"
              onClick={handleGenerateResume}
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 32px rgba(124,58,237,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0px)';
                e.target.style.boxShadow = '0 8px 24px rgba(124,58,237,0.3)';
              }}
            >
              Generate Resume
            </button>
            
            <button
              type="button"
              onClick={handleSave}
              style={{
                backgroundColor: 'white',
                color: '#7c3aed',
                padding: '16px 32px',
                borderRadius: '12px',
                border: '2px solid #7c3aed',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#7c3aed';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#7c3aed';
                e.target.style.transform = 'translateY(0px)';
              }}
            >
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
