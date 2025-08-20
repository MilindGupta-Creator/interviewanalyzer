"use client"

import { Navbar } from "@/components/ui/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <section className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            Contact Us
          </div>
          <h1 className="text-hero mb-6 text-foreground max-w-4xl mx-auto">
            We'd love to hear from you
          </h1>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
            Have a question about InterviewHub or want to see a demo? Send us a message and we'll respond shortly.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <Card className="lg:col-span-2 border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Send a message</CardTitle>
              <CardDescription>Fill out the form and our team will get back to you.</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="rounded-xl border border-accent/20 bg-accent/10 p-6 text-left">
                  <p className="text-foreground font-medium mb-2">Thanks for reaching out!</p>
                  <p className="text-muted-foreground">We'll be in touch soon at {formState.email}.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="name">Full name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full rounded-lg border bg-input px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="email">Work email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full rounded-lg border bg-input px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full rounded-lg border bg-input px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Tell us a bit about your team and what you're looking to solve."
                    />
                  </div>
                  <Button className="btn-modern px-6" type="submit">
                    <Send className="h-4 w-4" />
                    Send message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Contact details</CardTitle>
                <CardDescription>Reach us directly via the channels below.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  support@interviewhub.app
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5" />
                  123 Market Street, Suite 500, San Francisco, CA
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Office hours</CardTitle>
                <CardDescription>We're available Monday to Friday.</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                9:00 AM – 6:00 PM PST
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


