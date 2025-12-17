"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ContactDialog } from "@/components/contact-dialog"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Contact</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">GET IN TOUCH</h2>
        <Button
          onClick={() => setContactOpen(true)}
          className="mt-8 font-mono text-xs uppercase tracking-wider bg-accent hover:bg-accent/90 px-8 py-6"
        >
          Book a Meeting
        </Button>
      </div>

      {/* Multi-column layout */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
        {/* Services */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Services</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Development</li>
            <li className="font-mono text-xs text-foreground/80">Design</li>
            <li className="font-mono text-xs text-foreground/80">PFE Support</li>
          </ul>
        </div>

        {/* Universities */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">We Serve</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">ESPRIT</li>
            <li className="font-mono text-xs text-foreground/80">Tek-Up</li>
            <li className="font-mono text-xs text-foreground/80">ENSI</li>
            <li className="font-mono text-xs text-foreground/80">SupCom</li>
            <li className="font-mono text-xs text-foreground/80">Manar</li>
          </ul>
        </div>

        {/* Technologies */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Stack</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">React</li>
            <li className="font-mono text-xs text-foreground/80">Node.js</li>
            <li className="font-mono text-xs text-foreground/80">Python</li>
            <li className="font-mono text-xs text-foreground/80">Mobile</li>
          </ul>
        </div>

        {/* Pricing */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Pricing</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Student Rates</li>
            <li className="font-mono text-xs text-foreground/80">Affordable</li>
            <li className="font-mono text-xs text-foreground/80">Flexible Plans</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contact</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:contact@techtonic.tn"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* Location */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Location</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Tunisia</li>
            <li className="font-mono text-xs text-foreground/80">Remote</li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2025 TechTonic. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">Built by students, for students.</p>
      </div>

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  )
}
