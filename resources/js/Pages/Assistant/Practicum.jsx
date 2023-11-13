import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import { PracticumTable } from "@/Components/Practicum/PracticumTable";
import React from "react";

export default function Practicum(props) {
    return (
        <>
            <Head>
                <title>SAOCP - Input Kelas</title>
                <style>{`
                html {
                    height: 100vh;
                    overflow-x: hidden;
                }
                `}</style>
            </Head>
            <SidebarUser>
                <div className="pt-10 h-72 overflow-y-auto h-full max-w-[1100px]">
                    <h1 className="font-medium text-2xl mb-4">Input Kelas</h1>
                    <hr style={{ borderTopWidth: "3px" }} className="mb-8" />
                    <div className="pb-16 relative">
                        <PracticumTable
                            practicums={props.practicums}
                            rooms={props.rooms}
                            subjects={props.subjects}
                        />
                    </div>
                </div>
            </SidebarUser>
        </>
    );
}
