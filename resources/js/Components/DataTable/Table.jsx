import { CardBody } from "@material-tailwind/react";
import { Head } from "@inertiajs/react";

export default function Table ({ children, className = '' }) {
    return (
        <CardBody className="overflow-y-auto px-0 py-0 mt-6 tableBody max-h-80">
            <table className={"w-full min-w-max table-auto text-left " + className}>
                {children}
            </table>
        </CardBody>
    );
}