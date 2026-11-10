"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, X, AlertCircle } from "lucide-react";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";

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
    <SpotlightCard
      className="p-5 md:p-6 backdrop-blur-2xl shadow-xl transition-all"
      spotlightColor="rgba(16, 185, 129, 0.22)"
      intensity={0.2}
      spotlightSize={360}
      borderGlow={0.9}
    >
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">Candidate Resume</h2>
            <p className="text-[11px] text-zinc-400">PDF or plain text extracted natively</p>
          </div>
        </div>

        {/* Tab switch with Framer Motion layoutId */}
        <div className="relative flex rounded-xl bg-zinc-950/90 p-1 border border-white/10 text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("file")}
            className={`relative z-10 px-3.5 py-1.5 rounded-lg transition-colors duration-200 flex items-center gap-1.5 ${
              activeTab === "file" ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {activeTab === "file" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 rounded-lg bg-zinc-800/90 shadow-sm border border-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
              Upload PDF / TXT
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("paste")}
            className={`relative z-10 px-3.5 py-1.5 rounded-lg transition-colors duration-200 flex items-center gap-1.5 ${
              activeTab === "paste" ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {activeTab === "paste" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 rounded-lg bg-zinc-800/90 shadow-sm border border-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Paste Text
            </span>
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
                className={`relative group flex flex-col items-center justify-center p-8 sm:p-10 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
                  isDragging
                    ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.15)] scale-[1.01]"
                    : "border-white/10 hover:border-emerald-500/40 bg-zinc-950/60 hover:bg-zinc-950/90 hover:shadow-[0_0_25px_rgba(16,185,129,0.08)]"
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900/90 border border-white/10 text-zinc-300 mb-4 group-hover:scale-110 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-all duration-300 shadow-inner">
                  <UploadCloud className="w-7 h-7 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                </div>
                <p className="text-sm font-semibold text-zinc-200 mb-1 text-center">
                  <span className="text-emerald-400 underline underline-offset-4 decoration-emerald-400/40 group-hover:decoration-emerald-400 transition-colors">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-zinc-500 text-center">
                  PDF or TXT format (up to 10MB) — parsed securely in memory
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/15 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-white truncate">{selectedFile.name}</p>
                    <p className="text-xs text-emerald-400/80 font-medium">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Ready for deep ATS analysis
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={isLoading}
                  className="p-2 text-zinc-400 hover:text-rose-400 rounded-lg hover:bg-zinc-800/80 transition-colors"
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
                placeholder="Paste the full text of your resume here (work history, technical skills, education, projects, achievements)..."
                rows={8}
                className="w-full rounded-xl border border-white/10 bg-zinc-950/70 p-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all font-mono leading-relaxed shadow-inner"
              />
              <div className="flex justify-between items-center mt-2 text-xs text-zinc-500 px-1">
                <span>Direct raw text input</span>
                <span className="font-mono bg-zinc-950 px-2 py-0.5 rounded border border-white/5">
                  {pastedText.length} characters
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error notification */}
      {uploadError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3.5 flex items-center gap-2.5 text-xs text-rose-300 bg-rose-950/30 border border-rose-500/30 p-3 rounded-xl shadow-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{uploadError}</span>
        </motion.div>
      )}
    </SpotlightCard>
  );
}

export default ResumeUploader;
