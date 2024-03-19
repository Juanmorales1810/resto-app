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

export async function GET() {
    try {
        await connectMongoDB();

        const menu = await Menu.find();

        return NextResponse.json(
            {
                menu,
                message: messages.success.getItme,
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        console.error("Error al obtener el menú:", error);
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}

export async function POST(NextRequest: NextRequest) {
    try {
        const data = await NextRequest.formData();
        const image = data.get("image");
        const name = data.get("name");
        const description = data.get("description");
        const price = data.get("price");
        const status = data.get("status");
        const category = data.get("category");

        if (!name || !description || !image || !price || !status || !category) {
            return NextResponse.json(
                {
                    message: messages.error.needProps,
                },
                {
                    status: 400,
                }
            );
        }

        //@ts-ignore
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const resultImag: any = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({}, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
                .end(buffer);
        });

        const imageUrl = resultImag.secure_url;
        const body = JSON.stringify({
            name,
            description,
            price,
            status,
            category,
            image: imageUrl,
        });
        const obj = JSON.parse(body);
        console.log(obj);
        const menuFind = await Menu.findOne({ name });

        if (menuFind) {
            return NextResponse.json(
                { message: messages.error.menuExist },
                { status: 200 }
            );
        }
        const newMenu: IMenuSchema = new Menu({
            name,
            description,
            image: imageUrl,
            price,
            status,
            category,
        });
        const savedMenu = await newMenu.save();
        console.log("Menú guardado:", savedMenu);
        return NextResponse.json(
            {
                newMenu: savedMenu,
                message: messages.success.menuCreated,
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        console.error("Error al guardar el menú:", error);
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}
