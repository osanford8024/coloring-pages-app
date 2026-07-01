import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Image generation requires checkout first." },
    { status: 402 }
  );
}
