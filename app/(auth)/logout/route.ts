import { signOutUser } from "@/lib/actions/user";

export async function GET(){
    await signOutUser();
}