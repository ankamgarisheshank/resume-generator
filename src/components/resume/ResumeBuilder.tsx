import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import ResumeTemplateSelector from './ResumeTemplateSelector';
import ResumeActions from './ResumeActions';
import { Cat, ChevronLeft, FileText } from 'lucide-react';

const ResumeBuilder: React.FC = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <motion.div 
            className="mx-auto" 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-block relative">
              <Cat className="h-12 w-12 text-primary animate-bounce-subtle" />
              <motion.div 
                className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Build Your Professional Resume
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Create a stunning resume in minutes with our easy-to-use builder.
            Choose from beautiful templates and customize to your needs.
          </motion.p>
        </div>

        {isPreviewMode ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <button
              onClick={togglePreviewMode}
              className="btn btn-outline mb-4 gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Editor
            </button>
            
            <div className="card p-6">
              <ResumePreview />
              <div className="mt-6">
                <ResumeActions />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2">
              <div className="card p-6">
                <ResumeForm />
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
                <ResumeTemplateSelector />
              </div>
              
              <div className="card p-6">
                <div className="flex flex-col gap-4">
                  <button
                    onClick={togglePreviewMode}
                    className="btn btn-primary gap-2 py-2"
                  >
                    <FileText className="h-4 w-4" />
                    Preview Resume
                  </button>
                  <ResumeActions />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;