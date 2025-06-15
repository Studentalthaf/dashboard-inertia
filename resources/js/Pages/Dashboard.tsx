import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar"
import Navbar from "@/components/navbar"
import { NavUser } from "@/components/nav-user"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DashboardCards } from "@/components/dashboard-cards"
import { Spinner } from "@/components/spinner"

export default function Page() {
  const user = {
    name: "MOCH ALTHAF JAUHAR",
    email: "jauharalthaf@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setLoading(false), 400); // waktu fade-out
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Spinner size={48} color="#2563eb" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar>
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Applicat  ion
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto">
              <NavUser user={user} />
            </div>
          </div>
        </Navbar>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <h1 className="font-bold text-2xl mb-2">Dashboard</h1>
          <DashboardCards />
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            DASHBOARD
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
