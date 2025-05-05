import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border py-6">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-28 w-28 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {/* Developer image */}
              <img
                src="https://res.cloudinary.com/dnbqgzh4t/image/upload/v1746033325/qds3xba9ww3ni7ir9ohw.jpg" // Replace with your image URL
                alt="Developer"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-sm text-center">
              <p>Developed with ❤️ by</p>
              <p className="font-medium">ANKAMGARI SHESHANK</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* GitHub Link */}
            <a 
              href="https://github.com/your-github-username" // Replace with your GitHub URL
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full bg-card hover:bg-primary/10 flex items-center justify-center transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>

            {/* LinkedIn Link */}
            <a 
              href="https://www.linkedin.com/in/ankamgari-sheshank/" // Replace with your LinkedIn URL
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full bg-card hover:bg-primary/10 flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            {/* Portfolio Link */}
            <a 
              href="http://ankamgarisheshank-profile.netlify.app" // Replace with your Portfolio URL
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full bg-card hover:bg-primary/10 flex items-center justify-center transition-colors"
              aria-label="Portfolio"
            >
              <Globe className="h-4 w-4" />
            </a>
          </motion.div>
          
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            © 2025 ResuMazing. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;