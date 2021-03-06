import { SettingContext } from '@/components/Elements/Setting'
import { BreadCrumbs, BreadCrumbsData } from '@/components/UI'
import { NextSeo } from 'next-seo'
import useTransition from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CSSProperties, ReactNode, useContext, useState } from 'react'
import { IconType } from 'react-icons'
import {
  HiDotsCircleHorizontal,
  HiOutlineArchive,
  HiOutlineBookOpen,
  HiOutlineChartPie,
  HiOutlineCog,
  HiOutlineCollection,
  HiOutlineCube,
  HiOutlineFolder,
  HiOutlineMenu,
  HiOutlineMusicNote,
  HiOutlineViewGrid,
} from 'react-icons/hi'

const NavbarGroup = ({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) => {
  return (
    <>
      <h3 className="mb-2 text-xs uppercase text-gray-500 font-medium">
        {label}
      </h3>
      <ul className="mb-8 text-sm font-medium">{children}</ul>
    </>
  )
}

const SideNav = ({
  isOpen,
  showTitle,
  onClose,
}: {
  isOpen: boolean
  showTitle: boolean
  onClose: () => void
}) => {
  const router = useRouter()
  const { t } = useTransition('')
  const { openSetting } = useContext(SettingContext)!

  const NavItem = ({
    label,
    link,
    Icon,
  }: {
    label: string
    link: string
    Icon: IconType
  }) => {
    let isFocus =
      router.pathname.startsWith(link) ||
      (link === '/game/etc' &&
        (router.pathname.startsWith('/game/stamp') ||
          router.pathname.startsWith('/game/honor') ||
          router.pathname.startsWith('/game/stock')))
    if (link === '/' && router.pathname != '/') isFocus = false
    return (
      <li>
        <Link href={link} passHref>
          <a
            className={`flex items-center pl-3 py-3 pr-4 text-gray-50 cursor-pointer ${
              isFocus
                ? 'bg-indigo-500 hover:bg-indigo-600'
                : 'hover:bg-gray-900'
            } rounded`}
          >
            <span className="inline-block mr-3">
              <Icon
                className={`${
                  isFocus ? 'text-indigo-100' : ' text-gray-600'
                } w-5 h-5`}
              />
            </span>
            <span>{label}</span>
          </a>
        </Link>
      </li>
    )
  }

  return (
    <div className="navbar-menu relative">
      {isOpen && (
        <div
          className="fixed top-0 left-0 bottom-0 flex flex-col bg-black bg-opacity-30 w-full h-full z-10 cursor-pointer lg:hidden"
          onClick={() => onClose()}
        />
      )}
      <nav
        className={`fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-72 sm:max-w-xs pt-6 pb-4 bg-gray-800 overflow-y-auto z-10 transition-transform lg:transition-none transform ${
          !isOpen ? '-translate-x-full lg:translate-x-0z' : ''
        }`}
      >
        {showTitle && isOpen && (
          <div className="flex w-full items-center px-6 pb-6 mb-6 lg:border-b border-gray-700">
            <Link href="/" passHref>
              <a className="cursor-pointer text-xl text-white font-semibold">
                {t('common:title')}
              </a>
            </Link>
          </div>
        )}
        <div className="flex flex-col justify-between h-full px-4">
          <div>
            <NavbarGroup label={t('nav:main.name')}>
              <NavItem
                label={t('nav:main.dashboard')}
                Icon={HiOutlineViewGrid}
                link="/"
              />
              {/* <NavItem
              label={t("nav:main.calendar")}
              Icon={HiOutlineCalendar}
              link="/calendar"
            /> */}
              {/* <NavItem
                label={t("nav:about")}
                Icon={HiOutlineInformationCircle}
                link="/about"
              /> */}
            </NavbarGroup>
            <NavbarGroup label={t('nav:game.name')}>
              <NavItem
                label={t('nav:game.character.name')}
                Icon={HiOutlineArchive}
                link="/game/character"
              />
              <NavItem
                label={t('nav:game.card')}
                Icon={HiOutlineCollection}
                link="/game/card"
              />
              <NavItem
                label={t('nav:game.music')}
                Icon={HiOutlineMusicNote}
                link="/game/music"
              />
              <NavItem
                label={t('nav:game.event.name')}
                Icon={HiOutlineBookOpen}
                link="/game/event"
              />
              <NavItem
                label={t('nav:game.gacha')}
                Icon={HiOutlineChartPie}
                link="/game/gacha"
              />
              {/* <NavItem
                label={t("nav:game.gallery")}
                Icon={HiOutlinePhotograph}
                link="/game/gallery"
              /> */}
              <NavItem
                label={t('nav:game.etc.name')}
                Icon={HiDotsCircleHorizontal}
                link="/game/etc"
              />
            </NavbarGroup>
            <NavbarGroup label={t('nav:tool.name')}>
              <NavItem
                label={t('nav:live2d')}
                Icon={HiOutlineCube}
                link="/live2d"
              />
              {/* <NavItem label={t('nav:live2d')} Icon={HiOutlineCollection} link='/live2d' /> */}
              <NavItem
                label={t('nav:tool.explorer')}
                Icon={HiOutlineFolder}
                link="/tool/explorer"
              />
            </NavbarGroup>
          </div>
          <div
            className="text-gray-200 flex items-center gap-x-2 cursor-pointer modal-button"
            onClick={openSetting}
          >
            <HiOutlineCog className="w-5 h-5" />
            {t('common:setting')}
          </div>
        </div>
      </nav>
    </div>
  )
}

export type MainProps = {
  breadCrumbs?: BreadCrumbsData[]
  title: string
  titleSide?: ReactNode
  mainContentStyle?: CSSProperties
  disableLayout?: boolean
  rootExtra?: ReactNode
}

type props = MainProps & {
  children?: ReactNode
}

export default function MainLayout({
  breadCrumbs,
  children,
  title,
  titleSide,
  mainContentStyle,
  disableLayout = false,
  rootExtra,
}: props) {
  const [drawer, setDrawer] = useState<boolean>(false)
  const { t } = useTransition('')

  return (
    <>
      <NextSeo
        title={`${title} | D4DJ.Info`}
        openGraph={{
          title: `${title}`,
          site_name: 'D4DJ Info',
          description: 'D4DJ Information Website',
        }}
      />
      {rootExtra}
      {disableLayout ? (
        <>{children}</>
      ) : (
        <>
          <nav className="lg:hidden py-6 px-6 bg-gray-800">
            <div className="flex items-center justify-between">
              <Link href="/" passHref>
                <div className="text-2xl text-white font-semibold cursor-pointer">
                  {t('common:title')}
                </div>
              </Link>
              <button
                className="navbar-burger flex items-center rounded focus:outline-none"
                onClick={() => setDrawer(!drawer)}
              >
                <HiOutlineMenu className="text-white bg-indigo-500 hover:bg-violet-focus block h-8 w-8 p-2 rounded" />
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
          <div
            style={mainContentStyle}
            id="mainContent"
            className="mx-auto lg:ml-72 h-full overflow-y-scroll bg-base-200 overflow-x-hidden"
          >
            <div className="mx-auto w-full px-8 py-5  pb-24 lg:pb-5">
              {breadCrumbs && (
                <div className="mt-4 mb-2">
                  <BreadCrumbs data={breadCrumbs} />
                </div>
              )}
              <div className="flex items-center justify-between mb-5">
                <div className="font-bold text-3xl">{title}</div>
                {titleSide}
              </div>
              {children}
            </div>
          </div>
        </>
      )}
    </>
  )
}
