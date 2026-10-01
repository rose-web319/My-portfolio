// src/components/Contact.tsx
import { useState, useEffect, useRef } from "react";
import { Mail, Send, MapPin } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  validateContactUsSchema,
  type ContactUsSchemaType,
} from "../lib/schemaTypes";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const inputBase =
  "w-full px-4 py-3 rounded-lg border text-sm focus:outline-none bg-surface text-main-text placeholder:text-muted/50 transition-colors";

const inputClass = (hasError: boolean) =>
  `${inputBase} ${
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-border focus:border-accent"
  }`;

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactUsSchemaType>({
    resolver: zodResolver(validateContactUsSchema),
    defaultValues: { fullName: "", email: "", message: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: ContactUsSchemaType) => {
    try {
      const res = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          _subject: `New portfolio message from ${data.fullName}`,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const message =
          body?.errors?.map((e: { message: string }) => e.message).join(", ") ||
          "Failed to send message";
        throw new Error(message);
      }

      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };  

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-14 transition-opacity duration-700 bg-page-bg text-main-text ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-3 text-accent">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Let's Work Together
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-muted">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you.
          </p>
        </div>

        <motion.div
          className="grid lg:grid-cols-5 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Left info cards */}
          <motion.div
            variants={fadeUpVariants}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-xl border border-border bg-surface/40 card-glow group hover:border-accent/30 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 transition-colors group-hover:text-accent">
                    Email
                  </h3>
                  <p className="text-sm text-muted">Awotunderose@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-surface/40 card-glow group hover:border-accent/30 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 transition-colors group-hover:text-accent">
                    Location
                  </h3>
                  <p className="text-sm text-muted">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted px-2">
              I'm currently open to freelance projects and full-time
              opportunities. I typically respond within 24 hours.
            </p>
          </motion.div>

          {/* Right form */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="p-6 rounded-xl border border-border bg-surface/40 card-glow"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium mb-2 text-main-text"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    className={inputClass(!!errors.fullName)}
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p
                      id="fullName-error"
                      role="alert"
                      className="mt-1.5 text-xs text-red-500"
                    >
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-main-text"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass(!!errors.email)}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-1.5 text-xs text-red-500"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-main-text"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={`${inputClass(!!errors.message)} resize-none`}
                  {...register("message")}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    role="alert"
                    className="mt-1.5 text-xs text-red-500"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
              >
                <Send size={16} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
