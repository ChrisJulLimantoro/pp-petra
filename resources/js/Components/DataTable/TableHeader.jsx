import { Select, Option, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { useContext } from "react";
import { DataTableContext } from "./DataTable";

export default function TableHeader ({ title, description = '', titleClass, children, className = '' }) {
    const context = useContext(DataTableContext);

    return (
        <>
            <Head>
                <style>
                {`
                    @media screen and (min-width:768px) {
                        div:has(> button.numItemSelect) {
                            min-width: 5rem !important;
                        }
                        .numItemSelect, .numItemSelect + label {
                            max-width: 5rem;
                        }
                    }
                    @media screen and (max-width:767px) {
                        div:has(> button.numItemSelect) {
                            min-width: 4rem !important;
                        }
                        .numItemSelect, .numItemSelect + label {
                            max-width: 4rem;
                        }
                    }
                `}
                </style>
            </Head>
            
            <div className={className}>
                {/* Title, Description, Action Buttons */}
                <div className="md:mb-2 px-5 py-3 flex items-center justify-between md:gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" className={titleClass}>
                            {title}
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            {description}
                        </Typography>
                    </div>
                    
                </div>

                {/* Search */}
                <div className="w-full flex flex-col items-start justify-between gap-4 md:flex-row px-4">
                    {children}

                    <div className="flex items-center justfiy-start gap-4">
                        <Select
                            value={context.perPage.toString()}
                            onChange = {(e) => context.changePerPage(e)}
                            className="relative z-99 numItemSelect"
                        >
                            <Option key="10" value="10">10</Option>
                            <Option key="25" value="25">25</Option>
                            <Option key="50" value="50">50</Option>
                            <Option key="100" value="100">100</Option>
                            <Option key="semua" value="All">All</Option>    
                        </Select>

                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            containerProps={{ className:'min-w-[100px] md:min-w-fit' }}
                            onChange={(e) => context.searchData(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}