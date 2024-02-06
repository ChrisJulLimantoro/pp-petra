import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import LabelTable from "@/Components/Assistant/Labels/LabelTable";
import DetailsTitle from "@/Components/Assistant/Title/DetailsTitle";
import TableWithEditDeleteButton from "@/Components/Assistant/Table/TableWithEditDeleteButton";
import DataTableViewStudent from "@/Components/Assistant/Table/DataTableViewStudent";

export default function DetailKelas(props) {
    const { data, routes } = props;

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

    function extractNrp(email) {
        // Find the position of '@' symbol in the email
        const atIndex = email.indexOf("@");

        // Extract the substring before the '@' symbol
        const username = email.slice(0, atIndex).toUpperCase();

        return username;
    }

    function getJurusan(input) {
        switch (input) {
            case "s":
                return "Sistem Informasi Bisnis";
            case "i":
                return "Informatika";
            case "d":
                return "Data Science & analytics";
            default:
                return "Invalid input. Please provide s, i, or d.";
        }
    }

    const head_student = ["Nama", "NRP", "Jurusan", "Action"];
    const head_assistant = ["Nama", "NRP", "Action"];

    const assistants_data = [];
    const students_data = [];

    data.assistant_practicum.map((item) => {
        const assistant = {
            id: data.id,
            nama: item.assistant.user.name,
            nrp: extractNrp(item.assistant.user.email),
            student_assistant_practicum_id: item.id,
        };
        assistants_data.push(assistant);
    });

    data.student_practicum.map((item) => {
        if (item.accepted % 2 != 0) {
            const student = {
                id: data.id,
                nama: item.student.user.name,
                nrp: extractNrp(item.student.user.email),
                jurusan: getJurusan(item.student.program),
                student_assistant_practicum_id: item.id,
            };
            students_data.push(student);
        }
    });

    return (
        <>
            <Head>
                <title>Detail Kelas</title>
            </Head>
            <SidebarUser routes={routes}>
                <div className="mt-10 md:px-5 w-full md:w-5/6">
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
                            total_slot={Math.ceil(data.quota / 8)}
                            addHref={route("practicum.addAssistant", data.id)}
                        />
                        <TableWithEditDeleteButton
                            TABLE_HEAD={head_assistant}
                            TABLE_ROWS={assistants_data}
                            type="Asisten"
                        />
                    </div>

                    <div className="tabel_mahasiswa mt-10">
                        {/* <LabelTable
                            type="Mahasiswa"
                            slot_used={data.student_practicum.length}
                            total_slot={data.quota}
                            addHref={route("practicum.addStudent", data.id)}
                        />
                        <TableWithEditDeleteButton
                            TABLE_HEAD={head_student}
                            TABLE_ROWS={students_data}
                            type="Mahasiswa"
                        /> */}
                        <DataTableViewStudent
                            TABLE_HEAD={head_student}
                            TABLE_ROWS={students_data}
                            slot_used={students_data.length}
                            total_slot={data.quota}
                            addHref={route("practicum.addStudent", data.id)}
                            type="Mahasiswa"
                        />
                    </div>
                    <div className="mt-10"></div>
                </div>
            </SidebarUser>
        </>
    );
}
