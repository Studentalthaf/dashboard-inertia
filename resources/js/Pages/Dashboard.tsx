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
  const [form, setForm] = useState({
    nama_barang: "",
    nomer_barang: "",
    asal_barang: "",
    gambar: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "gambar") {
      setForm({ ...form, gambar: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
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
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4" encType="multipart/form-data">
            <input
              name="nama_barang"
              value={form.nama_barang}
              onChange={handleChange}
              placeholder="Nama Barang"
              className="border px-2 py-1 rounded"
              required
            />
            <input
              name="nomer_barang"
              value={form.nomer_barang}
              onChange={handleChange}
              placeholder="Nomer Barang"
              className="border px-2 py-1 rounded"
              required
            />
            <input
              name="asal_barang"
              value={form.asal_barang}
              onChange={handleChange}
              placeholder="Asal Barang"
              className="border px-2 py-1 rounded"
              required
            />
            <input
              type="file"
              name="gambar"
              accept="image/*"
              onChange={handleChange}
              className="border px-2 py-1 rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
              Tambah
            </button>
          </form>
          <DataTable data={barang} />
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            DASHBOARD
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
