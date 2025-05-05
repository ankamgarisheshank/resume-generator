import React from 'react';
import { motion } from 'framer-motion';
import { useResume } from '../../contexts/ResumeContext';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';

const ResumePreview: React.FC = () => {
  const { selectedTemplate } = useResume();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate />;
      case 'classic':
        return <ClassicTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-lg border border-border rounded-md max-w-full mx-auto overflow-hidden"
    >
      <div className="overflow-auto max-h-[70vh] bg-white text-black">
        {renderTemplate()}
      </div>
    </motion.div>
  );
};

export default ResumePreview;