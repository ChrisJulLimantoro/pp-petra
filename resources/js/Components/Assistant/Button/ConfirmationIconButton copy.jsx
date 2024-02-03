import React from "react";
import {
    Button,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";

export default function ConfirmationIconButton(props) {
    const {
        children,
        variant = "gradient",
        assistant_id,
        slot_used,
        total_slot,
        practicum_id,
        nrp,
        type,
        student_assistant_practicum_id,
    } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const datas = [];

        for (let [key, value] of formData.entries()) {
            const data = {
                key: key,
                value : value
            };
            datas.push(data);
        }

        axios.post("", datas).then((res) => {
        });

    }

    return (
        <>
            <IconButton onClick={handleOpen} variant={variant}>
                {children}
            </IconButton>

            <Dialog open={open} handler={handleOpen}>
                <form action="" method="post" onSubmit={handleSubmit}>
                    <input type="hidden" name="type" value={type} />
                    <input
                        type="hidden"
                        name="student_assistant_practicum_id"
                        value={student_assistant_practicum_id}
                    />
                    <input type="hidden" name="practicum_id" value={practicum_id}/>
                    <input type="hidden"name="assistant_id" value={assistant_id} />
                    <input type="hidden" name="slot_used" value={slot_used} />
                    <input type="hidden" name="total_slot" value={total_slot} />
                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')}/>
                    <DialogHeader className="ms-3">Are you sure?</DialogHeader>
                    <DialogBody className="ms-3">
                        You cannot revert this action
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" type="submit">
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}
