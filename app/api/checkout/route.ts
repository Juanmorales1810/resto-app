import { NextResponse, NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || "";
const client = new MercadoPagoConfig({ accessToken });
interface IProduct {
    id: string;
    title: string;
    price: number;
    picture_url: string;
    description: string;
}
const payment = new Payment(client);

export async function POST(req: NextRequest, res: NextResponse) {
    const product: IProduct = await req.json();
    console.log(product);

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
        const response = await payment.create({ body });
        console.log(response);
        return NextResponse.json({
            init_point: response.transaction_details?.external_resource_url,
            status: 400,
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        // Send an error response back to the client
        return NextResponse.json({
            error: "An error occurred while processing your request.",
            status: 500,
        });
    }
}
