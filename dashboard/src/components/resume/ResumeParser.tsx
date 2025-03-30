
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Upload, Check, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const ResumeParser = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parseStatus, setParseStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.docx')) {
        setSelectedFile(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload a PDF or DOCX file.",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setParseStatus(Math.random() > 0.2 ? 'success' : 'error');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-recruitment-primary" />
        <h3 className="text-lg font-semibold">Resume Parser</h3>
      </div>
      
      {!isUploading && parseStatus === 'idle' && (
        <>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging ? 'border-recruitment-primary bg-recruitment-muted' : 'border-gray-300 hover:border-recruitment-primary'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('resume-upload')?.click()}
          >
            <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <h4 className="text-lg font-medium mb-1">Drop your resume here</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Support for PDF, DOCX files.
            </p>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button variant="outline" className="mx-auto">
              Browse Files
            </Button>
          </div>
          {selectedFile && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-recruitment-primary" />
                <span className="text-sm font-medium truncate max-w-[200px]">
                  {selectedFile.name}
                </span>
              </div>
              <Button onClick={handleUpload}>
                Parse Resume
              </Button>
            </div>
          )}
        </>
      )}

      {isUploading && (
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Uploading...</span>
            <span className="text-sm">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {parseStatus === 'success' && (
        <div className="mt-4 bg-green-50 text-green-700 p-4 rounded-lg flex items-start gap-3">
          <Check className="h-5 w-5 mt-0.5" />
          <div>
            <h4 className="font-medium">Resume parsed successfully!</h4>
            <p className="text-sm mt-1">
              We've extracted key skills, experience, and qualifications from the resume. 
              The candidate profile has been created and is ready for review.
            </p>
            <Button className="mt-3" variant="outline">
              View Candidate Profile
            </Button>
          </div>
        </div>
      )}

      {parseStatus === 'error' && (
        <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5" />
          <div>
            <h4 className="font-medium">Error parsing resume</h4>
            <p className="text-sm mt-1">
              We couldn't properly parse this resume format. Please try a different file or enter the candidate information manually.
            </p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline">
                Try Again
              </Button>
              <Button variant="outline">
                Manual Entry
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResumeParser;
