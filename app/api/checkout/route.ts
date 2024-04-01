import { NextResponse, NextRequest } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const accessToken = `${process.env.MERCADO_PAGO_ACCESS_TOKEN}`;

const client = new MercadoPagoConfig({ accessToken });
const payment = new Preference(client);

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
        const response = await payment.create({
            body: {
                items: [
                    {
                        id: product.id,
                        title: product.title,
                        description: product.description,
                        picture_url: product.picture_url,
                        unit_price: product.price,
                        quantity: 1,
                    },
                ],
                auto_return: "approved",
                back_urls: {
                    success: `${URL}/cart/${product.description}`,
                    failure: `${URL}/cart/${product.description}`,
                },
                notification_url: `${URL}/api/notify`,
            },
        });

        return NextResponse.json({
            init_point: response.sandbox_init_point,
            status: 200,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            error: "An error occurred while processing your request.",
            status: 500,
        });
    }
}
