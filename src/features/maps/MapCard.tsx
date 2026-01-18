type MapCardProps = {
    name: string;
    image: string;
    mapSetter?: (name: string, image: string) => void;
}

export default function MapCard({ name, image, mapSetter }: MapCardProps) {

    const handleClick = () => mapSetter ? mapSetter(name, image) : console.log()

    
    return (
        <li onClick={() => handleClick()}
        className="cursor-pointer select-none flex flex-col items-center bg-[rgb(var(--dark-green))] p-2 rounded-lg">
            <h3 className="text-[rgb(var(--text))] text-lg font-semibold mb-2 bg-[rgb(var(--very-dark-green))] w-full text-center rounded-lg py-1">{name}</h3>
            <img src={image} alt={name} className="w-full md:h-48 object-cover rounded-lg shadow-md"/>
        </li>
    )
}
