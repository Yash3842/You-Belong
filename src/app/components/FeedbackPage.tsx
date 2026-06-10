import { useState } from "react";
import { CheckCircle, Lock } from "lucide-react";

type AttendAgain = "Yes" | "No" | "Maybe" | null;

export function FeedbackPage() {
  const [workedWell, setWorkedWell] = useState("");
  const [improvements, setImprovements] = useState("");
  const [attendAgain, setAttendAgain] = useState<AttendAgain>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Thank you for sharing!
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Your anonymous feedback helps our community grow and makes every
            event more welcoming for everyone.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setWorkedWell("");
              setImprovements("");
              setAttendAgain(null);
            }}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-3">
            Share Your Feedback
          </h1>
          <p className="text-muted-foreground text-lg">
            Your voice shapes how our community grows.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Q1 */}
          <div>
            <label className="block text-foreground mb-2.5 font-medium">
              What worked well at the event?
            </label>
            <textarea
              value={workedWell}
              onChange={(e) => setWorkedWell(e.target.value)}
              rows={4}
              placeholder="Share what felt welcoming, useful, or memorable…"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
            />
          </div>

          {/* Q2 */}
          <div>
            <label className="block text-foreground mb-2.5 font-medium">
              What could be improved?
            </label>
            <textarea
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              rows={4}
              placeholder="Any suggestions for next time…"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
            />
          </div>

          {/* Q3 */}
          <div>
            <label className="block text-foreground mb-3 font-medium">
              Would you attend again?
            </label>
            <div className="flex gap-3">
              {(["Yes", "No", "Maybe"] as AttendAgain[]).map((option) => (
                <button
                  key={option!}
                  type="button"
                  onClick={() => setAttendAgain(option)}
                  className={`px-6 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    attendAgain === option
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              Submit Feedback
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm">
              <Lock size={13} />
              All responses are anonymous.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
