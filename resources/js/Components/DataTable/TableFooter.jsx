import { CardFooter, Typography, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { DataTableContext } from "./DataTable";
import { useContext } from "react";

export default function TableFooter ({ children, className = '' }) {
    const context = useContext(DataTableContext)
    
    return (
        <CardFooter 
            className={"flex flex-col md:flex-row items-center justify-between border-t border-blue-gray-50 p-4 gap-3" + className}
        >
            {children}
            
            <div className="flex items-center">
                {
                    "Showing " + ((context.currentPage-1) * context.perPage + 1) + " to " + 
                    (
                        context.currentPage * context.perPage > context.filteredData.length ? 
                        context.filteredData.length : 
                        context.currentPage * context.perPage
                    ) + 
                    " of " + 
                    context.filteredData.length + " entries"
                } 
            </div>
            <div className="flex items-center gap-8">
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={context.prevPage}
                    disabled={context.currentPage === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{context.currentPage}</strong> of{" "}
                    <strong className="text-gray-900">{context.totalPages}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={context.nextPage}
                    disabled={context.currentPage === context.totalPages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </CardFooter>
    );
}