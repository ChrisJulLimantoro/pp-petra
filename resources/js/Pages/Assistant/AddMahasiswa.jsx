import { Head } from "@inertiajs/react";
import React from "react";
import SidebarUser from "@/Layouts/SidebarUser";
import AddTitle from "@/Components/Assistant/Title/AddTitle";
import InputNRP from "@/Components/Inputs/InputNRP";
import { Typography } from "@material-tailwind/react";
import TableNoButton from "@/Components/Assistant/Table/TableNoButton";
import LabelAddMhsTable from "@/Components/Assistant/Labels/LabelAddMhsTable";
import TableWithDeleteButton from "@/Components/Assistant/Table/TableWithDeleteButton";

export default function AddMahasiswa(props) {
    const { id, routes } = props;
    const [newStudents, setTableRows] = React.useState([]);
    const [nrp, setNrp] = React.useState("");

    const head_mhs_ajax = ["Nama", "NRP", "Jurusan"];
    const data_mhs_ajax = [
        {
            nama: "-",
            nrp: "-",
            jurusan: "-",
        },
    ];

    const head_mhs = ["Nama", "NRP", "Jurusan", "Action"];

    return (
        <>
            <Head>
                <title>SAOCP-Add Mahasiswa</title>
            </Head>

            <SidebarUser routes={routes}>
                <div className="mt-10 px-5 w-full md:w-5/6">
                    <div className="title">
                        <div className="judul">
                            <AddTitle
                                type="Mahasiswa"
                                matkul="Pemrograman Berorientasi Objek"
                                pararel="A"
                                hari="Senin"
                                jam_start="08.00"
                                jam_end="10.00"
                                ruangan="P.202"
                                practicum_id={id}
                            />
                        </div>
                        <div className="input-nrp">
                            <InputNRP
                                newStudents={newStudents}
                                nrp={nrp}
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
                            <TableNoButton
                                TABLE_HEAD={head_mhs_ajax}
                                TABLE_ROWS={data_mhs_ajax}
                            />
                            <br />
                        </div>

                        <div className="list-add mt-10">
                            <LabelAddMhsTable total={newStudents.length} />
                            <TableWithDeleteButton
                                TABLE_HEAD={head_mhs}
                                TABLE_ROWS={newStudents}
                                setTableRows={setTableRows}
                            />
                        </div>
                    </div>
                </div>
            </SidebarUser>
        </>
    );
}
