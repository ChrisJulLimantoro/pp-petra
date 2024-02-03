import { Head } from "@inertiajs/react";
import { Fragment, useEffect, useRef, useState } from "react";
import PrsFormDialog from "./PrsFormDialog";
import { PopoverPrsButton } from "./PopoverPrsButton";
import { Button, Typography } from "@material-tailwind/react";

export function PrsTable(props) {
    const dialogRef = useRef(null);
    const [formData, setFormData] = useState({});
    const header = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
    const getPrs = (data) => {
        return Object.values(data, header).map((index) => {
            if (index === null) {
                return (
                    <td className="px-2 text-center border-2 w-[200px] min-w-[150px] break-words"></td>
                );
            } else if (typeof index === "object") {
                return (
                    <td
                        className="p-0 text-center border-2 relative w-[200px] min-w-[150px] break-words bg-blue-gray-200"
                        rowSpan={index.duration}
                        key={index.code}
                    >
                        <PopoverPrsButton
                            PrsId={`${index.code}-${index.class}`}
                            studentId={props.studentId}
                        >
                            <div className="w-full h-full px-2 absolute inset-0 flex">
                                <div className="my-auto text-sm">
                                    {`${index.name} - ${index.class}`}
                                </div>
                            </div>
                        </PopoverPrsButton>
                    </td>
                );
            }
        });
    };
    const getRows = (prs) => {
        return Object.entries(prs).map((time) => {
            return (
                (
                    <tr key={time[0]}>
                        <td
                            className="px-2 border-2 min-w-[125px] w-[155px] break-words text-center"
                            style={{
                                fontFamily: "ui-monospace",
                                fontSize: "1.1rem",
                            }}
                            key={time[0]}
                        >
                            <Typography>
                                {time[0].padStart(4, "0").substring(0, 2)}.
                                {time[0].padStart(4, "0").substring(2, 4)} -{" "}
                                {(parseInt(time[0]) + 100)
                                    .toString()
                                    .padStart(4, "0")
                                    .substring(0, 2)}
                                .
                                {(parseInt(time[0]) + 100)
                                    .toString()
                                    .padStart(4, "0")
                                    .substring(2, 4)}
                            </Typography>
                        </td>
                        {getPrs(time[1], header)}
                    </tr>
                )
            );
        });
    };

    return (
        <>
            <div className="flex mb-8">
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
                <table>
                    <thead>
                        <tr className="bg-blue-gray-500">
                            <th className="px-2 border-2 min-w-[125px] w-[155px] break-words text-center bg-slate-400"></th>
                            {Object.entries(header).map((day) => {
                                return (
                                    <th className="px-2 border-2 min-w-[125px] w-[155px] break-words text-center bg-slate-400 text-white font-bold">
                                        <Typography>{day[1]}</Typography>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>{getRows(props.prs)}</tbody>
                </table>
            </div>
            <PrsFormDialog
                ref={dialogRef}
                formData={formData}
                schedules={props.schedules}
                studentId={props.studentId}
            />
        </>
    );
}
