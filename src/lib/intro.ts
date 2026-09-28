/**
 * First-visit preloader handshake.
 *
 * The boot script in layout.tsx adds `html.preloading` when the preloader will
 * play. Page animations call `whenIntroReady` so their entrances start as the
 * preloader's curtain lifts instead of playing unseen behind it.
 */
export const PRELOADER_DONE_EVENT = "preloader:done";
export const PRELOADER_SESSION_KEY = "bento-preloaded";

export function isPreloading(): boolean {
  return document.documentElement.classList.contains("preloading");
}

/** Runs `callback` now, or once the preloader signals it is done. Returns an unsubscribe. */
export function whenIntroReady(callback: () => void): () => void {
  if (!isPreloading()) {
    callback();
    return () => {};
  }
  const onDone = () => callback();
  window.addEventListener(PRELOADER_DONE_EVENT, onDone, { once: true });
  return () => window.removeEventListener(PRELOADER_DONE_EVENT, onDone);
}

/** Called by the preloader when its curtain starts lifting. Idempotent. */
export function signalIntroReady(): void {
  const root = document.documentElement;
  if (!root.classList.contains("preloading")) return;
  root.classList.remove("preloading");
  try {
    sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); the preloader just replays next visit.
  }
  window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
}
