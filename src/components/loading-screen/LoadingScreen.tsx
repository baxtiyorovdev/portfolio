import LineArtMark from "../layout/background-effects/LineArtMark";
import "../layout/background-effects/background-effects.css";

export default function LoadingScreen() {
  return (
    <div className="loading-screen dark">
      <div className="loading-screen__glow" aria-hidden="true" />
      <LineArtMark className="line-art line-art--loading" />
      <p className="loading-screen__label">Loading</p>
    </div>
  );
}
