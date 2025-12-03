import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LogInIcon, LogOutIcon, SettingsIcon, ShoppingCartIcon, UserIcon, UserPlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions";
import { auth } from "@/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export async function UserAvatarDropdown() {
    const session = await auth();
    let avatar_fallback: string = 'U';

    if (session?.user?.email)
        avatar_fallback = session?.user?.email[0].toLocaleUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    {/* <AvatarImage src="https://assetsio.gnwcdn.com/the_witcher_3_wild_hunt_e3_2014_18.jpg?width=100&height=100&fit=crop&quality=100&format=png&enable=upscale&auto=webp" /> */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <AvatarFallback
                                className="bg-primary text-primary-foreground"
                            >
                                {avatar_fallback}
                            </AvatarFallback>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{session?.user?.email}</p>
                        </TooltipContent>
                    </Tooltip>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/cart"><ShoppingCartIcon /> Cart </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <UserIcon /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SettingsIcon /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild variant="destructive" className="p-0">
                    <form
                        action={signOutUser}
                    >
                        <Button variant='link' size='sm' className="w-full hover:no-underline justify-start font-normal">
                            <LogOutIcon /> Logout
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function DefaultAvatarDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="/userIcon.png" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8}>
                <DropdownMenuItem asChild>
                    <Link href="/cart"><ShoppingCartIcon /> Cart </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/signup"><UserPlusIcon /> Sign Up</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/login"><LogInIcon /> Log In</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}