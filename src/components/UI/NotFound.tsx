export default function NotFound({ message } : { message : string }) {

    return (
		<div className="grid place-items-center">
			<h1 className="text-4xl font-semibold text-white py-[16%]"><span className="block text-center mb-4 text-7xl">404</span>{message}</h1>
		</div>
    )
}
