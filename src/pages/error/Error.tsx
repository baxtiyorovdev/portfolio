import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Error.css";

const orbitTransition = {
  duration: 10,
  repeat: Infinity,
  ease: "easeInOut",
} as const;

export default function Error() {
  useEffect(() => {
    const root = document.documentElement;
    const hadDarkClass = root.classList.contains("dark");

    root.classList.add("dark");

    return () => {
      if (!hadDarkClass) {
        root.classList.remove("dark");
      }
    };
  }, []);

  return (
    <main className="error-page text-white2">
      <div className="error-page__backdrop" aria-hidden="true">
        <div className="error-page__glow error-page__glow--one" />
        <div className="error-page__glow error-page__glow--two" />
        <div className="error-page__stars" />
        <div className="error-page__grid" />
      </div>

      <motion.div
        className="error-page__content"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="error-page__copy">
          <motion.span
            className="error-page__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Signal Lost
          </motion.span>

          <motion.p
            className="error-page__code"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            Error 404
          </motion.p>

          <motion.h1
            className="error-page__title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Page Not Found
          </motion.h1>

          <motion.div
            className="error-page__line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />

          <motion.p
            className="error-page__subtitle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            The page you were looking for drifted out of orbit or never existed
            here. Let&apos;s guide you back to something real.
          </motion.p>

          <motion.div
            className="error-page__actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/" className="error-page__button">
              Return Home
            </Link>
            <button
              type="button"
              className="error-page__button error-page__button--ghost"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </motion.div>
        </div>

        <motion.div
          className="error-page__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="error-page__ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />

          <motion.svg
            className="error-page__svg"
            viewBox="0 0 520 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <motion.circle
              cx="260"
              cy="210"
              r="126"
              className="error-page__orbit"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{ originX: "260px", originY: "210px" }}
            />

            <motion.g
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="260" cy="210" r="88" className="error-page__planet" />
              <circle
                cx="260"
                cy="210"
                r="58"
                className="error-page__planet-core"
              />
              <path
                d="M188 244C221 226 299 228 332 247"
                className="error-page__wave"
              />
              <path
                d="M202 172C226 153 291 151 318 172"
                className="error-page__wave error-page__wave--soft"
              />
            </motion.g>

            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              style={{ originX: "260px", originY: "210px" }}
            >
              <motion.circle
                cx="386"
                cy="210"
                r="10"
                className="error-page__satellite"
                animate={{ scale: [1, 1.35, 1] }}
                transition={orbitTransition}
              />
            </motion.g>

            <motion.g transition={orbitTransition} animate={{ opacity: [0.5, 1, 0.5] }}>
              <path
                d="M128 86L156 66L187 89L181 123L145 129L128 86Z"
                className="error-page__shard"
              />
              <path
                d="M344 86L377 77L400 102L386 133L349 129L344 86Z"
                className="error-page__shard error-page__shard--alt"
              />
              <path
                d="M144 314L173 296L201 315L194 345L163 356L144 314Z"
                className="error-page__shard error-page__shard--soft"
              />
            </motion.g>

            <motion.text
              x="260"
              y="220"
              textAnchor="middle"
              className="error-page__svg-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              404
            </motion.text>
          </motion.svg>
        </motion.div>
      </motion.div>
    </main>
  );
}
