"use client";

import type React from "react";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { contactData } from "@/data/contactData";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const controls = useAnimation();

  // Early return if data not available
  if (!contactData || contactData.isRequired === false) {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const availableMessagingPlatforms = getAvailableMessagingPlatforms();

    // If no messaging platforms available, directly redirect to Gmail
    if (availableMessagingPlatforms.length === 0) {
      const message = `Name: ${formData.name}\nEmail: ${formData.email}\nProject: ${formData.project}\nMessage: ${formData.message}`;
      const encodedMessage = encodeURIComponent(message);
      const subject = encodeURIComponent(
        `New Project Inquiry from ${formData.name}`
      );

      // Open Gmail with pre-written message and empty "to" field
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${encodedMessage}`
      );

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        project: "",
        message: "",
      });
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.6 },
      });
    } else {
      // Show popup only if messaging platforms are available
      setShowMessagePopup(true);
    }
  };

  const handleSendMessage = (platform: "email" | "whatsapp" | "telegram") => {
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nProject: ${formData.project}\nMessage: ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);

    switch (platform) {
      case "email":
        const emailTo = contactData.messaging?.email || "";
        const subject = encodeURIComponent(
          `New Project Inquiry from ${formData.name}`
        );
        window.open(
          `mailto:${emailTo}?subject=${subject}&body=${encodedMessage}`
        );
        break;
      case "whatsapp":
        const whatsappNumber =
          contactData.messaging?.whatsapp?.replace(/[^0-9]/g, "") || "";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`);
        break;
      case "telegram":
        const telegramHandle =
          contactData.messaging?.telegram?.replace("@", "") || "";
        window.open(`https://t.me/${telegramHandle}?text=${encodedMessage}`);
        break;
    }

    setShowMessagePopup(false);
    setIsSubmitted(true);
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.6 },
    });
  };

  // Get available social media platforms
  const getAvailableSocialPlatforms = () => {
    if (!contactData.socialMedia) return [];

    const platforms = [
      { name: "Twitter", key: "twitter", icon: "𝕏" },
      { name: "LinkedIn", key: "linkedin", icon: "💼" },
      { name: "Instagram", key: "instagram", icon: "📷" },
      { name: "Dribbble", key: "dribbble", icon: "🏀" },
      { name: "Behance", key: "behance", icon: "🎨" },
      { name: "GitHub", key: "github", icon: "💻" },
      { name: "YouTube", key: "youtube", icon: "📺" },
      { name: "Facebook", key: "facebook", icon: "📘" },
    ];

    return platforms.filter(
      (platform) =>
        contactData.socialMedia?.[
          platform.key as keyof typeof contactData.socialMedia
        ] &&
        contactData.socialMedia[
          platform.key as keyof typeof contactData.socialMedia
        ].trim() !== ""
    );
  };

  // Get available messaging platforms
  const getAvailableMessagingPlatforms = () => {
    if (!contactData.messaging) return [];

    const platforms = [];

    if (
      contactData.messaging.email &&
      contactData.messaging.email.trim() !== ""
    ) {
      platforms.push({ name: "Email", key: "email" as const, icon: "📧" });
    }

    if (
      contactData.messaging.whatsapp &&
      contactData.messaging.whatsapp.trim() !== ""
    ) {
      platforms.push({
        name: "WhatsApp",
        key: "whatsapp" as const,
        icon: "💬",
      });
    }

    if (
      contactData.messaging.telegram &&
      contactData.messaging.telegram.trim() !== ""
    ) {
      platforms.push({
        name: "Telegram",
        key: "telegram" as const,
        icon: "✈️",
      });
    }

    return platforms;
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      borderColor: "rgb(251, 191, 36)",
      transition: { duration: 0.3 },
    },
    unfocused: {
      scale: 1,
      borderColor: "rgb(63, 63, 70)",
      transition: { duration: 0.3 },
    },
  };

  const labelVariants = {
    focused: {
      y: -25,
      scale: 0.85,
      color: "rgb(251, 191, 36)",
      transition: { duration: 0.3 },
    },
    unfocused: {
      y: 0,
      scale: 1,
      color: "rgb(161, 161, 170)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="relative py-32 bg-zinc-950">
      <div className="container mx-auto px-8">
        {(contactData.title || contactData.subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {contactData.title && (
              <h2 className="text-6xl md:text-8xl font-light tracking-tight mb-6">
                {contactData.title}
              </h2>
            )}
            {contactData.subtitle && (
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {contactData.subtitle}
              </p>
            )}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              animate={controls}
              className="space-y-8"
            >
              {/* Name Field */}
              <motion.div className="relative">
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  variants={inputVariants}
                  animate={
                    focusedField === "name" || formData.name
                      ? "focused"
                      : "unfocused"
                  }
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-zinc-700 text-white text-lg focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  required
                />
                <motion.label
                  variants={labelVariants}
                  animate={
                    focusedField === "name" || formData.name
                      ? "focused"
                      : "unfocused"
                  }
                  className="absolute left-0 top-4 text-zinc-400 pointer-events-none origin-left"
                >
                  Your Name
                </motion.label>
              </motion.div>

              {/* Email Field */}
              <motion.div className="relative">
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  variants={inputVariants}
                  animate={
                    focusedField === "email" || formData.email
                      ? "focused"
                      : "unfocused"
                  }
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-zinc-700 text-white text-lg focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  required
                />
                <motion.label
                  variants={labelVariants}
                  animate={
                    focusedField === "email" || formData.email
                      ? "focused"
                      : "unfocused"
                  }
                  className="absolute left-0 top-4 text-zinc-400 pointer-events-none origin-left"
                >
                  Email Address
                </motion.label>
              </motion.div>

              {/* Project Field */}
              <motion.div className="relative">
                <motion.input
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("project")}
                  onBlur={() => setFocusedField(null)}
                  variants={inputVariants}
                  animate={
                    focusedField === "project" || formData.project
                      ? "focused"
                      : "unfocused"
                  }
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-zinc-700 text-white text-lg focus:outline-none focus:border-amber-400 transition-colors duration-300"
                />
                <motion.label
                  variants={labelVariants}
                  animate={
                    focusedField === "project" || formData.project
                      ? "focused"
                      : "unfocused"
                  }
                  className="absolute left-0 top-4 text-zinc-400 pointer-events-none origin-left"
                >
                  Project Type
                </motion.label>
              </motion.div>

              {/* Message Field */}
              <motion.div className="relative">
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  variants={inputVariants}
                  animate={
                    focusedField === "message" || formData.message
                      ? "focused"
                      : "unfocused"
                  }
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-zinc-700 text-white text-lg focus:outline-none focus:border-amber-400 transition-colors duration-300 resize-none"
                  required
                />
                <motion.label
                  variants={labelVariants}
                  animate={
                    focusedField === "message" || formData.message
                      ? "focused"
                      : "unfocused"
                  }
                  className="absolute left-0 top-4 text-zinc-400 pointer-events-none origin-left"
                >
                  Tell me about your project
                </motion.label>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                data-cursor="pointer"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(251, 191, 36, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-4 border border-amber-400 rounded-full text-lg tracking-widest transition-all duration-300 overflow-hidden"
                disabled={isSubmitted}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  layoutId="submit-bg"
                />
                <span className="relative z-10">
                  {isSubmitted ? "MESSAGE SENT" : "SEND MESSAGE"}
                </span>
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Contact Information */}
          {contactData.contactInfo && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-3xl font-light mb-8">Get in Touch</h3>
                <div className="space-y-6 text-lg text-zinc-300">
                  {contactData.contactInfo?.email && (
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 cursor-pointer group"
                    >
                      <div className="w-12 h-12 border border-zinc-600 rounded-full flex items-center justify-center group-hover:border-amber-400 transition-colors duration-300">
                        <svg
                          className="w-5 h-5 group-hover:text-amber-400 transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="group-hover:text-amber-400 transition-colors duration-300">
                        {contactData.contactInfo.email}
                      </span>
                    </motion.div>
                  )}

                  {contactData.contactInfo?.phone && (
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 cursor-pointer group"
                    >
                      <div className="w-12 h-12 border border-zinc-600 rounded-full flex items-center justify-center group-hover:border-amber-400 transition-colors duration-300">
                        <svg
                          className="w-5 h-5 group-hover:text-amber-400 transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <span className="group-hover:text-amber-400 transition-colors duration-300">
                        {contactData.contactInfo.phone}
                      </span>
                    </motion.div>
                  )}

                  {contactData.contactInfo?.location && (
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 cursor-pointer group"
                    >
                      <div className="w-12 h-12 border border-zinc-600 rounded-full flex items-center justify-center group-hover:border-amber-400 transition-colors duration-300">
                        <svg
                          className="w-5 h-5 group-hover:text-amber-400 transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <span className="group-hover:text-amber-400 transition-colors duration-300">
                        {contactData.contactInfo.location}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              {contactData.contactInfo?.availability && (
                <div>
                  <h4 className="text-xl font-light mb-4 text-amber-400">
                    Availability
                  </h4>
                  <p className="text-zinc-300">
                    {contactData.contactInfo.availability}
                  </p>
                </div>
              )}

              {/* Dynamic Social Links */}
              {getAvailableSocialPlatforms().length > 0 && (
                <div>
                  <h4 className="text-xl font-light mb-6">Follow Me</h4>
                  <div className="flex space-x-4 flex-wrap gap-4">
                    {getAvailableSocialPlatforms().map((platform) => (
                      <motion.a
                        key={platform.key}
                        href={
                          contactData.socialMedia?.[
                            platform.key as keyof typeof contactData.socialMedia
                          ] || "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 border border-zinc-600 rounded-full flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
                        title={platform.name}
                      >
                        <span className="sr-only">{platform.name}</span>
                        <span className="text-lg">{platform.icon}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Message Platform Popup */}
      <AnimatePresence>
        {showMessagePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowMessagePopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-light mb-6 text-center">
                Choose Platform
              </h3>

              <div className="space-y-4">
                {getAvailableMessagingPlatforms().map((platform) => (
                  <motion.button
                    key={platform.key}
                    onClick={() => handleSendMessage(platform.key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center space-x-3 p-4 border border-zinc-600 rounded-xl hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300"
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="text-lg">{platform.name}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => setShowMessagePopup(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 p-3 text-zinc-400 hover:text-white transition-colors duration-300"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
