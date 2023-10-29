import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import LabelTable from "@/Components/Assistant/Labels/LabelTable";
import DetailsTitle from "@/Components/Assistant/Title/DetailsTitle";
import TableWithEditDeleteButton from "@/Components/Assistant/Table/TableWithEditDeleteButton";

export default function DetailKelas(props) {
    const { data } = props;
    console.log(data);
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

    const head = ["Nama", "NRP", "Jurusan", "Action"];

    const assistants_data = [];
    const students_data = [];

    data.assistant_practicum.map((item) => {
        const assistant = {
            id: data.id,
            nama: item.assistant_id,
            nrp: item.practicum_id,
            jurusan: item.assistant_id,
            student_assistant_practicum_id: item.id,
        };
        assistants_data.push(assistant);
    });

    data.student_practicum.map((item) => {
        const student = {
            id: data.id,
            nama: item.student_id,
            nrp: item.practicum_id,
            jurusan: item.student_id,
            student_assistant_practicum_id: item.id,
        };
        students_data.push(student);
    });

    return (
        <>
            <Head>
                <title>SAOCP-Detail Kelas</title>
            </Head>
            <div className="grid grid-cols-7 gap-1">
                <div className="col-span-2">
                    <SidebarUser></SidebarUser>
                </div>

                <div className="mt-10 w-full h-72 col-span-4">
                    <div className="judul">
                        <DetailsTitle
                            matkul={data.name}
                            pararel={data.code}
                            hari={hari[data.day - 1]}
                            jam_start={formatTime(data.time)}
                            jam_end={formatTime(
                                data.time + data.subject.duration * 100
                            )}
                            ruangan={data.room.name}
                            id={data.id}
                        />
                    </div>

                    <div className="tabel_asisten mt-10">
                        <LabelTable
                            type="Asisten"
                            slot_used={data.assistant_practicum.length}
                            total_slot={Math.floor(data.quota / 8)}
                            addHref={route("practicum.addAssistant", data.id)}
                        />
                        <TableWithEditDeleteButton
                            TABLE_HEAD={head}
                            TABLE_ROWS={assistants_data}
                            type="Asisten"
                        />
                    </div>

                    <div className="tabel_mahasiswa mt-10">
                        <LabelTable
                            type="Mahasiswa"
                            slot_used={data.student_practicum.length}
                            total_slot={data.quota}
                            addHref={route("practicum.addStudent", data.id)}
                        />
                        <TableWithEditDeleteButton
                            TABLE_HEAD={head}
                            TABLE_ROWS={students_data}
                            type="Mahasiswa"
                        />
                    </div>
                    <div className="mt-10"></div>
                </div>
            </div>
        </>
    );
}
