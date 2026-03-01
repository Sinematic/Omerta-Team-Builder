type MapCardProps = {
    name: string
    image: string
    //mapSetter?: (name: string, image: string) => void
    excludeMap?: (name: string) => void
}


export default function MapCard({ name, image, /*mapSetter,*/ excludeMap }: MapCardProps) {

    const handleClick = () => {
        if(excludeMap) excludeMap(name)
    }
    // top = #3c3e44 bottom = #292b2f


    return (
        <li onClick={() => handleClick()}
        className="cursor-pointer select-none flex flex-col items-center bg-[rgb(var(--dark-green))] p-2 rounded-lg">
            <h3 className="text-[rgb(var(--text))] text-lg font-semibold mb-2 bg-[rgb(var(--very-dark-green))] w-full text-center rounded-lg py-1">{name}</h3>
            <div className="h-full w-full bg-gradient-to-b from-[#3c3e44] to-[#292b2f] flex items-center">
                <img src={image} alt={name} className="w-full object-cover rounded-lg shadow-md"/>
            </div>
        </li>
    )
}