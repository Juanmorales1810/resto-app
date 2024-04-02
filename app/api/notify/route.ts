import Command, { ICommandSchema } from "@/models/commands";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";

const accessToken = `${process.env.MERCADO_PAGO_ACCESS_TOKEN}`;
const mercadopago = new MercadoPagoConfig({ accessToken });

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req
        .json()
        .then((data) => data as { data: { id: string } });
    console.log(body);

    // const secret = req.headers.get("x-request-id_header");
    // if (secret !== process.env.MERCADO_PAGO_SECRET) {
    //     return NextResponse.json({ success: false });
    // }
    const payment = await new Payment(mercadopago).get({ id: body.data.id });

    connectMongoDB();

    const newCommand: ICommandSchema = new Command({
        id: payment.id,
        name: payment.additional_info?.items?.[0]?.title ?? "",
        price: payment.transaction_amount,
        table: payment.additional_info?.items?.[0]?.description ?? "",
        image: payment.additional_info?.items?.[0]?.picture_url ?? "",
    });

    const savedCommand = await newCommand.save();
    console.log("Menú guardado:", savedCommand);
    // Aquí se puede guardar la donación en una base de datos

    return NextResponse.json({ success: true });
}
