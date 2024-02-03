import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import AddTitle from "@/Components/Assistant/Title/AddTitle";
import LabelTableAdd from "@/Components/Assistant/Labels/LabelTableAdd";
import TableWithAddButton from "@/Components/Assistant/Table/TableWithAddButton";
import LabelAdd from "@/Components/Assistant/Labels/LabelAdd";
import TableNoButton from "@/Components/Assistant/Table/TableNoButton";
import DataTableAddAssistant from "@/Components/Assistant/Table/DataTableAddAssistant";

export default function AddAssistant(props) {
    const { id, data, data2, routes } = props;

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

    const data_asisten_avail = [];
    data2.map((item) => {
        const allAssistant = {
            id: item.user.id,
            nama: item.user.name,
            nrp: extractNrp(item.user.email),
        };

        var duplicate = false;

        assistants_data.map((item2) => {
            if (allAssistant.nrp == item2.nrp) {
                duplicate = true;
            }
        });

        if (duplicate == false) {
            data_asisten_avail.push(allAssistant);
        }
    });

    const head_asisten_avail = ["Nama", "NRP", "Action"];

    return (
        <>
            <Head>
                <title>Tambah Asisten</title>
            </Head>
            <SidebarUser routes={routes}>
                <div className="mt-10 lg:mt-0 md:px-5 w-full md:w-5/6">
                    <div className="judul">
                        <AddTitle
                            type="Asisten"
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
                    <div className="tabel-asisten">
                        <LabelAdd
                            type="Asisten"
                            slot_used={data.assistant_practicum.length}
                            total_slot={Math.floor(data.quota / 8)}
                        />
                        <TableNoButton
                            TABLE_HEAD={head_asisten}
                            TABLE_ROWS={assistants_data}
                        />
                    </div>
                    <div className="tabel-add mt-10">
                        {/* <LabelTableAdd
                            type="Asisten"
                            total_available={data_asisten_avail.length}
                        /> */}
                        {/* <TableWithAddButton
                            TABLE_HEAD={head_asisten_avail}
                            TABLE_ROWS={data_asisten_avail}
                            practicum_id={id}
                            slot_used={data.assistant_practicum.length}
                            total_slot={Math.floor(data.quota / 8)}
                        /> */}
                        <DataTableAddAssistant
                            total_available={data_asisten_avail.length}
                            TABLE_HEAD={head_asisten_avail}
                            TABLE_ROWS={data_asisten_avail}
                            practicum_id={id}
                            slot_used={data.assistant_practicum.length}
                            total_slot={Math.floor(data.quota / 8)}
                        />
                    </div>
                </div>
            </SidebarUser>
        </>
    );
}
