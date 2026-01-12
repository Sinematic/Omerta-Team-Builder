export default function NotFound({ message } : { message : string }) {

    return (
		<div className="grid place-items-center text-center font-semibold text-white py-[16%]">
			<h1 className="text-white mb-4 text-7xl">404</h1>
			<h2 className="text-4xl">{message}</h2>
		</div>
    )
}
