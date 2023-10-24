import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import AddTitle from "@/Components/Assistant/Title/AddTitle";
import InputNRP from "@/Components/Inputs/InputNRP";
import { Typography } from "@material-tailwind/react";
import TableNoButton from "@/Components/Assistant/Table/TableNoButton";
import LabelAddMhsTable from "@/Components/Assistant/Labels/LabelAddMhsTable";
import TableWithDeleteButton from "@/Components/Assistant/Table/TableWithDeleteButton";

export default function AddMahasiswa(props) {
    const { id } = props;
    const head_mhs_ajax = ["Nama", "NRP", "Jurusan"];
    const data_mhs_ajax = [
        {
            nama: "-",
            nrp: "-",
            jurusan: "-",
        },
    ];

    const head_mhs = ["Nama", "NRP", "Jurusan", "Action"];
    const data_mhs = [
        {
            nama: "Mia Amalia",
            nrp: "234567890",
            jurusan: "Informatika",
        },
        {
            nama: "Reza Irawan",
            nrp: "345678901",
            jurusan: "Data Science",
        },
        {
            nama: "Amelia Putri",
            nrp: "456789012",
            jurusan: "Sistem Informasi Bisnis",
        },
        {
            nama: "Dimas Pratama",
            nrp: "567890123",
            jurusan: "Informatika",
        },
        {
            nama: "Rini Wulandari",
            nrp: "678901234",
            jurusan: "Data Science",
        },
        {
            nama: "Fajar Ramadhan",
            nrp: "789012345",
            jurusan: "Sistem Informasi Bisnis",
        },
        {
            nama: "Aditya Pratama",
            nrp: "890123456",
            jurusan: "Informatika",
        },
        {
            nama: "Dewi Lestari",
            nrp: "901234567",
            jurusan: "Data Science",
        },
        {
            nama: "Rangga Permadi",
            nrp: "012345678",
            jurusan: "Sistem Informasi Bisnis",
        },
    ];

    return (
        <>
            <Head>
                <title>SAOCP-Add Mahasiswa</title>
            </Head>
            <div className="grid grid-cols-7 gap-1">
                <div className="col-span-2">
                    <SidebarUser />
                </div>
                <div className="mt-10 w-full h-72 col-span-4">
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
                                id={id}
                            />
                        </div>
                        <div className="input-nrp">
                            <InputNRP />
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
                            <LabelAddMhsTable total="10" />
                            <TableWithDeleteButton
                                TABLE_HEAD={head_mhs}
                                TABLE_ROWS={data_mhs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
