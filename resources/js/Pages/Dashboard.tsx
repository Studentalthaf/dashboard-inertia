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

export default function Page() {
  const user = {
    name: "MOCH ALTHAF JAUHAR",
    email: "jauharalthaf@example.com",
    avatar: "/avatars/shadcn.jpg",
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
