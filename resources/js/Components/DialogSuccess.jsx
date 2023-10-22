import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import {
    dataLowongan,
    dataAjar,
    updateDataAjar,
    updateDataLowongan,
} from "@/Pages/Asisten/arr";

export default function DialogSuccess(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleOpen2 = () => {
        setOpen(!open);
        const taken = dataLowongan[props.id];

        const updatedLowongan = dataLowongan.filter(
            (item, index) => index !== props.id
        );

        const updatedAjar = [...dataAjar, taken];

        updateDataLowongan(updatedLowongan);
        updateDataAjar(updatedAjar);

        console.log(updatedLowongan);
        console.log(updatedAjar);
    };

    return (
        <>
            <Button color="green" onClick={handleOpen2} variant="gradient">
                {props.title}
                {props.id}
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader className="flex justify-center">
                    <img
                        src="\pp-petra\public\assets\checkmark.gif"
                        className="w-40"
                        alt="checkmark"
                    ></img>
                </DialogHeader>
                <DialogBody className="flex justify-center font-sans font-bold text-lg">
                    {props.dialog} ANDA SUDAH BERHASIL
                </DialogBody>
                <DialogFooter className="flex justify-center">
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleOpen}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
