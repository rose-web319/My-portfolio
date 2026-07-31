import { Mail } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6'; // Updated to include FaTwitter

export default function Footer() {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/rose-web319', label: 'GitHub' },
    { 
  icon: Mail, 
  href: 'mailto:Awotunderose@gmail.com', 
  label: 'Awotunderose@gmail.com' 
},
    

  ];

  return (
    <footer className="py-10 border-t border-border bg-page-bg text-main-text">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand/Logo Subtext Section */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold tracking-tight">
              Rose web<span className="text-accent">.</span>
            </p>
            <p className="text-sm mt-1 text-muted">
              Building digital experiences that matter.
            </p>
          </div>

          {/* Social Links Action Blocks Layout */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-border bg-surface/30 text-muted hover:text-accent hover:border-accent/30 transition-all cursor-pointer"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Lower Legal Metadata Segment */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted/80">
            {new Date().getFullYear()} All rights reserved. Built with React, TypeScript & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}