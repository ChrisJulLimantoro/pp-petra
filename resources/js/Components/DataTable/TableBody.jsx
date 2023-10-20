import { CardBody } from "@material-tailwind/react";
import { useContext } from "react";
import { DataTableContext } from "./DataTable";

export const Head = ({children, className = ''}) => {
    const context = useContext(DataTableContext);

    return (
        <thead className={"sticky top-0 z-10 " + className}>
            <tr>
                {children ? children : context.columns?.map(context.renderHead)}
            </tr>
        </thead>
    )
}

export const Content = ({children, className = ''}) => {
    const context = useContext(DataTableContext);

    return (
        <tbody className={"relative " + className}>
            {children ? children : context.paginatedData?.map((e, value) => context.renderBody(e, value))}
        </tbody>
    )
}

export const TableBody = ({ children, className = '' })  => {
    return (
        <CardBody className="flex overflow-y-auto px-0 py-0 mt-6 tableBody max-h-80">
            <table className={"w-full min-w-max table-auto text-left " + className}>
                {children}
            </table>
        </CardBody>
    );
}

TableBody.Head = Head;
TableBody.Content = Content;

export default TableBody;