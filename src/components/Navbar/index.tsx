import Link from "next/link";
import { useRouter } from "next/router";
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

type props = {
  children: ReactNode;
};
export default function Navbar({ children }: props) {
  const router = useRouter();

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
              isFocus ? "bg-indigo-500" : "hover:bg-gray-900"
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
    <div>
      <nav className="lg:hidden py-6 px-6 bg-gray-800">
        <div className="flex items-center justify-between">
          <Link href="/" passHref>
            <div className="text-2xl text-white font-semibold">D4DJ.Info</div>
          </Link>
          <button className="navbar-burger flex items-center rounded focus:outline-none">
            <svg
              className="text-white bg-indigo-500 hover:bg-indigo-600 block h-8 w-8 p-2 rounded"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
      </nav>
      <div className="hidden lg:block navbar-menu relative z-50">
        <div className="navbar-backdrop fixed lg:hidden inset-0 bg-gray-800 opacity-10"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-xs pt-6 pb-8 bg-gray-800 overflow-y-auto">
          <div className="flex w-full items-center px-6 pb-6 mb-6 lg:border-b border-gray-700">
            <Link href="/" passHref>
              <div className="cursor-pointer text-xl text-white font-semibold">
                D4DJ.Info
              </div>
            </Link>
          </div>
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
        <div className="mx-auto w-full px-4 py-10">{children}</div>
      </div>
    </div>
  );
}
