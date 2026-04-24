"use client";

import { useState, FormEvent } from "react";

/**
 * LeadForm — BMH lead capture form
 * On submit: POSTs to /api/submit-lead (server route) which forwards to GHL BMH sub-account
 * Fields: firstName, lastName, address1, city, phone
 * Entity: Buy My House Boise
 */

interface FormState {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  phone: string;
}

export default function LeadForm() {
  // Form field values
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    phone: "",
  });

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Generic field change handler
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error on any change
    if (error) setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Client-side validation — all fields required
    if (!form.firstName.trim() || !form.lastName.trim() || !form.address1.trim() || !form.city.trim() || !form.phone.trim()) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      // Success — show confirmation message
      setSuccess(true);
    } catch (err) {
      console.error("Lead form submission error:", err);
      setError("Something went wrong. Please call us directly at (208) 405-2274.");
    } finally {
      setSubmitting(false);
    }
  }

  // Shared input style — white bg, clean border, focus ring in green
  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded bg-white text-bmh-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bmh-green focus:border-transparent text-sm";

  // ── Success state ─────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="bg-white rounded-lg p-6 text-center shadow-lg">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-bmh-green mb-2">Thank You!</h3>
        <p className="text-bmh-dark text-sm">
          We&apos;ll be in touch within 24 hours with your cash offer.
        </p>
        <p className="text-bmh-gray text-xs mt-3">
          Questions? Call us: <a href="tel:+12084052274" className="text-bmh-green font-semibold">(208) 405-2274</a>
        </p>
      </div>
    );
  }

  return (
    <div id="lead-form" className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
      {/* Form header */}
      <h3 className="text-lg font-bold text-bmh-dark mb-1">Get Your Cash Offer Today</h3>
      <p className="text-xs text-bmh-gray mb-4">No fees. No commissions. No repairs.</p>

      <form onSubmit={handleSubmit} noValidate>
        {/* ── Name row — first + last side by side ─────────────────────── */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold text-bmh-dark mb-1">
              First Name <span className="text-bmh-red">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Jane"
              value={form.firstName}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold text-bmh-dark mb-1">
              Last Name <span className="text-bmh-red">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Smith"
              value={form.lastName}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* ── Property Address ───────────────────────────────────────────── */}
        <div className="mb-3">
          <label htmlFor="address1" className="block text-xs font-semibold text-bmh-dark mb-1">
            Property Address <span className="text-bmh-red">*</span>
          </label>
          <input
            id="address1"
            name="address1"
            type="text"
            autoComplete="street-address"
            placeholder="1234 W Main St"
            value={form.address1}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        {/* ── City ──────────────────────────────────────────────────────── */}
        <div className="mb-3">
          <label htmlFor="city" className="block text-xs font-semibold text-bmh-dark mb-1">
            City <span className="text-bmh-red">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Boise"
            value={form.city}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        {/* ── Phone ─────────────────────────────────────────────────────── */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-xs font-semibold text-bmh-dark mb-1">
            Phone Number <span className="text-bmh-red">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(208) 405-2274"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        {/* ── Error message ─────────────────────────────────────────────── */}
        {error && (
          <p className="text-bmh-red text-xs mb-3 p-2 bg-red-50 rounded border border-red-200">
            {error}
          </p>
        )}

        {/* ── Submit button ─────────────────────────────────────────────── */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-bmh-red hover:bg-bmh-red-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded text-sm transition-colors"
        >
          {submitting ? "Submitting..." : "Get Your Offer →"}
        </button>
      </form>
    </div>
  );
}
