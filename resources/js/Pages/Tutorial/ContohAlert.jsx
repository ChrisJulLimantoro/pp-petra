import NotificationAlert from "@/Components/NotificationAlert";
import { Head } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import { useRef } from "react";

export default function ContohAlert() {
    const alertRef = useRef();
    const handleClick = () => {
        alertRef.current?.show(
            "Hello World",
            "green", // optional default menggunakan defaultColor
            2000 // optional default menggunakan defaultShowTime 
        );
    };

    return (
        <>
            <div className="m-10">
                <Button className="bg-green-500" onClick={handleClick}>asd</Button>
            </div>
            <NotificationAlert 
                ref={alertRef}
                className="w-[20rem] fixed top-6 right-10 py-4"
                defaultColor="red" // optional default green
                defaultShowTime={4000} // optional default 1000 ms
            />
        </>
    );
}
