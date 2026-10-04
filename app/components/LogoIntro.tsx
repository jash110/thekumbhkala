"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SESSION_KEY = "kumbhkala-intro-seen";
const VIDEO_DURATION_MS = 8000;
const FALLBACK_BUFFER_MS = 300;
const SWAP_DURATION = 0.3;
const FLY_DELAY = 0.15;
const BG_FADE_DURATION = 0.6;

export default function LogoIntro() {
  const [visible, setVisible] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [flying, setFlying] = useState(false);
  const completingRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }
    const t = setTimeout(complete, VIDEO_DURATION_MS + FALLBACK_BUFFER_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  function complete() {
    if (completingRef.current) return;
    completingRef.current = true;
    videoRef.current?.pause();
    setVideoEnded(true);
    setTimeout(() => setFlying(true), SWAP_DURATION * 1000);
  }

  if (!visible) return null;

  return (
    <motion.div
      onClick={complete}
      initial={{ opacity: 1 }}
      animate={{ opacity: flying ? 0 : 1 }}
      transition={{ duration: BG_FADE_DURATION, delay: flying ? FLY_DELAY : 0 }}
      onAnimationComplete={() => {
        if (!flying) return;
        sessionStorage.setItem(SESSION_KEY, "true");
        setVisible(false);
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "var(--color-cream)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        pointerEvents: flying ? "none" : "auto",
      }}
    >
      <div style={{ position: "relative", width: "min(560px, 72vmin)", aspectRatio: "1 / 1" }}>
        <motion.video
          ref={videoRef}
          src="/logo-reveal-web.mp4"
          autoPlay
          muted
          playsInline
          onEnded={complete}
          animate={{ opacity: videoEnded ? 0 : 1 }}
          transition={{ duration: SWAP_DURATION }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        {!flying && (
          <motion.img
            layoutId="kumbhkala-logo-mark"
            src="/logo.png"
            alt="Kumbhkala"
            transition={{ layout: { duration: 1.1, ease: [0.65, 0, 0.35, 1] } }}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoEnded ? 1 : 0 }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          complete();
        }}
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          background: "none",
          border: "none",
          fontSize: "0.78rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          opacity: 0.5,
        }}
      >
        Skip
      </button>
    </motion.div>
  );
}
