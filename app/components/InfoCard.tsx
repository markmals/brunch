import {
    CalendarDaysIcon,
    ChevronRightIcon,
    MapPinIcon,
    PlusIcon,
    UserIcon,
} from "@heroicons/react/24/solid"
import { Card } from "./Card"
import { Map } from "./Mapbox"

export function InfoCard({ mapboxToken, mapLink }: { mapboxToken: string; mapLink: string }) {
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <div className="flex w-full flex-col gap-4 divide-y divide-gray-900/10 py-4">
                    <div className="flex flex-row items-center gap-6 px-4 text-gray-500">
                        <UserIcon className="h-5 w-5 text-gray-500" />
                        <span>
                            Hosted by <strong className="text-black">Mark</strong>
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-6 px-4 pt-4 text-gray-500">
                        <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
                        <span>
                            <strong className="text-black">
                                Sunday, April 16<sup>th</sup>, 2023
                            </strong>
                            <span className="flex flex-row items-center gap-2">
                                <span className="flex flex-row items-center gap-1 text-black">
                                    10:30 AM <ChevronRightIcon className="h-3 w-3 text-gray-500" />{" "}
                                    1:00 PM
                                </span>{" "}
                                (2.5 hr)
                            </span>
                        </span>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="flex flex-row items-center gap-6 p-4 text-gray-500">
                            <MapPinIcon className="h-5 w-5 text-gray-500" />
                            <span className="flex flex-col">
                                <strong className="text-black">1416 Berene Ave.</strong>
                                <span>Austin, TX 78721</span>
                            </span>
                        </div>
                        <a className="ml-14 h-full w-10/12" href={mapLink}>
                            <Map token={mapboxToken} />
                        </a>
                    </div>
                </div>
            </Card>

            <div className="flex flex-row gap-6">
                <button
                    className="flex w-full flex-row items-center justify-center gap-2 bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:rounded-md"
                    type="button"
                >
                    <PlusIcon className="h-6 w-6 text-indigo-500" />
                    Add to Calendar
                </button>
            </div>
        </div>
    )
}
