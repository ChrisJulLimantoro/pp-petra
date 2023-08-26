import ApplicationLogo from "@/Components/ApplicationLogo";
import Alert from "@/Components/Alert";
import { Link } from "@inertiajs/react";

export default function Guest({ status, children, home }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-2 bg-gray-100">
            <div id="logo">
                <Link href={home}>
                    <ApplicationLogo className="fill-current text-gray-500" />
                </Link>
            </div>
            {status && <Alert bool={status == null} message={status} />}
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
