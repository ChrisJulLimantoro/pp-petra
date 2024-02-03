import { Head } from "@inertiajs/react";
import PracticumFormDialog from "./PracticumFormDialog";
import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { PopoverActionButton } from "./PopoverActionButton";
import Swal from "sweetalert2";

export function PracticumTable(props) {
    const dialogRef = useRef(null);
    const [formData, setFormData] = useState({});
    const formDeleteAll = useRef(null);
    const openEditFormFactory = (practicum) => {
        return () => {
            const newFormData = {...practicum};
            delete newFormData.name;
            delete newFormData.duration;
            setFormData(newFormData);
            dialogRef.current?.handleOpen();
            dialogRef.current?.handleRoomChange(practicum.room_id);
        }
    }

    const deleteAllPracticum = async () => {
        const res = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (res.isConfirmed) formDeleteAll.current.submit();
    }

    const getPracticums = (rooms) => {
        return Object.values(rooms).map((practicum, index) => {
            if (practicum === null) {
                return (
                    <td
                        className="px-2 text-center border-2 w-[200px] min-w-[150px] break-words"
                        key={index}
                    ></td>
                );
            } else if (typeof practicum === "object") {
                return (
                    <td
                        className="p-0 text-center border-2 relative w-[200px] min-w-[150px] break-words"
                        rowSpan={practicum.duration * 2}
                        key={index}
                    >
                        <PopoverActionButton practicumId={practicum.id} openEditForm={openEditFormFactory(practicum)} >
                            <div className="w-full h-full px-2 absolute inset-0 flex">
                                <div className="my-auto">
                                    {`${practicum.name} (${practicum.code})`}
                                </div>
                            </div>
                        </PopoverActionButton>
                    </td>
                );
            }
        });
    };
    const getRooms = (times) => {
        return Object.keys(times[730]).map((room) => {
            return (
                <td className="text-center border-2" key={room}>
                    {room}
                </td>
            );
        });
    };
    const getRows = (day, times) => {
        return Object.entries(times).map(([time, rooms]) => {
            const start = `${time.padStart(4, '0').substring(0,2)}.${time.padStart(4, '0').substring(2,4)}`;
            const endTime = (time % 100 == 0) ? parseInt(time) + 30 : parseInt(time) + 70;
            const end = `${endTime.toString().padStart(4, '0').substring(0,2)}.${endTime.toString().padStart(4, '0').substring(2,4)}`
            return (
                <tr key={`${day},${time}`}>
                    <td
                        className="px-2 border-2 min-w-[112px] w-[120px] break-words"
                        style={{ fontFamily: "ui-monospace", fontSize: "1.1rem" }}
                        key={time}
                    >
                        {start} - {end}
                    </td>
                    {getPracticums(rooms)}
                </tr>
            );
        });
    };

    return (
        <>
            <form
                action={route("practicum.destroyAll")}
                ref={formDeleteAll}
                method="post"
            >
                <input
                    type="hidden"
                    name="_token"
                    value={
                        document.head.querySelector('meta[name="csrf-token"]')
                            .content
                    }
                />
            </form>
            <div className="flex justify-between px-3 mb-5">
                <Button
                    onClick={() => {
                        setFormData({});
                        dialogRef.current?.handleOpen();
                    }}
                    className="bg-[#19304B] text-[#FFBC00]"
                >
                    Tambah Kelas
                </Button>
                <Button className="bg-red-600 text-[#FFDD83] ms-6" onClick={deleteAllPracticum}>
                    Hapus Semua Kelas
                </Button>
            </div>
            <div className="overflow-x-auto pb-2">
                <table >
                    <tbody>
                        {Object.entries(props.practicumsTable).map(([day, times]) => {
                            return (
                                <Fragment key={day}>
                                    <tr key={day}>
                                        <td className="text-center border-2 font-bold">
                                            {day}
                                        </td>
                                        {getRooms(times)}
                                    </tr>
                                    {getRows(day, times)}
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <PracticumFormDialog
                ref={dialogRef}
                rooms={props.rooms}
                subjects={props.subjects}
                formData={formData}
            />
        </>
    );
}
