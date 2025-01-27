"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FileIcon, UploadIcon, XIcon } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  onChange: (files: File[]) => void;
  value?: File[];
  className?: string;
  placeholder?: string;
}

export function FileUpload({
  accept = "image/*",
  onChange,
  value = [],
  className,
  placeholder = "Choose files",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      onChange([...value, ...newFiles]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onChange([...value, ...newFiles]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const removeFile = (indexToRemove: number) => {
    const newFiles = value.filter((_, index) => index !== indexToRemove);
    onChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative flex min-h-[150px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-input px-6 py-10 text-center transition-colors duration-300 hover:bg-background-active hover:border-primary hover:bg-opacity-5",
          dragActive && "border-primary bg-background-active bg-opacity-10",
          className
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          multiple
        />

        <div className="flex flex-col items-center gap-2">
          <UploadIcon className="h-8 w-8 text-muted-foreground" />
          <span className="text-base font-semibold">{placeholder}</span>
          <span className="text-sm text-muted-foreground font-semibold">
            Click or drag to upload
          </span>
        </div>
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg border border-input p-3"
            >
              <div className="flex items-center gap-2">
                <FileIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024).toFixed(2)} KB)
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="rounded-full p-1 hover:bg-background-active"
              >
                <XIcon className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
