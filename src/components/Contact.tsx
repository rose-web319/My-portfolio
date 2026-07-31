import { useState, useEffect, useRef } from 'react';
import { Mail, Send, MapPin } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Native Intersection Observer setup matching your core design layout
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-14 transition-opacity duration-700 bg-page-bg text-main-text ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-3 text-accent">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Let's Work Together
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-muted">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        {/* Contact Layout Grid Panel Wrapper */}
        <motion.div 
          className="grid lg:grid-cols-5 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Left Metadata Action Info Cards */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-2 space-y-6">
            
            {/* Email Card Component */}
            <div className="p-6 rounded-xl border border-border bg-surface/40 card-glow group hover:border-accent/30 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 transition-colors group-hover:text-accent">
                    Email
                  </h3>
                  <p className="text-sm text-muted">
                    Awotunderose@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Location Card Component */}
            <div className="p-6 rounded-xl border border-border bg-surface/40 card-glow group hover:border-accent/30 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 transition-colors group-hover:text-accent">
                    Location
                  </h3>
                  <p className="text-sm text-muted">
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted px-2">
              I'm currently open to freelance projects and full-time opportunities.
              I typically respond within 24 hours.
            </p>
          </motion.div>

          {/* Right Interface Interaction Form Element Block */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-xl border border-border bg-surface/40 card-glow"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-main-text">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-accent bg-surface text-main-text placeholder:text-muted/50 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-main-text">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-accent bg-surface text-main-text placeholder:text-muted/50 transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-main-text">
                  Message
                  </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-accent bg-surface text-main-text placeholder:text-muted/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {/* Action Submit Control Button */}
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm hover:shadow-md cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Send size={16} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}