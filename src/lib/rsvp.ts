import { Response, User } from "@prisma/client/edge"

export namespace Rsvp {
    export interface Option {
        response: Response
        icon: string
    }

    export const OPTIONS: Rsvp.Option[] = [
        { response: Response.YES, icon: "CheckIcon" },
        { response: Response.MAYBE, icon: "QuestionMarkCircleIcon" },
        { response: Response.NO, icon: "XMarkIcon" },
    ]

    export interface Props {
        user: User | null
        actionData?: any
    }

    export interface ButtonProps {
        option: Option
    }
}
