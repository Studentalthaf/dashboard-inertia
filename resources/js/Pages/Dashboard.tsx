import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
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
import { DataTable } from "@/components/table";

export default function Page({ barang = [] }) {
  const user = {
    name: "MOCH ALTHAF JAUHAR",
    email: "jauharalthaf@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [form, setForm] = useState<{
    nama_barang: string;
    nomer_barang: string;
    asal_barang: string;
    gambar: File | null;
  }>({
    nama_barang: "",
    nomer_barang: "",
    asal_barang: "",
    gambar: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "gambar" && e.target.files && e.target.files.length > 0) {
      setForm({ ...form, gambar: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nama_barang", form.nama_barang);
    formData.append("nomer_barang", form.nomer_barang);
    formData.append("asal_barang", form.asal_barang);
    if (form.gambar) {
      formData.append("gambar", form.gambar);
    }
    router.post("/barang", formData, {
      forceFormData: true,
      onSuccess: () => {
        setForm({ nama_barang: "", nomer_barang: "", asal_barang: "", gambar: null });
        setLoading(false);
      },
      onError: () => setLoading(false),
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setLoading(false), 400); 
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
          <div className="flex items-center gap-2 px-2 sm:px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 hidden sm:block" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden lg:block">
                  <BreadcrumbLink href="#" className="text-sm">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden lg:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm">Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto">
              <NavUser user={user} />
            </div>
          </div>
        </Navbar>
        <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 pt-0">
          <h1 className="font-bold text-xl sm:text-2xl mb-2">Dashboard ALTHAF CI/CD</h1>
          <DashboardCards />
          
          {/* Responsive Form */}
          <div className="bg-white rounded-lg border p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">Tambah Barang</h2>
            <form onSubmit={handleSubmit} className="space-y-3" encType="multipart/form-data">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <input
                  name="nama_barang"
                  value={form.nama_barang}
                  onChange={handleChange}
                  placeholder="Nama Barang"
                  className="border px-3 py-2 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  name="nomer_barang"
                  value={form.nomer_barang}
                  onChange={handleChange}
                  placeholder="Nomer Barang"
                  className="border px-3 py-2 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  name="asal_barang"
                  value={form.asal_barang}
                  onChange={handleChange}
                  placeholder="Asal Barang"
                  className="border px-3 py-2 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="file"
                  name="gambar"
                  accept="image/*"
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-md text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full sm:w-auto"
                >
                  Tambah Barang
                </button>
              </div>
            </form>
          </div>
          
          <DataTable data={barang} />
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            DASHBOARD
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
