import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const ClassicTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, objective, education, experience, projects, skills } = resumeData;

  return (
    <div className="font-serif w-full p-8">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider">{personalInfo.fullName}</h1>
        
        <div className="mt-2 text-sm">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-1">
            {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>
      </div>

      {/* Objective/Summary */}
      {objective && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase mb-2">Professional Summary</h2>
          <p className="text-sm">{objective}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase mb-2">Professional Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h3 className="font-bold">{exp.position}</h3>
                <div className="text-sm italic">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div className="font-semibold">{exp.company}</div>
                {exp.location && <div className="text-sm">{exp.location}</div>}
              </div>
              <div className="text-sm mt-1 whitespace-pre-line">{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                <div className="text-sm italic">{edu.startDate} - {edu.endDate}</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div className="font-semibold">{edu.institution}</div>
                {edu.location && <div className="text-sm">{edu.location}</div>}
              </div>
              {edu.gpa && <div className="text-sm mt-1">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase mb-2">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h3 className="font-bold">{project.title}</h3>
                {(project.startDate || project.endDate) && (
                  <div className="text-sm italic">
                    {project.startDate} {project.endDate && `- ${project.endDate}`}
                  </div>
                )}
              </div>
              <div className="text-sm font-semibold mb-1">{project.technologies}</div>
              <div className="text-sm whitespace-pre-line">{project.description}</div>
              {project.link && (
                <a href={project.link} className="text-sm text-gray-700 hover:underline inline-block mt-1">
                  {project.link}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase mb-2">Skills</h2>
          <p className="text-sm">{skills.join(' • ')}</p>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;