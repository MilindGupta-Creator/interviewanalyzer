import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-serif font-black tracking-tight text-foreground hover:text-accent transition-colors">
              InterviewHub
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="font-medium">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="ghost" className="font-medium">
              <Link href="/contact">Contact</Link>
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">Sign In</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
