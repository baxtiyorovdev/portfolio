/** Tiny user-agent classifier for analytics — good enough for a breakdown chart. */
export function parseUserAgent(ua: string) {
  const isBot =
    !ua ||
    // "telegrambot" only: Telegram's in-app browser is a real visitor.
    /bot|crawl|spider|slurp|facebookexternalhit|embedly|whatsapp|telegrambot|preview|headless|lighthouse|pagespeed|monitor|curl|wget|python|axios|node-fetch/i.test(
      ua,
    );

  const device = /iPad|Tablet|PlayBook|Silk|Android(?!.*Mobile)/i.test(ua)
    ? "tablet"
    : /Mobi|iPhone|iPod|Android|Windows Phone/i.test(ua)
      ? "mobile"
      : "desktop";

  const browser = /YaBrowser/i.test(ua)
    ? "Yandex"
    : /Edg\//i.test(ua)
      ? "Edge"
      : /OPR\/|Opera/i.test(ua)
        ? "Opera"
        : /SamsungBrowser/i.test(ua)
          ? "Samsung"
          : /Firefox|FxiOS/i.test(ua)
            ? "Firefox"
            : /Chrome|CriOS/i.test(ua)
              ? "Chrome"
              : /Safari/i.test(ua)
                ? "Safari"
                : "Other";

  const os = /Windows NT/i.test(ua)
    ? "Windows"
    : /iPhone|iPad|iPod/i.test(ua)
      ? "iOS"
      : /Mac OS X/i.test(ua)
        ? "macOS"
        : /Android/i.test(ua)
          ? "Android"
          : /CrOS/i.test(ua)
            ? "ChromeOS"
            : /Linux/i.test(ua)
              ? "Linux"
              : "Other";

  return { isBot, device, browser, os };
}
