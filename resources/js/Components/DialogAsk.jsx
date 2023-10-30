import React, { useContext, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import DialogDelete from "./DialogDelete";
import { viewKelasContext } from "@/Pages/Asisten/viewKelas";

export default function DialogAsk(props) {
    const [askDialogOpen, setAskDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const pageData = useContext(viewKelasContext);

    const handleAskDialogOpen = () => {
        setAskDialogOpen(true);
    };

    const handleAskDialogClose = () => {
        setAskDialogOpen(false);
    };

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
        setAskDialogOpen(false);
        const taken = pageData.ajar[props.id];
        taken.jumlah_asisten += 1;
        const updatedAjar = pageData.ajar.filter(
            (item, index) => index !== props.id
        );

        const updatedLowongan = [...pageData.lowongan, taken];

        props.updateDataAjar(updatedAjar);
        props.updateDataLowongan(updatedLowongan);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <Button
                color="red"
                onClick={handleAskDialogOpen}
                variant="gradient"
            >
                {props.title}
            </Button>

            <Dialog open={askDialogOpen} handler={handleAskDialogClose}>
                <DialogHeader className="flex justify-center">
                    <img
                        src="\pp-petra\public\assets\alarm.gif"
                        className="w-40"
                        alt="Dialog Header"
                    />
                </DialogHeader>
                <DialogBody className="flex justify-center font-sans font-bold text-lg">
                    APAKAH ANDA INGIN MEMBATALKAN {props.dialog}?
                </DialogBody>
                <DialogFooter className="flex justify-center">
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleDeleteDialogOpen}
                    >
                        <span>Confirm</span>
                    </Button>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleAskDialogClose}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <DialogDelete
                isOpen={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                dialog={props.dialog}
            />
        </>
    );
}
