import React, { createContext, useContext, useState } from 'react';

// Define resume data types
export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedIn?: string;
    website?: string;
  };
  objective: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link?: string;
  startDate?: string;
  endDate?: string;
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'creative';

interface ResumeContextType {
  resumeData: ResumeData;
  selectedTemplate: TemplateType;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateObjective: (objective: string) => void;
  addEducation: (education: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, education: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addExperience: (experience: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  updateSkills: (skills: string[]) => void;
  setTemplate: (template: TemplateType) => void;
  resetResumeData: () => void;
}

// Initial/default resume data
const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedIn: '',
    website: '',
  },
  objective: '',
  education: [],
  experience: [],
  projects: [],
  skills: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateObjective = (objective: string) => {
    setResumeData((prev) => ({ ...prev, objective }));
  };

  const addEducation = (education: Omit<EducationItem, 'id'>) => {
    const newEducation = { ...education, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (id: string, education: Partial<EducationItem>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, ...education } : item
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  const addExperience = (experience: Omit<ExperienceItem, 'id'>) => {
    const newExperience = { ...experience, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  const updateExperience = (id: string, experience: Partial<ExperienceItem>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === id ? { ...item, ...experience } : item
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newProject = { ...project, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (id: string, project: Partial<ProjectItem>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) =>
        item.id === id ? { ...item, ...project } : item
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const setTemplate = (template: TemplateType) => {
    setSelectedTemplate(template);
  };

  const resetResumeData = () => {
    setResumeData(defaultResumeData);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        selectedTemplate,
        updatePersonalInfo,
        updateObjective,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addProject,
        updateProject,
        removeProject,
        updateSkills,
        setTemplate,
        resetResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};