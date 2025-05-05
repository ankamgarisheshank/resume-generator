import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import emailjs from 'emailjs-com';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;

    emailjs
      .sendForm(
        'service_epraxvt', // Your EmailJS Service ID
        'template_nryo4av', // Replace with your EmailJS Template ID
        form,
        'dd0rkUnPcREMEKLjs' // Replace with your EmailJS User ID
      )
      .then(
        () => {
          alert('Thank you for your feedback! We have received it.');
          setIsFeedbackOpen(false);
          setIsSubmitting(false);
        },
        (error) => {
          console.error('Failed to send feedback:', error);
          alert('Failed to send feedback. Please try again later.');
          setIsSubmitting(false);
        }
      );
  };

  return (
    <>
      <header className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border">
        <div className="container flex items-center justify-between py-4">
          {/* Logo Section */}
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

          {/* Theme Toggle Button */}
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

          {/* Feedback Button */}
          <motion.button
            className="ml-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all"
            onClick={() => setIsFeedbackOpen(true)}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Feedback
          </motion.button>
        </div>
      </header>

      {/* Feedback Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-background rounded-lg shadow-lg p-6 w-11/12 max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Feedback Form</h2>
              <button
                onClick={() => setIsFeedbackOpen(false)}
                className="text-muted-foreground hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  className="w-full mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your feedback"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
                <button
                  type="button"
                  className="flex-1 bg-muted text-black py-2 rounded-md hover:bg-muted/90 transition-all"
                  onClick={() => setIsFeedbackOpen(false)}
                >
                  Back
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Header;