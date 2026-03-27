import Button from "./Button"


type OverlayProps = {
    message: React.ReactNode
    onConfirm: () => void
    onCancel: () => void
}


export default function Overlay({ message, onConfirm, onCancel } : OverlayProps) {


    return (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-lg z-10"
        onClick={(e) => e.stopPropagation()}>
            <p className="text-white text-md mb-2">{message}</p>

            <div className="flex gap-2">
                <Button text="Valider" action={onConfirm} />
                <Button text="Annuler" action={onCancel} color="bg-[rgb(var(--warning))]"/>
            </div>
        </div>
    )
}
