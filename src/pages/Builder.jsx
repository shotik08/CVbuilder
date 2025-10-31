import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClassicalTemplate from "../components/templates/ClassicalTemplate";
import EuropassTemplate from "../components/templates/EuropassTemplate";

export default function Builder() {
  const location = useLocation();
  const navigate = useNavigate();
  const template = new URLSearchParams(location.search).get("template") || "classical";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    address: "",
    phone: "",
  });

  const [customSections, setCustomSections] = useState([]);
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaved, setIsSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem(`cv-data-${template}`);
    const savedCustomSections = localStorage.getItem(`cv-custom-sections-${template}`);
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedCustomSections) {
      setCustomSections(JSON.parse(savedCustomSections));
    }
  }, [template]);

  
  useEffect(() => {
    const standardFields = Object.values(formData);
    const customFields = customSections.map(section => section.content);
    const allFields = [...standardFields, ...customFields];
    const filledFields = allFields.filter(field => field.trim() !== "").length;
    const percentage = Math.round((filledFields / allFields.length) * 100) || 0;
    setCompletionPercentage(percentage);
  }, [formData, customSections]);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`cv-data-${template}`, JSON.stringify(formData));
      localStorage.setItem(`cv-custom-sections-${template}`, JSON.stringify(customSections));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData, customSections, template]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCustomSectionChange = (id, value) => {
    setCustomSections(customSections.map(section => 
      section.id === id ? { ...section, content: value } : section
    ));
  };

  const handleAddCustomSection = () => {
    if (!newSectionTitle.trim()) {
      alert("Please enter a section title");
      return;
    }

    const newSection = {
      id: Date.now(),
      title: newSectionTitle,
      content: "",
      icon: "📌"
    };

    setCustomSections([...customSections, newSection]);
    setNewSectionTitle("");
    setShowAddSectionModal(false);
    setActiveSection(`custom-${newSection.id}`);
  };

  const handleDeleteCustomSection = (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      setCustomSections(customSections.filter(section => section.id !== id));
      setActiveSection("personal");
    }
  };

  const handleSave = () => {
    localStorage.setItem(`cv-data-${template}`, JSON.stringify(formData));
    localStorage.setItem(`cv-custom-sections-${template}`, JSON.stringify(customSections));
    alert("✅ CV saved successfully!");
  };

  const handleExport = () => {
    window.print();
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      setFormData({
        name: "",
        email: "",
        summary: "",
        experience: "",
        education: "",
        skills: "",
        address: "",
        phone: "",
      });
      setCustomSections([]);
      localStorage.removeItem(`cv-data-${template}`);
      localStorage.removeItem(`cv-custom-sections-${template}`);
    }
  };

  const handleChangeTemplate = () => {
    const newTemplate = template === "classical" ? "europass" : "classical";
    navigate(`/builder?template=${newTemplate}`);
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "summary", label: "Summary", icon: "📝" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "skills", label: "Skills", icon: "⚡" }
  ];

  
  const allSections = [
    ...sections,
    ...customSections.map(section => ({
      id: `custom-${section.id}`,
      label: section.title,
      icon: section.icon,
      isCustom: true,
      customId: section.id
    }))
  ];

  const renderFormSection = () => {
   
    if (activeSection.startsWith('custom-')) {
      const customId = parseInt(activeSection.replace('custom-', ''));
      const section = customSections.find(s => s.id === customId);
      
      if (!section) return null;

      return (
        <div className="form-section">
          <div className="custom-section-header">
            <h3>{section.title}</h3>
            <button 
              className="btn-delete-section"
              onClick={() => handleDeleteCustomSection(section.id)}
              title="Delete section"
            >
              🗑️ Delete
            </button>
          </div>
          <div className="form-group">
            <label htmlFor={`custom-${section.id}`}>Content</label>
            <textarea
              id={`custom-${section.id}`}
              value={section.content}
              onChange={(e) => handleCustomSectionChange(section.id, e.target.value)}
              placeholder={`Add content for ${section.title}...`}
              rows="6"
            />
            <small>Add any relevant information for this section</small>
          </div>
        </div>
      );
    }

    
    switch (activeSection) {
      case "personal":
        return (
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john.doe@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +1 (555) 123-4567"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. New York, NY"
              />
            </div>
          </div>
        );
      
      case "summary":
        return (
          <div className="form-section">
            <h3>Professional Summary</h3>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Write a brief professional summary (2-3 sentences about your experience and career goals)"
                rows="5"
              />
              <small>{formData.summary.length} characters</small>
            </div>
          </div>
        );
      
      case "experience":
        return (
          <div className="form-section">
            <h3>Work Experience</h3>
            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="List your work experience (Company, Position, Duration, Responsibilities)"
                rows="6"
              />
              <small>Tip: Include company name, position, dates, and key achievements</small>
            </div>
          </div>
        );
      
      case "education":
        return (
          <div className="form-section">
            <h3>Education</h3>
            <div className="form-group">
              <label htmlFor="education">Education</label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="List your education (Degree, Institution, Year)"
                rows="5"
              />
              <small>Tip: Include degree, major, institution, and graduation year</small>
            </div>
          </div>
        );
      
      case "skills":
        return (
          <div className="form-section">
            <h3>Skills</h3>
            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="List your skills separated by commas (e.g. JavaScript, React, Node.js)"
                rows="4"
              />
              <small>Tip: Separate skills with commas for better formatting</small>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  
  const templateData = {
    ...formData,
    customSections: customSections
  };

  return (
    <div className="builder-wrapper">
      
      <div className="progress-bar-container">
        <div className="progress-info">
          <span>CV Completion</span>
          <span className="progress-percentage">{completionPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="builder-container">
        
        <div className="builder-sidebar">
          <div className="builder-header">
            <h2>
              {template === "europass" ? "🇪🇺 Europass CV" : "📄 Classical CV"}
            </h2>
            <button 
              className="btn-change-template" 
              onClick={handleChangeTemplate}
              title="Switch template"
            >
              🔄 Switch
            </button>
          </div>

         
          {isSaved && (
            <div className="auto-save-indicator">
              ✓ Auto-saved
            </div>
          )}

        
          <div className="section-nav">
            {allSections.map((section) => (
              <div key={section.id} className="section-nav-item">
                <button
                  className={`section-nav-btn ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="section-icon">{section.icon}</span>
                  <span className="section-label">{section.label}</span>
                </button>
              </div>
            ))}
            
            
            <button 
              className="btn-add-section"
              onClick={() => setShowAddSectionModal(true)}
            >
              <span className="section-icon">➕</span>
              <span className="section-label">Add Custom Section</span>
            </button>
          </div>

        
          <div className="form-content">
            {renderFormSection()}
          </div>

        
          <div className="builder-actions">
            <button className="btn-secondary" onClick={handleClear}>
              🗑️ Clear All
            </button>
            <button className="btn-secondary" onClick={handleSave}>
              💾 Save
            </button>
            <button className="btn-primary" onClick={handleExport}>
              📥 Export PDF
            </button>
          </div>
        </div>

        
        <div className="builder-preview">
          <div className="preview-header">
            <h3>Live Preview</h3>
            <button 
              className="btn-toggle-preview"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "👁️ Hide" : "👁️ Show"}
            </button>
          </div>
          
          <div className={`preview-content ${showPreview ? 'mobile-show' : 'mobile-hide'}`}>
            <div className="preview-paper">
              {template === "europass" ? (
                <EuropassTemplate formData={templateData} handleChange={handleChange} />
              ) : (
                <ClassicalTemplate formData={templateData} handleChange={handleChange} />
              )}
            </div>
          </div>
        </div>
      </div>

    
      {showAddSectionModal && (
        <div className="modal-overlay" onClick={() => setShowAddSectionModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Custom Section</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddSectionModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-description">
                Add a custom section to your CV. Examples: Certifications, Languages, Projects, Awards, etc.
              </p>
              <div className="form-group">
                <label htmlFor="section-title">Section Title</label>
                <input
                  type="text"
                  id="section-title"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  placeholder="e.g. Certifications, Languages, Projects"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddCustomSection();
                    }
                  }}
                />
              </div>
              <div className="quick-suggestions">
                <p className="suggestions-label">Quick suggestions:</p>
                <div className="suggestion-chips">
                  {['Certifications', 'Languages', 'Projects', 'Awards', 'Volunteer Work', 'Publications'].map(suggestion => (
                    <button
                      key={suggestion}
                      className="suggestion-chip"
                      onClick={() => setNewSectionTitle(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowAddSectionModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleAddCustomSection}
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}