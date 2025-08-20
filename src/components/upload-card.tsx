"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileAudio, FileVideo, CheckCircle } from "lucide-react"

export function UploadCard() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type.startsWith("audio/") || file.type.startsWith("video/"),
    )

    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-0 bg-card">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-serif font-black tracking-tight text-foreground mb-3">
          Upload Interview Files
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Upload your audio or video interview files to get started with AI-powered analysis and insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            isDragOver
              ? "border-accent bg-accent/5 scale-[1.02]"
              : "border-border hover:border-accent/50 hover:bg-accent/5"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-16 w-16 text-accent mb-6" />
          <div className="space-y-3">
            <p className="text-xl font-semibold text-foreground">Drop your files here</p>
            <p className="text-muted-foreground">or click to browse your computer</p>
          </div>
          <input
            type="file"
            multiple
            accept="audio/*,video/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Uploaded Files ({uploadedFiles.length})</h3>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {file.type.startsWith("audio/") ? (
                      <FileAudio className="h-6 w-6 text-accent" />
                    ) : (
                      <FileVideo className="h-6 w-6 text-accent" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-6 text-lg"
            disabled={uploadedFiles.length === 0}
          >
            Process Files
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-border hover:bg-muted/50 font-medium py-6 text-lg bg-transparent"
            onClick={() => setUploadedFiles([])}
          >
            Clear All
          </Button>
        </div>

        <div className="text-sm text-muted-foreground text-center bg-muted/30 rounded-lg p-4">
          <strong>Supported formats:</strong> MP3, WAV, MP4, MOV, AVI • <strong>Max file size:</strong> 100MB
        </div>
      </CardContent>
    </Card>
  )
}
