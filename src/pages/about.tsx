import { Card } from "@/components/Basic";
import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import Link from "next/link";
import {
  HiOutlineMusicNote,
  HiOutlineCollection,
  HiOutlineCube,
  HiOutlineCalendar,
} from "react-icons/hi";
import Trans from "next-translate/Trans";

export default function About() {
  const { t } = useTransition("");
  return (
    <MainLayout
      title={t("nav:about")}
      breadThumbs={[
        { name: t("nav:main.name"), link: "/" },
        { name: t("nav:about"), link: "/about" },
      ]}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card title={t("about:info.name")} bodyClassName="">
            <Trans
              i18nKey="about:info.content"
              defaultTrans=""
              components={{
                div: <div />,
                br: <br />,
                b: <b />,
                mailto: (
                  <a
                    href="mailto:me@gangjun.dev"
                    className="link link-primary"
                    rel="noreferrer"
                  />
                ),
              }}
            />
          </Card>
        </div>
        <div className="col-span-1">
          <Card title={t("about:contribute.name")} bodyClassName="">
            <div className="mb-2">{t("about:contribute.content")}</div>
            <div className="flex flex-col gap-y-1">
              <Trans
                i18nKey="about:contribute.links"
                defaultTrans=""
                components={{
                  a1: (
                    <a
                      href="https://github.com/gangjun06/d4dj-info"
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                    />
                  ),
                  a2: (
                    <a
                      href="https://github.com/gangjun06/d4dj-info-backend"
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                    />
                  ),
                  a3: (
                    <a
                      href="https://github.com/gangjun06/d4dj-crawler"
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                    />
                  ),
                }}
              />
            </div>
          </Card>
        </div>
        <div className="col-span-1">
          <Card title={t("about:donate.name")} bodyClassName="">
            <div>{t("about:donate.content")}</div>
            <div className="flex gap-x-2">
              <a href="https://toss.me/gangjun" className="link link-primary">
                Toss
              </a>
              <a href="https://paypal.me/gangjun" className="link link-primary">
                Paypal
              </a>
            </div>
          </Card>
        </div>

        {/* <div className="col-span-1 md:col-span-2">
          <Card title={t("about:credit.name")} bodyClassName="">
            <div>
              <div className="font-bold">메인 개발자</div>
              <div>
                <a href="https://gangjun.dev" className="link">
                  Gangjun
                </a>
              </div>
            </div>
            <div className="mt-2">
              <div className="font-bold">사이트에 도움을 주신 분들</div>
              <div className="flex gap-x-2">
                <a
                  href="https://gall.dcinside.com/mgallery/board/lists?id=d4dj"
                  className="link"
                >
                  D4DJ 갤러리
                </a>
              </div>
            </div>
          </Card>
        </div> */}
      </div>
    </MainLayout>
  );
}
