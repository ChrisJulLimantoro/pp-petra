import { Head } from "@inertiajs/react";
import Sidebar from "@/Layouts/SidebarUser";
import { PracticumTable } from "@/Components/Practicum/PracticumTable";
import React from "react";

export default function Practicum(props) {
    return (
        <>
            <Head>
                <title>SAOCP - Input Kelas</title>
            </Head>
            <div className="grid grid-cols-11 gap-1">
                <div className="col-span-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="mt-10 w-full h-72 col-span-9 px-16">
                    <h1 className="font-medium text-2xl mb-4">Input Kelas</h1>
                    <hr style={{ borderTopWidth: "3px" }} className="mb-8" />
                    <div>
                        <PracticumTable
                            data={props.data}
                            rooms={props.rooms}
                            subjects={props.subjects}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
