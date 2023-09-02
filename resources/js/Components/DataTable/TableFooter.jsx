import { CardFooter, Typography, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function TableFooter ({ children, currentPage, perPage, totalPages, totalData, prev, next, className = '' }) {
    return (
        <CardFooter className={"flex items-center justify-between border-t border-blue-gray-50 p-4 " + className}>
                <div className="flex items-center">
                    Showing {(currentPage-1) * perPage + 1} to {currentPage * perPage > totalData ? totalData : currentPage * perPage} of {totalData} entries
                </div>
                <div className="flex items-center gap-8">
                    <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={prev}
                        disabled={currentPage === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                    <Typography color="gray" className="font-normal">
                        Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
                        <strong className="text-gray-900">{totalPages}</strong>
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={next}
                        disabled={currentPage === totalPages}
                    >
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                </div>
                {children}
        </CardFooter>
    );
}