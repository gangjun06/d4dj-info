import { MainLayout } from "layouts/main";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="text-4xl text-center font-bold">
        <Link href="/live2d">Live2D</Link>
      </div>
    </MainLayout>
  );
}
