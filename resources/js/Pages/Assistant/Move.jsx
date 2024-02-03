import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import MoveTitle from "@/Components/Assistant/Title/MoveTitle";
import SelectKelasBaru from "@/Components/Assistant/Select/SelectKelasBaru";
import ConfirmationButton from "@/Components/Assistant/Button/ConfirmationButton";
import React from "react";

export default function Move(props) {
    const { id, type, data, data2, routes } = props;
    const [target_practicum_id, setTargetPracticumId] = React.useState("");

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

    const datas = [];
    data2.practicums.map((item) => {
        datas.push({
            id: item.id,
            code: item.code,
            jadwal:
                hari[item.day - 1] +
                ", " +
                formatTime(item.time) +
                " - " +
                formatTime(item.time + item.subject.duration * 100),
            student_quota: item.quota,
            assistant_quota: Math.floor(item.quota/8),
            student_count : item.student_practicum.length,
            assistant_count : item.assistant_practicum.length,
        });
    });

    //ngesort kelas berdasarkan kode
    datas.sort((a, b) => (a.code > b.code ? 1 : -1));

    return (
        <>
            <Head>
                <title>{"Move " + type}</title>
            </Head>

            <SidebarUser routes={routes}>
                <div className="mt-10 lg:mt-0 md:px-5 w-full md:w-5/6">
                    <div className="judul">
                        <MoveTitle
                            type={type}
                            nama={
                                type === "Asisten"
                                    ? data.assistant.user.name
                                    : data.student.user.name
                            }
                            nrp={
                                type === "Asisten"
                                    ? extractNrp(data.assistant.user.email)
                                    : extractNrp(data.student.user.email)
                            }
                            practicum_id={id}
                            mata_kuliah={data.practicum.name}
                            kelas_paralel={data.practicum.code}
                            hari={hari[data.practicum.day - 1]}
                            jam_start={formatTime(data.practicum.time)}
                            jam_end={formatTime(
                                data.practicum.time +
                                    data.practicum.subject.duration * 100
                            )}
                        />
                    </div>

                    <form action="">
                        <SelectKelasBaru
                            title="Kelas Parallel"
                            datas={datas}
                            current_practicum_id={id}
                            target_practicum_id={target_practicum_id}
                            setTargetPracticumId={setTargetPracticumId}
                            type={type}
                        />
                    </form>

                    <div className="mt-10">
                        <ConfirmationButton
                            practicum_id={id}
                            target_practicum_id={target_practicum_id}
                            tipe={type}
                            student_assistant_id={
                                type === "Asisten"
                                    ? data.assistant.user_id
                                    : data.student.user_id
                            }
                            student_assistant_practicum_id={data.id}
                        >
                            Update Kelas
                        </ConfirmationButton>
                    </div>
                </div>
            </SidebarUser>
        </>
    );
}
