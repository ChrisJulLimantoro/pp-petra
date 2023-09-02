import { CardBody } from "@material-tailwind/react";

export default function TableBody ({ children, className = '' }) {
    return (
        <CardBody className="flex overflow-y-auto px-0 py-0 mt-6 tableBody max-h-80">
            <table className={"w-full min-w-max table-auto text-left " + className}>
                {children}
            </table>
        </CardBody>
    );
}