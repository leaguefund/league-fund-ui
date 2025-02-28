"use client";

import AuxiliaryHeader from "@/components/AuxiliaryHeader";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex overflow-hidden">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out overflow-hidden ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        <AuxiliaryHeader />
        {/* Page Content */}
        <div className="flex-1 p-4 mx-auto w-full max-w-screen-2xl md:p-6 overflow-y-auto">
          <div className="h-fit min-h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
