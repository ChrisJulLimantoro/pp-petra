import { Typography } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function TableRowHead ({ children, label, sort, direction = '', className = '' }) {
    return (
        <th
            className={"cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50 p-4 transition-colors hover:bg-blue-gray-50 " + className}
            onClick={sort.bind(this, label.toLowerCase(), (direction === '' ? 'asc' : direction === 'asc' ? 'desc' : 'asc'))}
        >
            <Typography 
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
                {label}
                {children}
                {direction === 'asc' &&
                    <ChevronUpIcon strokeWidth={2} className="h-4 w-4" />
                }
                {direction === 'desc' &&
                    <ChevronDownIcon strokeWidth={2} className="h-4 w-4" />
                }
                {direction === '' &&
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                }
            </Typography>
        </th>
    );
}