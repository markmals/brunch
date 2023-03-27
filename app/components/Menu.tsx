import { Card } from "./Card"

export function Menu() {
    return (
        <Card className="gap-6 py-2">
            <h2 className="font-serif text-4xl font-extrabold capitalize text-gray-800">Menu</h2>

            <div className="flex flex-col gap-12">
                <div className="flex flex-col items-center gap-6">
                    <img
                        alt=""
                        className="h-64 w-full rounded border border-black/25 object-cover"
                        src="nectarine-toast.jpg"
                    />
                    <div className="flex flex-col items-center gap-2 divide-y divide-gray-900/10 text-center">
                        <h3 className="w-full pt-2 font-serif text-3xl text-orange-700">
                            Hors d&apos;oeuvre
                        </h3>
                        <span className="w-full pt-2 text-lg font-light uppercase text-gray-500">
                            Nectarine Bruschetta
                        </span>
                        <span className="w-full pt-2 text-sm text-gray-800">
                            Honey, ricotta, and sliced nectarines on thick sliced country bread.
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-6">
                    <img
                        alt=""
                        className="h-64 w-full rounded border border-black/25 object-cover"
                        src="eggs-benny.jpg"
                    />
                    <div className="flex flex-col items-center gap-2 divide-y divide-gray-900/10 text-center">
                        <h3 className="w-full pt-2 font-serif text-3xl text-orange-700">Entrée</h3>
                        <span className="w-full pt-2 text-lg font-light uppercase text-gray-500">
                            Eggs Benny
                        </span>
                        <span className="w-full pt-2 text-sm text-gray-800">
                            Classic eggs Benedict with Hollandaise, ham, and poached eggs on fresh
                            English muffins. Served with homefries and an arugula lemon salad.
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    )
}
