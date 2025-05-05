import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../../contexts/ResumeContext';
import { LayoutDashboard, UserCircle2, GraduationCap, Baseline as Timeline, TerminalSquare, Sparkles, AlignLeft, ChevronDown, ChevronUp } from 'lucide-react';

type FormSection = 'all' | 'personal' | 'education' | 'experience' | 'projects' | 'skills' | 'summary';

const ResumeForm: React.FC = () => {
  const [activeSection, setActiveSection] = useState<FormSection>('all');
  const [expandedSections, setExpandedSections] = useState<Set<FormSection>>(new Set(['personal']));
  const { 
    resumeData, 
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
    updateSkills
  } = useResume();

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handleObjectiveChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateObjective(e.target.value);
  };

  const handleAddEducation = () => {
    addEducation({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      location: '',
      gpa: '',
    });
  };

  const handleEducationChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    updateEducation(id, { [name]: value });
  };

  const handleAddExperience = () => {
    addExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    });
  };

  const handleExperienceChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateExperience(id, { [name]: value });
  };

  const handleAddProject = () => {
    addProject({
      title: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleProjectChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateProject(id, { [name]: value });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    updateSkills(skillsArray);
  };

  const toggleSection = (section: FormSection) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const formSections = [
    { id: 'all', label: 'All Sections', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'personal', label: 'Personal Info', icon: <UserCircle2 className="h-4 w-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'experience', label: 'Experience', icon: <Timeline className="h-4 w-4" /> },
    { id: 'projects', label: 'Projects', icon: <TerminalSquare className="h-4 w-4" /> },
    { id: 'skills', label: 'Skills', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'summary', label: 'Summary', icon: <AlignLeft className="h-4 w-4" /> },
  ] as const;

  const renderSectionContent = (section: FormSection) => {
    const isExpanded = expandedSections.has(section);
    const shouldRender = activeSection === 'all' ? isExpanded : activeSection === section;

    if (!shouldRender) return null;

    switch (section) {
      case 'personal':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Full Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-input"
                value={resumeData.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
                placeholder="e.g ANKAMGARI SHESHANK"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                placeholder="e.g sheshank@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                value={resumeData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                placeholder="e.g +91-123-456-7890"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-input"
                value={resumeData.personalInfo.address}
                onChange={handlePersonalInfoChange}
                placeholder="e.g Hyderabad, India"
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkedIn" className="form-label">LinkedIn (optional)</label>
              <input
                type="url"
                id="linkedIn"
                name="linkedIn"
                className="form-input"
                value={resumeData.personalInfo.linkedIn}
                onChange={handlePersonalInfoChange}
                placeholder="e.g linkedin.com/in/johndoe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="website" className="form-label">Website (optional)</label>
              <input
                type="url"
                id="website"
                name="website"
                className="form-input"
                value={resumeData.personalInfo.website}
                onChange={handlePersonalInfoChange}
                placeholder="e.g sheshank.com"
              />
            </div>
          </div>
        );

      case 'education':
        return (
          <>
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={handleAddEducation}
                className="btn btn-outline gap-1"
              >
                <span>Add Education</span>
              </button>
            </div>

            {resumeData.education.length === 0 ? (
              <div className="text-center p-6 bg-muted/10 rounded-md">
                <GraduationCap className="h-10 w-10 mx-auto mb-2 text-muted" />
                <p className="text-muted-foreground">No education added yet.</p>
                <button
                  onClick={handleAddEducation}
                  className="btn btn-outline mt-2"
                >
                  Add Education
                </button>
              </div>
            ) : (
              resumeData.education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  className="mb-6 p-4 border border-border rounded-md bg-card/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Education #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="text-error hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Institution Name*</label>
                      <input
                        type="text"
                        name="institution"
                        className="form-input"
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                        placeholder="e.g Anurag University"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Degree*</label>
                      <input
                        type="text"
                        name="degree"
                        className="form-input"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                        placeholder="e.g B.Tech"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Field of Study*</label>
                      <input
                        type="text"
                        name="field"
                        className="form-input"
                        value={edu.field}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                        placeholder="e.g Computer Science"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        name="location"
                        className="form-input"
                        value={edu.location}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                        placeholder="e.g Ghatkesar, Hyderabad"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Start Date*</label>
                      <input
                        type="text"
                        name="startDate"
                        className="form-input"
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                        placeholder="e.g Aug 2023"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date*</label>
                      <input
                        type="text"
                        name="endDate"
                        className="form-input"
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                        placeholder="e.g jun 2027 (or 'Present')"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">GPA (optional)</label>
                      <input
                        type="text"
                        name="gpa"
                        className="form-input"
                        value={edu.gpa}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                        placeholder="e.g 7.8/8.0"
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </>
        );

      case 'experience':
        return (
          <>
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={handleAddExperience}
                className="btn btn-outline gap-1"
              >
                <span>Add Experience</span>
              </button>
            </div>

            {resumeData.experience.length === 0 ? (
              <div className="text-center p-6 bg-muted/10 rounded-md">
                <Timeline className="h-10 w-10 mx-auto mb-2 text-muted" />
                <p className="text-muted-foreground">No experience added yet.</p>
                <button
                  onClick={handleAddExperience}
                  className="btn btn-outline mt-2"
                >
                  Add Experience
                </button>
              </div>
            ) : (
              resumeData.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="mb-6 p-4 border border-border rounded-md bg-card/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Experience #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="text-error hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Company/Organization*</label>
                      <input
                        type="text"
                        name="company"
                        className="form-input"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                        placeholder="e.g., Google"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Position*</label>
                      <input
                        type="text"
                        name="position"
                        className="form-input"
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        name="location"
                        className="form-input"
                        value={exp.location}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                        placeholder="e.g., Mountain View, CA"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Start Date*</label>
                      <input
                        type="text"
                        name="startDate"
                        className="form-input"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                        placeholder="e.g., Jan 2020"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date*</label>
                      <input
                        type="text"
                        name="endDate"
                        className="form-input"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                        placeholder="e.g., Current (or specific date)"
                      />
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <label className="form-label">Description*</label>
                    <textarea
                      name="description"
                      rows={4}
                      className="form-input"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                      placeholder="Describe your responsibilities, achievements, and impact. Use bullet points by adding '• ' at the beginning of each line."
                    />
                    <p className="form-helper">
                      Tip: Use bullet points for better readability. Start each point with "• ".
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </>
        );

      case 'projects':
        return (
          <>
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={handleAddProject}
                className="btn btn-outline gap-1"
              >
                <span>Add Project</span>
              </button>
            </div>

            {resumeData.projects.length === 0 ? (
              <div className="text-center p-6 bg-muted/10 rounded-md">
                <TerminalSquare className="h-10 w-10 mx-auto mb-2 text-muted" />
                <p className="text-muted-foreground">No projects added yet.</p>
                <button
                  onClick={handleAddProject}
                  className="btn btn-outline mt-2"
                >
                  Add Project
                </button>
              </div>
            ) : (
              resumeData.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="mb-6 p-4 border border-border rounded-md bg-card/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Project #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeProject(project.id)}
                      className="text-error hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Project Title*</label>
                      <input
                        type="text"
                        name="title"
                        className="form-input"
                        value={project.title}
                        onChange={(e) => handleProjectChange(project.id, e)}
                        placeholder="e.g., E-commerce Website"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Technologies Used*</label>
                      <input
                        type="text"
                        name="technologies"
                        className="form-input"
                        value={project.technologies}
                        onChange={(e) => handleProjectChange(project.id, e)}
                        placeholder="e.g., React, Node.js, MongoDB"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Project Link (optional)</label>
                      <input
                        type="url"
                        name="link"
                        className="form-input"
                        value={project.link}
                        onChange={(e) => handleProjectChange(project.id, e)}
                        placeholder="e.g., https://github.com/username/project"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Start Date</label>
                        <input
                          type="text"
                          name="startDate"
                          className="form-input"
                          value={project.startDate}
                          onChange={(e) => handleProjectChange(project.id, e)}
                          placeholder="e.g., Mar 2021"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <input
                          type="text"
                          name="endDate"
                          className="form-input"
                          value={project.endDate}
                          onChange={(e) => handleProjectChange(project.id, e)}
                          placeholder="e.g., Jun 2021"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <label className="form-label">Description*</label>
                    <textarea
                      name="description"
                      rows={3}
                      className="form-input"
                      value={project.description}
                      onChange={(e) => handleProjectChange(project.id, e)}
                      placeholder="Describe the project, your role, and the impact. Use bullet points by adding '• ' at the beginning of each line."
                    />
                  </div>
                </motion.div>
              ))
            )}
          </>
        );

      case 'skills':
        return (
          <div className="form-group">
            <label htmlFor="skills" className="form-label">
              List your skills (separated by commas)
            </label>
            <textarea
              id="skills"
              rows={5}
              className="form-input"
              value={resumeData.skills.join(', ')}
              onChange={handleSkillsChange}
              placeholder="e.g., JavaScript, React, Node.js, Python, Project Management, Team Leadership"
            />
            <p className="form-helper">
              Tip: Include both technical and soft skills. Separate each skill with a comma.
            </p>
          </div>
        );

      case 'summary':
        return (
          <div className="form-group">
            <label htmlFor="objective" className="form-label">
              Summary/Objective
            </label>
            <textarea
              id="objective"
              rows={5}
              className="form-input"
              value={resumeData.objective}
              onChange={handleObjectiveChange}
              placeholder="Write a brief summary of your professional background, key strengths, and career goals. Keep it concise and impactful."
            />
            <p className="form-helper">
              Tip: Keep your summary concise (3-5 sentences) and focused on
              your most relevant skills and experiences.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSection = (section: FormSection) => {
    if (section === 'all') return null;

    return (
      <div key={section} className={`mb-6 ${activeSection === 'all' ? 'border-b border-border pb-6' : ''}`}>
        {activeSection === 'all' && (
          <button
            onClick={() => toggleSection(section)}
            className="w-full flex items-center justify-between p-4 bg-card/50 rounded-lg mb-4 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              {formSections.find(s => s.id === section)?.icon}
              <span className="font-medium">{formSections.find(s => s.id === section)?.label}</span>
            </div>
            {expandedSections.has(section) ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        )}
        <AnimatePresence mode="wait">
          {(activeSection === section || (activeSection === 'all' && expandedSections.has(section))) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderSectionContent(section)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {formSections.map((section) => (
          <button
            key={section.id}
            className={`btn gap-2 py-2 px-3 ${
              activeSection === section.id ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => {
              setActiveSection(section.id as FormSection);
              if (section.id === 'all') {
                setExpandedSections(new Set(['personal']));
              }
            }}
          >
            <span className="h-4 w-4">{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeSection === 'all' ? (
          formSections
            .filter(section => section.id !== 'all')
            .map(section => renderSection(section.id as FormSection))
        ) : (
          renderSection(activeSection)
        )}
      </div>
    </div>
  );
};

export default ResumeForm;