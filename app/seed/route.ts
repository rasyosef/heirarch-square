import { seedDB } from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET(){
    const success = await seedDB()

    return NextResponse.json({
        message: success
    })
}