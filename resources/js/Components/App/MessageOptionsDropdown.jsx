import { useEventBus } from "@/EventBus";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/16/solid";
import axios from "axios";

const MessageOptionsDropdown = ({ message }) => {
    const { emit } = useEventBus();

    const onMessageDelete = () => {
        console.log("delete message");
        axios
            .delete(route("message.destroy", message.id))
            .then((res) => {
                emit("message.deleted", message);
                console.log("Message Deleted", res.data);
            })
            .catch((err) => {
                console.error("MessageOptionsDropdown", err);
            });
    };

    return (
        <div className="absolute right-full text-gray-100 top-1/2 -translate-y-1/2 z-20">
            <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    Options
                    <ChevronDownIcon className="size-4 fill-white/60" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <MenuItem>
                        <button  onClick={onMessageDelete} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <TrashIcon className="size-4 fill-white/30" />
                            Delete
                            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                ⌘D
                            </kbd>
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
};

export default MessageOptionsDropdown;
