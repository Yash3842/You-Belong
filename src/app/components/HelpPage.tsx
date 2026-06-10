import { useState } from "react";
import { Search, UserCheck, MessageCircle, ChevronDown, Mail, Phone } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Do I need to register to attend an event?",
    answer:
      "Most YouBelong events are drop-in — no registration required. Just show up! For workshops with limited capacity, a 'Reserve Spot' option will appear on the event card.",
  },
  {
    id: 2,
    question: "Is YouBelong only for youth experiencing homelessness?",
    answer:
      "YouBelong events welcome everyone. Many attendees are community volunteers, neighbours, and allies. The platform is designed to build bridges between youth and their broader neighbourhood networks.",
  },
  {
    id: 3,
    question: "How is my feedback used?",
    answer:
      "All feedback is anonymous and shared directly with event organizers. It helps them understand what's working, what to improve, and how to make future events more welcoming and useful.",
  },
];

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Find an Event",
    description:
      "Browse upcoming community events filtered by city. Each listing shows the date, location, and what to expect.",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "Show Up",
    description:
      "Drop in at the time and place listed. No appointments, no sign-ups required. Every event is a safe, welcoming space.",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Share Feedback",
    description:
      "After attending, share your anonymous thoughts. Your voice directly shapes how future events are organized.",
  },
];

export function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-3">
            How It Works
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            YouBelong is simple by design — because showing up should be easy.
          </p>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div
              key={step}
              className="bg-card border border-border rounded-2xl p-7 flex flex-col items-start"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon size={22} className="text-primary" />
                </div>
                <span className="text-2xl font-bold text-primary/20">{step}</span>
              </div>
              <h3 className="text-foreground mb-2 font-semibold text-lg">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground flex-shrink-0 transition-transform ${
                      openFaq === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-primary/8 to-accent/10 border border-primary/15 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our team is here to help. Reach out and we'll get back to you within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:hello@youbelong.ca"
              className="inline-flex items-center gap-2.5 bg-white border border-border rounded-lg px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Mail size={16} className="text-primary" />
              hello@youbelong.ca
            </a>
            <a
              href="tel:18005550142"
              className="inline-flex items-center gap-2.5 bg-white border border-border rounded-lg px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Phone size={16} className="text-primary" />
              1-800-555-0142
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
