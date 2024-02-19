import { connectMongoDB } from "@/libs/mongodb";
import Menu from "@/models/listprice";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    await connectMongoDB();
    const tasks = await Menu.find();
    return NextResponse.json(tasks);
}

export async function POST(NextRequest: NextRequest) {
    try {
        const body = await NextRequest.json();
        const newTask = new Menu(body);
        const savedTask = await newTask.save();
        return NextResponse.json(savedTask);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}
