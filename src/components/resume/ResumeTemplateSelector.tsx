import React from 'react';
import { motion } from 'framer-motion';
import { useResume, TemplateType } from '../../contexts/ResumeContext';
import { CheckCircle2 } from 'lucide-react';

interface TemplateCard {
  id: TemplateType;
  name: string;
  description: string;
  image: string;
}

const ResumeTemplateSelector: React.FC = () => {
  const { selectedTemplate, setTemplate } = useResume();

  const templates: TemplateCard[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean layout with a modern touch',
      image: 'https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional design for formal settings',
      image: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant with lots of white space',
      image: 'https://images.pexels.com/photos/5054776/pexels-photo-5054776.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Unique design for creative professionals',
      image: 'https://images.pexels.com/photos/4047241/pexels-photo-4047241.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {templates.map((template, index) => (
        <motion.div
          key={template.id}
          className={`relative rounded-md overflow-hidden cursor-pointer group ${
            selectedTemplate === template.id ? 'ring-2 ring-primary' : 'ring-1 ring-border'
          }`}
          onClick={() => setTemplate(template.id)}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          />
          
          <img
            src={template.image}
            alt={template.name}
            className="w-full h-24 object-cover"
          />
          
          <div className="absolute bottom-0 left-0 p-2 text-white">
            <h3 className="font-medium text-sm">{template.name}</h3>
            <p className="text-xs opacity-80">{template.description}</p>
          </div>
          
          {selectedTemplate === template.id && (
            <div className="absolute top-2 right-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ResumeTemplateSelector;