import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

const UserPicker = ({ value, options, onSelect }) => {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState();

    const filteredPeople =
        query === ""
            ? options
            : options.filter((person) => {
                  return person.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""));
              });

    const onSelected = (persons) => {
        setSelected(persons);
        onSelect(persons);
    };
    return (
        <>
            <Combobox
                value={selected}
                onChange={onSelected}
                onClose={() => setQuery("")}
                multiple
            >
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <ComboboxInput
                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full"
                        placeholder="Select Users.."
                        displayValue={(persons) => persons.length ? `${persons.length} users selected` : ""}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                    </ComboboxButton>
                    </div>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        "w-[var(--input-width)] rounded-xl border border-white/5 bg-gray-700 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                        "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                    )}
                >
                    {filteredPeople.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                            Nothing Found
                        </div>
                    ) : (
                        filteredPeople.map((person) => (
                            <ComboboxOption
                                key={person.id}
                                value={person}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                            >
                                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                <div className="text-sm/6 text-white">
                                    {person.name}
                                </div>
                            </ComboboxOption>
                        ))
                    )}
                    
                </ComboboxOptions>
            </Combobox>

            {selected && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {selected.map((person)=>(
                        <div
                            key={person.id}
                            className="badge badge-primary gap-2"
                        >
                            {person.name}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default UserPicker;
