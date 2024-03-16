// import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { NextApiRequest, NextApiResponse } from "next";

import { MercadoPagoConfig, Payment } from "mercadopago";
import mercadopago from "mercadopago";

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
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const product: IProduct = req.body.product;
        const URL = "https://resto-app-five-chi.vercel.app";
        try {
            const body = {
                items: [
                    {
                        id: "12",
                        title: "titulo del producto",
                        unit_price: 1000,
                        picture_url:
                            "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                        description: "descripcion del producto",
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
            res.status(200);
        } catch (error) {}
    } else {
        res.status(400).json({ message: "Method not allowed" });
    }
};

export default handler;
