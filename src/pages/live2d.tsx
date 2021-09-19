import dynamic from "next/dynamic";
import Script from "next/script";
import Head from "next/head";

const Live2DView = dynamic(() => import("@/components/Live2D"), {
  ssr: false,
});

export default function Live2D() {
  return (
    <>
      <Head>
        <title>D4DJ.info</title>
      </Head>
      <Script src="https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js" />
      <Script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js" />
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Live2DView />
      </div>
    </>
  );
}
