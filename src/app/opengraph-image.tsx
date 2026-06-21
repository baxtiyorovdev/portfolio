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
          background: "#0c0a08",
          color: "#f7f1e6",
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
              "radial-gradient(circle, rgba(245,185,66,0.4), rgba(245,185,66,0))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
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
              color: "#c2b79f",
            }}
          >
            Front End Developer
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.02 }}>
            Baxtiyorov Shaxriyor
          </div>
          <div style={{ fontSize: 38, color: "#c2b79f", maxWidth: 940 }}>
            Building clean, fast &amp; modern web interfaces.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#c2b79f",
          }}
        >
          <div style={{ color: "#f5b942" }}>baxtiyorov.dev</div>
          <div>React · Next.js · TypeScript</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
