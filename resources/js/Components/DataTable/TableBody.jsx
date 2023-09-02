import { Select, Option, Input } from "@material-tailwind/react";
import { Head } from "@inertiajs/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function TableBody ({ children, className = '' }) {
    return (
        <>
            <Head>
                <style>
                {`
                    div:has(> button.numItemSelect) {
                        min-width: 5rem !important;
                    }
                    .numItemSelect, .numItemSelect + label {
                        max-width: 5rem;
                    }
                `}
                </style>
            </Head>
            <div className={"flex flex-col items-center justify-between gap-4 md:flex-row px-4" + className}>
                {children}
            </div>
        </>
    );
}