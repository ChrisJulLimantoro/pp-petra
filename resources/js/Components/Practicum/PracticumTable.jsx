import { Head } from "@inertiajs/react";
import PracticumFormDialog from "./PracticumFormDialog";
import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { PopoverActionButton } from "./PopoverActionButton";

export function PracticumTable(props) {
    const dialogRef = useRef(null);
    const [formData, setFormData] = useState({});
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
                        rowSpan={practicum.duration}
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
            return (
                <tr key={`${day},${time}`}>
                    <td
                        className="px-2 border-2 min-w-[112px] w-[120px] break-words"
                        style={{ fontFamily: "ui-monospace", fontSize: "1.1rem" }}
                        key={time}
                    >
                        {time.padStart(4, '0').substring(0,2)}.{time.padStart(4, '0').substring(2,4)} - {(parseInt(time) + 100).toString().padStart(4, '0').substring(0,2)}.{(parseInt(time) + 100).toString().padStart(4, '0').substring(2,4)}
                    </td>
                    {getPracticums(rooms)}
                </tr>
            );
        });
    };

    return (
        <>
            <div className="px-3 mb-5">
                <Button
                    onClick={() => {
                        setFormData({});
                        dialogRef.current?.handleOpen();
                    }}
                    className="bg-[#19304B] text-[#FFBC00]"
                >
                    Tambah Kelas
                </Button>
            </div>
            <div className="overflow-x-auto pb-2">
                <table >
                    <tbody>
                        {Object.entries(props.practicums).map(([day, times]) => {
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


