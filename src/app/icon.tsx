import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Google shows favicons in results and wants a square that's a multiple of 48px.
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

const logoSrc = `data:image/jpeg;base64,${readFileSync(join(process.cwd(), "public", "logo.jpg")).toString("base64")}`;

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse (Satori) renders plain <img> only */}
        <img src={logoSrc} width={192} height={192} style={{ borderRadius: 40 }} alt="" />
      </div>
    ),
    { ...size },
  );
}
