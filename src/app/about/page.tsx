import { Navbar } from "@/components/ui/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Users, Bot, ShieldCheck, Sparkles, Rocket } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <section className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            About Us
          </div>
          <h1 className="text-hero mb-6 text-foreground max-w-4xl mx-auto">
            Elevating hiring with
            {" "}
            <span className="text-transparent bg-gradient-to-r from-accent to-accent/70 bg-clip-text">AI precision</span>
          </h1>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
            InterviewHub helps teams run faster, fairer, and more insightful interviews using intelligent analysis and elegant tooling.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
              <CardDescription>
                Empower every hiring team to make confident, data‑driven decisions while creating delightful candidate experiences.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              We blend state‑of‑the‑art AI with thoughtful design to surface meaningful insights from every conversation. The result is a hiring process that is transparent, scalable, and human‑centered.
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">What We Believe</CardTitle>
              <CardDescription>
                Great hiring is a craft. Tools should be simple, trustworthy, and delightful.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              We obsess over clarity and signal. From transcription quality to bias‑aware analytics, we design every detail to help teams focus on what matters: potential and fit.
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-accent/10 text-accent"><Target className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Signal over noise</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Surface the moments that matter with keyword spotting, sentiment cues, and automatic highlight reels.
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-accent/10 text-accent"><Users className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Fair by design</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Structure interviews, reduce bias, and bring consistency across teams with shareable rubrics.
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-accent/10 text-accent"><Bot className="h-5 w-5" /></div>
              <CardTitle className="text-xl">AI that assists</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Thoughtful automation augments interviewers without replacing judgment.
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-accent/10 text-accent"><ShieldCheck className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Secure & private</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Enterprise‑grade privacy controls and encryption keep candidate data safe.
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-accent/10 text-accent"><Sparkles className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Beautiful by default</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              A refined interface that teams love to use, with accessibility at its core.
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-accent/10 text-accent"><Rocket className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Made to scale</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              From startups to enterprises, plug in via APIs and grow without friction.
            </CardContent>
          </Card>
        </section>

        <div className="text-center">
          <Button className="btn-modern px-8 py-6 text-base">Get in touch</Button>
        </div>
      </main>
    </div>
  )
}


