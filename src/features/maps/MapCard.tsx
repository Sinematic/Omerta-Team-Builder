type MapCardProps = {
    name: string;
    image: string;
    mapSetter?: (name: string, image: string) => void;
}

export default function MapCard({ name, image, mapSetter }: MapCardProps) {

    const handleClick = () => mapSetter ? mapSetter(name, image) : console.log()

    
    return (
        <li onClick={() => handleClick()}
        className="cursor-pointer select-none flex flex-col items-center bg-emerald-800 p-2 rounded-lg">
            <h3 className="text-white text-lg font-semibold mb-2 bg-emerald-900 w-full text-center rounded-lg py-1">{name}</h3>
            <img src={image} alt={name} className="w-full md:h-48 object-cover rounded-lg shadow-md"/>
        </li>
    )
}
