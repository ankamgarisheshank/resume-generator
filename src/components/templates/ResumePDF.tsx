import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData, TemplateType } from '../../contexts/ResumeContext';

// Register font
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Open Sans',
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottom: '1px solid #ccc',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 5,
    textAlign: 'center',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 5,
  },
  contactItem: {
    marginHorizontal: 5,
    fontSize: 9,
  },
  experienceTitle: {
    fontWeight: 600,
    marginBottom: 2,
  },
  experienceSubtitle: {
    fontWeight: 600,
    fontSize: 9,
    color: '#555',
  },
  experienceDate: {
    fontSize: 9,
    color: '#666',
  },
  experienceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  experienceDescription: {
    fontSize: 9,
    marginTop: 3,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    marginRight: 5,
    marginBottom: 3,
    fontSize: 9,
  },
  bulletPoint: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
  },
  experienceItem: {
    marginBottom: 10,
  },
  educationItem: {
    marginBottom: 8,
  },
  projectItem: {
    marginBottom: 8,
  },
  
  // Modern Template
  modernPage: {
    fontFamily: 'Open Sans',
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
  },
  modernHeader: {
    marginBottom: 20,
  },
  modernName: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
    textAlign: 'center',
    color: '#0284c7', // sky-600
  },
  modernSectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottom: '2px solid #0284c7', // sky-600
    color: '#0284c7', // sky-600
  },
  
  // Classic Template
  classicPage: {
    fontFamily: 'Open Sans',
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
  },
  classicHeader: {
    marginBottom: 20,
    borderBottom: '2px solid #333',
    paddingBottom: 10,
  },
  classicName: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 5,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  classicSectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  
  // Minimal Template
  minimalPage: {
    fontFamily: 'Open Sans',
    padding: 40,
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333',
  },
  minimalHeader: {
    marginBottom: 25,
  },
  minimalName: {
    fontSize: 20,
    fontWeight: 400,
    marginBottom: 8,
    letterSpacing: 0.5,
    color: '#111',
  },
  minimalSectionTitle: {
    fontSize: 12,
    fontWeight: 400,
    marginBottom: 8,
    color: '#111',
  },
  
  // Creative Template
  creativePage: {
    fontFamily: 'Open Sans',
    fontSize: 10,
    lineHeight: 1.5,
  },
  creativeHeader: {
    backgroundColor: '#0d9488', // teal-600
    padding: 20,
    marginBottom: 15,
    color: 'white',
  },
  creativeName: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 8,
  },
  creativeContent: {
    padding: '0 20px',
  },
  creativeSectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottom: '2px solid #0d9488', // teal-600
    color: '#0d9488', // teal-600
  },
  creativeSkill: {
    marginRight: 5,
    marginBottom: 3,
    backgroundColor: '#f0fdfa', // teal-50
    padding: '2 6',
    borderRadius: 10,
    color: '#0d9488', // teal-700
    fontSize: 8,
  },
  creativeRow: {
    flexDirection: 'row',
  },
  creativeLeftColumn: {
    width: '65%',
    paddingRight: 10,
  },
  creativeRightColumn: {
    width: '35%',
  },
});

interface ResumePDFProps {
  data: ResumeData;
  template: TemplateType;
}

const parseDescriptionWithBullets = (description: string) => {
  return description.split('\n').map((line, index) => {
    if (line.trim().startsWith('•')) {
      return (
        <View key={index} style={styles.bulletPoint}>
          <Text style={styles.bullet}>{line.charAt(0)}</Text>
          <Text style={styles.bulletText}>{line.slice(1).trim()}</Text>
        </View>
      );
    }
    return <Text key={index} style={styles.experienceDescription}>{line}</Text>;
  });
};

