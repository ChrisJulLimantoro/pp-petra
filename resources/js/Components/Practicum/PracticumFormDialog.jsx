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

function PracticumFormDialog(props, ref) {
    const [open, setOpen] = useState(false);
    const [roomCapacity, setRoomCapacity] = useState(0);
    const inputs = ["subject", "code", "room", "quota", "day", "time"];
    const submitButtonRef = useRef(null);
    const [inputsError, setinputsError] = useState({
        subject: false,
        code: false,
        room: false,
        quota: false,
        day: false,
        time: false,
    });
    const feedbackRefs = {};
    inputs.forEach((input) => {
        feedbackRefs[input] = useRef(null);
    });

    const handleRoomChange = function (roomId) {
        const room = props.rooms[roomId];
        setRoomCapacity(room.capacity);
    };

    const resetInputsError = () => {
        const inputStates = { ...inputsError };
        inputs.forEach((input) => {
            inputStates[input] = false;
        });
        setinputsError(inputStates);
    };

    const handleOpen = () => {
        resetInputsError();
        setRoomCapacity(0);
        setOpen((prev) => !prev);
    };

    useImperativeHandle(ref, () => ({
        handleOpen,
        handleRoomChange,
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
        feedbackRefs.quota.current.classList.add('hidden');
        feedbackRefs.quota.current.classList.remove('text-orange-400');

        submitButtonRef.current?.setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const selectInputs = ["subject", "room", "day", "time"];
        selectInputs.forEach((input) => {
            formData.append(
                input,
                document
                    .querySelector(`button[name="${input}"] > span`)
                    .getAttribute("value") || ""
            );
        });

        let res;
        try {
            if (Object.keys(props.formData).length > 0) {
                res = await axios.patch(
                    route("practicum.update", props.formData.id),
                    Object.fromEntries(formData)
                );
            } else {
                res = await axios.post(route("practicum.store"), formData);
            }
        } catch (e) {
            const inputErrors = e.response.data.errors;
            inputErrors.room = inputErrors.room_id;
            inputErrors.subject = inputErrors.subject_id;
            delete inputErrors.room_id;
            delete inputErrors.subject_id;
            delete inputErrors.name;

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
                        {Object.keys(props.formData).length > 0
                            ? "EDIT JADWAL PRAKTIKUM"
                            : "INPUT JADWAL PRAKTIKUM"}
                    </div>
                </DialogHeader>
                <DialogBody>
                    <form className="px-10" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-5 mb-3">
                            <label htmlFor="" className="col-span-2 my-2">
                                Mata Kuliah:
                            </label>
                            <div className="col-span-3">
                                <Select
                                    label="Mata Kuliah"
                                    name="subject"
                                    error={inputsError.subject}
                                    value={`${props.formData.subject_id}|${props.formData.subject_name}`}
                                    onChange={() => {}}
                                >
                                    {props.subjects.map(
                                        (subject) => {
                                            return (
                                                <Option
                                                    value={`${subject.id}|${subject.name}`}
                                                    key={`${subject.id}|${subject.name}`}
                                                >
                                                    {subject.name}
                                                </Option>
                                            );
                                        }
                                    )}
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
                        <div className="grid grid-cols-5 mb-3">
                            <label htmlFor="" className="col-span-2 my-2">
                                Kode:
                            </label>
                            <div className="col-span-3">
                                <Input
                                    label="Kode"
                                    name="code"
                                    autoComplete="off"
                                    error={inputsError.code}
                                    defaultValue={props.formData.code}
                                />
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="mt-2 flex items-center gap-1 font-normal mt-0 text-xs text-red-500 hidden"
                                    ref={feedbackRefs.code}
                                >
                                    a
                                </Typography>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 mb-3">
                            <label htmlFor="" className="col-span-2 my-2">
                                Nama Ruangan:
                            </label>
                            <div className="col-span-3">
                                <Select
                                    label="Nama Ruangan"
                                    onChange={handleRoomChange}
                                    name="room"
                                    error={inputsError.room}
                                    value={props.formData.room_id?.toString()}
                                >
                                    {Object.entries(props.rooms).map(
                                        ([id, room]) => (
                                            <Option value={id} key={id}>
                                                {room.name}
                                            </Option>
                                        )
                                    )}
                                </Select>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="mt-2 flex items-center gap-1 font-normal mt-0 text-xs text-red-500 hidden"
                                    ref={feedbackRefs.room}
                                >
                                    a
                                </Typography>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 mb-3">
                            <label htmlFor="" className="col-span-2 my-2">
                                Kuota:
                            </label>
                            <div className="col-span-3">
                                <div className="flex">
                                    <Input
                                        className={
                                            "rounded-r-none " +
                                            (inputsError.quota
                                                ? "!border-t-red-200 focus:!border-t-red-900"
                                                : "!border-t-blue-gray-200 focus:!border-t-gray-900")
                                        }
                                        labelProps={{
                                            className:
                                                "before:content after:content-none",
                                        }}
                                        containerProps={{
                                            className:
                                                "!min-w-[100px] w-1/2 !w-auto",
                                        }}
                                        name="quota"
                                        defaultValue={props.formData.quota}
                                        pattern="[0-9]{1,2}"
                                        autoComplete="off"
                                        error={inputsError.quota}
                                        onChange={(e) => {
                                            feedbackRefs.quota.current.classList.add('hidden');
                                            feedbackRefs.quota.current.classList.remove('text-orange-400');
                                            const newQuota = e.target.value;
                                            if (newQuota < props.formData.quota) {
                                                feedbackRefs.quota.current.classList.remove('hidden');
                                                feedbackRefs.quota.current.classList.add('text-orange-400');
                                                feedbackRefs.quota.current.innerHTML = "Bila kuota dikurangi, hasil praktikum mata kuliah ini akan digenerate ulang";
                                            }
                                        }}
                                    />
                                    <div className="rounded-l-none flex border-1 w-1/2 rounded-[7px] border border-blue-gray-200 bg-blue-gray-600/10 text-blue-gray-500 h-[40px]">
                                        <div className="m-auto">
                                            / {roomCapacity}
                                        </div>
                                    </div>
                                </div>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="mt-2 flex items-center gap-1 font-normal mt-0 text-xs text-red-500 hidden"
                                    ref={feedbackRefs.quota}
                                >
                                    a
                                </Typography>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 mb-3">
                            <label htmlFor="" className="col-span-2 my-2">
                                Hari:
                            </label>
                            <div className="col-span-3">
                                <Select
                                    label="Hari"
                                    name="day"
                                    error={inputsError.day}
                                    value={props.formData.day?.toString()}
                                    onChange={() => {}}
                                >
                                    <Option value="1">Senin</Option>
                                    <Option value="2">Selasa</Option>
                                    <Option value="3">Rabu</Option>
                                    <Option value="4">Kamis</Option>
                                    <Option value="5">Jumat</Option>
                                    <Option value="6">Sabtu</Option>
                                </Select>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="mt-2 flex items-center gap-1 font-normal mt-0 text-xs text-red-500 hidden"
                                    ref={feedbackRefs.day}
                                >
                                    a
                                </Typography>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 mb-3">
                            <label htmlFor="" className="col-span-2 my-2">
                                Jam Mulai:
                            </label>
                            <div className="col-span-3">
                                <Select
                                    label="Jam Mulai"
                                    name="time"
                                    error={inputsError.time}
                                    value={props.formData.time?.toString()}
                                    onChange={() => {}}
                                >
                                    <Option value="700">07.00</Option>
                                    <Option value="730">07.30</Option>
                                    <Option value="800">08.00</Option>
                                    <Option value="830">08.30</Option>
                                    <Option value="900">09.00</Option>
                                    <Option value="930">09.30</Option>
                                    <Option value="1000">10.00</Option>
                                    <Option value="1030">10.30</Option>
                                    <Option value="1100">11.00</Option>
                                    <Option value="1130">11.30</Option>
                                    <Option value="1200">12.00</Option>
                                    <Option value="1230">12.30</Option>
                                    <Option value="1300">13.00</Option>
                                    <Option value="1330">13.30</Option>
                                    <Option value="1400">14.00</Option>
                                    <Option value="1430">14.30</Option>
                                    <Option value="1500">15.00</Option>
                                    <Option value="1530">15.30</Option>
                                    <Option value="1600">16.00</Option>
                                    <Option value="1630">16.30</Option>
                                    <Option value="1700">17.00</Option>
                                    <Option value="1730">17.30</Option>
                                    <Option value="1800">18.00</Option>
                                    <Option value="1830">18.30</Option>

                                </Select>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="mt-2 flex items-center gap-1 font-normal mt-0 text-xs text-red-500 hidden"
                                    ref={feedbackRefs.time}
                                >
                                    a
                                </Typography>
                            </div>
                        </div>

                        <div className="flex justify-center gap-8 mt-8">
                            <Button
                                color="red"
                                onClick={() => handleOpen(null)}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <ButtonWithLoadingSpinner
                                type="submit"
                                className="bg-[#19304B] text-[#FFBC00] min-w-[100px]"
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

export default forwardRef(PracticumFormDialog);
