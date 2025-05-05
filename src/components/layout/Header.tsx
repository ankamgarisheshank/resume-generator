import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary" />
            <motion.div 
              className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              Resu<span className="text-primary">Mazing</span>
            </h1>
            <p className="text-xs text-muted-foreground">Resumes Made Amazing.</p>
          </div>
        </motion.div>

        <motion.button
          className="p-2 rounded-full hover:bg-muted/20"
          onClick={toggleTheme}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </motion.button>
      </div>
    </header>
  );
};

export default Header;