import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const CreativeTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, objective, education, experience, projects, skills } = resumeData;

  return (
    <div className="font-sans w-full p-8 bg-white">
      {/* Header with accent color */}
      <div className="bg-teal-600 text-white p-6 -mx-8 -mt-8 mb-6">
        <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {personalInfo.email && (
            <div>
              <span className="font-semibold">Email: </span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div>
              <span className="font-semibold">Phone: </span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div>
              <span className="font-semibold">Location: </span>
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedIn && (
            <div>
              <span className="font-semibold">LinkedIn: </span>
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div>
              <span className="font-semibold">Website: </span>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Professional Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-teal-600 border-b-2 border-teal-600 pb-1 mb-4">
                Professional Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-5">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-bold">{exp.position}</h3>
                    <div className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-semibold text-teal-700">{exp.company}</div>
                    {exp.location && <div className="text-xs">{exp.location}</div>}
                  </div>
                  <div className="text-sm mt-2 whitespace-pre-line">{exp.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-teal-600 border-b-2 border-teal-600 pb-1 mb-4">
                Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    {(project.startDate || project.endDate) && (
                      <div className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">
                        {project.startDate} {project.endDate && `- ${project.endDate}`}
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-teal-700 mb-1">
                    {project.technologies}
                  </div>
                  <div className="text-sm whitespace-pre-line">{project.description}</div>
                  {project.link && (
                    <a href={project.link} className="text-xs text-teal-600 hover:underline inline-block mt-1">
                      {project.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          {/* Objective/Summary */}
          {objective && (
            <div className="mb-6 bg-teal-50 p-4 rounded-lg border-l-4 border-teal-600">
              <h2 className="text-lg font-bold text-teal-800 mb-2">About Me</h2>
              <p className="text-sm">{objective}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-teal-600 border-b-2 border-teal-600 pb-1 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-teal-600 border-b-2 border-teal-600 pb-1 mb-3">
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <div className="text-sm text-teal-700">{edu.field}</div>
                  <div className="text-sm font-medium">{edu.institution}</div>
                  <div className="text-xs mt-1">
                    {edu.startDate} - {edu.endDate}
                    {edu.location && `, ${edu.location}`}
                  </div>
                  {edu.gpa && <div className="text-xs mt-1">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;