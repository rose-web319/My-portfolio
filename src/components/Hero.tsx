import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'; // Using robust react-icons pack
import { motion,type Variants } from 'framer-motion';

// Clean staggered entry animation presets for our elements with strict typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1]
    },
  },
};

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Native Intersection Observer replacing Bolt's hook
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

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center pt-16 transition-opacity relative duration-700 bg-page-bg text-main-text ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-sm font-medium tracking-widest uppercase mb-4 text-accent">
            HELLO, I'M ROSE AWOTUNDE
          </motion.p>

            {/* Static Sub-headline text block wrapper */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-xl md:text-2xl font-light text-muted">
              Full-Stack Developer & UI/UX Engineer
            </p>
          </motion.div>

          {/* Main Display Heading */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Building Digital
            <br />
            <span className="text-accent">Experiences</span> That Matter
          </motion.h1>

        

          {/* Body Paragraph copy */}
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-base leading-relaxed mb-10 text-muted">
            Crafting elegant, performant, and scalable web applications with modern technologies.
            Passionate about clean code, intuitive interfaces, and developer experience.
          </motion.p>

          {/* Interactive Button CTA Core Controls */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.a
              href="#projects"
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-all shadow-sm hover:shadow-md cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-6 py-3 rounded-lg font-medium border border-border text-main-text hover:bg-surface transition-all cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* External Social Profiles Navigation list panel */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-6">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors text-muted hover:text-accent cursor-pointer flex items-center justify-center"
              aria-label="GitHub"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors text-muted hover:text-accent cursor-pointer flex items-center justify-center"
              aria-label="LinkedIn"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedinIn size={22} />
            </motion.a>
            <motion.a
              href="mailto:your.email@example.com"
              className="p-2 transition-colors text-muted hover:text-accent cursor-pointer flex items-center justify-center"
              aria-label="Email"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={22} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating Scroll Prompt Anchor */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a
            href="#about"
            className="transition-colors text-muted hover:text-accent"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}