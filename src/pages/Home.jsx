import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicalTemplate from "../components/templates/ClassicalTemplate";
import EuropassTemplate from "../components/templates/EuropassTemplate";
import "./Home.css/"
import "../components/Footer.jsx/"
import Navbar from '../components/Navbar';


export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      text: "This CV builder helped me land my dream job at Google! The templates are clean and professional.",
      avatar: "👩‍💻"
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      text: "I created my CV in under 10 minutes. The Europass template was perfect for my European job applications.",
      avatar: "👨‍💼"
    },
    {
      name: "Emma Williams",
      role: "Graphic Designer",
      text: "Simple, elegant, and effective. I've recommended this to all my colleagues!",
      avatar: "👩‍🎨"
    }
  ];

  const stats = [
    { number: "50K+", label: "CVs Created" },
    { number: "95%", label: "Success Rate" },
    { number: "2 Min", label: "Average Time" },
    { number: "24/7", label: "Available" }
  ];

  const features = [
    { icon: '🎨', title: 'Beautiful Templates', desc: 'Choose from modern, ATS-friendly designs that get you noticed', color: '#ff6b6b' },
    { icon: '⚡', title: 'Lightning Fast', desc: 'Create your professional CV in under 5 minutes with our intuitive builder', color: '#4ecdc4' },
    { icon: '📱', title: 'Mobile Friendly', desc: 'Build and edit your CV on any device, anywhere, anytime', color: '#45b7d1' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Your data is encrypted and never shared with third parties', color: '#f7b731' },
    { icon: '💾', title: 'Auto-Save', desc: 'Never lose your progress with automatic cloud saving', color: '#5f27cd' },
    { icon: '🌍', title: 'Multi-Language', desc: 'Create CVs in multiple languages for global opportunities', color: '#00d2d3' }
  ];

  const steps = [
    { step: '01', title: 'Pick a Template', desc: 'Choose from our collection of professional, industry-specific templates', color: '#667eea' },
    { step: '02', title: 'Fill in Details', desc: 'Add your information with our easy-to-use form interface', color: '#764ba2' },
    { step: '03', title: 'Download & Share', desc: 'Export as PDF and start applying to your dream jobs', color: '#f093fb' }
  ];

  const sampleData = {
    classical: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "New York, USA"
    },
    europass: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+44 20 1234 5678",
      address: "London, UK"
    }
  };

 

  return (
    
    <div className="home-wrapper">

      <section ><Navbar /></section>
      
      <section className={`hero-enhanced ${isVisible ? 'visible' : ''}`}>
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Build Your Dream Career<br/>
            <span className="hero-highlight">One CV at a Time</span>
          </h1>
          <p className="hero-subtitle">
            Create a professional, ATS-friendly CV in minutes. No design skills needed.
          </p>
          <div className="hero-buttons">
            <Link to="/templates">
              <button className="btn-primary-hero">Start Building Now →</button>
            </Link>
          </div>
        </div>
      </section>

     
      <section className="stats-bar">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`stat-item ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

     
      <section className="section-features">
        <div className="section-container">
          <h2 className="section-title">Why Professionals Choose Us</h2>
          <p className="section-subtitle">Everything you need to create a standout CV</p>
          
          <div className="features-grid-enhanced">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card-enhanced"
                style={{ '--feature-color': feature.color }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title" style={{ color: feature.color }}>
                  {feature.title}
                </h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="section-steps">
        <div className="section-container">
          <h2 className="section-title">Create Your CV in 3 Simple Steps</h2>
          
          <div className="steps-grid">
            {steps.map((item, index) => (
              <div key={index} className="step-item">
                <div 
                  className="step-number" 
                  style={{ 
                    background: item.color,
                    boxShadow: `0 10px 25px ${item.color}40`
                  }}
                >
                  {item.step}
                </div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="section-testimonials">
        <div className="testimonials-container">
          <h2 className="section-title-white">What Our Users Say</h2>
          
          <div className="testimonial-card">
            <div className="testimonial-avatar">
              {testimonials[activeTestimonial].avatar}
            </div>
            <p className="testimonial-text">
              "{testimonials[activeTestimonial].text}"
            </p>
            <div className="testimonial-author">
              <div className="author-name">
                {testimonials[activeTestimonial].name}
              </div>
              <div className="author-role">
                {testimonials[activeTestimonial].role}
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`dot ${activeTestimonial === index ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="section-templates">
        <div className="section-container">
          <h2 className="section-title">Professional Templates for Every Career</h2>
          <p className="section-subtitle">
            From tech to healthcare, find the perfect design for your industry
          </p>
          
          <div className="templates-grid-enhanced">
            <div className="template-card-enhanced">
              <div className="template-badge">⭐ Popular</div>
              <div className="template-preview">
                <ClassicalTemplate formData={sampleData.classical} handleChange={() => {}} />
              </div>
              <div className="template-info">
                <h3 className="template-name">Classical Template</h3>
                <p className="template-desc">Timeless and professional design</p>
                <Link to="/templates">
                  <button className="btn-template classical">Use Template →</button>
                </Link>
              </div>
            </div>

            <div className="template-card-enhanced">
              <div className="template-preview">
                <EuropassTemplate formData={sampleData.europass} handleChange={() => {}} />
              </div>
              <div className="template-info">
                <h3 className="template-name">Europass Template</h3>
                <p className="template-desc">EU-standard format</p>
                <Link to="/templates">
                  <button className="btn-template europass">Use Template →</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="section-final-cta">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Land Your Dream Job?</h2>
          <p className="cta-subtitle">
            Join thousands of professionals who've built their perfect CV with us
          </p>
          <Link to="/templates">
            <button className="btn-final-cta">
              Create Your CV Now - It's Free! 🚀
            </button>
          </Link>
          <p className="cta-note">
            No credit card required • Takes less than 5 minutes
          </p>
        </div>
      </section>
    </div>
  );

}