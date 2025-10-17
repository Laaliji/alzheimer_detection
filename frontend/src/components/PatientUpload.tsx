import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

const PatientUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: formatFileSize(file.size),
      status: 'pending' as const,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const uploadFiles = () => {
    setFiles((prev) =>
      prev.map((file) =>
        file.status === 'pending' ? { ...file, status: 'uploading' as const } : file
      )
    );

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((file) =>
          file.status === 'uploading' ? { ...file, status: 'success' as const } : file
        )
      );
    }, 2000);
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-text-dark dark:text-dark-text mb-2 transition-colors duration-300">Patient Data Upload</h2>
        <p className="text-text-gray dark:text-dark-text-secondary text-base transition-colors duration-300">Upload medical imaging data or patient records for analysis</p>
      </div>

      <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border mb-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
          <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text flex items-center gap-2 transition-colors duration-300">
            <Upload size={24} />
            Upload Files
          </h3>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-light dark:bg-blue-900/30 text-primary-blue dark:text-blue-400 transition-colors duration-300">
            Accepted: MRI, CT, DICOM, CSV, JSON
          </span>
        </div>

        <div
          className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all bg-bg-gray dark:bg-dark-bg-tertiary
            ${dragActive ? 'border-primary-blue bg-primary-light dark:bg-dark-border scale-105' : 'border-border-light dark:border-dark-border hover:border-primary-blue hover:bg-primary-light dark:hover:bg-dark-border'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={48} className="mx-auto mb-4 text-primary-blue dark:text-blue-400" />
          <h3 className="text-text-dark dark:text-dark-text text-xl mb-2 transition-colors duration-300">Drag and drop files here</h3>
          <p className="text-text-gray dark:text-dark-text-secondary text-sm transition-colors duration-300">or click to browse</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
            accept=".dcm,.nii,.jpg,.jpeg,.png,.csv,.json"
          />
        </div>

        {files.length > 0 && (
          <div className="mt-8">
            <h4 className="text-text-dark dark:text-dark-text mb-4 text-lg font-medium transition-colors duration-300">Uploaded Files ({files.length})</h4>
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4 bg-bg-gray dark:bg-dark-bg-tertiary rounded-lg mb-2 transition-all hover:bg-primary-light dark:hover:bg-dark-border">
                <FileText size={20} className="text-primary-blue dark:text-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-dark dark:text-dark-text mb-1 truncate transition-colors duration-300">{file.name}</p>
                  <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">{file.size}</p>
                </div>
                <div className="flex-shrink-0">
                  {file.status === 'pending' && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-light dark:bg-blue-900/30 text-primary-blue dark:text-blue-400 transition-colors duration-300">Pending</span>
                  )}
                  {file.status === 'uploading' && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-colors duration-300">
                      <div className="w-3 h-3 border-2 border-orange-700 dark:border-orange-400 border-t-transparent rounded-full animate-spin" />
                      Uploading
                    </span>
                  )}
                  {file.status === 'success' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 transition-colors duration-300">
                      <CheckCircle size={16} />
                      Success
                    </span>
                  )}
                  {file.status === 'error' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 transition-colors duration-300">
                      <AlertCircle size={16} />
                      Error
                    </span>
                  )}
                </div>
                <button
                  className="p-1 rounded transition-all hover:bg-red-500 hover:text-white text-text-gray dark:text-dark-text-secondary flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ))}
            <div className="flex gap-4 mt-6 pt-6 border-t border-border-light dark:border-dark-border transition-colors duration-300">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-lg font-medium transition-all hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={uploadFiles}
                disabled={files.every((f) => f.status !== 'pending')}
              >
                <Upload size={20} />
                Upload All Files
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-primary-blue text-primary-blue dark:text-white rounded-lg font-medium transition-all hover:bg-primary-light dark:hover:bg-dark-bg-tertiary" onClick={() => setFiles([])}>
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text transition-colors duration-300">Patient Information</h3>
          </div>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-text-dark dark:text-dark-text text-sm transition-colors duration-300">Patient ID</label>
              <input type="text" className="px-3 py-3 border-2 border-border-light dark:border-dark-border rounded-lg text-base transition-all focus:outline-none focus:border-primary-blue dark:bg-dark-bg-tertiary dark:text-dark-text" placeholder="Enter patient ID" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-text-dark dark:text-dark-text text-sm transition-colors duration-300">Age</label>
              <input type="number" className="px-3 py-3 border-2 border-border-light dark:border-dark-border rounded-lg text-base transition-all focus:outline-none focus:border-primary-blue dark:bg-dark-bg-tertiary dark:text-dark-text" placeholder="Patient age" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-text-dark dark:text-dark-text text-sm transition-colors duration-300">Gender</label>
              <select className="px-3 py-3 border-2 border-border-light dark:border-dark-border rounded-lg text-base transition-all focus:outline-none focus:border-primary-blue dark:bg-dark-bg-tertiary dark:text-dark-text">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-text-dark dark:text-dark-text text-sm transition-colors duration-300">Clinical Notes</label>
              <textarea className="px-3 py-3 border-2 border-border-light dark:border-dark-border rounded-lg text-base transition-all focus:outline-none focus:border-primary-blue dark:bg-dark-bg-tertiary dark:text-dark-text resize-none" rows={4} placeholder="Additional notes..."></textarea>
            </div>
          </form>
        </div>

        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-soft dark:shadow-dark-soft p-6 border border-border-light dark:border-dark-border transition-colors duration-300">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary-light dark:border-dark-border transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-text-dark dark:text-dark-text transition-colors duration-300">Upload Guidelines</h3>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-start">
              <CheckCircle size={20} className="text-secondary-green dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-base text-text-dark dark:text-dark-text mb-1 font-medium transition-colors duration-300">Supported Formats</h4>
                <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">DICOM (.dcm), NIfTI (.nii), JPEG, PNG, CSV, JSON</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle size={20} className="text-secondary-green dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-base text-text-dark dark:text-dark-text mb-1 font-medium transition-colors duration-300">File Size Limit</h4>
                <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">Maximum 500MB per file</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle size={20} className="text-secondary-green dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-base text-text-dark dark:text-dark-text mb-1 font-medium transition-colors duration-300">Data Privacy</h4>
                <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">All data is encrypted and HIPAA compliant</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle size={20} className="text-secondary-green dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-base text-text-dark dark:text-dark-text mb-1 font-medium transition-colors duration-300">Processing Time</h4>
                <p className="text-sm text-text-gray dark:text-dark-text-secondary transition-colors duration-300">Analysis typically completes in 2-5 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientUpload;
