import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa6';
import AnimatedSection from './AnimatedSection';

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const d = new FormData(e.target);
    if (!d.get('name') || !d.get('email') || !d.get('message')) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      e.target.reset();
      setTimeout(() => setSent(false), 5000);
    }, 1400);
  };

  return (
    <section
      id="contact"
      className="section-container"
      style={{ paddingTop: 'var(--sec-tight)', paddingBottom: 'var(--sec-loose)' }}
    >
      <AnimatedSection>
        <div className="section-header" style={{ textAlign: 'center' }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>
            <span style={{ width: 20, height: 1.5, background: 'var(--teal)', display: 'inline-block', borderRadius: 2 }} />
            Say Hello
          </span>
          <h2 className="section-title">
            Get In <span className="grad">Touch</span>
          </h2>
          <p className="section-desc" style={{ marginInline: 'auto', textAlign: 'center' }}>
            Let's talk about your next project or collaboration
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.12}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            className="surface"
            style={{
              width: '100%',
              maxWidth: 620,
              padding: 'clamp(1.5rem,5vw,2.5rem)',
            }}
          >
            {/* Success state */}
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(45,212,191,0.08)',
                  border: '1px solid rgba(45,212,191,0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--sp-4)',
                  marginBottom: 'var(--sp-5)',
                  color: 'var(--teal)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                ✓ Message sent! Ahmed will get back to you shortly.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
              {/* Name + Email row on md+ */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,220px),1fr))',
                  gap: 'var(--sp-4)',
                }}
              >
                <div>
                  <label htmlFor="c-name" className="form-label">Your Name</label>
                  <input
                    id="c-name" name="name" type="text"
                    placeholder="Ahmed Raza" required
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="form-label">Email Address</label>
                  <input
                    id="c-email" name="email" type="email"
                    placeholder="ahmed@example.com" required
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="c-msg" className="form-label">Your Message</label>
                <textarea
                  id="c-msg" name="message" rows={5}
                  placeholder="Tell me about your project ideas..."
                  required
                  className="form-input"
                  style={{ resize: 'none' }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                className="btn btn-teal btn-lg w-full"
                style={{ marginTop: 'var(--sp-1)' }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.14 }}
              >
                {sending ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(0,0,0,0.25)', borderTopColor: 'var(--bg-base)', borderRadius: '50%' }}
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane size={13} />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
