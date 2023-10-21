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

    const getPracticums = (subjects) => {
        return Object.values(subjects).map((practicum, index) => {
            if (practicum === null) {
                return (
                    <td
                        className="px-2 text-center border-2"
                        style={{ width: "200px", wordWrap: "break-word" }}
                        key={index}
                    ></td>
                );
            } else if (typeof practicum === "object") {
                return (
                    <td
                        className="p-0 text-center border-2 relative"
                        style={{ width: "200px", wordWrap: "break-word" }}
                        rowSpan={practicum.duration}
                        key={index}
                    >
                        <PopoverActionButton practicumId={practicum.id} openEditForm={openEditFormFactory(practicum)} >
                            <div className="w-full h-full px-2 absolute inset-0 flex">
                                <div className="my-auto">
                                    {practicum.name}
                                </div>
                            </div>
                        </PopoverActionButton>
                    </td>
                );
            }
        });
    };
    const getSubjects = (times) => {
        return Object.keys(times[730]).map((subject) => {
            return (
                <td className="text-center border-2" key={subject}>
                    {subject}
                </td>
            );
        });
    };
    const getBodyRows = (day, times) => {
        return Object.entries(times).map(([time, subjects]) => {
            return (
                <tr key={`${day},${time}`}>
                    <td
                        className="px-2 border-2"
                        style={{ width: "140px", wordWrap: "break-word", fontFamily: "ui-monospace", fontSize: "1.1rem" }}
                        key={time}
                    >
                        {time.padStart(4, '0').substring(0,2)}.{time.padStart(4, '0').substring(2,4)} - {(parseInt(time) + 100).toString().padStart(4, '0').substring(0,2)}.{(parseInt(time) + 100).toString().padStart(4, '0').substring(2,4)}
                    </td>
                    {getPracticums(subjects)}
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
            <table>
                <tbody>
                    {Object.entries(props.data).map(([day, times]) => {
                        return (
                            <Fragment key={day}>
                                <tr key={day}>
                                    <td className="text-center border-2 font-bold">
                                        {day}
                                    </td>
                                    {getSubjects(times)}
                                </tr>
                                {getBodyRows(day, times)}
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
            <PracticumFormDialog
                ref={dialogRef}
                rooms={props.rooms}
                subjects={props.subjects}
                formData={formData}
            />
        </>
    );
}


