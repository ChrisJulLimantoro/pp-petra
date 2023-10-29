import { Head } from "@inertiajs/react";
import Sidebar from "@/Layouts/SidebarUser";
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
                }
                `}</style>
            </Head>
            <div className="grid grid-cols-11 gap-1 h-screen overflow-y-hidden">
                <div className="col-span-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="pt-10 w-full h-72 col-span-9 xl:px-16 lg:px-12 md:px-8 px-4 overflow-y-auto h-full">
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
            </div>
        </>
    );
}
