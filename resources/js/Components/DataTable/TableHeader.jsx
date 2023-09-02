import { Select, Option, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";

export default function TableHeader ({ title, description = '', actionBtn, perPage, searchData, changePerPage, children, className = '' }) {
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
            
            <div className={className}>
                {/* Title, Description, Action Buttons */}
                <div className="mb-5 px-5 py-3 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                        {title}
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                        {description}
                        </Typography>
                    </div>
                    {actionBtn}
                </div>

                {/* Search */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row px-4">
                    {children}
                    <div className="flex items-center justfiy-start gap-4">
                        <Select
                            value={perPage}
                            onChange = {(e) => changePerPage(e)}
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
                            onChange={(e) => searchData(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}