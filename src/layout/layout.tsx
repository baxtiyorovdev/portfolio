import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import BackgroundEffects from "../components/layout/background-effects/BackgroundEffects";
import Navbar from "../components/layout/navbar/Navbar";
import Sidebar from "../components/layout/sidebar/Sidebar";
import usePortfolioData from "../hooks/usePortfolioData";
import { getStoredTheme, setStoredTheme } from "../lib/storage";

export default function MainLayout() {
  const data = usePortfolioData();
  const [showContacts, setShowContacts] = useState(false);
  const [darkMode, setDarkMode] = useState(getStoredTheme);
  const [stuck, setStuck] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      const top = navRef.current.getBoundingClientRect().top;
      setStuck(top <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    setStoredTheme(darkMode);
  }, [darkMode]);

  useEffect(() => {
    const syncContactsVisibility = () => {
      if (window.innerWidth > 1024 && !showContacts) {
        setShowContacts(true);
      }
    };

    syncContactsVisibility();
    window.addEventListener("resize", syncContactsVisibility);

    return () => {
      window.removeEventListener("resize", syncContactsVisibility);
    };
  }, [showContacts]);

  return (
    <div className="max-w-6xl mx-auto px-10 py-16 flex gap-6 min-h-screen flex-col lg:flex-row text-white2">
      <Sidebar
        data={data}
        showContacts={showContacts}
        onToggleContacts={() => setShowContacts((prev) => !prev)}
      />

      <section className="flex-1 flex flex-col gap-6 lg:relative">
        <Navbar
          darkMode={darkMode}
          navRef={navRef}
          stuck={stuck}
          onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        />

        <main className="h-full backdrop-blur-md bg-glass-bg z-10 rounded-xl2 p-6 shadow-card">
          <Outlet />
        </main>
      </section>

      <BackgroundEffects />
    </div>
  );
}
