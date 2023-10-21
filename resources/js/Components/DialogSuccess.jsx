import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
 
export default function DialogSuccess(props) {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button color="green" onClick={handleOpen} variant="gradient">
                {props.title}
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