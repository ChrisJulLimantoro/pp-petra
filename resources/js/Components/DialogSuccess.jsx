import React, { useContext, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { viewKelasContext } from "@/Pages/Asisten/viewKelas";

export default function DialogSuccess(props) {
    const [open, setOpen] = useState(false);
    const pageData = useContext(viewKelasContext);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleOpen2 = () => {
        setOpen(!open);
        console.log(props.id)
        const taken = pageData.lowongan.find((item) => item.practicum_id === props.id);

        console.log(taken)

        axios.post(route('asisten.ajarPracticum'), {
            'practicum_id' : taken.practicum_id,
        })
        .then((response) => {
            if (response.data.success) {
                taken.jumlah_asisten += 1;
                taken.id = response.data.data.id;
                const updatedLowongan = pageData.lowongan.filter(
                    (item, index) => item.practicum_id !== props.id
                );

                const updatedAjar = [...pageData.ajar, taken];

                props.updateDataAjar(updatedAjar);
                props.updateDataLowongan(updatedLowongan);
            }
        })
        .catch((err) => {
            console.log(err);
            // showAlert("Something went wrong!", "red");
        });
    };

    return (
        <>
            <Button color="green" onClick={handleOpen2} variant="gradient">
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
