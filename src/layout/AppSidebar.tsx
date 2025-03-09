/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import Logo from "@/components/logo/logo";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { TeamInfo } from '@/types/state';
import Badge from "@/components/ui/badge/Badge";
import { useGlobalState } from '@/context/GlobalStateContext';
import { getLeagueTotalBalance, getLeagueActiveTeams, getCommissioner } from '@/utils/onChainReadUtils';
import {
  BoxCubeIcon,
  // CalenderIcon,
  ChatIcon,
  ChevronDownIcon,
  DocsIcon,
  // GridIcon,
  HorizontaLDots,
  // ListIcon,
  MailIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  // TableIcon,
  // TaskIcon,
  // UserCircleIcon,
} from "../icons/index";
// import SidebarWidget from "./SidebarWidget";
import DropdownLeagues from "@/components/example/DropdownExample/DropdownLeagues";
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  // {
  //   icon: <GridIcon />,
  //   name: "Dashboard",
  //   subItems: [
  //     { name: "Ecommerce", path: "/", pro: false },
  //     { name: "Analytics", path: "/analytics", pro: true },
  //     { name: "Marketing", path: "/marketing", pro: true },
  //     { name: "CRM", path: "/crm", pro: true },
  //     { name: "Stocks", path: "/stocks", new: true, pro: true },
  //   ],
  // },
  // {
  //   icon: <CalenderIcon />,
  //   name: "Calendar",
  //   path: "/calendar",
  // },
  // {
  //   icon: <UserCircleIcon />,
  //   name: "User Profile",
  //   path: "/profile",
  // },
  // {
  //   name: "Task",
  //   icon: <TaskIcon />,
  //   subItems: [
  //     { name: "List", path: "/task-list", pro: true },
  //     { name: "Kanban", path: "/task-kanban", pro: true },
  //   ],
  // },
  // {
  //   name: "Forms",
  //   icon: <ListIcon />,
  //   subItems: [
  //     { name: "Form Elements", path: "/form-elements", pro: false },
  //     { name: "Form Layout", path: "/form-layout", pro: true },
  //   ],
  // },
  // {
  //   name: "Tables",
  //   icon: <TableIcon />,
  //   subItems: [
  //     { name: "Basic Tables", path: "/basic-tables", pro: false },
  //     { name: "Data Tables", path: "/data-tables", pro: true },
  //   ],
  // },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "❌ Page 1: Landing", path: "/"},
      { name: "✅ Page 2: Sleeper Username", path: "/sleeper-username"},
      { name: "✅ Page 3: Confirm League", path: "/confirm-league"},
      { name: "❌ Page 4: Request Email Verification", path: "/request-verification"},
      { name: "❌ Page 5: Email Verification", path: "/verification"},
      { name: "✅ Page 6: Connect Wallet (Commissioner)", path: "/connect-wallet"},
      { name: "✅ Page 7: Create League (Commissioner)", path: "/create-league"},
      { name: "✅ Page 8: League Created", path: "/league-created"},
      { name: "🟡 Page 9: Invite Teams", path: "/invite-teams"},
      { name: "❌ Page 10: Invitations Sent", path: "/invites-sent"},
      { name: "✅ Page 11: Join Sleeper League (Joiner)", path: "/join-league-sleeper"},
      { name: "✅ Page 12: Connect Wallet (Joiner)", path: "/join-connect-wallet"},
      { name: "✅ Page 13: Top Up USDC (Joiner)", path: "/join-top-up"},
      { name: "✅ Page 14: Join League (Joiner)", path: "/join-league"},
      { name: "✅ Page 15: League Welcome (Joiner)", path: "/league-welcome"},
      { name: "✅ Page 16: League", path: "/league"},
      { name: "✅ Page 17: League Rewards", path: "/"},
      { name: "✅ Page 18: Reward Choose Team", path: "/"},
      { name: "✅ Page 19: Reward Define Reward", path: "/allocate-reward"},
      { name: "✅ Page 20: Reward Sent", path: "/"},
      { name: "✅ Page 21: Mint Reward", path: "/mint-reward"},
      { name: "✅ Page 22: Reward Minted", path: "/"},
      { name: "Page 23: Supply Liquidty", path: "/"},
      { name: "Page 24: Remove Liquidty", path: "/"},
      { name: "File Manager", path: "/file-manager", pro: true },
      { name: "Pricing Tables", path: "/pricing-tables", pro: true },
      { name: "Faqs", path: "/faq", pro: true },
      { name: "Blank Page", path: "/blank", pro: true },
      { name: "404 Error", path: "/error-404", pro: true },
      { name: "500 Error", path: "/error-500", pro: true },
      { name: "503 Error", path: "/error-503", pro: true },
      { name: "Coming Soon", path: "/coming-soon", pro: true },
      { name: "Maintenance", path: "/maintenance", pro: true },
      { name: "Success", path: "/success", pro: true },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: true },
      { name: "Bar Chart", path: "/bar-chart", pro: true },
      { name: "Pie Chart", path: "/pie-chart", pro: true },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: true },
      { name: "Avatar", path: "/avatars", pro: true },
      { name: "Badge", path: "/badge", pro: true },
      { name: "Breadcrumb", path: "/breadcrumb", pro: true },
      { name: "Buttons", path: "/buttons", pro: true },
      { name: "Buttons Group", path: "/buttons-group", pro: true },
      { name: "Cards", path: "/cards", pro: true },
      { name: "Carousel", path: "/carousel", pro: true },
      { name: "Dropdowns", path: "/dropdowns", pro: true },
      { name: "Images", path: "/images", pro: true },
      { name: "Links", path: "/links", pro: true },
      { name: "List", path: "/list", pro: true },
      { name: "Modals", path: "/modals", pro: true },
      { name: "Notification", path: "/notifications", pro: true },
      { name: "Pagination", path: "/pagination", pro: true },
      { name: "Popovers", path: "/popovers", pro: true },
      { name: "Progressbar", path: "/progress-bar", pro: true },
      { name: "Ribbons", path: "/ribbons", pro: true },
      { name: "Spinners", path: "/spinners", pro: true },
      { name: "Tabs", path: "/tabs", pro: true },
      { name: "Tooltips", path: "/tooltips", pro: true },
      { name: "Videos", path: "/videos", pro: true },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
      { name: "Reset Password", path: "/reset-password", pro: true },
      {
        name: "Two Step Verification",
        path: "/two-step-verification",
        pro: true,
      },
    ],
  },
];

