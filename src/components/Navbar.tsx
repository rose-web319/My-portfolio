import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Download Cv", href:"/Rose_Cv.pdf" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Tech Stack", href: "#tech" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Track scroll state natively without any custom hook files
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Your internal theme toggler syncing with your CSS overrides
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
  };

  const isDark = theme === "dark";

  // Match the exact class setup from your index.css
  const baseClasses = isDark
    ? "bg-zinc-950 border-zinc-800"
    : "bg-white border-gray-100";

  const glassClasses = isDark ? "glass-dark" : "glass-light";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? glassClasses : baseClasses
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo brand text */}
          <motion.a
            href="#"
            className="text-lg font-semibold tracking-tight"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={isDark ? "text-white" : "text-zinc-900"}>AR</span>
            <span className="text-accent">.</span>
          </motion.a>

          {/* Desktop links navigation layout */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isDark ? "text-zinc-300" : "text-zinc-600"
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {link.name}
              </motion.a>
            ))}

            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? "text-zinc-300 hover:bg-zinc-800"
                  : "text-zinc-600 hover:bg-gray-100"
              }`}
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>
          <motion.a
            href="/Rose_Cv.pdf"
            download="Rose_Cv.pdf"
            className=" sm:inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-accent/20 cursor-none text-sm md:hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>

          {/* Mobile responsive buttons panel */}
          <div className="flex items-center space-x-3 md:hidden">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? "text-zinc-300 hover:bg-zinc-800"
                  : "text-zinc-600 hover:bg-gray-100"
              }`}
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? "text-zinc-300 hover:bg-zinc-800"
                  : "text-zinc-600 hover:bg-gray-100"
              }`}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile slide-down interface panel links container */}
        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={`md:hidden overflow-hidden border-t ${
                isDark ? "border-zinc-800" : "border-gray-100"
              }`}
            >
              <div className="py-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 text-sm font-medium transition-colors hover:text-accent ${
                      isDark ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
