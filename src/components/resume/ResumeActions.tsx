import React from 'react';
import { toast } from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, Send } from 'lucide-react';
import ResumePDF from '../templates/ResumePDF';
import { useResume } from '../../contexts/ResumeContext';

const ResumeActions: React.FC = () => {
  const { resumeData, selectedTemplate } = useResume() || { resumeData: {}, selectedTemplate: '' };

  const getPdfFilename = () => {
    const name = resumeData?.personalInfo?.fullName?.trim()
      ? resumeData.personalInfo.fullName.replace(/\s+/g, '_')
      : 'Resume';
    return `${name}_${selectedTemplate}.pdf`;
  };

  const handleEmailClick = () => {
    toast('This feature is under development. Please download the PDF instead.', {
      icon: '🚧',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* Download PDF Button */}
      <div className="relative group">
        <PDFDownloadLink
          document={<ResumePDF data={resumeData} template={selectedTemplate} />}
          fileName={getPdfFilename()}
        >
          {({ loading }: { loading?: boolean }) => (
            <button className="btn btn-primary py-2 px-4 gap-2 flex items-center">
              <Download className="h-4 w-4" />
              <span>{loading ? 'Generating...' : 'Download PDF'}</span>
            </button>
          )}
        </PDFDownloadLink>
      </div>

      {/* Send to Email Button */}
      <div className="relative group">
        <button
          onClick={handleEmailClick}
          className="btn btn-outline py-2 px-4 gap-2 flex items-center"
        >
          <Send className="h-4 w-4" />
          <span>Send to Email</span>
        </button>
      </div>
    </div>
  );
};

export default ResumeActions;