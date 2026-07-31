import { useState, useEffect, useRef } from "react";
import { CalendarDays, MapPin, Briefcase } from "lucide-react";
import { motion, type Variants } from "framer-motion";

// Clean entry transition curve presets matching our layout animations
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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Native Intersection Observer setup matching your exact structural design pattern
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-24 transition-opacity duration-700 bg-page-bg text-main-text ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Content Left Text Block Panel */}
          <motion.div variants={fadeUpVariants}>
            <p className="text-sm font-medium tracking-widest uppercase mb-3 text-accent">
              About Me
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Passionate about building impactful software
            </h2>
            <div className="space-y-4 text-muted">
              <p className="text-base leading-relaxed">
                I'm a full-stack developer with 1years of experience crafting
                digital products that solve real-world problems. My journey
                started with curiosity about how things work, which evolved into
                a deep passion for creating elegant software solutions.
              </p>
              <p className="text-base leading-relaxed">
                When I'm not coding, you'll find me contributing to open-source
                projects, mentoring aspiring developers, or exploring the latest
                in web technologies. I believe in writing code that's not just
                functional, but maintainable and beautiful.
              </p>
            </div>

            {/* Quick Metadata Profile Tags Panel */}
            
          </motion.div>

          {/* Right Image Graphic & Badge Overlays Container */}
          <motion.div variants={fadeUpVariants} className="relative mt-8 lg:mt-0">
            <div className="relative rounded-xl overflow-hidden card-glow">
              <img
                src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Developer workspace"
                className="w-full h-85 object-cover select-none"
              />
              <div className="absolute inset-0 rounded-xl border border-accent/20" />
            </div>

            {/* Badge - Lower Left: Projects Delivered */}
           

            {/* Badge - Upper Right: Happy Clients */}
          
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}