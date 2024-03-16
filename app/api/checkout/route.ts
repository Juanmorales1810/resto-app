import { NextResponse, NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const accessToken =
    "TEST-4884178194792319-031400-4494535ad519a5353d8ed5943551534e-140083573";

const client = new MercadoPagoConfig({ accessToken });
const payment = new Payment(client);

interface IProduct {
    id: string;
    title: string;
    price: number;
    picture_url: string;
    description: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    const product: IProduct = await req.json();
    const URL = "https://resto-app-five-chi.vercel.app";
    try {
        const body = {
            items: [
                {
                    id: product.id,
                    title: product.title,
                    unit_price: product.price,
                    // picture_url: product.picture_url,
                    description: product.description,
                    quantity: 1,
                },
            ],
            auto_return: "approved",
            back_urls: {
                success: `${URL}`,
                failure: `${URL}`,
            },
            notification_url: `${URL}/api/notify`,
        };
        console.log(body);

        const response = await payment.create({ body });
        console.log(response);
        return NextResponse.json({
            init_point: response,
            status: 400,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            error: "An error occurred while processing your request.",
            status: 500,
        });
    }
}
