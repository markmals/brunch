export interface Menu {
    title?: string
    items: MenuItem[]
}

export interface MenuItem {
    imageUrl: string
    imageAlt?: string
    course: string
    dish: string
    description: string
}

export const eggsBenidictMenu: Menu = {
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
