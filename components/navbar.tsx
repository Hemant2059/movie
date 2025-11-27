"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "./ui/input-group";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    setMobileSearchOpen(false); // close after submit
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-8xl mx-auto flex items-center justify-between p-4 relative z-50">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight hover:opacity-80 transition"
          >
            Movie<span className="text-primary">App</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/movie"
              className="hover:text-primary transition-colors"
            >
              Movies
            </Link>
            <Link href="/tv" className="hover:text-primary transition-colors">
              TV Shows
            </Link>
          </div>
        </div>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex items-center gap-2 w-64"
        >
          <InputGroup>
            <InputGroupInput
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                variant="secondary"
                type="submit"
                className="cursor-pointer"
              >
                Search
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>

        {/* Mobile Icons */}
        <div className="flex items-center gap-2 sm:hidden">
          {/* Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
          >
            {mobileSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="text-xl font-bold">≡</span>
          </Button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div
        className={`sm:hidden fixed inset-x-0 top-full bg-background/95 backdrop-blur-md z-40 transform transition-all duration-300 ease-in-out ${
          mobileSearchOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <form
          onSubmit={handleSearch}
          className="p-4 flex w-full max-w-md mx-auto"
        >
          <InputGroup className="flex-1">
            <InputGroupInput
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton type="submit" variant="secondary">
                Search
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`sm:hidden fixed inset-x-0 top-full bg-background/95 backdrop-blur-md z-40 transform transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 flex flex-col gap-2 max-w-md mx-auto">
          <Link
            href="/movie"
            className="hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Movies
          </Link>
          <Link
            href="/tv"
            className="hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            TV Shows
          </Link>
        </div>
      </div>
    </nav>
  );
}
