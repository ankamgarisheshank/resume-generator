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
      className="flex justify-center items-center bg-gray-100 py-4"
    >
      {/* A4 Sheet Container */}
      <div
        className="bg-white shadow-lg border border-border rounded-md overflow-hidden"
        style={{
          width: '210mm', // A4 width
          height: '297mm', // A4 height
          maxWidth: '100%', // Responsive scaling
          maxHeight: '100%', // Responsive scaling
          transform: 'scale(0.8)', // Default scale for smaller screens
          transformOrigin: 'top center',
        }}
      >
        <div className="overflow-auto w-full h-full bg-white text-black">
          {renderTemplate()}
        </div>
      </div>
    </motion.div>
  );
};

export default ResumePreview;