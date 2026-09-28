import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoSrc = `data:image/jpeg;base64,${readFileSync(
  join(process.cwd(), "public", "logo.jpg"),
).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#e6e6e6",
          padding: 80,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            background:
              // Fade out well inside the box so its edges never show.
              "radial-gradient(circle at center, rgba(145,108,231,0.45) 0%, rgba(145,108,231,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse (Satori) renders plain <img> only */}
          <img
            src={logoSrc}
            width={84}
            height={84}
            style={{ borderRadius: 20 }}
            alt=""
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#999999",
            }}
          >
            Front End Developer
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.02 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 40, color: "#916ce7" }}>{`@${siteConfig.handle}`}</div>
          <div style={{ fontSize: 34, color: "#999999", maxWidth: 940 }}>
            Front End Developer from Uzbekistan — React, Next.js &amp; TypeScript.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#999999",
          }}
        >
          <div style={{ color: "#e6e6e6" }}>{new URL(siteConfig.url).hostname}</div>
          <div>React · Next.js · TypeScript</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
