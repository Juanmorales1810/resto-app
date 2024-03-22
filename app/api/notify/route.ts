import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

const accessToken = `${process.env.MERCADO_PAGO_ACCESS_TOKEN}`;
const mercadopago = new MercadoPagoConfig({ accessToken });

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await res
        .json()
        .then((data) => data as { data: { id: string } });
    const secret = req.headers.get("x-request-id_header");
    if (secret !== process.env.MERCADO_PAGO_SECRET) {
        return NextResponse.json({ success: false });
    }
    const payment = await new Payment(mercadopago).get({ id: body.data.id });

    const donation = {
        id: payment.id,
        amount: payment.transaction_amount,
        message: payment.description,
    };

    // Aquí se puede guardar la donación en una base de datos

    return Response.json({ success: true });
}
