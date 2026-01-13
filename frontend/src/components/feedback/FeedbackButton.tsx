"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"bug" | "feature" | "general">("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);

    try {
      // TODO: Integrate with backend API or service (e.g., Formspree, SendGrid, etc.)
      // For now, we'll just log it and show success message
      console.log("Feedback submitted:", {
        type: feedbackType,
        message: feedback,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Track in analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "feedback_submitted", {
          feedback_type: feedbackType,
        });
      }

      setSubmitted(true);
      setFeedback("");
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error al enviar feedback. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#35D07F] text-[#0A1628] rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center"
        aria-label="Enviar feedback"
        title="Enviar feedback"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-[#1a2332] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-white font-semibold">Enviar Feedback</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {submitted ? (
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-[#35D07F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-6 h-6 text-[#35D07F]" />
          </div>
          <p className="text-white font-semibold mb-2">¡Gracias por tu feedback!</p>
          <p className="text-gray-400 text-sm">Tu mensaje ha sido enviado correctamente.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de feedback
            </label>
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value as "bug" | "feature" | "general")}
              className="w-full px-3 py-2 bg-[#0A1628] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#35D07F]/50"
            >
              <option value="general">General</option>
              <option value="bug">Reportar Bug</option>
              <option value="feature">Sugerir Feature</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tu mensaje
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Comparte tus pensamientos, reporta un bug o sugiere una mejora..."
              rows={4}
              className="w-full px-3 py-2 bg-[#0A1628] border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#35D07F]/50 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!feedback.trim() || isSubmitting}
            className="w-full px-4 py-2 bg-[#35D07F] text-[#0A1628] font-semibold rounded-lg hover:bg-[#35D07F]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Enviar
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

