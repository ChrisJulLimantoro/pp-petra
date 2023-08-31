import { ListWithAvatar } from "@/Components/RBAC/AssignRole/ListWithAvatar";
import { RolesSection } from "@/Components/RBAC/AssignRole/RolesSection";
import { SearchInput } from "@/Components/RBAC/AssignRole/SearchInput";
import SidebarLayout from "@/Layouts/SidebarLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";

export default function AssignRole({
    auth,
    errors,
    message,
    status,
    users,
    allRoles,
}) {
    const [selectedUser, setSelectedUser] = useState(users[0].id);

    return (
        <SidebarLayout>
            <Head>
                <title>Assign Role</title>
                <style>
                    {`
                    html {
                        height: 100vh;
                        width: 100vw;
                    }

                    /* width */
                    ::-webkit-scrollbar {
                        width: 6px;
                    }
                    
                    /* Track */
                    ::-webkit-scrollbar-track {
                        border-radius: 10px;
                        background: transparent; 
                        margin-block: .5rem;
                    }
                    
                    /* Handle */
                    ::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        background: #ccc; 
                    }

                    /* Handle on hover */
                    ::-webkit-scrollbar-thumb:hover {
                        background: #555; 
                    }
                    
                    `}
                </style>
            </Head>

            <h1 className="text-3xl font-bold mb-8">Assign Role</h1>
            <div className="grid 2xl:grid-cols-2 2xl:pr-28">
                <section className="mb-4 2xl:mb-0">
                    <div className="text-center font-semibold text-2xl mb-3">
                        User
                    </div>
                    <div className="mb-3">
                        <SearchInput className="mx-auto" />
                    </div>
                    <div>
                        <ListWithAvatar
                            users={users}
                            className="mx-auto h-[30.7rem] overflow-y-auto"
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                        />
                    </div>
                </section>
                <section className="">
                    <RolesSection
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        allRoles={allRoles}
                    />
                </section>
            </div>
        </SidebarLayout>
    );
}
