import { RadioGroup } from '@headlessui/react';
import { CheckIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { User } from '@prisma/client/edge';
import { Response as UserResponse } from '@prisma/client/edge';
import { FormEvent, Fragment, useEffect, useMemo, useState } from 'react';
import { Form } from './Form';
import { PlusOneButtons } from './PlusOneButtons';
import { RsvpButton } from './RsvpButton';
import { For } from './control-flow/For';
import { Show } from './control-flow/Show';

type InputEvent = FormEvent<HTMLInputElement>;
type TextAreaEvent = FormEvent<HTMLTextAreaElement>;

export function Rsvp({ user: initialUser }: Rsvp.Props) {
    let [user, setUser] = useState(initialUser ?? undefined);

    let [navigation, setNavigation] = useState<Form.NavigationState>('idle');

    let [selectedResponse, setSelectedResponse] = useState(user?.response);

    let [name, _setName] = useState(user?.name);
    let [plusOne, setPlusOne] = useState(user?.plusOne);
    let [dietaryRestrictions, _setDietaryRestrictions] = useState(user?.dietaryRestrictions);

    const setName = ($event: InputEvent) => _setName($event.currentTarget.value);
    const setDietaryRestrictions = ($event: TextAreaEvent) =>
        _setDietaryRestrictions($event.currentTarget.value);

    useEffect(() => {
        setSelectedResponse(user?.response ?? undefined);
        _setName(user?.name);
        setPlusOne(user?.plusOne);
        _setDietaryRestrictions(user?.dietaryRestrictions);
    }, [user]);

    let isDirty = useMemo(() => {
        let responseChanged = selectedResponse !== user?.response;
        let nameChanged = name !== user?.name;
        let plusOneChanged = selectedResponse === UserResponse.YES && plusOne !== user?.plusOne;
        let dietChanged =
            selectedResponse === UserResponse.YES &&
            dietaryRestrictions !== user?.dietaryRestrictions;
        return responseChanged || nameChanged || plusOneChanged || dietChanged;
    }, [selectedResponse, name, plusOne, dietaryRestrictions, user]);

    let isYes = useMemo(() => selectedResponse === UserResponse.YES, [selectedResponse]);
    let isSelected = useMemo(() => !!selectedResponse, [selectedResponse]);

    let title = useMemo(() => {
        switch (selectedResponse) {
            case UserResponse.YES:
                return 'Hooray! 🥳';
            case UserResponse.MAYBE:
                return 'No worries 🤠';
            case UserResponse.NO:
                return "We'll miss you! 🙁";
        }
    }, [selectedResponse]);

    let description = useMemo(() => {
        switch (selectedResponse) {
            case UserResponse.YES:
                return "I just need some info and then you'll be confirmed!";
            case UserResponse.MAYBE:
                return 'When you know for sure, you can come back and update your response.';
            case UserResponse.NO:
                return "Maybe we'll see you next time.";
        }
    }, [selectedResponse]);

    let buttonTitle = useMemo(() => {
        let isIdle = navigation === 'idle';
        let hasResponed = !!user?.response;
        if (isIdle) {
            return `${hasResponed ? 'Update' : 'Submit'} Response`;
        } else {
            return hasResponed ? 'Updating...' : 'Submitting...';
        }
    }, [navigation, user]);

    return (
        <Fragment>
            <RadioGroup
                className="flex w-full flex-col items-center justify-center px-4 py-5 sm:flex-row sm:justify-between sm:px-6"
                onChange={setSelectedResponse}
                value={selectedResponse}
            >
                <RadioGroup.Label className="mb-6 cursor-text text-base font-semibold leading-6 text-gray-900 dark:text-gray-50 sm:mb-0">
                    Can you make it?
                </RadioGroup.Label>

                <div className="grid w-full grid-cols-1 items-center gap-y-6 sm:w-auto sm:grid-cols-3 sm:gap-x-4">
                    <For each={Rsvp.OPTIONS}>
                        {option => <RsvpButton option={option} key={option.response} />}
                    </For>
                </div>
            </RadioGroup>

            <Show when={isSelected}>
                <hr className="border-t border-black/10 dark:border-white/5" />

                <div className="py-6">
                    <h3 className="px-6 text-base font-semibold leading-6 text-gray-900 dark:text-gray-50">
                        {title}
                    </h3>
                    <div className="mt-2 max-w-xl px-6 text-sm text-gray-500">
                        <p>{description}</p>
                    </div>

                    <Form
                        className="mt-5 flex w-full flex-col items-end"
                        action="/response"
                        method="POST"
                        onState={$event => setNavigation($event)}
                        onResponseData={$event => setUser($event)}
                    >
                        <input
                            id="short-code"
                            name="short-code"
                            type="hidden"
                            value={user?.shortCode}
                        />

                        <input
                            id="response"
                            name="response"
                            type="hidden"
                            value={selectedResponse ?? ''}
                        />

                        <div className="flex w-full flex-col divide-y divide-black/10 px-6 dark:divide-white/5">
                            <div className="grid grid-rows-2 items-center border-t border-black/10 py-6 dark:border-white/5 sm:grid-cols-2 sm:grid-rows-none">
                                <label
                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    className="block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-900 shadow-inner ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black dark:text-gray-50 dark:ring-gray-900 dark:focus:bg-black sm:text-sm sm:leading-6"
                                    id="name"
                                    value={name}
                                    onInput={$event => setName($event)}
                                    name="name"
                                    placeholder="Jane Doe"
                                    type="text"
                                />
                            </div>

                            <Show when={isYes}>
                                <RadioGroup
                                    className="grid auto-rows-min pb-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:py-6"
                                    value={plusOne}
                                    onChange={setPlusOne}
                                    name="plus-one"
                                >
                                    <div className="flex flex-col justify-center gap-2 py-4 sm:gap-0 sm:py-0">
                                        <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
                                            Will you be bringing a plus-one?
                                        </RadioGroup.Label>

                                        <RadioGroup.Label
                                            className="text-sm text-gray-500"
                                            htmlFor="plus-one-description"
                                        >
                                            A guest who will not be responding seprately
                                        </RadioGroup.Label>
                                    </div>

                                    <PlusOneButtons />
                                </RadioGroup>

                                <div className="grid auto-rows-min gap-4 py-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:pb-6">
                                    <div className="flex flex-col justify-center gap-2 sm:gap-0">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                                            htmlFor="dietary-restrictions"
                                        >
                                            Do you <Show when={!!plusOne}> or your plus-one </Show>
                                            have any dietary restrictions?
                                        </label>

                                        <p
                                            className="text-sm text-gray-500"
                                            id="dietary-restrictions-description"
                                        >
                                            Leave blank if not applicable
                                        </p>
                                    </div>

                                    <textarea
                                        className="block w-full max-w-2xl rounded-md border-0 bg-gray-50 text-gray-900 shadow-inner ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black dark:text-gray-50 dark:ring-gray-900 dark:placeholder:text-gray-500 dark:focus:bg-black sm:py-1.5 sm:text-sm sm:leading-6"
                                        id="dietary-restrictions"
                                        value={dietaryRestrictions}
                                        onInput={setDietaryRestrictions}
                                        name="dietary-restrictions"
                                        placeholder="e.g. wheat, peanuts, dairy, shrimp, soy, etc."
                                        rows={2}
                                    ></textarea>
                                </div>
                            </Show>
                        </div>

                        <hr className="w-full border-t border-black/10 dark:border-white/5" />

                        <div className="flex items-center justify-end gap-x-6 px-6 pb-2 pt-6">
                            <button
                                className="flex flex-row items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 enabled:bg-indigo-600 enabled:text-white enabled:shadow-sm enabled:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 dark:enabled:bg-indigo-700 dark:enabled:hover:bg-indigo-600 dark:disabled:bg-gray-800 dark:disabled:text-slate-500"
                                disabled={!isDirty || navigation !== 'idle'}
                                type="submit"
                            >
                                <Show when={navigation !== 'idle'} v-if="">
                                    <div role="status">
                                        <svg
                                            className="mr-2 h-4 w-4 animate-spin fill-gray-500 text-gray-400"
                                            aria-hidden="true"
                                            fill="none"
                                            viewBox="0 0 100 101"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </Show>
                                {buttonTitle}
                            </button>
                        </div>
                    </Form>
                </div>
            </Show>
        </Fragment>
    );
}

export namespace Rsvp {
    export interface Props {
        user: User | null;
    }

    export const OPTIONS: RsvpButton.Option[] = [
        { response: UserResponse.YES, icon: CheckIcon },
        { response: UserResponse.MAYBE, icon: QuestionMarkCircleIcon },
        { response: UserResponse.NO, icon: XMarkIcon },
    ];
}
