"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

// Create a wrapper component that uses the sidebar hook
const AdminContent = ({ children }: { children: React.ReactNode }) => {
  // Commented out because it's not used right now; after we implement the sidebar, we can uncomment this
  // const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = "ml-0"; // Force no margin since we're hiding the sidebar

  return (
    <div className="min-h-screen xl:flex">
      {/* Hiding Sidebar and Backdrop for now */}
      <div className="hidden">
        <AppSidebar />
        <Backdrop />
      </div>
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader />
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">{children}</div>
      </div>
    </div>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminContent>{children}</AdminContent>
    </SidebarProvider>
  );
}