const supportItems: NavItem[] = [
  {
    icon: <ChatIcon />,
    name: "Chat",
    path: "/chat",
  },
  {
    icon: <MailIcon />,
    name: "Email",
    subItems: [
      { name: "Inbox", path: "/inbox" },
      { name: "Details", path: "/inbox-details" },
    ],
  },
  {
    icon: <DocsIcon />,
    name: "Invoice",
    path: "/invoice",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const pathname = usePathname();
  const { state } = useGlobalState();
  const [activeTeams, setActiveTeams] = useState<TeamInfo[]>([]);
  const [leagueBalance, setLeagueBalance] = React.useState<number>(0);
  const [isCommissioner, setIsCommissioner] = useState(false);
  const [showDeveloperSection, setShowDeveloperSection] = useState(false);

  React.useEffect(() => {
    const fetchLeagueInfo = async () => {
      const contractAddress = state.selectedLeagueAddress;
      if (contractAddress) {
        try {
          // const name = await getLeagueName(contractAddress);
          const balance = await getLeagueTotalBalance(contractAddress);
          const activeTeams = await getLeagueActiveTeams(contractAddress);
          // const toStore: TeamInfo[] = [];
          const isCommissioner = state.wallet ? await getCommissioner(contractAddress, state.wallet) : false;
          setIsCommissioner(isCommissioner);

          // for (const team of activeTeams) {
          //   const isCommissioner = await getCommissioner(contractAddress, team.wallet);
          //   toStore.push({ ...team, owner: isCommissioner });
          // }
          setActiveTeams([...activeTeams]);
          setLeagueBalance(balance);
        } catch (error) {
          console.error('Error fetching league info:', error);
        }
      }
    };
    fetchLeagueInfo();
    handleLinkClick(); // Toggle sidebar on league change
  }, [state.selectedLeagueAddress, state.wallet]);

  // Add window function to toggle developer section
  useEffect(() => {
    (window as any).toggleDeveloperSection = () => {
      setShowDeveloperSection(prev => !prev);
      console.log('Developer section is now:', !showDeveloperSection ? 'visible' : 'hidden');
    };
    (window as any).clearSession = () => {
      sessionStorage.clear();
      console.log('Session storage cleared');
    };
    console.log('Available commands:');
    console.log('1. toggleDeveloperSection() - Show/hide developer section');
    console.log('2. clearSession() - Clear all session storage');
    return () => {
      delete (window as any).toggleDeveloperSection;
      delete (window as any).clearSession;
    };
  }, [showDeveloperSection]);

  const handleLinkClick = () => {
    if (window.innerWidth < 991) {
      toggleMobileSidebar();
    } else {
      toggleSidebar();
    }
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "support" | "others"
  ) => (
    <ul className="flex flex-col gap-2">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
                onClick={handleLinkClick}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                      onClick={handleLinkClick}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
      <li key="league">
        <Link href="/league" className="menu-item group menu-item-inactive" onClick={handleLinkClick}>
          <span className="menu-item-text">League</span>
        </Link>
      </li>
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "support" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "support", "others"].forEach((menuType) => {
      const items =
        menuType === "main"
          ? navItems
          : menuType === "support"
          ? supportItems
          : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "support" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "support" | "others"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed flex flex-col top-16 lg:top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-[calc(100vh-4rem)] lg:h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 z-999999
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-6 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              {/* <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              /> */}
              {/* <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              /> */}
              <div><Logo /></div>
            </>
                   
          ) : (
            <div></div>
            
            // <Image
            //   src="/images/logo/logo-icon.svg"
            //   alt="Logo"
            //   width={32}
            //   height={32}
            // />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto  duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-2">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "League"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>

              <DropdownLeagues />
              {/* <h2 className={`mb-4 text-xs truncate flex leading-[20px] text-gray-500`}>
                  📜 {state.selectedLeagueAddress}
              </h2> */}
            </div>
            <div>
              {/* {renderMenuItems(navItems, "main")} */}
              <ul className="flex flex-col gap-2">
              <li key="teams">
                <Link href="/league?rewards=false" className="menu-item group menu-item-inactive" onClick={handleLinkClick}>
                      {/* <span className="menu-item-text">💌 Distribute</span> */}
                      
                  {/* <a className="menu-item group menu-item-inactive" href="javascript:void(0)" onClick={(e) => e.preventDefault()}> */}
                  <span className="menu-item-text">
                      👥 Dashboard 
                      <span className="ml-2 text-xs text-gray-500 inline">
                      {activeTeams.length > 1 ? (
                        ` ${activeTeams.length} Teams`
                      ) : (
                        ` ${activeTeams.length} Team`
                      )}
                      </span>
                    </span>
                    </Link>
                  {/* </a> */}
                </li>
              <li key="trophies">
                  {/* <a className="menu-item group menu-item-inactive" href="javascript:void(0)" onClick={(e) => e.preventDefault()}> */}
                  <Link href="/league?rewards=true" className="menu-item group menu-item-inactive" onClick={handleLinkClick}>
                  <span className="menu-item-text">
                      🏆 Trophies
                      <span className="ml-2 text-xs text-gray-500 inline">
                      {activeTeams.length > 1 ? (
                        ` ${activeTeams.length} Rewards`
                      ) : (
                        ` ${activeTeams.length} Reward`
                      )}
                      </span>
                    </span>
                  </Link>
                </li>
                <li key="treasury">
                  <a className="menu-item group menu-item-inactive" href="javascript:void(0)" onClick={(e) => e.preventDefault()}>
                  <span className="menu-item-text">💰 Treasury 
                    <span className="ml-2 text-xs text-gray-500 inline">
                      ${leagueBalance}
                      </span>
                    </span>
                  </a>
                </li>
                <li key="settings">
                    <a className="menu-item group menu-item-inactive" href="javascript:void(0)" onClick={(e) => e.preventDefault()}>
                      <span className="menu-item-text truncate">📜 Settings 
                        <span className="ml-2 text-xs text-gray-500 inline truncate">
                          {state.selectedLeagueAddress}
                        </span>
                      </span>
                    </a>
                </li>
                {/* <li key="league">
                <Link href="/league" className="menu-item group menu-item-inactive" onClick={handleLinkClick}>
                      <span className="menu-item-text truncate">📜 {state.selectedLeagueAddress}</span>
                      </Link>
                </li> */}
            </ul>
            </div>

            <div className={`mt-6`}>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Rewards"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              <ul className="flex flex-col gap-2">
                <li key="allocate">
                {isCommissioner && (
                      <Link href="/allocate-reward" className="menu-item group menu-item-inactive" onClick={handleLinkClick}>
                      <span className="menu-item-text">💌 Distribute</span>
                      </Link>
                    )}
                    {!isCommissioner && (
                      <span className="menu-item-text">💸 Send <Badge variant="light" color="primary">Commissioner Only</Badge></span>
                  )}
                </li>
                <li key="claim">
                  <Link href="/mint-reward" className="menu-item group menu-item-inactive" onClick={handleLinkClick}>
                  <span className="menu-item-text">✨ Mint Trophy</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={`mt-6`}>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Utilities"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              <ul className="flex flex-col gap-2">
                <li key="invite">
                  <a className="menu-item group menu-item-inactive" href="javascript:void(0)" onClick={(e) => e.preventDefault()}>
                  <span className="menu-item-text">
                      🔗 Invite Link 
                    </span>
                  </a>
                </li>
                <li key="new-league">
                  <Link href="/" className="menu-item group menu-item-inactive" onClick={handleLinkClick}>
                  <span className="menu-item-text">🌱 New League</span>
                  </Link>
                </li>
                <li key="settings">
                  <a className="menu-item group menu-item-inactive" href="javascript:void(0)" onClick={(e) => e.preventDefault()}>
                  
                    <span className="menu-item-text text-gray-400">
                      🎚️ Season Settings 
                    </span>
                  </a>
                </li>
                <li key="yield">
                  <a className="menu-item group menu-item-inactive" href="javascript:void(0)" onClick={(e) => e.preventDefault()}>
                  <span className="menu-item-text text-gray-400">📈 Yield <Badge variant="light" color="primary">Coming Soon</Badge></span>
                  </a>
                </li>
              </ul>
            </div>
            
            {showDeveloperSection && (
              <>
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "justify-start"
                    }`}
                  >
                    {isExpanded || isHovered || isMobileOpen ? (
                      "Developer"
                    ) : (
                      <HorizontaLDots />
                    )}
                  </h2>
                  {renderMenuItems(navItems, "main")}
                </div>
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "justify-start"
                    }`}
                  >
                    {isExpanded || isHovered || isMobileOpen ? (
                      "Pages"
                    ) : (
                      <HorizontaLDots />
                    )}
                  </h2>
                  {renderMenuItems(navItems, "main")}
                </div>
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "justify-start"
                    }`}
                  >
                    {isExpanded || isHovered || isMobileOpen ? (
                      "Support"
                    ) : (
                      <HorizontaLDots />
                    )}
                  </h2>
                  {renderMenuItems(supportItems, "support")}
                </div>
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "justify-start"
                    }`}
                  >
                    {isExpanded || isHovered || isMobileOpen ? (
                      "Others"
                    ) : (
                      <HorizontaLDots />
                    )}
                  </h2>
                  {renderMenuItems(othersItems, "others")}
                </div>
              </>
            )}
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
