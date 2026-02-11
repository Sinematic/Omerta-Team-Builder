import restrictedAreasData from "@/data/restricted-areas.json"
import { CategoryNode } from "./CategoryNode"


export type Area = {
    name: string
    quest?: string
}

export type Category = {
    name: string
    items?: Area[]
    subcategories?: Category[]
}
/* OLD JSON
[
    { "name": "Chasse Enutrosor", "category": "Dimensions", "subcategory": "Enutrosor" },
    { "name": "Malléfisk (Ankre)", "category": "Dimensions", "subcategory": "Enutrosor" },
    { "name": "Chasse Srambad", "category": "Dimensions", "subcategory": "Srambad" },
    { "name": "Capitaine Ekarlatte (Ankre)", "category": "Dimensions", "subcategory": "Srambad" },
    { "name": "Map de quête [6,-2] : Coupe-Gorge", "category": "Dimensions", "subcategory": "Srambad", "quest": "https://www.dofuspourlesnoobs.com/la-citeacute-de-lindicible-mal.html" },
    { "name": "Chasse Xélorium", "category": "Dimensions", "subcategory": "Xélorium" },
    { "name": "Fraktale (Ankre)", "category": "Dimensions", "subcategory":"Xélorium" },
    { "name": "Chasse Ecaflipuce", "category": "Dimensions","subcategory": "Ecaflipuce" },
    { "name": "Chasse Osavora", "category": "Dimensions", "subcategory": "Osavora" },
    { "name": "Pounicheur (Ankre)", "category": "Dimensions", "subcategory": "Ecaflipuce" },
    { "name": "Supervizœuf (Ankre)", "category": "Dimensions", "subcategory": "Osavora" },
    { "name": "Île de Pandala", "category": "Pandala", "quest": "https://www.dofuspourlesnoobs.com/le-reveil-de-pandala.html" },
    { "name": "Pandamonium", "category": "Pandala", "quest": "https://www.dofuspourlesnoobs.com/quetes-du-pandamonium.html" },
    { "name": "Cauchemar des Ravageurs", "category": "Pandala", "quest": "https://www.dofuspourlesnoobs.com/le-poids-de-son-regard.html" },
    { "name": "Pandala 3 (Wukin et Wukang)", "category": "Pandala", "quest": "https://www.dofuspourlesnoobs.com/l-effet-dragon.html" },
    { "name": "La Bourgade", "category": "Île de Frigost", "subcategory": "Frigost 1" },
    { "name": "Royalmouth", "category": "Île de Frigost", "subcategory": "Frigost 1" },
    { "name": "Mansot Royal", "category": "Île de Frigost", "subcategory": "Frigost 1" },
    { "name": "Ben le Ripate", "category": "Île de Frigost", "subcategory": "Frigost 1" },
    { "name": "Obsidiantre", "category": "Île de Frigost", "subcategory": "Frigost 1" },
    { "name": "Tengu Givrefoux", "category": "Île de Frigost", "subcategory": "Frigost 2" },
    { "name": "Korriandre", "category": "Île de Frigost", "subcategory": "Frigost 2" },
    { "name": "Kolosso", "category": "Île de Frigost", "subcategory": "Frigost 2" },
    { "name": "Glourséleste", "category": "Île de Frigost", "subcategory": "Frigost 2" },
    { "name": "Missiz Frizz", "category": "Île de Frigost", "subcategory": "Frigost 3" },
    { "name": "Sylargh", "category": "Île de Frigost", "subcategory": "Frigost 3" },
    { "name": "Klime", "category": "Île de Frigost", "subcategory": "Frigost 3" },
    { "name": "Nileza", "category": "Île de Frigost", "subcategory": "Frigost 3" },
    { "name": "Comte Harebourg (Double Boss)", "category": "Île de Frigost", "subcategory": "Frigost 3" },
    { "name": "Royaume de Martegel", "category": "Île de Frigost", "quest": "https://www.dofuspourlesnoobs.com/frappez-ami-et-entrez.html" },
    { "name": "Solar & Bethel", "category": "Divers", "quest": "https://www.dofuspourlesnoobs.com/la-colere-des-dieux.html" },
    { "name": "Île des Wabbits", "category": "Divers", "quest": "https://www.dofuspourlesnoobs.com/intrusion-chez-les-wabbits.html" },
    { "name": "Île de Moon", "category": "Divers", "quest": "https://www.dofuspourlesnoobs.com/partir-un-jour-sans-retour.html" },
    { "name": "Île de Nimotopia", "category": "Divers", "quest": "https://www.dofuspourlesnoobs.com/a-plus-dans-l-muldobus.html" },
    { "name": "Crocuzko", "category": "Divers", "subcategory": "Divers", "quest": "https://www.dofuspourlesnoobs.com/perdu-dans-le-temps.html" },
    { "name": "Ereboria", "category": "Divers", "quest": "https://www.dofuspourlesnoobs.com/l-ile-maudite.html" },
    { "name": "Île d'Otomaï", "category": "Île d'Otomaï", "quest": "https://www.dofuspourlesnoobs.com/le-nouveau-monde.html" },
    { "name": "Tourbière sans fond", "category": "Île d'Otomaï", "quest": "https://www.dofuspourlesnoobs.com/le-gardien-du-pont-de-la-mort.html" },
    { "name": "Tourbière nauséabonde", "category": "Île d'Otomaï", "quest": "https://www.dofuspourlesnoobs.com/le-chevalier-noir-et-rose.html" }
]*/


export default function RestrictedAreasPage() {

    const restrictedAreas : Category[] =  restrictedAreasData


    return (
        <div className="w-full mx-auto text-[rgb(var(--text))] py-16 cursor-pointer select-none md:max-w-2/3">

            <h1 className="text-center text-xl pb-8">Accès aux zones</h1>

            {restrictedAreas ? 
                <ul className=" w-full md:max-w-[450px] space-y-3 text-center mx-auto">
                    {restrictedAreasData.map(category => 
                        <CategoryNode key={category.name} category={category} />
                    )}
                </ul> 
            : null}

        </div>
    )
}
