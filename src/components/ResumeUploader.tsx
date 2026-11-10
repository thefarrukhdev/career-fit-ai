"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { Upload, Check, X, AlertCircle } from "lucide-react";

interface ResumeUploaderProps {
  onResumeChange: (text: string, file?: File) => void;
  isLoading?: boolean;
}

export function ResumeUploader({ onResumeChange, isLoading = false }: ResumeUploaderProps) {
  const [activeTab, setActiveTab] = useState<"file" | "paste">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (file: File) => {
    setUploadError(null);
    const validTypes = ["application/pdf", "text/plain"];
    const isPdfExt = file.name.toLowerCase().endsWith(".pdf");
    const isTxtExt = file.name.toLowerCase().endsWith(".txt");

    if (!validTypes.includes(file.type) && !isPdfExt && !isTxtExt) {
      setUploadError("Please upload a PDF or TXT file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File exceeds 10MB limit.");
      return;
    }

    setSelectedFile(file);
    setPastedText("");
    onResumeChange("", file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isLoading) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onResumeChange("", undefined);
  };

  const handlePastedTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setPastedText(text);
    setSelectedFile(null);
    setUploadError(null);
    onResumeChange(text, undefined);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition-all">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-zinc-300">Resume</span>

          {/* Toggle */}
          <div className="flex rounded-md bg-zinc-900 p-0.5 border border-zinc-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("file")}
              className={`px-2.5 py-1 rounded text-[11px] transition-all ${
                activeTab === "file"
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("paste")}
              className={`px-2.5 py-1 rounded text-[11px] transition-all ${
                activeTab === "paste"
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Paste
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "file" ? (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,application/pdf,text/plain"
              className="hidden"
              onChange={handleFileInputChange}
              disabled={isLoading}
            />

            {!selectedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isLoading && fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center h-48 rounded-lg border border-dashed transition-all cursor-pointer ${
                  isDragging
                    ? "border-zinc-400 bg-zinc-800/50"
                    : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/40"
                }`}
              >
                <Upload className="w-5 h-5 text-zinc-400 mb-2" />
                <p className="text-xs text-zinc-300 mb-0.5">
                  Drop PDF or <span className="text-white underline">browse</span>
                </p>
                <p className="text-[10px] text-zinc-500">PDF or TXT up to 10MB</p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 h-48 rounded-lg border border-zinc-800 bg-zinc-950/50">
                <div className="flex items-center gap-2 truncate">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-zinc-200 truncate">{selectedFile.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={isLoading}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <textarea
            value={pastedText}
            onChange={handlePastedTextChange}
            disabled={isLoading}
            placeholder="Paste your resume text here..."
            className="w-full h-48 rounded-lg border border-zinc-800 bg-zinc-950/50 p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 font-mono resize-none"
          />
        )}
      </div>

      {uploadError && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-400 bg-rose-950/20 border border-rose-900/30 p-2 rounded">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  );
}
