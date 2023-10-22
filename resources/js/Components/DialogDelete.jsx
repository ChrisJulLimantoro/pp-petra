import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export default function DialogDelete(props) {
    const { isOpen, onClose, dialog } = props;

    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader className="flex justify-center">
                <img
                    src="\pp-petra\public\assets\x.gif"
                    className="w-40"
                    alt="Dialog Header"
                />
            </DialogHeader>
            <DialogBody className="flex justify-center font-sans font-bold text-lg">
                {dialog} BERHASIL DIHAPUS
            </DialogBody>
            <DialogFooter className="flex justify-center">
                <Button variant="gradient" color="green" onClick={onClose}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
