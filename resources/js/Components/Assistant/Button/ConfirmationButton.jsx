import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ConfirmationButton(props) {
    const {
        children,
        variant = "gradient",
        type = "text",
        classname = "",
        size = "md",
        data,
        practicum_id,
        student_assistant_id,
        tipe,
        target_practicum_id,
        student_assistant_practicum_id,
    } = props;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    function handleSubmit(e) {
        e.preventDefault();
        handleOpen();
        const form = e.target;
        const formData = new FormData(form);

        axios.post("", formData).then((res) => {
            console.log(res);
            Swal.fire({
                title: res.data.message,
                icon: res.data.success == false ? "error" : "success",
                confirmButtonText: "Ok",
            }).then(() => {
                if (res.data.success){
                    // Navigate to another page
                    window.location.href = route("practicum.detail", practicum_id);
                }
            });
        });
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                variant={variant}
                className={classname}
                size={size}
            >
                {children}
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <form action="" method="post" onSubmit={handleSubmit}>
                    <input type="hidden" name="data" value={JSON.stringify(data)} />
                    <input
                        type="hidden"
                        name="practicum_id"
                        value={practicum_id}
                    />
                    <input
                        type="hidden"
                        name="target_practicum_id"
                        value={target_practicum_id}
                    />
                    <input type="hidden" name="tipe" value={tipe} />
                    <input
                        type="hidden"
                        name="student_assistant_id"
                        value={student_assistant_id}
                    />
                    <input
                        type="hidden"
                        name=" student_assistant_practicum_id"
                        value={student_assistant_practicum_id}
                    />
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
                        <Button
                            variant="gradient"
                            color="green"
                            onClick={handleOpen}
                            type="submit"
                        >
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}
