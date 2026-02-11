import type { Category } from "./RestrictedAreasPage"
import RestrictedElement from "./RestrictedElement"


export function CategoryNode({ category }: { category: Category }) {
	return (
		<div style={{ marginLeft: 16 }}>
		<h3>{category.name}</h3>

			{category.subcategories?.map((sub) => <CategoryNode key={sub.name} category={sub} /> )}
			{category.items?.map((item) => <RestrictedElement key={item.name} area={item} /> )}
		</div>
	)
}