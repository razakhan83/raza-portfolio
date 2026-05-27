import React, { useState, useEffect } from 'react';

export default function App() {
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  
  // Custom Cursor States
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Trigger skills animation on load so they are ready as the user scrolls down
  useEffect(() => {
    const timer = setTimeout(() => setSkillsAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Custom Cursor Listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Track interactive items to scale cursor
    const addCursorHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, .project-card, .tech-chip, .form-input');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    // Delay bindings slightly to allow components to mount fully
    const bindingTimer = setTimeout(addCursorHoverListeners, 800);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(bindingTimer);
    };
  }, []);

  // Smooth trail interpolation for custom cursor outer ring
  useEffect(() => {
    let animationFrameId;
    
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15, // 15% lag interpolation
          y: prev.y + dy * 0.15
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    
    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const nameInput = e.target.elements.name.value;
    const emailInput = e.target.elements.email.value;
    const messageInput = e.target.elements.message.value;

    if (!nameInput || !emailInput || !messageInput) {
      alert('Please fill in all fields to send a message!');
      return;
    }
    alert(`Thank you, ${nameInput}! Your message has been sent successfully. Ahmed will get back to you at ${emailInput} shortly.`);
    e.target.reset();
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
      {/* Custom Mouse Follower Dots */}
      {!hidden && (
        <>
          <div 
            className={`custom-cursor-dot ${clicked ? 'clicked' : ''} ${linkHovered ? 'hovered' : ''}`}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
          />
          <div 
            className={`custom-cursor-circle ${clicked ? 'clicked' : ''} ${linkHovered ? 'hovered' : ''}`}
            style={{ left: `${trail.x}px`, top: `${trail.y}px` }}
          />
        </>
      )}

      {/* Background Glowing Blobs */}
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>

      {/* Top Header Navigation */}
      <header className="navbar">
        <div className="navbar-container">
          <a href="#about" className="logo" onClick={(e) => { e.preventDefault(); handleScrollTo('about'); }}>
            AR<div className="logo-dot"></div>
          </a>
          <nav className="nav-links">
            <button className="nav-btn" onClick={() => handleScrollTo('about')}>
              About
            </button>
            <button className="nav-btn" onClick={() => handleScrollTo('skills')}>
              Skills
            </button>
            <button className="nav-btn" onClick={() => handleScrollTo('projects')}>
              Projects
            </button>
            <button className="nav-btn" onClick={() => handleScrollTo('contact')}>
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Main Sections */}
      <main className="main-content">
        
        {/* HERO/ABOUT SECTION */}
        <section id="about" className="hero-section animate-fade-in" style={{ minHeight: '80vh', marginBottom: '8rem' }}>
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

            {/* Glowing Icon Social Row */}
            <div className="social-row">
              <a 
                href="https://github.com/razakhan83" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                title="GitHub"
              >
                <svg className="social-svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn linkedin"
                title="LinkedIn"
              >
                <svg className="social-svg" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn discord"
                title="Discord"
              >
                <svg className="social-svg" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
                <span>Discord</span>
              </a>

              <a 
                href="mailto:ahmedraza@example.com" 
                className="social-icon-btn gmail"
                title="Gmail"
              >
                <svg className="social-svg" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>Gmail</span>
              </a>
            </div>

            {/* CTA Group */}
            <div className="hero-cta-group">
              <button 
                onClick={() => handleScrollTo('contact')} 
                className="cta-btn"
              >
                Let's Build Something Great
              </button>
              
              <a 
                href="/resume.pdf" 
                download="Ahmed_Raza_CV.pdf"
                className="cta-btn secondary"
              >
                <svg className="cta-icon" viewBox="0 0 24 24" style={{ marginRight: '8px', width: '20px', height: '20px' }}>
                  <path fill="currentColor" d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
                </svg>
                Download CV
              </a>
            </div>
          </div>

          {/* Right Headshot Column */}
          <div className="hero-image-col">
            <div className="image-outer-glow">
              <img 
                src="https://github.com/razakhan83.png" 
                alt="Ahmed Raza Headshot" 
                className="profile-image" 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80";
                }}
              />
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="animate-fade-in" style={{ marginBottom: '8rem', paddingTop: '4rem' }}>
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

        {/* PROJECTS SECTION */}
        <section id="projects" className="animate-fade-in" style={{ marginBottom: '8rem', paddingTop: '4rem' }}>
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

        {/* CONTACT SECTION */}
        <section id="contact" className="animate-fade-in contact-container" style={{ paddingTop: '4rem' }}>
          <h2 className="section-header">Get In Touch</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Let's talk about your next project or collaboration</p>

          <form onSubmit={handleSend} className="form-card">
            <div className="form-group">
              <label className="input-label">YOUR NAME</label>
              <input 
                type="text" 
                name="name"
                className="form-input" 
                placeholder="Ahmed Raza"
                required
              />
            </div>

            <div className="form-group">
              <label className="input-label">EMAIL ADDRESS</label>
              <input 
                type="email" 
                name="email"
                className="form-input" 
                placeholder="ahmed@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="input-label">YOUR MESSAGE</label>
              <textarea 
                name="message"
                className="form-input form-textarea" 
                placeholder="Tell me about your amazing project ideas..."
                required
              ></textarea>
            </div>

            <button type="submit" className="send-btn">
              Send Message
            </button>
          </form>
        </section>

      </main>
    </div>
  );
}
