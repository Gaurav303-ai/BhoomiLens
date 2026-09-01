// export default function Upload() {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold text-blue-800">Document Upload Dashboard</h1>
//       <p className="text-gray-600 mt-2">Upload legacy scanned records for AI processing.</p>
//     </div>
//   )
// }
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';
import { uploadDocument } from '../services/api';

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // States
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // Constants for Validation
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

  // --- Helpers ---
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    return <ImageIcon className="w-8 h-8 text-blue-500" />;
  };

  // --- Validation ---
  const validateAndSetFile = (selectedFile) => {
    setErrorMessage('');
    setStatus('idle');

    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setErrorMessage('Invalid file type. Please upload a PDF, JPG, or PNG.');
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrorMessage('File is too large. Maximum allowed size is 10MB.');
      return;
    }

    setFile(selectedFile);
  };

  // --- Event Handlers ---
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  const handleFileSelect = (e) => {
    validateAndSetFile(e.target.files[0]);
  };

  const clearFile = () => {
    setFile(null);
    setStatus('idle');
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- API Upload Execution ---
  const executeUpload = async () => {
    if (!file) return;
    
    setStatus('uploading');
    setErrorMessage('');
    
    try {
      const response = await uploadDocument(file);
      
      if (response.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(response.message || 'Upload failed due to server error.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Network error! Please check if backend is running.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      
      <div className="mx-auto max-w-4xl">
        {/* Top Navigation */}
        <button 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-sm font-medium text-slate-500 transition hover:text-slate-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Upload Land Record</h1>
          <p className="mt-2 text-slate-600">Securely upload scanned documents, maps, or physical records for AI digitization.</p>
        </div>

        {/* Main Upload Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 sm:p-10">
            
            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-6 flex items-center rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-100">
                <AlertCircle className="mr-3 h-5 w-5 flex-shrink-0" />
                {errorMessage}
              </div>
            )}

            {/* Drag & Drop Zone (Hides when file is selected) */}
            {!file && (
              <div 
                className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all duration-300
                  ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="rounded-full bg-white p-4 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <UploadCloud className={`h-10 w-10 ${isDragging ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500'}`} />
                </div>
                
                <h3 className="mt-5 text-lg font-semibold text-slate-700">Click to upload or drag and drop</h3>
                <p className="mt-2 text-sm text-slate-500">PDF, PNG, or JPG (Max size: 10MB)</p>
                
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
            )}

            {/* Selected File Preview Area */}
            {file && (
              <div className="space-y-6">
                
                {/* File Details Box */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center space-x-4 overflow-hidden">
                    <div className="rounded-lg bg-white p-2 shadow-sm">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="truncate">
                      <p className="truncate text-sm font-semibold text-slate-800">{file.name}</p>
                      <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  
                  {status === 'idle' && (
                    <button 
                      onClick={clearFile} 
                      className="ml-4 flex-shrink-0 rounded-full p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                      title="Remove file"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                  {status === 'success' && (
                    <CheckCircle2 className="ml-4 h-6 w-6 flex-shrink-0 text-emerald-500" />
                  )}
                </div>

                {/* Upload Action Area */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                  
                  {status === 'idle' && (
                    <>
                      <button 
                        onClick={clearFile}
                        className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={executeUpload}
                        className="flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      >
                        Start AI Extraction
                      </button>
                    </>
                  )}
                  
                  {status === 'uploading' && (
                    <button disabled className="flex items-center justify-center rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-white cursor-wait w-full sm:w-auto">
                      <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading & Processing...
                    </button>
                  )}

                  {status === 'success' && (
                    <div className="flex w-full flex-col sm:flex-row items-center justify-between rounded-xl bg-emerald-50 p-4 border border-emerald-100 gap-4">
                      <p className="text-sm font-medium text-emerald-800">
                        Document successfully sent to AI Verification Queue.
                      </p>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <button 
                          onClick={clearFile}
                          className="flex-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm border border-emerald-200 hover:bg-emerald-50 transition"
                        >
                          Upload Another
                        </button>
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-xl bg-blue-50 p-5 text-sm text-blue-800 border border-blue-100">
          <div className="flex items-start">
            <AlertCircle className="mr-3 h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>
              <strong>GovTech Standard Compliance:</strong> Documents uploaded here are stored temporarily on secure servers and passed to the Bhashini OCR / LayoutLM API for text extraction. Low confidence fields will be routed to the Verification Queue.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}