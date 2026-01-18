export default function NotFound({ message } : { message : string }) {

    return (
		<div className="grid place-items-center text-center font-semibold text-[rgb(var(--text))] py-[16%]">
			<h1 className="text-[rgb(var(--text))] mb-4 text-7xl">404</h1>
			<h2 className="text-4xl">{message}</h2>
		</div>
    )
}
