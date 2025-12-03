import { signOutUser } from "@/lib/actions";

export async function GET(){
    await signOutUser();
}