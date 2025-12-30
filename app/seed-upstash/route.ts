import { seedUpstashSearch } from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET() {
  const success = await seedUpstashSearch()

  return NextResponse.json({
    message: success
  })
}