"use client";

import { useState } from "react";

/**
 * Nav — Sticky top navigation for buymyhouse.co replica
 * - White background, green logo, phone number, "Get Your Offer" red CTA
 * - Mobile: hamburger menu collapses nav links
 * Entity: Buy My House Boise
 */
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <a href="/" className="flex-shrink-0">
            {/* Using standard img tag — external URL from production CDN */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://buymyhouse.co/wp-content/uploads/2023/10/Buy-My-House-Text-Logo-Green-Sell-My-House-Boise-Home-Buyers.png"
              alt="Buy My House — Boise Cash Home Buyers"
              className="h-10 w-auto"
            />
          </a>

          {/* ── Desktop Nav Links ──────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-bmh-dark hover:text-bmh-green font-medium transition-colors text-sm">
              Home
            </a>
            <a href="#about" className="text-bmh-dark hover:text-bmh-green font-medium transition-colors text-sm">
              About
            </a>
            <a href="#" className="text-bmh-dark hover:text-bmh-green font-medium transition-colors text-sm">
              Blog
            </a>
          </div>

          {/* ── Phone + CTA ──────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-4">
            {/* Clickable phone number */}
            <a
              href="tel:+12084052274"
              className="text-bmh-dark hover:text-bmh-green font-semibold text-sm transition-colors"
            >
              (208) 405-2274
            </a>
            {/* Primary CTA — red button */}
            <a
              href="#lead-form"
              className="bg-bmh-red hover:bg-bmh-red-dark text-white font-bold px-5 py-2 rounded text-sm transition-colors"
            >
              Get Your Offer
            </a>
          </div>

          {/* ── Mobile Hamburger ──────────────────────────────────────── */}
          <button
            className="md:hidden p-2 text-bmh-dark"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {/* Simple 3-bar hamburger / X icon */}
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile Dropdown Menu ─────────────────────────────────────── */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-3">
            <a href="#" className="text-bmh-dark font-medium text-sm px-2 py-1">Home</a>
            <a href="#about" className="text-bmh-dark font-medium text-sm px-2 py-1">About</a>
            <a href="#" className="text-bmh-dark font-medium text-sm px-2 py-1">Blog</a>
            <a
              href="tel:+12084052274"
              className="text-bmh-dark font-semibold text-sm px-2 py-1"
            >
              (208) 405-2274
            </a>
            <a
              href="#lead-form"
              className="bg-bmh-red text-white font-bold px-5 py-2 rounded text-sm text-center"
              onClick={() => setMenuOpen(false)}
            >
              Get Your Offer
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
