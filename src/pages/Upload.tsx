import React, { useState, useCallback, useRef } from 'react';
import { Upload as UploadIcon, FileText, CheckCircle, Clock, X, AlertCircle, File } from 'lucide-react';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'analyzing' | 'error';
  progress: number;
  file: File;
  errorMessage?: string;
}

const ACCEPTED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/rtf': '.rtf',
  'text/rtf': '.rtf'
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

export default function Upload() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    // Check file type
    if (!Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
      return {
        isValid: false,
        error: 'File type not supported. Please upload PDF, DOC, DOCX, XLS, XLSX, or RTF files only.'
      };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: 'File size exceeds 50MB limit. Please choose a smaller file.'
      };
    }

    return { isValid: true };
  };

  const processFiles = (fileList: FileList) => {
    const newFiles: UploadFile[] = [];

    Array.from(fileList).forEach((file) => {
      const validation = validateFile(file);
      
      const uploadFile: UploadFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size / (1024 * 1024), // Convert to MB
        type: file.type,
        status: validation.isValid ? 'uploading' : 'error',
        progress: validation.isValid ? 0 : 0,
        file: file,
        errorMessage: validation.error
      };

      newFiles.push(uploadFile);

      // Simulate upload progress for valid files
      if (validation.isValid) {
        simulateUpload(uploadFile.id);
      }
    });

    setFiles(prev => [...prev, ...newFiles]);
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      setFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { ...file, progress: Math.min(progress, 100) }
          : file
      ));

      if (progress >= 100) {
        clearInterval(interval);
        // Simulate analysis phase
        setTimeout(() => {
          setFiles(prev => prev.map(file => 
            file.id === fileId 
              ? { ...file, status: 'analyzing', progress: 0 }
              : file
          ));
          
          // Simulate analysis completion
          setTimeout(() => {
            setFiles(prev => prev.map(file => 
              file.id === fileId 
                ? { ...file, status: 'completed', progress: 100 }
                : file
            ));
          }, 3000 + Math.random() * 2000);
        }, 500);
      }
    }, 200);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getStatusIcon = (file: UploadFile) => {
    switch (file.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'uploading':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'analyzing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (file: UploadFile) => {
    switch (file.status) {
      case 'completed':
        return 'Analysis complete - Ready for review';
      case 'uploading':
        return `Uploading... ${Math.round(file.progress)}%`;
      case 'analyzing':
        return 'Analyzing document with AI...';
      case 'error':
        return file.errorMessage || 'Upload failed';
      default:
        return 'Waiting...';
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <FileText className="h-6 w-6 text-blue-500" />;
    } else if (fileType.includes('excel') || fileType.includes('sheet')) {
      return <FileText className="h-6 w-6 text-green-500" />;
    } else if (fileType.includes('rtf')) {
      return <FileText className="h-6 w-6 text-purple-500" />;
    }
    return <File className="h-6 w-6 text-gray-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Legal Documents</h1>
        <p className="text-gray-600">Upload your contracts and legal documents for AI-powered analysis</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center mb-8 transition-all cursor-pointer ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <UploadIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Drag and drop your legal documents here
        </h3>
        <p className="text-gray-600 mb-4">or click to browse your files</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Choose Files
        </button>
        <div className="mt-4 text-sm text-gray-500">
          <p className="font-medium mb-1">Supported formats:</p>
          <p>PDF, DOC, DOCX, XLS, XLSX, RTF</p>
          <p className="mt-1">Maximum file size: 50MB</p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.rtf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Queue */}
      {files.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upload Queue</h3>
            <span className="text-sm text-gray-500">
              {files.filter(f => f.status === 'completed').length} of {files.length} completed
            </span>
          </div>
          
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 truncate">{file.name}</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(file)}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {file.status !== 'error' && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            file.status === 'completed' ? 'bg-green-500' :
                            file.status === 'analyzing' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {file.size.toFixed(1)} MB
                      </span>
                      <span className={`font-medium ${
                        file.status === 'error' ? 'text-red-600' :
                        file.status === 'completed' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {getStatusText(file)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <UploadIcon className="h-4 w-4" />
              Upload More Documents
            </button>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">Upload Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure documents are clear and readable for best AI analysis results</li>
          <li>• Multiple files can be uploaded simultaneously</li>
          <li>• Analysis typically completes within 30-60 seconds per document</li>
          <li>• You'll receive an email notification when analysis is complete</li>
        </ul>
      </div>
    </div>
  );
}