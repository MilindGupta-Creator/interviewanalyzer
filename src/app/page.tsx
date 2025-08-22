import { Navbar } from "@/components/ui/navbar"
import { UploadCard } from "@/components/upload-card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            AI-Powered Analysis
          </div>
          <h1 className="text-hero mb-8 text-foreground max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            Transform Your Interview Process with{" "}
            <span className="text-transparent bg-gradient-to-r from-accent to-accent/70 bg-clip-text animate-pulse">
              Intelligent Analysis
            </span>
          </h1>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto mb-12">
            Upload your interview recordings and receive instant transcriptions, candidate insights, and data-driven
            recommendations to make confident hiring decisions.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              Instant Transcription
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              Sentiment Analysis
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              Key Insights
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              Secure & Private
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-transparent mx-auto">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/l5gOz9jan9c"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>


        <UploadCard />
      </main>
    </div>
  )
}
