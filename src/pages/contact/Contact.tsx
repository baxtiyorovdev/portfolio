import { useState } from "react";
import { motion } from "framer-motion";
import { FaLocationArrow, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import SectionTitle from "../../components/ui/SectionTitle";
import usePortfolioData from "../../hooks/usePortfolioData";

const dadaDdadwa = "8693304985:AAGyXrOlLx-P1dsvH_EIkCPVweJgsQln20U";
const dwadadad = "7605829941";
const HOME_LAT = 38.859861;
const HOME_LNG = 65.80325;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Contact() {
  const data = usePortfolioData();
  const mapQuery = encodeURIComponent(
    `${HOME_LAT},${HOME_LNG}`,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = `
📩 Новая заявка с сайта

👤 Имя: ${name}
📧 Email: ${email}
💬 Сообщение: ${message}
    `.trim();

    try {
      setIsSending(true);
      setStatus("");

      const response = await fetch(
        `https://api.telegram.org/bot${dadaDdadwa}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: dwadadad,
            text,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error("Telegram request failed");
      }

      setStatus("Message sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      className="text-white2"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <PageHeader title="Contact" />

      <motion.section
        className="rounded-[28px] bg-glass-bg p-4 shadow-card ring-1 ring-jet/40 sm:p-6"
        variants={item}
      >
        <motion.div
          className="relative overflow-hidden rounded-xl2 bg-eerie1 ring-1 ring-jet/40"
          variants={item}
        >
          <iframe
            title="Location map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=65.78325%2C38.849861%2C65.82325%2C38.869861&layer=mapnik&marker=${HOME_LAT}%2C${HOME_LNG}`}
            className="h-[320px] w-full border-0 sm:h-[360px] lg:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <motion.div
            className="absolute left-4 top-4 max-w-[320px] rounded-2xl bg-smoky/90 p-4 text-white2 shadow-card ring-1 ring-jet/20 backdrop-blur-md"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{data.about.name}</h2>
                <p className="mt-1 text-sm text-gray70">{data.about.title}</p>
                <p className="mt-3 flex items-center gap-2 text-sm text-gray70">
                  <FaMapMarkerAlt className="text-accent" />
                  {`38°51'35.5"N 65°48'11.7"E`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-glass-bg text-accent shadow-soft transition hover:scale-105"
                >
                  <FaLocationArrow />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="mt-8" variants={item}>
          <SectionTitle title="Contact Form" className="text-2xl font-semibold" />
        </motion.div>

        <motion.form
          className="mt-6 space-y-6"
          variants={container}
          onSubmit={handleSubmit}
        >
          <motion.div
            className="flex flex-col gap-6 lg:flex-row"
            variants={item}
          >
            <label className="flex-1">
              <span className="sr-only">Full name</span>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="h-16 w-full rounded-2xl border border-jet/40 bg-transparent px-5 text-base text-white2 outline-none transition placeholder:text-gray70 focus:border-accent"
              />
            </label>

            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="h-16 w-full rounded-2xl border border-jet/40 bg-transparent px-5 text-base text-white2 outline-none transition placeholder:text-gray70 focus:border-accent"
              />
            </label>
          </motion.div>

          <motion.div variants={item}>
            <label>
              <span className="sr-only">Your message</span>
              <textarea
                rows={7}
                placeholder="Your Message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                className="min-h-[180px] w-full resize-none rounded-2xl border border-jet/40 bg-transparent px-5 py-5 text-base text-white2 outline-none transition placeholder:text-gray70 focus:border-accent"
              />
            </label>
          </motion.div>

          {status && (
            <motion.p
              className={`text-sm ${status.includes("success") ? "text-accent" : "text-gray70"}`}
              variants={item}
            >
              {status}
            </motion.p>
          )}

          <motion.div className="flex justify-end" variants={item}>
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-2xl bg-eerie1 px-6 py-4 text-base font-medium text-accent shadow-soft ring-1 ring-jet/30 transition hover:-translate-y-1 hover:ring-accent/40"
            >
              <FaPaperPlane className="text-sm" />
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </motion.div>
        </motion.form>
      </motion.section>
    </motion.div>
  );
}
