"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, X, AlertCircle } from "lucide-react";

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
      setUploadError("Please upload a valid PDF or TXT resume file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size exceeds 10MB limit.");
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
    <div className="w-full rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-5 md:p-6 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all hover:border-[#a855f7]/40">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[#2f293a] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#a855f7]/15 text-[#c084fc] border border-[#a855f7]/30">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Candidate Resume</h2>
            <p className="text-[11px] text-[#b497cf]">Raw PDF parsed natively via server stream</p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-[#120f17] p-1 border border-[#2f293a] text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("file")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "file"
                ? "bg-[#373044] text-white shadow-sm font-semibold"
                : "text-[#b497cf] hover:text-white"
            }`}
          >
            Upload PDF / TXT
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("paste")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "paste"
                ? "bg-[#373044] text-white shadow-sm font-semibold"
                : "text-[#b497cf] hover:text-white"
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "file" ? (
          <motion.div
            key="file-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
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
                className={`relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-xl border border-dashed transition-all cursor-pointer ${
                  isDragging
                    ? "border-[#a855f7] bg-[#a855f7]/10 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                    : "border-[#2f293a] hover:border-[#a855f7]/60 bg-[#120f17]/60 hover:bg-[#120f17]/90"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1b1722] border border-[#2f293a] text-[#c084fc] mb-3.5 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-white mb-1 text-center">
                  <span className="text-[#c084fc] font-semibold underline underline-offset-2">Click to browse</span> or drag and drop
                </p>
                <p className="text-xs text-[#b497cf] text-center">
                  Supports PDF or TXT (Max 10MB) — zero disk storage
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-xl border border-[#2f293a] bg-[#120f17]/80">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#a855f7]/15 text-[#c084fc] border border-[#a855f7]/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-white truncate">{selectedFile.name}</p>
                    <p className="text-xs text-[#b497cf]">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Ready for ATS analysis
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={isLoading}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-[#373044] transition-colors"
                  aria-label="Remove uploaded file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="paste-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <textarea
                value={pastedText}
                onChange={handlePastedTextChange}
                disabled={isLoading}
                placeholder="Paste the full text of your resume here (experience, skills, projects, education)..."
                rows={8}
                className="w-full rounded-xl border border-[#2f293a] bg-[#120f17]/80 p-4 text-sm text-zinc-200 placeholder:text-[#554c5e] focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all font-mono leading-relaxed"
              />
              <div className="flex justify-end mt-1.5 text-xs text-[#b497cf]">
                {pastedText.length} characters
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error display */}
      {uploadError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 flex items-center gap-2 text-xs text-rose-300 bg-rose-950/40 border border-rose-800/40 p-2.5 rounded-lg"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{uploadError}</span>
        </motion.div>
      )}
    </div>
  );
}
