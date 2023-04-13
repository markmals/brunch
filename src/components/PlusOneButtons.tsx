import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { classList } from '../lib/classList';
import { For } from './control-flow/For';

export function PlusOneButtons() {
    return (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <For each={[true, false]}>
                {plusOne => (
                    <RadioGroup.Option key={plusOne ? 1 : 0} value={plusOne}>
                        {({ checked }) => (
                            <div
                                className={classList(
                                    checked
                                        ? 'border-transparent'
                                        : 'border-gray-300 dark:border-gray-900',
                                    'relative flex cursor-pointer rounded-lg border bg-white p-3 shadow-sm focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-900'
                                )}
                            >
                                <span className="flex flex-1">
                                    <span className="flex flex-col">
                                        <RadioGroup.Label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {plusOne ? 'Yes' : 'No'}
                                        </RadioGroup.Label>
                                    </span>
                                </span>
                                <CheckCircleIcon
                                    className={classList(
                                        !checked ? 'invisible' : '',
                                        'h-5 w-5 text-indigo-600 dark:text-indigo-700'
                                    )}
                                    aria-hidden="true"
                                />
                                <span
                                    className={classList(
                                        checked
                                            ? 'border-indigo-600 dark:border-indigo-700'
                                            : 'border-transparent',
                                        'pointer-events-none absolute -inset-px rounded-lg border-2'
                                    )}
                                    aria-hidden="true"
                                />
                            </div>
                        )}
                    </RadioGroup.Option>
                )}
            </For>
        </div>
    );
}
