import { useWindowWidth } from "@react-hook/window-size";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

type props = {
  children: ReactNode;
  breadThumbs: BreadThumbs[];
};
export default function MainLayout({ breadThumbs, children }: props) {
  const router = useRouter();
  const width = useWindowWidth();
  const [drawer, setDrawer] = useState<boolean>(false);

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

  useEffect(() => {
    if (width > 1024) setDrawer(true);
    else setDrawer(false);
  }, [width]);

  return (
    <div>
      <nav className="lg:hidden py-6 px-6 bg-gray-800">
        <div className="flex items-center justify-between">
          <Link href="/" passHref>
            <div className="text-2xl text-white font-semibold">D4DJ.Info</div>
          </Link>
          <button
            className="navbar-burger flex items-center rounded focus:outline-none"
            onClick={() => setDrawer(!drawer)}
          >
            <HiOutlineMenu className="text-white bg-primary hover:bg-primary-focus block h-8 w-8 p-2 rounded" />
          </button>
        </div>
      </nav>

      <div className="navbar-menu relative">
        {drawer && (
          <div
            className="fixed top-0 left-0 bottom-0 flex flex-col bg-black bg-opacity-30 w-full h-full z-10 cursor-pointer lg:hidden"
            onClick={() => setDrawer(false)}
          />
        )}
        <nav
          className={`fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-xs pt-6 pb-8 bg-gray-800 overflow-y-auto z-50 transition-transform lg:transition-none transform ${
            !drawer ? "-translate-x-full lg:translate-x-0z" : ""
          }`}
        >
          {width > 1024 && (
            <div className="flex w-full items-center px-6 pb-6 mb-6 lg:border-b border-gray-700">
              <Link href="/" passHref>
                <div className="cursor-pointer text-xl text-white font-semibold">
                  D4DJ.Info
                </div>
              </Link>
            </div>
          )}
          <div className="px-4 pb-6">
            <NavbarGroup label="Main">
              <NavItem label="Dashboard" Icon={HiOutlineViewGrid} link="/" />
              <NavItem
                label="Calendar"
                Icon={HiOutlineCalendar}
                link="/calendar"
              />
            </NavbarGroup>
            <NavbarGroup label="Game">
              <NavItem
                label="Card"
                Icon={HiOutlineCollection}
                link="/game/card"
              />
              <NavItem
                label="Music"
                Icon={HiOutlineMusicNote}
                link="/game/music"
              />
              <NavItem
                label="Event"
                Icon={HiOutlineBookOpen}
                link="/game/event"
              />
              <NavItem
                label="Gatcha"
                Icon={HiOutlineChartPie}
                link="/game/gatcha"
              />
              <NavItem
                label="Gallery"
                Icon={HiOutlinePhotograph}
                link="/game/gallery"
              />
              <NavItem
                label="Live2D Viewer"
                Icon={HiOutlineCube}
                link="/live2d"
              />
            </NavbarGroup>
          </div>
        </nav>
      </div>
      <div className="mx-auto lg:ml-80">
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

          <div className="mb-5 font-bold text-3xl">Dashboard</div>
          {children}
        </div>
      </div>
    </div>
  );
}
