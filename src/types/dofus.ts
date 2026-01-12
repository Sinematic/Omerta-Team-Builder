export const DOFUS_CLASS_NAMES = [
	"Féca",
	"Osamodas",
	"Enutrof",
	"Sram",
	"Xelor",
	"Ecaflip",
	"Eniripsa",
	"Iop",
	"Cra",
	"Sadida",
	"Sacrieur",
	"Pandawa",
	"Roublard",
	"Zobal",
	"Steamer",
	"Eliotrope",
	"Huppermage",
	"Ouginak",
	"Forgelance",
] as const

export type DofusClassName = typeof DOFUS_CLASS_NAMES[number]

export const isDofusClassName = (value: unknown): value is DofusClassName =>
  	typeof value === "string" && DOFUS_CLASS_NAMES.includes(value as DofusClassName)


export interface DofusClass {
    name: DofusClassName;
    emoji: string;
	image: string;
}

export type DofusClasses = Record<DofusClassName, DofusClass>

export interface Player {
    name: string;
    classes: DofusClassName[];
}