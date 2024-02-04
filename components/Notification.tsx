

export type StatusNotification = "error" | "success" | null;
interface Props {
    status: StatusNotification
    msj: string | null
}

export const Notification = ({ status, msj }: Props) => {
    return (
        <div className="">
            <p>{msj}</p>
        </div>
    )
}