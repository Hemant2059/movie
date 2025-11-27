"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const Footer = () => {
  const { setTheme, theme } = useTheme();

  return (
    <footer className="w-full border-t bg-muted/40 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand + Description */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight hover:opacity-80 transition"
          >
            Movie<span className="text-primary">App</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Discover movies, TV shows, and the latest entertainment — powered by
            TMDB.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3 text-sm">
          <h3 className="text-base font-semibold">Navigation</h3>
          <Link href="/movie" className="hover:text-primary">
            Movies
          </Link>
          <Link href="/tv" className="hover:text-primary">
            TV Shows
          </Link>
        </div>

        {/* Theme Switch + TMDB Attribution */}
        <div className="flex flex-col gap-5">
          {/* Theme Toggle */}
          <div>
            <h3 className="text-base font-semibold mb-2">Theme</h3>
            <Button
              variant="outline"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-xl"
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MovieApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
