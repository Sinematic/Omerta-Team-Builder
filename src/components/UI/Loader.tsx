export default function Loader({ message } : { message : string }) {

    return (
		<div className="grid place-items-center text-center font-semibold text-[rgb(var(--text))] py-[16%]">
			<h1 className="text-[rgb(var(--text))] mb-4 text-3xl">Chargement en cours</h1>
			<h2 className="text-xl">{message}</h2>
		</div>
    )
}
