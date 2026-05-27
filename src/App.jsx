import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [skillsAnimated, setSkillsAnimated] = useState(false);

  // Trigger skills animation when navigating to the skills tab
  useEffect(() => {
    if (activeTab === 'skills') {
      // Small timeout to allow component rendering before starting transitions
      const timer = setTimeout(() => setSkillsAnimated(true), 100);
      return () => clearTimeout(timer);
    } else {
      setSkillsAnimated(false);
    }
  }, [activeTab]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in all fields to send a message!');
      return;
    }
    alert(`Thank you, ${name}! Your message has been sent successfully. Ahmed will get back to you at ${email} shortly.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  const mockProjects = [
    {
      id: '1',
      title: 'E-Commerce Nexus',
      tech: 'React, Node.js, Express, MongoDB, Redux',
      desc: 'A complete full-stack e-commerce marketplace featuring secure Stripe gateway integration, interactive admin dashboard, and dynamic product filtering.',
      badge: 'MERN Stack'
    },
    {
      id: '2',
      title: 'CryptoTrack Pro',
      tech: 'React, Node.js, Express, Coingecko API',
      desc: 'Cross-platform mobile application displaying real-time cryptocurrency values, interactive historical charts, and customizable price-change alerts.',
      badge: 'Mobile & API'
    },
    {
      id: '3',
      title: 'TaskFlow Planner',
      tech: 'MongoDB, Express, React, Socket.io',
      desc: 'Real-time collaborative kanban board and project management tool designed for teams with instant state synchronization via WebSockets.',
      badge: 'Real-time Web'
    }
  ];

  return (
    <div className="portfolio-root">
      {/* Background Glowing Blobs */}
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>

      {/* Top Header Navigation */}
      <header className="navbar">
        <a href="#about" className="logo" onClick={() => setActiveTab('hero')}>
          AR<div className="logo-dot"></div>
        </a>
        <nav className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            About
          </button>
          <button 
            className={`nav-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
          <button 
            className={`nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={`nav-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* Main Sections */}
      <main className="main-content">
        
        {/* HERO/ABOUT SECTION */}
        {activeTab === 'hero' && (
          <section className="hero-section animate-fade-in">
            {/* Left Bio Column */}
            <div className="hero-text-col">
              <div className="greeting-badge">
                <span className="greeting-text">HELLO WORLD</span>
              </div>
              
              <h1 className="hero-name">Ahmed Raza</h1>
              <h2 className="hero-title">MERN Stack Developer</h2>
              
              <p className="hero-desc">
                Crafting premium full-stack web applications and fluid interactive user experiences. Specializing in high-performance React architectures, robust Node.js APIs, and elegant cloud databases.
              </p>

              <div className="social-row">
                <a 
                  href="https://github.com/razakhan83" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-chip"
                >
                  GitHub
                </a>
                <a href="#linkedin" className="social-chip">
                  LinkedIn
                </a>
              </div>

              <button 
                onClick={() => setActiveTab('contact')} 
                className="cta-btn"
              >
                Let's Build Something Great
              </button>
            </div>

            {/* Right Headshot Column */}
            <div className="hero-image-col">
              <div className="image-outer-glow">
                <img 
                  src="https://github.com/razakhan83.png" 
                  alt="Ahmed Raza Headshot" 
                  className="profile-image" 
                  onError={(e) => {
                    // Fail-safe default placeholder if offline or rate-limited
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80";
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {/* SKILLS SECTION */}
        {activeTab === 'skills' && (
          <section className="animate-fade-in">
            <h2 className="section-header">Expertise & Skills</h2>
            <p className="section-subtitle">Core tools and languages behind my web applications</p>

            <div className="skills-container">
              {/* React */}
              <div className="skill-row">
                <div className="skill-header">
                  <span className="skill-name">React & Frontend Architectures</span>
                  <span className="skill-percent">95%</span>
                </div>
                <div className="skill-track">
                  <div 
                    className="skill-fill" 
                    style={{ width: skillsAnimated ? '95%' : '0%' }}
                  ></div>
                </div>
              </div>

              {/* Node.js */}
              <div className="skill-row">
                <div className="skill-header">
                  <span className="skill-name">Node.js</span>
                  <span className="skill-percent">90%</span>
                </div>
                <div className="skill-track">
                  <div 
                    className="skill-fill node" 
                    style={{ width: skillsAnimated ? '90%' : '0%' }}
                  ></div>
                </div>
              </div>

              {/* Express */}
              <div className="skill-row">
                <div className="skill-header">
                  <span className="skill-name">Express.js</span>
                  <span className="skill-percent">85%</span>
                </div>
                <div className="skill-track">
                  <div 
                    className="skill-fill express" 
                    style={{ width: skillsAnimated ? '85%' : '0%' }}
                  ></div>
                </div>
              </div>

              {/* MongoDB */}
              <div className="skill-row">
                <div className="skill-header">
                  <span className="skill-name">MongoDB</span>
                  <span className="skill-percent">80%</span>
                </div>
                <div className="skill-track">
                  <div 
                    className="skill-fill mongo" 
                    style={{ width: skillsAnimated ? '80%' : '0%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Extra Tech Chips */}
            <div className="tech-grid">
              {['Redux Toolkit', 'RESTful APIs', 'GraphQL', 'Next.js', 'Firebase', 'Git / GitHub', 'TailwindCSS', 'CSS3 / HTML5'].map((tech) => (
                <div key={tech} className="tech-chip">
                  {tech}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS SECTION */}
        {activeTab === 'projects' && (
          <section className="animate-fade-in">
            <h2 className="section-header">Featured Works</h2>
            <p className="section-subtitle">Clean architectures and functional responsive web portals</p>

            <div className="projects-grid">
              {mockProjects.map((p) => (
                <div key={p.id} className="project-card">
                  <div className="project-card-header">
                    <h3 className="project-title">{p.title}</h3>
                    <span className="project-badge">{p.badge}</span>
                  </div>
                  <p className="project-desc">{p.desc}</p>
                  <span className="project-tech">{p.tech}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT SECTION */}
        {activeTab === 'contact' && (
          <section className="animate-fade-in contact-container">
            <h2 className="section-header">Get In Touch</h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>Let's talk about your next project or collaboration</p>

            <form onSubmit={handleSend} className="form-card">
              <div className="form-group">
                <label className="input-label">YOUR NAME</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ahmed Raza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="input-label">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="ahmed@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="input-label">YOUR MESSAGE</label>
                <textarea 
                  className="form-input form-textarea" 
                  placeholder="Tell me about your amazing project ideas..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="send-btn">
                Send Message
              </button>
            </form>
          </section>
        )}

      </main>
    </div>
  );
}
