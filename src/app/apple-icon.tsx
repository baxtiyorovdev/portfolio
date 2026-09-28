import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const logoSrc = `data:image/jpeg;base64,${readFileSync(join(process.cwd(), "public", "logo.jpg")).toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse (Satori) renders plain <img> only */}
        <img src={logoSrc} width={180} height={180} alt="" />
      </div>
    ),
    { ...size },
  );
}
