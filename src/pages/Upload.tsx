import React, { useState, useCallback } from 'react';
import { Upload as UploadIcon, FileText, CheckCircle, Clock } from 'lucide-react';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'completed' | 'analyzing';
  progress: number;
}

export default function Upload() {
  const [files, setFiles] = useState<UploadFile[]>([
    {
      id: '1',
      name: 'service-agreement-techcorp.pdf',
      size: 2.4,
      status: 'completed',
      progress: 100
    },
    {
      id: '2',
      name: 'employment-contract.docx',
      size: 1.8,
      status: 'uploading',
      progress: 65
    }
  ]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    // Handle file drop logic here
    console.log('Files dropped:', e.dataTransfer.files);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'uploading':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'analyzing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (file: UploadFile) => {
    switch (file.status) {
      case 'completed':
        return 'Analysis starting...';
      case 'uploading':
        return `${file.progress}% complete`;
      case 'analyzing':
        return 'Analyzing document...';
      default:
        return 'Waiting...';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Document</h1>
        <p className="text-gray-600">Upload your contract for AI-powered analysis</p>
      </div>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <FileText className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Drag and drop your documents here
        </h3>
        <p className="text-gray-600 mb-4">or click to browse your files</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Choose Files
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Supports PDF and DOCX files up to 50MB
        </p>
      </div>

      {/* Upload Queue */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Queue</h3>
        
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{file.name}</span>
                <div className="flex items-center gap-2 text-sm">
                  {getStatusIcon(file.status)}
                  <span className="capitalize text-gray-600">{file.status}</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${file.progress}%` }}
                />
              </div>
              
              <div className="text-sm text-gray-600">
                {file.size} MB • {getStatusText(file)}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
          Upload More Documents
        </button>
      </div>
    </div>
  );
}