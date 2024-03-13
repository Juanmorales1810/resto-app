import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { messages } from "@/utils/messages";
import Menu from "@/models/listprice";

export async function GET(
    NextRequest: NextRequest,
    { params }: { params: any }
) {
    connectMongoDB();
    try {
        const itemFound = await Menu.findById(params.id);

        if (!itemFound)
            return NextResponse.json(
                {
                    message: "Item no encontrado",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(
            {
                Item: itemFound,
                message: messages.success.getItme,
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}

export async function PUT(
    NextRequest: NextRequest,
    { params }: { params: any }
) {
    const body = await NextRequest.json();
    connectMongoDB();

    try {
        const taskUpdated = await Menu.findByIdAndUpdate(params.id, body, {
            new: true,
        });

        if (!taskUpdated)
            return NextResponse.json(
                {
                    message: "Task not found",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(taskUpdated);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}

export async function DELETE(
    NextRequest: NextRequest,
    { params }: { params: any }
) {
    connectMongoDB();

    try {
        const taskDeleted = await Menu.findByIdAndDelete(params.id);

        if (!taskDeleted)
            return NextResponse.json(
                {
                    message: "Task not found",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(taskDeleted);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}
