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
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 md:p-6 backdrop-blur-xl shadow-lg transition-all">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-semibold text-white tracking-wide">Candidate Resume</h2>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-zinc-950 p-1 border border-zinc-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("file")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "file"
                ? "bg-zinc-800 text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Upload PDF / TXT
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("paste")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "paste"
                ? "bg-zinc-800 text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
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
                className={`relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-500/5 shadow-inner"
                    : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 hover:bg-zinc-950/70"
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 mb-4 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-7 h-7 text-emerald-400" />
                </div>
                <p className="text-sm font-medium text-zinc-200 mb-1 text-center">
                  <span className="text-emerald-400 font-semibold underline underline-offset-2">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-zinc-500 text-center">
                  Supports PDF or TXT (Max 10MB) — parsed natively on server
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-950/70">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-white truncate">{selectedFile.name}</p>
                    <p className="text-xs text-zinc-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Ready for ATS scan
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={isLoading}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
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
                placeholder="Paste the full text of your resume here (experience, skills, education, projects)..."
                rows={8}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono leading-relaxed"
              />
              <div className="flex justify-end mt-1.5 text-xs text-zinc-500">
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
          className="mt-3 flex items-center gap-2 text-xs text-red-400 bg-red-950/30 border border-red-900/40 p-2.5 rounded-lg"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </motion.div>
      )}
    </div>
  );
}
