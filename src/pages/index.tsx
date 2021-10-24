import { Card } from "@/components/Basic";
import MainLayout from "layouts/main";
import Link from "next/link";
import {
  HiOutlineMusicNote,
  HiOutlineCollection,
  HiOutlineCube,
  HiOutlineCalendar,
} from "react-icons/hi";

export default function Home() {
  return (
    <MainLayout
      breadThumbs={[
        { name: "Main", link: "" },
        { name: "Dashboard", link: "/" },
      ]}
    >
      <>
        <div className="w-full shadow stats">
          <div className="stat">
            <div className="stat-figure text-primary">
              <HiOutlineMusicNote className="inline-block w-8 h-8 stroke-current" />
            </div>
            <div className="stat-title">총 악곡수</div>
            <div className="stat-value text-primary">378</div>
            <div className="stat-desc">최근 추가된곡: Start!! True Dreams!</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-info">
              <HiOutlineCollection className="inline-block w-8 h-8 stroke-current" />
            </div>
            <div className="stat-title">총 카드수</div>
            <div className="stat-value text-info">1000</div>
            <div className="stat-desc"></div>
          </div>
          <div className="stat">
            <div className="stat-figure text-info">
              <HiOutlineCalendar className="inline-block w-8 h-8 stroke-current" />
            </div>
            <div className="stat-title">다음 이벤트</div>
            <div className="stat-value text-info">D-30</div>
            <div className="stat-desc">라이브 이름</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4 w-full">
          <Card title="진행중인 이벤트">.</Card>
          <Card title="진행중인 가챠">.</Card>
        </div>
      </>
    </MainLayout>
  );
}
