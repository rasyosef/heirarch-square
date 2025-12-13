import Navbar from "@/components/layout/Navbar";
import AppSidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Navbar />
          <div className="px-4">
            {children}
          </div>
        </main>
        <Toaster />
      </SidebarProvider>
    </div>
  );
}
