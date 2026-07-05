"use client";

import { useState } from "react";

const topics = [
  "Page pack support",
  "Lost studio link",
  "Image generation issue",
  "Billing question",
  "Feedback or feature request",
  "Business inquiry",
];

const MAX_MESSAGE_LENGTH = 2000;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Unable to send your message.");
      }

      setSuccess("Your message was sent. A confirmation email should arrive shortly.");
      setName("");
      setEmail("");
      setTopic(topics[0]);
      setMessage("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form id="contact-form" onSubmit={submitContact} className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border bg-white text-base"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border bg-white text-base"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="topic" className="text-sm font-semibold">What can we help with?</label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border bg-white text-base"
        >
          {topics.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="message" className="text-sm font-semibold">Message</label>
          <span className="text-xs text-gray-500">{message.length}/{MAX_MESSAGE_LENGTH}</span>
        </div>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={7}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Include your checkout email, Stripe receipt, or studio link details if this is about a purchase."
          className="w-full px-4 py-3 rounded-lg border bg-white resize-none text-base"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !name.trim() || !email.trim() || !message.trim()}
        className="w-full py-3 rounded-lg bg-[#2563eb] text-white font-semibold hover:bg-[#1e4fc2] disabled:opacity-50 transition"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </button>

      {success && <p className="text-green-700 text-sm bg-green-50 p-3 rounded-lg">{success}</p>}
      {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
    </form>
  );
}
