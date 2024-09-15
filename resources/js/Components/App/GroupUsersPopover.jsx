import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import UserAvatar from "./UserAvatar";

const GroupUsersPopover = ({ users = [] }) => {
    return (
        <Popover>
            <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
              <UserIcon className="w-4"/>
            </PopoverButton>
            <PopoverPanel
                transition
                anchor="bottom"
                className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
                <div className="p-3">
                    {users.map((user) => (
                        <Link
                            href={route("chat.user", user.id)}
                            key={user.id}
                            className="flex items-center gap-2 py-2 px-3 hover:bg-black/30"
                        >
                            <UserAvatar user={user} />
                            <div className="text-xs">{user.name}</div>
                        </Link>
                    ))}
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default GroupUsersPopover;
