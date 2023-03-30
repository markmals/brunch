import { Card } from "./Card"

export namespace Menu {
    export interface Model {
        title?: string
        items: Item[]
    }

    export interface Item {
        imageUrl: string
        imageAlt?: string
        course: string
        dish: string
        description: string
    }
}

// TODO: Add actual brunch menu

export const eggsBenidictMenu: Menu.Model = {
    items: [
        {
            imageUrl: "nectarine-toast.jpg",
            course: "Hors d'oeuvre",
            dish: "Nectarine Bruschetta",
            description: "Honey, ricotta, and sliced nectarines on thick sliced country bread.",
        },
        {
            imageUrl: "eggs-benny.jpg",
            course: "Entrée",
            dish: "Eggs Benny",
            description: `Classic eggs Benedict with Hollandaise, ham, and poached eggs on fresh 
            English muffins. Served with homefries and an arugula lemon salad.`,
        },
    ],
}

export function Menu({ menu }: { menu: Menu.Model }) {
    return (
        <Card>
            <div className="flex flex-col items-center justify-center gap-6 py-2">
                <h2 className="font-serif text-4xl font-extrabold capitalize text-gray-800 dark:text-gray-200">
                    {menu.title ?? "Menu"}
                </h2>
                <div className="flex flex-col gap-12">
                    {menu.items.map(item => (
                        <div className="flex flex-col items-center gap-6" key={item.dish}>
                            <img
                                alt={item.imageAlt ?? ""}
                                className="inner-border h-64 w-full rounded object-cover"
                                src={item.imageUrl}
                            />
                            <div className="flex flex-col items-center gap-2 divide-y divide-gray-900/10 text-center dark:divide-gray-100/5">
                                <h3 className="w-full pt-2 font-serif text-3xl text-orange-700">
                                    {item.course}
                                </h3>
                                <span className="w-full pt-2 text-lg font-light uppercase text-gray-500 dark:text-gray-400">
                                    {item.dish}
                                </span>
                                <span className="w-full pt-2 text-sm text-gray-800 dark:text-gray-500">
                                    {item.description}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
