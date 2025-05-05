import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ModernTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, objective, education, experience, projects, skills } = resumeData;

  return (
    <div className="font-sans w-full py-8 px-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-sky-600">{personalInfo.fullName}</h1>
        
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-sky-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-sky-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-sky-600" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedIn && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-3 w-3 text-sky-600" />
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-sky-600" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Objective/Summary */}
      {objective && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 border-sky-600 pb-1 mb-3">Professional Summary</h2>
          <p className="text-sm">{objective}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 border-sky-600 pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-sky-50 text-sky-700 px-2 py-1 rounded text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 border-sky-600 pb-1 mb-3">Professional Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{exp.position}</h3>
                <div className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex justify-between items-baseline">
                <div className="text-sm font-medium text-sky-600">{exp.company}</div>
                {exp.location && <div className="text-xs">{exp.location}</div>}
              </div>
              <div className="text-sm mt-1 whitespace-pre-line">{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 border-sky-600 pb-1 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                <div className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</div>
              </div>
              <div className="flex justify-between items-baseline">
                <div className="text-sm font-medium text-sky-600">{edu.institution}</div>
                {edu.location && <div className="text-xs">{edu.location}</div>}
              </div>
              {edu.gpa && <div className="text-xs mt-1">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 border-sky-600 pb-1 mb-3">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{project.title}</h3>
                {(project.startDate || project.endDate) && (
                  <div className="text-xs text-gray-600">
                    {project.startDate} {project.endDate && `- ${project.endDate}`}
                  </div>
                )}
              </div>
              <div className="text-xs font-medium text-sky-600 mb-1">{project.technologies}</div>
              <div className="text-sm whitespace-pre-line">{project.description}</div>
              {project.link && (
                <a href={project.link} className="text-xs text-sky-600 hover:underline inline-block mt-1">
                  {project.link}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;