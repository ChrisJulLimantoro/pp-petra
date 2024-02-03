import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Option,
    Select,
    ThemeProvider,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ButtonWithLoadingSpinner from "../ButtonWithLoadingSpinner";
import Swal from "sweetalert2";

function PrsFormDialog(props, ref) {
    const [open, setOpen] = useState(false);
    const [classes, setClasses] = useState([]);
    const inputs = ["subject", "class"];
    const submitButtonRef = useRef(null);
    const [inputsError, setinputsError] = useState({
        subject: false,
        class: false,
    });
    const feedbackRefs = {};
    inputs.forEach((input) => {
        feedbackRefs[input] = useRef(null);
    });

    const resetInputsError = () => {
        const inputStates = { ...inputsError };
        inputs.forEach((input) => {
            inputStates[input] = false;
        });
        setinputsError(inputStates);
    };

    const handleOpen = () => {
        resetInputsError();
        setOpen((prev) => !prev);
    };

    useImperativeHandle(ref, () => ({
        handleOpen,
    }));

    const theme = {
        dialog: {
            styles: {
                base: {
                    backdrop: {
                        backgroundOpacity: "bg-opacity-70",
                        backdropFilter: "backdrop-blur-none",
                    },
                },
            },
        },
    };

    const handleSubmit = async (e) => {
        submitButtonRef.current?.setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const selectInputs = ["code", "class"];
        selectInputs.forEach((input) => {
            formData.append(
                input,
                document
                    .querySelector(`button[name="${input}"] > span`)
                    .getAttribute("value") || ""
            );
        });
        formData.append("student_id", props.studentId);
        let res;
        try {
            if (Object.keys(props.formData).length > 0) {
                res = await axios.patch(
                    route("addPRS", props.formData.id),
                    Object.fromEntries(formData)
                );
            } else {
                res = await axios.post(route("addPRS"), formData);
            }
        } catch (e) {
            const inputErrors = e.response.data.errors;
            inputErrors.subject = inputErrors.code;
            inputErrors.class = inputErrors.class;
            delete inputErrors.code;
            delete inputErrors.class;

            const inputStates = { ...inputsError };
            Object.entries(inputErrors).forEach(([input, errors]) => {
                if (errors == null || errors == undefined || errors.length == 0)
                    return;
                inputStates[input] = true;
                setinputsError(inputStates);
                feedbackRefs[input].current.classList.remove("hidden");
                feedbackRefs[input].current.innerHTML = errors[0];
            });
            return;
        } finally {
            submitButtonRef.current?.setLoading(false);
        }
        window.location.reload();
    };

    return (
        <ThemeProvider value={theme}>
            <Dialog
                open={open}
                size="sm"
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>
                    <div className="text-center mx-auto text-[#19304B]">
                        INPUT JADWAL PRS
                    </div>
                </DialogHeader>
                <DialogBody className="pt-0">
                    <form className="px-3 md:px-10" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:grid md:grid-cols-5 mb-2 md:mb-4 w-full">
                            <label htmlFor="" className="md:col-span-2 mb-2 md:mt-2">
                                Mata Kuliah:
                            </label>
                            <div className="md:col-span-3">
                                <Select
                                    label="Mata Kuliah"
                                    name="code"
                                    error={inputsError.subject}
                                    value={`${props.formData.subject_code}`}
                                    onChange={(e) => {
                                        const selectedValue = e;
                                        props.schedules.map((schedule) => {
                                            if (schedule.code == selectedValue)
                                                setClasses([
                                                    schedule.schedules,
                                                ]);
                                        });
                                    }}
                                >
                                    {props?.schedules?.map((schedule) => {
                                        return (
                                            <Option
                                                value={`${schedule.code}`}
                                                key={`${schedule.code}`}
                                            >
                                                {schedule.code} |{" "}
                                                {schedule.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="mt-2 flex items-center gap-1 font-normal mt-0 text-xs text-red-500 hidden"
                                    ref={feedbackRefs.subject}
                                >
                                    a
                                </Typography>
                            </div>
                        </div>
                        <div className="flex flex-col md:grid md:grid-cols-5 mb-2 md:mb-4">
                            <label htmlFor="" className="md:col-span-2 mb-2 md:mt-2">
                                Class
                            </label>
                            <div className="md:col-span-3">
                                <Select
                                    label="Class"
                                    name="class"
                                    error={inputsError.subject}
                                    value={`${props.formData.subject_code}|${props.formData.subject_name}`}
                                    onChange={() => {}}
                                >
                                    {classes.flatMap((cls) =>
                                        cls.map((c) => (
                                            <Option
                                                value={`${c.class}`}
                                                key={`${c.class}`}
                                            >
                                                {`${c.class} | ${c.day}, ${c.time}`}
                                            </Option>
                                        ))
                                    )}
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4    mt-8">
                            <Button
                                color="red"
                                onClick={() => handleOpen(null)}
                                className="w-full"
                            >
                                <span>Cancel</span>
                            </Button>
                            <ButtonWithLoadingSpinner
                                type="submit"
                                className="w-full bg-[#19304B] text-[#FFBC00] min-w-[100px]"
                                ref={submitButtonRef}
                            >
                                <span>
                                    {Object.keys(props.formData).length > 0
                                        ? "Edit"
                                        : "Tambah"}
                                </span>
                            </ButtonWithLoadingSpinner>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </ThemeProvider>
    );
}

export default forwardRef(PrsFormDialog);
