"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, Lightbulb, CircleHelp, Ban, ListChecks } from "lucide-react"

type Analysis = {
  interviewee: {
    whatWentWell: string[]
    whatCouldImprove: string[]
    actionableTips: string[]
  }
  recruiter: {
    areasMissed: string[]
    suggestedQuestions: string[]
  }
}

function ResultsContent() {
  const params = useSearchParams()
  const username = params.get("username") || "Interviewee"
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [roleTab, setRoleTab] = useState<"interviewee" | "recruiter">("interviewee")

  useEffect(() => {
    try {
      const raw = localStorage.getItem("analysis")
      if (raw) {
        setAnalysis(JSON.parse(raw))
      }
    } catch {}
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-card border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <CardTitle className="text-2xl font-serif font-black tracking-tight">{roleTab === "interviewee" ? "Interviewee Feedback" : "Recruiter Feedback"}</CardTitle>
                <CardDescription>
                  Insights for <span className="font-medium text-foreground">{username}</span>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link href="/">New Analysis</Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {!analysis ? (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">No analysis found. Please upload and process files first.</p>
                <Button asChild>
                  <Link href="/">Go to Upload</Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Tabs */}
                <div className="flex items-center gap-2">
                  <button
                    className={`px-3 py-1.5 rounded-md text-sm border ${roleTab === "interviewee" ? "bg-accent text-accent-foreground border-accent" : "bg-background text-foreground border-border hover:bg-muted/60"}`}
                    onClick={() => setRoleTab("interviewee")}
                  >
                    Interviewee
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-md text-sm border ${roleTab === "recruiter" ? "bg-accent text-accent-foreground border-accent" : "bg-background text-foreground border-border hover:bg-muted/60"}`}
                    onClick={() => setRoleTab("recruiter")}
                  >
                    Recruiter
                  </button>
                </div>

                {roleTab === "interviewee" ? (
                  <div className="space-y-6">
                    <SectionTitle title="Strengths" icon={<CheckCircle2 className="text-green-600" />} />
                    <BulletList items={analysis.interviewee.whatWentWell} iconColor="text-green-600" icon={<CheckCircle2 />} />

                    <SectionTitle title="Areas for improvement" icon={<AlertCircle className="text-yellow-600" />} />
                    <BulletList items={analysis.interviewee.whatCouldImprove} iconColor="text-yellow-700" icon={<AlertCircle />} />

                    <SectionTitle title="Actionable Tips" icon={<Lightbulb className="text-accent" />} />
                    <BulletList items={analysis.interviewee.actionableTips} iconColor="text-accent" icon={<ListChecks />} />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <SectionTitle title="Missed Opportunities" icon={<Ban className="text-muted-foreground" />} />
                    <BulletList items={analysis.recruiter.areasMissed} iconColor="text-muted-foreground" icon={<Ban />} subdued />

                    <SectionTitle title="Suggested Questions" icon={<CircleHelp className="text-muted-foreground" />} />
                    <BulletList items={analysis.recruiter.suggestedQuestions} iconColor="text-muted-foreground" icon={<CircleHelp />} subdued />
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-serif font-black tracking-tight">Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Loading results...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultsContent />
    </Suspense>
  )
}

function SectionTitle({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <div className="size-5 flex items-center justify-center">{icon}</div>
      <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">{title}</h3>
    </div>
  )
}

function BulletList({ items, icon, iconColor, subdued = false }: { items: string[]; icon: React.ReactElement; iconColor?: string; subdued?: boolean }) {
  return (
    <ul className="space-y-2">
      {items.map((text, index) => (
        <li key={index} className={`flex items-start gap-3 ${subdued ? "text-muted-foreground" : "text-foreground"}`}>
          <span className={`mt-0.5 ${iconColor}`}>{icon}</span>
          <span className="text-sm leading-relaxed">{text}</span>
        </li>
      ))}
    </ul>
  )
}

