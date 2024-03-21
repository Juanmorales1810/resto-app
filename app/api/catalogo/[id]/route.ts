require("dotenv").config();
import Menu, { IMenuSchema } from "@/models/listprice";
import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { messages } from "@/utils/messages";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        return NextResponse.json(
            {
                message: messages.error.default,
            },
            {
                status: 400,
            }
        );
    }
}

export async function PUT(
    NextRequest: NextRequest,
    { params }: { params: any }
) {
    const data = await NextRequest.formData();
    const image = data.get("image");
    const name = data.get("name");
    const description = data.get("description");
    const price = data.get("price");
    const status = data.get("status");
    const category = data.get("category");
    connectMongoDB();
    try {
        if (!image || typeof image === "string") {
            throw new Error("No se proporcionó ninguna imagen válida");
        }

        const bytes = await (image as Blob).arrayBuffer();
        const buffer = Buffer.from(bytes);

        const resultImag: any = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({}, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
                .end(buffer);
        });

        const imageUrl = resultImag.secure_url;

        const updatedItem: IMenuSchema | null = await Menu.findByIdAndUpdate(
            params.id,
            {
                name,
                description,
                image: imageUrl,
                price,
                status,
                category,
            },
            {
                new: true,
            }
        )!;

        if (!updatedItem) {
            return NextResponse.json(
                { message: messages.error.itemNotExist },
                { status: 404 }
            );
        }

        console.log("Menú actualizado:", updatedItem);
        return NextResponse.json(
            {
                updatedItem,
                message: messages.success.itemUpdated,
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        console.error("Error al actualizar el menú:", error);
        return NextResponse.json(
            { message: messages.error.default },
            { status: 500 }
        );
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
        return NextResponse.json(
            {
                message: messages.error.default,
            },
            {
                status: 400,
            }
        );
    }
}
