import MainLayout from "layouts/main";
import useTransition from "next-translate/useTranslation";
import Link from "next/link";

export default function Music() {
  const { t } = useTransition("");
  return (
    <MainLayout
      breadThumbs={[
        { name: t("nav:game.name"), link: "" },
        { name: t("nav:game.music"), link: "/game/music" },
      ]}
      title={t("nav:game.music")}
    >
      <></>
    </MainLayout>
  );
}
