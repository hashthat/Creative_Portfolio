"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import cosmic from "../../../public/background/CosmicJellyfish.png";
import Navigation from "../components/navigation";

export default function ContactPage() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus(null);
    setErrorMessage('');

    // Validate required environment variables
    if (!process.env.NEXT_PUBLIC_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_TEMPLATE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      setSendStatus('error');
      setErrorMessage('Email service configuration is incomplete');
      setIsSending(false);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Success:', result);
      setSendStatus('success');
      form.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSendStatus('error');
      setErrorMessage(error.text || 'Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Image
        src={cosmic}
        alt="Cosmic background"
        sizes="100vw"
        priority
        fill
        className="-z-50 w-full object-cover object-center opacity-65"
      />

      <Navigation />

      <div className="w-full max-w-2xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Let's Get in Touch!
          </h1>
          <p className="text-gray-300 mb-6 text-center">
            I'd love to hear from you! Whether you have a question, want to collaborate, or just want to say hi, feel free to drop me a message.
          </p>

          {/* Status Messages */}
          {sendStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
            >
              <p className="text-green-300 text-center">Message sent successfully!</p>
            </motion.div>
          )}

          {sendStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-300 text-center">
                {errorMessage || 'Failed to send message. Please try again.'}
              </p>
            </motion.div>
          )}

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="from_name"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="from_email"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="I look forward to hearing from you!"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSending}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                isSending
                  ? 'bg-purple-800 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isSending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <footer className="w-full p-4 text-center text-white">
        <p className="text-sm">
          © {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
