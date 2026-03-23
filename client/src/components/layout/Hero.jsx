import React from 'react'
import { ArrowRight, BookOpen, Sparkles, GraduationCap } from "lucide-react"

const Hero = () => {
  return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating icons */}
        <div className="absolute top-20 left-[10%] animate-float">
          <div className="w-16 h-16 bg-primary/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-primary/10 shadow-xl">
            <BookOpen className="w-8 h-8 text-primary/70" />
          </div>
        </div>

        <div className="absolute top-40 right-[15%] animate-float" style={{ animationDelay: "0.5s" }}>
          <div className="w-20 h-20 bg-accent/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-accent/10 shadow-xl rotate-12">
            <Sparkles className="w-10 h-10 text-primary/70" />
          </div>
        </div>

        <div className="absolute bottom-32 left-[15%] animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-14 h-14 bg-primary/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-primary/10 shadow-xl -rotate-12">
            <GraduationCap className="w-7 h-7 text-primary/70" />
          </div>
        </div>

        <div className="absolute bottom-40 right-[20%] animate-float" style={{ animationDelay: "1.5s" }}>
          <div className="w-12 h-12 bg-accent/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/10 shadow-xl">
            <div className="w-3 h-3 bg-primary/70 rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <h1
          className="text-3xl md:text-3xl lg:text-5xl font-bold tracking-tight text-balance text-primary/85 uppercase animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          Al-Xorazmiy Maktabi Ball Tizimi
          {/* <span className="text-primary">{"limits"}</span> */}
        </h1>
{/* <p
          className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          {"Events, shops, classes, transactions"}
          
        </p> */}

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
        </div>
      </div>

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
    </section>
  )
}

export default Hero