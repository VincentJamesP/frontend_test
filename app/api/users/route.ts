import { User } from "@/app/types/user";
import { NextRequest, NextResponse } from "next/server";

// Handles GET requests to /api
export async function GET() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: response.status });
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}