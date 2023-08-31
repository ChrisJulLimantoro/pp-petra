import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";

export function SearchInput({ className }) {
    return (
        <div className={"w-full md:w-72 " + className}>
            <Input
                label="Search"
                className="focus:ring-0"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
        </div>
    );
}
