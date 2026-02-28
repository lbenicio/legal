import Link from "next/link"
import { Github, Twitter, MessageCircle } from "lucide-react"
import { Button } from "./ui/button"

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto flex items-center justify-between p-4 sm:p-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Legal Clarity. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Contact">
              <MessageCircle className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
