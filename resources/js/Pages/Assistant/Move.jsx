import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import MoveTitle from "@/Components/Assistant/Title/MoveTitle";
import SelectKelasBaru from "@/Components/Assistant/Select/SelectKelasBaru";
import ConfirmationButton from "@/Components/Assistant/Button/ConfirmationButton";

export default function Move(props) {
    const { id, type, data, data2, routes } = props;
    //  console.log(data);
    // console.log(data3);

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
        });
    });
    console.log(datas);

    //ngesort kelas berdasarkan kode
    datas.sort((a, b) => (a.code > b.code ? 1 : -1));

    return (
        <>
            <Head>
                <title>{"SAOCP - Move " + type}</title>
            </Head>

            <div className="grid grid-cols-7 gap-1">
                <div className="col-span-2">
                    <SidebarUser routes={routes}></SidebarUser>
                </div>
                <div className="mt-10 w-full h-72 col-span-4">
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
                        />
                    </form>

                    <div className="mt-10">
                        <ConfirmationButton>Update Kelas</ConfirmationButton>
                    </div>
                </div>
            </div>
        </>
    );
}
