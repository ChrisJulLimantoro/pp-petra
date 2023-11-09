import { RoleSearchProvider } from "@/Components/RBAC/AssignRole/RoleSearchContext";
import { RolesSection } from "@/Components/RBAC/AssignRole/RolesSection";
import { UserSearchProvider } from "@/Components/RBAC/AssignRole/UserSearchContext";
import { UsersSection } from "@/Components/RBAC/AssignRole/UsersSection";
import SidebarLayout from "@/Layouts/SidebarLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import SidebarUser from "@/Layouts/SidebarUser";

export default function AssignRole({
    auth,
    errors,
    message,
    status,
    users,
    allRoles,
}) {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <SidebarUser>
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
                        <RolesSection
                            selectedUser={selectedUser}
                        />
                    </RoleSearchProvider>
                </section>
            </div>
        </SidebarUser>
    );
}