const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, objective, education, experience, projects, skills } = data;
  
  return (
    <Page size="A4" style={styles.modernPage}>
      {/* Header */}
      <View style={styles.modernHeader}>
        <Text style={styles.modernName}>{personalInfo.fullName}</Text>
        <View style={styles.contactInfo}>
          {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
          {personalInfo.address && <Text style={styles.contactItem}>{personalInfo.address}</Text>}
          {personalInfo.linkedIn && <Text style={styles.contactItem}>{personalInfo.linkedIn}</Text>}
          {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
        </View>
      </View>

      {/* Summary */}
      {objective && (
        <View style={styles.section}>
          <Text style={styles.modernSectionTitle}>Professional Summary</Text>
          <Text style={styles.experienceDescription}>{objective}</Text>
        </View>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.modernSectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}{index < skills.length - 1 ? ' • ' : ''}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.modernSectionTitle}>Professional Experience</Text>
          {experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceTitle}>{exp.position}</Text>
                <Text style={styles.experienceDate}>{exp.startDate} - {exp.endDate}</Text>
              </View>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceSubtitle}>{exp.company}</Text>
                {exp.location && <Text style={styles.experienceDate}>{exp.location}</Text>}
              </View>
              {parseDescriptionWithBullets(exp.description)}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.modernSectionTitle}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceTitle}>{edu.degree} in {edu.field}</Text>
                <Text style={styles.experienceDate}>{edu.startDate} - {edu.endDate}</Text>
              </View>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceSubtitle}>{edu.institution}</Text>
                {edu.location && <Text style={styles.experienceDate}>{edu.location}</Text>}
              </View>
              {edu.gpa && <Text style={styles.experienceDescription}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.modernSectionTitle}>Projects</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceTitle}>{project.title}</Text>
                {(project.startDate || project.endDate) && (
                  <Text style={styles.experienceDate}>
                    {project.startDate} {project.endDate && `- ${project.endDate}`}
                  </Text>
                )}
              </View>
              <Text style={styles.experienceSubtitle}>{project.technologies}</Text>
              {parseDescriptionWithBullets(project.description)}
              {project.link && <Text style={{ ...styles.experienceDescription, color: '#0284c7' }}>{project.link}</Text>}
            </View>
          ))}
        </View>
      )}
    </Page>
  );
};

const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, objective, education, experience, projects, skills } = data;
  
  return (
    <Page size="A4" style={styles.classicPage}>
      {/* Header */}
      <View style={styles.classicHeader}>
        <Text style={styles.classicName}>{personalInfo.fullName}</Text>
        <View style={styles.contactInfo}>
          {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
          {personalInfo.address && <Text style={styles.contactItem}>{personalInfo.address}</Text>}
          {personalInfo.linkedIn && <Text style={styles.contactItem}>{personalInfo.linkedIn}</Text>}
          {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
        </View>
      </View>

      {/* Summary */}
      {objective && (
        <View style={styles.section}>
          <Text style={styles.classicSectionTitle}>Professional Summary</Text>
          <Text style={styles.experienceDescription}>{objective}</Text>
        </View>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.classicSectionTitle}>Professional Experience</Text>
          {experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceTitle}>{exp.position}</Text>
                <Text style={styles.experienceDate}>{exp.startDate} - {exp.endDate}</Text>
              </View>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceSubtitle}>{exp.company}</Text>
                {exp.location && <Text style={styles.experienceDate}>{exp.location}</Text>}
              </View>
              {parseDescriptionWithBullets(exp.description)}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.classicSectionTitle}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceTitle}>{edu.degree} in {edu.field}</Text>
                <Text style={styles.experienceDate}>{edu.startDate} - {edu.endDate}</Text>
              </View>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceSubtitle}>{edu.institution}</Text>
                {edu.location && <Text style={styles.experienceDate}>{edu.location}</Text>}
              </View>
              {edu.gpa && <Text style={styles.experienceDescription}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.classicSectionTitle}>Projects</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceTitle}>{project.title}</Text>
                {(project.startDate || project.endDate) && (
                  <Text style={styles.experienceDate}>
                    {project.startDate} {project.endDate && `- ${project.endDate}`}
                  </Text>
                )}
              </View>
              <Text style={styles.experienceSubtitle}>{project.technologies}</Text>
              {parseDescriptionWithBullets(project.description)}
              {project.link && <Text style={styles.experienceDescription}>{project.link}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.classicSectionTitle}>Skills</Text>
          <Text style={styles.experienceDescription}>{skills.join(' • ')}</Text>
        </View>
      )}
    </Page>
  );
};

