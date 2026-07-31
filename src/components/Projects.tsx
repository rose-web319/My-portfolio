import { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { motion, type Variants } from 'framer-motion';

const projects = [
  {
    title: 'Laundry Wash',
    description: 'The Laundry Wash Platform is a modern, full-stack on demand laundry and dry cleaning service application engineered to simplify the process of ordering and managing laundry services. Designed with a clean, intuitive interface, it allows users to schedule pickups, track orders in real-time, and make secure payments seamlessly.',
    tech: ['React', 'JavaScript', 'Express', 'Node.js', 'MongoDB'],
    image: 'https://res.cloudinary.com/dy42gl2em/image/upload/v1782774474/Frame_30_qzox4g.png',
    github: 'https://github.com/rose-web319',
    live: 'https://clientlaundry-wash.vercel.app/',
  },
  {
    title: 'Miles Car Rental',
    description: 'Miles Car Rental is a highly scalable, full-stack car rental application designed to provide a seamless booking experience with real-time availability and pricing. Built with a robust backend and a responsive frontend, it allows users to browse vehicles, make reservations, and manage their bookings effortlessly.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://res.cloudinary.com/dy42gl2em/image/upload/v1782774307/heroImage_qixbyu.jpg',
    github: 'https://github.com/rose-web319',
    live: 'https://milescar-rental.vercel.app/',
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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-10 transition-opacity duration-700 bg-page-bg text-main-text ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-3 text-accent">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-muted">
            A selection of projects showcasing full-stack development, modern UI patterns, and scalable architecture.
          </p>
        </div>

        {/* Projects Cards Grid Interface */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={cardVariants}
              className="group rounded-xl overflow-hidden border border-border bg-surface/40 hover:border-accent/40 transition-colors duration-300 card-glow"
            >
              {/* Card Image Display Wrapper */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-page-bg/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Panel Body Description */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed text-muted">
                  {project.description}
                </p>

                {/* Tech Badges List Tags Layout panel */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* External Hyperlinks Action Trigger Blocks */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors text-muted hover:text-accent cursor-pointer"
                  >
                    <FaGithub size={16} />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors cursor-pointer"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}