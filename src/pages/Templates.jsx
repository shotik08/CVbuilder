import { useState } from "react";
import { Link } from "react-router-dom";

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const categories = [
    { id: "all", label: "All Templates", icon: "📋" },
    { id: "professional", label: "Professional", icon: "💼" },
    { id: "creative", label: "Creative", icon: "🎨" },
    { id: "academic", label: "Academic", icon: "🎓" },
  ];

  const templates = [
    {
      id: "classical",
      name: "Classical CV",
      description: "Simple, elegant design with a clear structure. Perfect for traditional industries.",
      category: "professional",
      features: ["ATS-Friendly", "Clean Layout", "Easy to Read"],
      color: "#0078ff",
      popular: true,
      preview: "📄"
    },
    {
      id: "europass",
      name: "Europass CV",
      description: "Official European CV format with detailed sections. Ideal for EU job applications.",
      category: "professional",
      features: ["EU Standard", "Comprehensive", "Multilingual"],
      color: "#004080",
      popular: false,
      preview: "🇪🇺"
    },
    {
      id: "modern",
      name: "Modern Pro",
      description: "Contemporary design with a professional touch. Great for tech and startup roles.",
      category: "creative",
      features: ["Modern Design", "Eye-catching", "Tech-focused"],
      color: "#9c27b0",
      popular: true,
      comingSoon: true,
      preview: "✨"
    },
    {
      id: "minimal",
      name: "Minimalist",
      description: "Clean and minimal design focusing on content. Perfect for designers and creatives.",
      category: "creative",
      features: ["Minimal Design", "Content-first", "Elegant"],
      color: "#607d8b",
      popular: false,
      comingSoon: true,
      preview: "⚪"
    },
    {
      id: "academic",
      name: "Academic CV",
      description: "Comprehensive format for academic positions. Ideal for researchers and professors.",
      category: "academic",
      features: ["Publication Ready", "Detailed", "Research-focused"],
      color: "#2e7d32",
      popular: false,
      comingSoon: true,
      preview: "📚"
    },
    {
      id: "executive",
      name: "Executive Resume",
      description: "Premium design for senior-level positions. Perfect for C-suite and leadership roles.",
      category: "professional",
      features: ["Premium Look", "Leadership-focused", "Impactful"],
      color: "#d32f2f",
      popular: false,
      comingSoon: true,
      preview: "👔"
    },
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="templates-page">
      {/* Hero Section */}
      <section className="templates-hero">
        <div className="templates-hero-content">
          <h1>Choose Your Perfect Template</h1>
          <p>Select from our collection of professionally designed CV templates. All templates are ATS-friendly and optimized for maximum impact.</p>
          <div className="templates-stats">
            <div className="stat-badge">
              <span className="stat-number">6</span>
              <span className="stat-label">Templates</span>
            </div>
            <div className="stat-badge">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Users</span>
            </div>
            <div className="stat-badge">
              <span className="stat-number">4.9/5</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="templates-filter-section">
        <div className="templates-container">
          <h2 className="filter-title">Browse by Category</h2>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="templates-grid-section">
        <div className="templates-container">
          <div className="templates-count">
            <p>Showing <strong>{filteredTemplates.length}</strong> template{filteredTemplates.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="templates-grid-enhanced">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`template-card-modern ${hoveredTemplate === template.id ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                style={{ "--template-color": template.color }}
              >
                {/* Badges */}
                <div className="template-badges">
                  {template.popular && (
                    <span className="badge-popular">⭐ Popular</span>
                  )}
                  {template.comingSoon && (
                    <span className="badge-coming">🚀 Coming Soon</span>
                  )}
                </div>

                {/* Preview */}
                <div 
                  className="template-preview-icon"
                  style={{ backgroundColor: `${template.color}15` }}
                >
                  <span style={{ fontSize: "4rem" }}>{template.preview}</span>
                </div>

                {/* Content */}
                <div className="template-content">
                  <h3 className="template-title">{template.name}</h3>
                  <p className="template-description">{template.description}</p>

                  {/* Features */}
                  <div className="template-features-list">
                    {template.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="template-action">
                    {template.comingSoon ? (
                      <button 
                        className="btn-template-disabled"
                        disabled
                      >
                        Coming Soon
                      </button>
                    ) : (
                      <Link to={`/builder?template=${template.id}`}>
                        <button 
                          className="btn-template-select"
                          style={{ backgroundColor: template.color }}
                        >
                          Use This Template →
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="templates-features-section">
        <div className="templates-container">
          <h2>Why Choose Our Templates?</h2>
          <div className="features-grid-templates">
            <div className="feature-item-template">
              <div className="feature-icon-large">🎯</div>
              <h3>ATS-Optimized</h3>
              <p>All templates are designed to pass Applicant Tracking Systems with ease.</p>
            </div>
            <div className="feature-item-template">
              <div className="feature-icon-large">📱</div>
              <h3>Responsive Design</h3>
              <p>Perfect formatting on all devices - desktop, tablet, and mobile.</p>
            </div>
            <div className="feature-item-template">
              <div className="feature-icon-large">✏️</div>
              <h3>Easy Customization</h3>
              <p>Modify colors, fonts, and layouts to match your personal brand.</p>
            </div>
            <div className="feature-item-template">
              <div className="feature-icon-large">⚡</div>
              <h3>Quick Setup</h3>
              <p>Fill in your information and download your CV in under 5 minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="templates-cta-section">
        <div className="templates-cta-content">
          <h2>Can't Decide? Start with Our Most Popular Template</h2>
          <p>The Classical CV is trusted by thousands of professionals worldwide</p>
          <Link to="/builder?template=classical">
            <button className="btn-cta-large">
              Get Started with Classical CV →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}