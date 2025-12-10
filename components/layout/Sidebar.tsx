import Link from "next/link";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator
} from "@/components/ui/sidebar";
import Image from "next/image";
import { DollarSign, Home, PlusIcon, ShoppingCart } from "lucide-react";
import YourProductsMenu from "@/components/layout/YourProductsMenu";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-0.5">
            <SidebarMenuButton asChild>
              <Link href="/">
                <Image src='/witcher.webp' alt='logo' width={20} height={20} />
                <span>Heirarch Square</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="py-0">
          {/* <SidebarGroupLabel>Heirarch Square</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/"><Home /> Home </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/bestsellers"> <DollarSign /> Best Sellers </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/cart"><ShoppingCart /> Cart </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Your Products</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <Link href="/dp/add">
              <PlusIcon />
              <span className="sr-only">Add Product</span>
            </Link>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <YourProductsMenu />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}