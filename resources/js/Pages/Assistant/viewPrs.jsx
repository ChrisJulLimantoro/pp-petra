import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import { PrsTable } from "@/Components/schedule/PrsTable";
import React from "react";
import PrsFormDialog from "@/Components/schedule/PrsFormDialog";

export default function viewPrs(props) {
    return (
        <>
            <Head>
                <title>SAOCP - View PRS</title>
                <style>{`
                html {
                    height: 100vh;
                    overflow-x: hidden;
                }
                `}</style>
            </Head>
            <SidebarUser routes={props.routes}>
                <div className="pt-10 h-72 overflow-y-auto h-full max-w-[1100px]">
                    <h1 className="font-medium text-2xl mb-2">
                        View PRS Mahasiswa
                    </h1>
                    <h2 className="font-medium text-lg mb-5">
                        {props.nrp}-{props.name}
                    </h2>
                    <hr style={{ borderTopWidth: "3px" }} className="mb-8" />
                    <div className="pb-16 relative">
                        <PrsTable
                            prs={props.prs}
                            schedules={props.schedules}
                            studentId={props.studentId}
                        />
                    </div>
                </div>
            </SidebarUser>
        </>
    );
}
