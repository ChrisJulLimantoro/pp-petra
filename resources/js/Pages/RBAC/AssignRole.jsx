import { RoleSearchProvider } from "@/Components/RBAC/AssignRole/RoleSearchContext";
import { RolesSection } from "@/Components/RBAC/AssignRole/RolesSection";
import { UserSearchProvider } from "@/Components/RBAC/AssignRole/UserSearchContext";
import { UsersSection } from "@/Components/RBAC/AssignRole/UsersSection";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import SidebarUser from "@/Layouts/SidebarUser";
import { Breadcrumbs } from "@material-tailwind/react";

export default function AssignRole({
    users,
    allRoles,
    routes,
}) {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <SidebarUser routes={routes}>
            <Head>
                <title>Assign Role</title>
                <style>
                    {`
                    html, body {
                        height: 100vh;
                        max-width: 100vw;
                        overflow-x: hidden;
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

            <div className="mt-10 md:mt-0">
                <Breadcrumbs className="mb-5">
                    <a href={route("asisten.dashboard")} className="opacity-60">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </a>
                    <a>RBAC</a>
                    <a href={route("RBAC.Add User to Role")}>Add User to Role</a>
                </Breadcrumbs>

                <h1 className="text-3xl font-bold mb-8">Assign Role</h1>

                <div className="grid w-full 2xl:grid-cols-2 2xl:pr-28">
                    <section className="mb-4 2xl:mb-0">
                        <UserSearchProvider
                            users={users}
                            setSelectedUser={setSelectedUser}
                        >
                            <UsersSection
                                selectedUser={selectedUser}
                                setSelectedUser={setSelectedUser}
                            />
                        </UserSearchProvider>
                    </section>
                    <section className="">
                        <RoleSearchProvider allRoles={allRoles}>
                            <RolesSection selectedUser={selectedUser} />
                        </RoleSearchProvider>
                    </section>
                </div>
            </div>

        </SidebarUser>
    );
}
