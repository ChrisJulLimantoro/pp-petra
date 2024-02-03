import { Head } from "@inertiajs/react";
import React from "react";
import SidebarUser from "@/Layouts/SidebarUser";
import AddTitle from "@/Components/Assistant/Title/AddTitle";
import InputNRP from "@/Components/Inputs/InputNRP";
import { Typography } from "@material-tailwind/react";
import TableNoButton from "@/Components/Assistant/Table/TableNoButton";
import LabelAddMhsTable from "@/Components/Assistant/Labels/LabelAddMhsTable";
import TableAjaxMahasiswa from "@/Components/Assistant/Table/TableAjaxMahasiswa";
import TableWithDeleteButton from "@/Components/Assistant/Table/TableWithDeleteButton";

export default function AddMahasiswa(props) {
    const { id, routes, data } = props;
    const [newStudents, setNewStudents] = React.useState([]);
    const [nrp, setNrp] = React.useState("");
    const [newStud, setNewStud] = React.useState("");

    const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];


    function formatTime(time) {
        time = String(time);
        if (
            typeof time === "string" &&
            (time.length === 3 || time.length === 4)
        ) {
            let hours, minutes;

            if (time.length === 3) {
                // For "730" format
                hours = time.slice(0, 1);
                minutes = time.slice(1);
            } else if (time.length === 4) {
                // For "1630" format
                hours = time.slice(0, 2);
                minutes = time.slice(2);
            }

            return `${hours.padStart(2, "0")}:${minutes}`;
        } else {
            return "Invalid time format";
        }
    }


    const head_mhs = ["Nama", "NRP", "Jurusan", "Action"];

    return (
        <>
            <Head>
                <title>SAOCP-Add Mahasiswa</title>
            </Head>

            <SidebarUser routes={routes}>
                <div className="mt-10 lg:mt-0 md:px-5 w-full md:w-5/6">
                    <div className="title">
                        <div className="judul">
                            <AddTitle
                                type="Mahasiswa"
                                matkul={data.name}
                                pararel={data.code}
                                hari={hari[data.day - 1]}
                                jam_start={formatTime(data.time)}
                                jam_end={formatTime(
                                    data.time + data.subject.duration * 100
                                )}
                                ruangan={data.room.name}
                                practicum_id={id}
                            />
                        </div>
                        <div className="input-nrp">
                            <InputNRP
                                newStud={newStud}
                                setNewStud={setNewStud}
                                newStudents={newStudents}
                                setNewStudents={setNewStudents}
                                nrp={nrp}
                                id = {id}
                                setNrp={setNrp}
                            />
                        </div>

                        <div className="table-ajax">
                            <Typography
                                variant="h5"
                                color="blue-gray"
                                className="mt-10 mb-4"
                            >
                                Detail Mahasiswa
                            </Typography>
                            <TableAjaxMahasiswa
                                TABLE_ROWS={newStud}
                            />
                            <br />
                        </div>

                        <div className="list-add mt-10">
                            <LabelAddMhsTable total={newStudents.length} data={newStudents} practicum_id={id} />
                            <TableWithDeleteButton
                                TABLE_HEAD={head_mhs}
                                TABLE_ROWS={newStudents}
                                setNewStudents={setNewStudents}
                            />
                        </div>
                    </div>
                </div>
            </SidebarUser>
        </>
    );
}
