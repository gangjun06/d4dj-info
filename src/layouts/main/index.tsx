import Link from "next/link";
import useTransition from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  HiOutlineViewGrid,
  HiOutlineCalendar,
  HiOutlineCollection,
  HiOutlineMusicNote,
  HiOutlinePhotograph,
  HiOutlineCube,
  HiOutlineChartPie,
  HiOutlineBookOpen,
  HiOutlineMenu,
  HiOutlineArchive,
} from "react-icons/hi";

const NavbarGroup = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <>
      <h3 className="mb-2 text-xs uppercase text-gray-500 font-medium">
        {label}
      </h3>
      <ul className="mb-8 text-sm font-medium">{children}</ul>
    </>
  );
};

type BreadThumbs = {
  name: string;
  link: string;
};

const SideNav = ({
  isOpen,
  showTitle,
  onClose,
}: {
  isOpen: boolean;
  showTitle: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const { t } = useTransition("");

  const NavItem = ({
    label,
    link,
    Icon,
  }: {
    label: string;
    link: string;
    Icon: IconType;
  }) => {
    let isFocus = router.pathname.startsWith(link);
    if (link === "/" && router.pathname != "/") isFocus = false;
    return (
      <li>
        <Link href={link} passHref>
          <div
            className={`flex items-center pl-3 py-3 pr-4 text-gray-50 cursor-pointer ${
              isFocus
                ? "bg-primary hover:bg-primary-focus"
                : "hover:bg-gray-900"
            } rounded`}
          >
            <span className="inline-block mr-3">
              <Icon
                className={`${
                  isFocus ? "text-indigo-100" : " text-gray-600"
                } w-5 h-5`}
              />
            </span>
            <span>{label}</span>
          </div>
        </Link>
      </li>
    );
  };

  return (
    <div className="navbar-menu relative">
      {isOpen && (
        <div
          className="fixed top-0 left-0 bottom-0 flex flex-col bg-black bg-opacity-30 w-full h-full z-10 cursor-pointer lg:hidden"
          onClick={() => onClose()}
        />
      )}
      <nav
        className={`fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-xs pt-6 pb-8 bg-gray-800 overflow-y-auto z-50 transition-transform lg:transition-none transform ${
          !isOpen ? "-translate-x-full lg:translate-x-0z" : ""
        }`}
      >
        {showTitle && isOpen && (
          <div className="flex w-full items-center px-6 pb-6 mb-6 lg:border-b border-gray-700">
            <Link href="/" passHref>
              <a className="cursor-pointer text-xl text-white font-semibold">
                {t("common:title")}
              </a>
            </Link>
          </div>
        )}
        <div className="px-4 pb-6">
          <NavbarGroup label={t("nav:main.name")}>
            <NavItem
              label={t("nav:main.dashboard")}
              Icon={HiOutlineViewGrid}
              link="/"
            />
            <NavItem
              label={t("nav:main.calendar")}
              Icon={HiOutlineCalendar}
              link="/calendar"
            />
          </NavbarGroup>
          <NavbarGroup label={t("nav:game.name")}>
            <NavItem
              label={t("nav:game.character")}
              Icon={HiOutlineArchive}
              link="/game/character"
            />
            <NavItem
              label={t("nav:game.card")}
              Icon={HiOutlineCollection}
              link="/game/card"
            />
            <NavItem
              label={t("nav:game.music")}
              Icon={HiOutlineMusicNote}
              link="/game/music"
            />
            <NavItem
              label={t("nav:game.event")}
              Icon={HiOutlineBookOpen}
              link="/game/event"
            />
            <NavItem
              label={t("nav:game.gatcha")}
              Icon={HiOutlineChartPie}
              link="/game/gatcha"
            />
            <NavItem
              label={t("nav:game.gallery")}
              Icon={HiOutlinePhotograph}
              link="/game/gallery"
            />
            <NavItem
              label={t("nav:game.live2d")}
              Icon={HiOutlineCube}
              link="/live2d"
            />
          </NavbarGroup>
        </div>
      </nav>
    </div>
  );
};

type props = {
  children: ReactNode;
  breadThumbs: BreadThumbs[];
  title: string;
};
export default function MainLayout({ breadThumbs, children, title }: props) {
  const [drawer, setDrawer] = useState<boolean>(false);
  const { t } = useTransition("");

  return (
    <>
      <nav className="lg:hidden py-6 px-6 bg-gray-800">
        <div className="flex items-center justify-between">
          <Link href="/" passHref>
            <div className="text-2xl text-white font-semibold">
              {t("common:title")}
            </div>
          </Link>
          <button
            className="navbar-burger flex items-center rounded focus:outline-none"
            onClick={() => setDrawer(!drawer)}
          >
            <HiOutlineMenu className="text-white bg-primary hover:bg-primary-focus block h-8 w-8 p-2 rounded" />
          </button>
        </div>
      </nav>

      <div className="hidden lg:block">
        <SideNav onClose={() => {}} isOpen={true} showTitle={true} />
      </div>
      <div className="block lg:hidden">
        <SideNav
          onClose={() => setDrawer(false)}
          isOpen={drawer}
          showTitle={false}
        />
      </div>
      <div className="mx-auto lg:ml-80 h-full overflow-y-scroll">
        <div className="mx-auto w-full px-8 py-10">
          <div className="text-sm breadcrumbs">
            <ul>
              {breadThumbs.map((item, index) => (
                <li key={index}>
                  {item.link === "" ? (
                    <p>{item.name}</p>
                  ) : (
                    <Link href={item.link}>{item.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-5 font-bold text-3xl">{title}</div>
          {children}
        </div>
      </div>
    </>
  );
}
