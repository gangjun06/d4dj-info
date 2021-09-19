import dynamic from "next/dynamic";
import Script from "next/script";

const Live2DView = dynamic(() => import("@/components/Live2D"), {
  ssr: false,
});

export default function Live2D() {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Script src="https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js" />
      <Script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js" />
      <Live2DView />
    </div>
  );
}
