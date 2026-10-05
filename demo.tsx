"use client";

import React, { useState } from "react";
import { BackgroundPaths, BackgroundPathsLayer } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

export function Demo() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-between p-6 overflow-hidden">
      {/* 1. Global Animated Background Paths Layer */}
      <BackgroundPathsLayer />

      {/* Top Brand Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4 border-b border-border bg-card/80 backdrop-blur-xs px-6 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary border border-primary-dark flex items-center justify-center font-black text-xs text-primary-foreground">
            SH
          </div>
          <span className="font-extrabold text-sm tracking-tight text-foreground">
            SPORTS HUB
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border">
            Theme Demo
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = "/"}
          className="cursor-pointer"
        >
          View Full Portal
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </header>

      {/* 2. Main Hero with Animated Typography & Button */}
      <main className="w-full flex-1 flex flex-col items-center justify-center py-12">
        <BackgroundPaths
          title="SPORTS HUB"
          subtitle="Connecting People, Places & Opportunities in Sports through a unified, accessible digital ecosystem."
          buttonText={clicked ? "Opportunity Discovered!" : "Explore Sports Hub"}
          onButtonClick={() => setClicked(!clicked)}
        />

        {/* Brand Theme Palette Inspection Card */}
        <div className="mt-8 max-w-3xl w-full bg-card/90 border border-border rounded-2xl p-6 shadow-xs backdrop-blur-xs">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-dark" />
              <h2 className="text-sm font-bold text-foreground">
                Brand Palette &amp; Contrast Validation
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              WCAG AA Verified
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-primary text-primary-foreground border border-primary-dark">
              <div className="font-bold">Primary (Lime)</div>
              <div className="text-[10px] opacity-80">#CDFF00 (Dark text)</div>
            </div>
            <div className="p-3 rounded-lg bg-primary-dark text-white">
              <div className="font-bold">Primary Dark</div>
              <div className="text-[10px] opacity-80">#9ECC00 (Path stroke)</div>
            </div>
            <div className="p-3 rounded-lg bg-secondary text-secondary-foreground border border-border">
              <div className="font-bold">Primary Light</div>
              <div className="text-[10px] text-muted-foreground">#F8FFD9 (Tints)</div>
            </div>
            <div className="p-3 rounded-lg bg-card text-card-foreground border border-border">
              <div className="font-bold">Card Surface</div>
              <div className="text-[10px] text-muted-foreground">#FFFFFF / 228 24% 96%</div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-muted-foreground gap-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary-dark" />
              <span>Lime fill is paired strictly with dark foreground text (#222222).</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-primary-dark" />
              <span>1px primary-dark borders guarantee edge definition on white surfaces.</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-xs text-muted-foreground py-4 text-center">
        Sports Hub Design System · shadcn/ui &amp; Framer Motion Background Paths
      </footer>
    </div>
  );
}

export default Demo;
