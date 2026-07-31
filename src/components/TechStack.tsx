import { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Database,
  Cloud,
  Smartphone,
  Palette,
  GitBranch,
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const categories = [
  {
    title: 'Frontend',
    icon: Code2,
    techs: ['React', 'Next.js',, 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: Database,
    techs: ['Node.js',  'MongoDB', 'Express' ],
  },
 
  {
    title: 'Design',
    icon: Palette,
    techs: ['Figma'],
  },
  {
    title: 'Tools',
    icon: GitBranch,
    techs: ['Git', 'VS Code',  'Postman'],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TechStack() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Native Intersection Observer matching your structural layout patterns
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
      id="tech"
      ref={sectionRef}
      className={`py-14 transition-opacity duration-700 bg-page-bg text-main-text ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header Banner Elements */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-3 text-accent">
            Technologies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Tech Stack
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-muted">
            Technologies and tools I work with to build exceptional digital products.
          </p>
        </div>

        {/* Categories Flex Grid layout */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                className="group p-6 rounded-xl border border-border bg-surface/40 hover:border-accent/40 transition-colors duration-300 card-glow"
              >
                {/* Header Icon Block */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-accent/10 transition-colors group-hover:bg-accent/15">
                    <Icon
                      size={20}
                      className="text-accent"
                    />
                  </div>
                  <h3 className="font-semibold group-hover:text-accent transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Badges Layout list rendering loop */}
                <div className="flex flex-wrap gap-2">
                  {category.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1.5 rounded-md bg-surface text-muted border border-border transition-colors group-hover:bg-accent/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}