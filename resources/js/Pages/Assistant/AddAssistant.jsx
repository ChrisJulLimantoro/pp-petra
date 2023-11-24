import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import AddTitle from "@/Components/Assistant/Title/AddTitle";
import LabelTableAdd from "@/Components/Assistant/Labels/LabelTableAdd";
import TableWithAddButton from "@/Components/Assistant/Table/TableWithAddButton";
import LabelAdd from "@/Components/Assistant/Labels/LabelAdd";
import TableNoButton from "@/Components/Assistant/Table/TableNoButton";

export default function AddAssistant(props) {
    const { id, data } = props;

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

    console.log(data);
    const head_asisten = ["Nama", "NRP"];
    const assistants_data = [];

    data.assistant_practicum.map((item) => {
        const assistant = {
            id: data.id,
            nama: item.assistant.user.name,
            nrp: extractNrp(item.assistant.user.email),
            student_assistant_practicum_id: item.id,
        };
        assistants_data.push(assistant);
    });

    const head_asisten_avail = ["Nama", "NRP", "Jurusan", "Action"];
    const data_asisten_avail = [
        {
            nama: "Alice Smith",
            nrp: "111111111",
            jurusan: "Informatika",
        },
        {
            nama: "Bob Johnson",
            nrp: "222222222",
            jurusan: "Sistem Informasi Bisnis",
        },
        {
            nama: "Charlie Brown",
            nrp: "333333333",
            jurusan: "Data Science",
        },
        {
            nama: "David Wilson",
            nrp: "444444444",
            jurusan: "Informatika",
        },
        {
            nama: "Eve Davis",
            nrp: "555555555",
            jurusan: "Sistem Informasi Bisnis",
        },
        {
            nama: "Frank White",
            nrp: "666666666",
            jurusan: "Data Science",
        },
        {
            nama: "Grace Miller",
            nrp: "777777777",
            jurusan: "Informatika",
        },
        {
            nama: "Hank Jones",
            nrp: "888888888",
            jurusan: "Sistem Informasi Bisnis",
        },
        {
            nama: "Ivy Thomas",
            nrp: "999999999",
            jurusan: "Data Science",
        },
        {
            nama: "Jack Anderson",
            nrp: "101010101",
            jurusan: "Informatika",
        },
    ];

    return (
        <>
            <Head>
                <title>SAOCP-Tambah Asisten</title>
            </Head>
            <div className="grid grid-cols-7 gap-1">
                <div className="col-span-2">
                    <SidebarUser />
                </div>
                <div className="mt-10 w-full h-72 col-span-4">
                    <div className="judul">
                        <AddTitle
                            type="Asisten"
                            matkul={data.name}
                            pararel={data.code}
                            hari={hari[data.day - 1]}
                            jam_start={formatTime(data.time)}
                            jam_end={formatTime(data.time + data.subject.duration*100)}
                            ruangan={data.room.name}
                            practicum_id={id}
                        />
                    </div>

                    <div className="tabel-asisten">
                        <LabelAdd type="Asisten" slot_used="3" total_slot="4" />
                        <TableNoButton
                            TABLE_HEAD={head_asisten}
                            TABLE_ROWS={assistants_data}
                        />
                    </div>

                    <div className="tabel-add mt-10">
                        <LabelTableAdd type="Asisten" total_available="10" />
                        <TableWithAddButton
                            TABLE_HEAD={head_asisten_avail}
                            TABLE_ROWS={data_asisten_avail}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