const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, objective, education, experience, projects, skills } = data;
  
  return (
    <Page size="A4" style={styles.minimalPage}>
      {/* Header */}
      <View style={styles.minimalHeader}>
        <Text style={styles.minimalName}>{personalInfo.fullName}</Text>
        <View style={styles.contactInfo}>
          {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
          {personalInfo.address && <Text style={styles.contactItem}>{personalInfo.address}</Text>}
          {personalInfo.linkedIn && <Text style={styles.contactItem}>{personalInfo.linkedIn}</Text>}
          {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
        </View>
      </View>

      {/* Summary */}
      {objective && (
        <View style={styles.section}>
          <Text style={styles.minimalSectionTitle}>About</Text>
          <Text style={styles.experienceDescription}>{objective}</Text>
        </View>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.minimalSectionTitle}>Experience</Text>
          {experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceTitle}>{exp.position}</Text>
                <Text style={styles.experienceDate}>{exp.startDate} - {exp.endDate}</Text>
              </View>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceSubtitle}>{exp.company}</Text>
                {exp.location && <Text style={styles.experienceDate}>{exp.location}</Text>}
              </View>
              {parseDescriptionWithBullets(exp.description)}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.minimalSectionTitle}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceTitle}>{edu.degree} in {edu.field}</Text>
                <Text style={styles.experienceDate}>{edu.startDate} - {edu.endDate}</Text>
              </View>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceSubtitle}>{edu.institution}</Text>
                {edu.location && <Text style={styles.experienceDate}>{edu.location}</Text>}
              </View>
              {edu.gpa && <Text style={styles.experienceDescription}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.minimalSectionTitle}>Projects</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceTitle}>{project.title}</Text>
                {(project.startDate || project.endDate) && (
                  <Text style={styles.experienceDate}>
                    {project.startDate} {project.endDate && `- ${project.endDate}`}
                  </Text>
                )}
              </View>
              <Text style={styles.experienceSubtitle}>{project.technologies}</Text>
              {parseDescriptionWithBullets(project.description)}
              {project.link && <Text style={styles.experienceDescription}>{project.link}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.minimalSectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}{index < skills.length - 1 ? ' • ' : ''}</Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  );
};

const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, objective, education, experience, projects, skills } = data;
  
  return (
    <Page size="A4" style={styles.creativePage}>
      {/* Header */}
      <View style={styles.creativeHeader}>
        <Text style={styles.creativeName}>{personalInfo.fullName}</Text>
        <View style={styles.contactInfo}>
          {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
          {personalInfo.address && <Text style={styles.contactItem}>{personalInfo.address}</Text>}
          {personalInfo.linkedIn && <Text style={styles.contactItem}>{personalInfo.linkedIn}</Text>}
          {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
        </View>
      </View>

      <View style={styles.creativeContent}>
        <View style={styles.creativeRow}>
          <View style={styles.creativeLeftColumn}>
            {/* Experience */}
            {experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.creativeSectionTitle}>Professional Experience</Text>
                {experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceRow}>
                      <Text style={styles.experienceTitle}>{exp.position}</Text>
                      <Text style={styles.experienceDate}>{exp.startDate} - {exp.endDate}</Text>
                    </View>
                    <View style={styles.experienceRow}>
                      <Text style={styles.experienceSubtitle}>{exp.company}</Text>
                      {exp.location && <Text style={styles.experienceDate}>{exp.location}</Text>}
                    </View>
                    {parseDescriptionWithBullets(exp.description)}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.creativeSectionTitle}>Projects</Text>
                {projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <View style={styles.experienceRow}>
                      <Text style={styles.experienceTitle}>{project.title}</Text>
                      {(project.startDate || project.endDate) && (
                        <Text style={styles.experienceDate}>
                          {project.startDate} {project.endDate && `- ${project.endDate}`}
                        </Text>
                      )}
                    </View>
                    <Text style={styles.experienceSubtitle}>{project.technologies}</Text>
                    {parseDescriptionWithBullets(project.description)}
                    {project.link && <Text style={{ ...styles.experienceDescription, color: '#0d9488' }}>{project.link}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.creativeRightColumn}>
            {/* Summary */}
            {objective && (
              <View style={{ ...styles.section, backgroundColor: '#f0fdfa', padding: 10, marginBottom: 15, borderRadius: 5 }}>
                <Text style={{ ...styles.creativeSectionTitle, marginBottom: 5, fontWeight: 700, borderBottom: 'none', fontSize: 12 }}>About Me</Text>
                <Text style={styles.experienceDescription}>{objective}</Text>
              </View>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.creativeSectionTitle}>Skills</Text>
                <View style={styles.skillsContainer}>
                  {skills.map((skill, index) => (
                    <Text key={index} style={styles.creativeSkill}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Education */}
            {education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.creativeSectionTitle}>Education</Text>
                {education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.experienceTitle}>{edu.degree}</Text>
                    <Text style={{ ...styles.experienceSubtitle, color: '#0d9488' }}>{edu.field}</Text>
                    <Text style={styles.experienceSubtitle}>{edu.institution}</Text>
                    <Text style={styles.experienceDate}>
                      {edu.startDate} - {edu.endDate}
                      {edu.location && `, ${edu.location}`}
                    </Text>
                    {edu.gpa && <Text style={styles.experienceDescription}>GPA: {edu.gpa}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </Page>
  );
};

const ResumePDF: React.FC<ResumePDFProps> = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <Document>
      {renderTemplate()}
    </Document>
  );
};

export default ResumePDF;