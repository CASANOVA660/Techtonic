"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !description || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          description,
          date: format(date, "PPP"),
        }),
      })

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you soon to confirm your meeting.",
        })
        // Reset form
        setEmail("")
        setDescription("")
        setDate(undefined)
        onOpenChange(false)
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-background border-border/50">
        <DialogHeader>
          <DialogTitle className="font-[var(--font-bebas)] text-3xl tracking-tight">Get In Touch</DialogTitle>
          <DialogDescription className="font-mono text-xs text-muted-foreground">
            Tell us about your project and book a meeting to discuss how we can help.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-mono text-xs uppercase tracking-wider">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@university.tn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-mono text-xs uppercase tracking-wider">
              Project Description
            </Label>
            <Textarea
              id="description"
              placeholder="Tell us about your project, what you need help with, and any specific requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              className="font-mono text-sm resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase tracking-wider">Preferred Meeting Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-mono text-sm", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-[10px] font-mono text-muted-foreground">
              Select your preferred date. We'll confirm availability via email.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 font-mono text-xs uppercase tracking-wider"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 font-mono text-xs uppercase tracking-wider bg-accent hover:bg-accent/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Book Meeting"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
