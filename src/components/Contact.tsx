"use client";
// src/components/Contact.tsx
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors before each submit attempt
    setErrors({});

    // Check for empty fields
    if (!formData.email || !formData.message) {
      // Set error messages for empty fields
      const newErrors: { email?: string; message?: string } = {};
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.message) newErrors.message = "Message is required";
      setErrors(newErrors);
      return; // Prevent submission if there are errors
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (_) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-black text-white text-center py-16" id="about">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
            Let&apos;s Talk.
          </span>
        </h2>
        <div className="flex justify-center">
          <form className="space-y-4 w-8/12" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-left pl-2 text-lg"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-neon-green"
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-bold text-left pl-2 text-lg"
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-neon-green"
                placeholder="Enter Email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 font-bold text-left pl-2 text-lg"
              >
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-neon-green"
                rows={5}
                placeholder="Enter Message"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <button
              className="bg-gradient-to-r from-yellow-500 to-pink-400 text-white transform transition-transform duration-300 hover:scale-105 px-16 py-2 rounded-full"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send"}
            </button>
            {status === "success" && <p className="text-green-500 mt-4">Message sent successfully!</p>}
            {status === "error" && <p className="text-red-500 mt-4">Failed to send message. Try again later.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
