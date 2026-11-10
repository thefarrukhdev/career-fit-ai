"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle2, X, AlertCircle } from "lucide-react";

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
    <div className="w-full rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-5 backdrop-blur-xl transition-all">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Resume</h2>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-[#120f17] p-1 border border-[#2f293a] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("file")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "file"
                ? "bg-[#2f293a] text-white font-medium"
                : "text-[#b497cf] hover:text-white"
            }`}
          >
            File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("paste")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === "paste"
                ? "bg-[#2f293a] text-white font-medium"
                : "text-[#b497cf] hover:text-white"
            }`}
          >
            Paste
          </button>
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "file" ? (
          <motion.div
            key="file-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
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
                className={`flex flex-col items-center justify-center p-8 rounded-xl border border-dashed transition-all cursor-pointer ${
                  isDragging
                    ? "border-[#a855f7] bg-[#a855f7]/10"
                    : "border-[#2f293a] hover:border-[#a855f7]/50 bg-[#120f17]/50"
                }`}
              >
                <UploadCloud className="w-6 h-6 text-[#a855f7] mb-2" />
                <p className="text-xs font-medium text-white mb-0.5">
                  Drop your resume here or <span className="text-[#a855f7]">browse</span>
                </p>
                <p className="text-[11px] text-[#b497cf]">PDF or TXT up to 10MB</p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#2f293a] bg-[#120f17]">
                <div className="flex items-center gap-2.5 truncate">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-medium text-white truncate">{selectedFile.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={isLoading}
                  className="p-1 text-zinc-400 hover:text-white rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="paste-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <textarea
              value={pastedText}
              onChange={handlePastedTextChange}
              disabled={isLoading}
              placeholder="Paste your resume text here..."
              rows={6}
              className="w-full rounded-xl border border-[#2f293a] bg-[#120f17] p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#a855f7] transition-all font-mono leading-relaxed"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error display */}
      {uploadError && (
        <div className="mt-3 flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 border border-rose-900/30 p-2 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  );
}
