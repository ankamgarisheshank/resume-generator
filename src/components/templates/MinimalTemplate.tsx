import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const MinimalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, objective, education, experience, projects, skills } = resumeData;

  return (
    <div className="font-sans w-full p-10 text-gray-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-wide text-gray-900">{personalInfo.fullName}</h1>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Objective/Summary */}
      {objective && (
        <div className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 mb-2">About</h2>
          <p className="text-sm">{objective}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 mb-3">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h3 className="font-medium">{exp.position}</h3>
                <div className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div className="text-sm text-gray-700">{exp.company}</div>
                {exp.location && <div className="text-xs text-gray-500">{exp.location}</div>}
              </div>
              <div className="text-sm mt-1 whitespace-pre-line">{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div className="text-sm text-gray-700">{edu.institution}</div>
                {edu.location && <div className="text-xs text-gray-500">{edu.location}</div>}
              </div>
              {edu.gpa && <div className="text-xs mt-1 text-gray-600">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 mb-3">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h3 className="font-medium">{project.title}</h3>
                {(project.startDate || project.endDate) && (
                  <div className="text-xs text-gray-500">
                    {project.startDate} {project.endDate && `- ${project.endDate}`}
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-600 mb-1">{project.technologies}</div>
              <div className="text-sm whitespace-pre-line">{project.description}</div>
              {project.link && (
                <a href={project.link} className="text-xs text-gray-600 hover:underline inline-block mt-1">
                  {project.link}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-normal text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <span key={index} className="text-sm px-3 py-1 bg-gray-100 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;