export interface Menu {
    title?: string;
    items: MenuItem[];
}

export interface MenuItem {
    imageUrl: string;
    imageAlt?: string;
    course: string;
    dish: string;
    description: string;
}

export const eggsBenidictMenu: Menu = {
    items: [
        {
            imageUrl: 'nectarine-toast.jpg',
            course: "Hors d'oeuvre",
            dish: 'Nectarine Bruschetta',
            description: 'Honey, ricotta, and sliced nectarines on thick sliced country bread.',
        },
        {
            imageUrl: 'eggs-benny.jpg',
            course: 'Entrée',
            dish: 'Eggs Benny',
            description: `Classic eggs Benedict with Hollandaise, ham, and poached eggs on fresh 
            English muffins. Served with homefries and an arugula lemon salad.`,
        },
    ],
};

export const aprilBrunchMenu: Menu = {
    items: [
        {
            imageUrl: 'pan-dulce.webp',
            course: 'Pan Dulce',
            dish: 'Pastelitos Variadas',
            description: `An assortment of pastries filled with guava, cheese, beef, and more.`,
        },
        {
            imageUrl: 'plato-principal.webp',
            course: 'Plato Principal',
            dish: 'Huevos Rancheros a la Cubana',
            description: `A crisp corn tortilla topped with a fried egg, Cuban-style rice 
            and beans, salsa morita, and queso cotija.`,
        },
    ],
};
