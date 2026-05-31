import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, TextField, Label, Input, TextArea, Button } from '@heroui/react';
import { FaPaperPlane } from 'react-icons/fa6';
import AnimatedSection from './AnimatedSection';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      alert('Please fill in all fields to send a message!');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      alert(
        `Thank you, ${name}! Your message has been sent successfully. Ahmed will get back to you at ${email} shortly.`
      );
      e.target.reset();
      setIsSubmitting(false);
    }, 1200);
  };

  const inputClasses = "w-full bg-[var(--bg-surface-light)]/50 border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-white text-sm font-normal focus:outline-none focus:border-[var(--color-secondary)] focus:shadow-[0_0_12px_rgba(0,206,201,0.15)] transition-all duration-300 placeholder:text-[var(--color-text-muted)]/50";
  const labelClasses = "text-[var(--color-text-secondary)] font-bold text-xs tracking-widest mb-2 block";

  return (
    <section id="contact" className="section-container py-20 lg:py-28">
      <AnimatedSection className="text-center">
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="mt-2 mb-12 text-base" style={{ color: 'var(--color-text-muted)' }}>
          Let's talk about your next project or collaboration
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.15} className="flex justify-center">
        <Card className="glass-card border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 w-full max-w-[650px] p-6 sm:p-8 rounded-2xl">
          <form onSubmit={handleSend} className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
            >
              <label className={labelClasses} htmlFor="contact-name">YOUR NAME</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Ahmed Raza"
                required
                className={inputClasses}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.2 }}
            >
              <label className={labelClasses} htmlFor="contact-email">EMAIL ADDRESS</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="ahmed@example.com"
                required
                className={inputClasses}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.3 }}
            >
              <label className={labelClasses} htmlFor="contact-message">YOUR MESSAGE</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your amazing project ideas..."
                required
                rows={4}
                className={`${inputClasses} resize-none`}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.4 }}
            >
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isSubmitting}
                className="font-extrabold text-[var(--bg-primary)] bg-[var(--color-secondary)] text-base mt-2 shadow-lg shadow-[rgba(0,206,201,0.2)] rounded-xl"
                data-cursor="pointer"
              >
                {isSubmitting ? 'Sending...' : (
                  <span className="inline-flex items-center gap-2">
                    Send Message <FaPaperPlane size={16} />
                  </span>
                )}
              </Button>
            </motion.div>
          </form>
        </Card>
      </AnimatedSection>
    </section>
  );
}
