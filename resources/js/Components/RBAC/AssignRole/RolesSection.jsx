import { SearchInput } from "./SearchInput";
import { ListWithIcon } from "./ListWithIcon";
import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export function RolesSection({ selectedUser, allRoles }) {
    const [loading, setLoading] = useState(false);
    const [selectedUserRoles, setSelectedUserRoles] = useState([]);
    const [alert, setAlert] = useState({isOpen: false, color: 'red', message: 'Role unassigned successfully!'});

    return (
        <>
            <div className="text-center font-semibold text-2xl mb-3">Role</div>
            <div className="mb-3">
                <SearchInput className="mx-auto" />
            </div>
            <div className="">
                <div className="mb-3 bg-gray-100 w-96 mx-auto rounded-xl">
                    <div className="text-center py-1">owned</div>
                    <ListWithIcon
                        loading={loading}
                        setLoading={setLoading}
                        selectedUser={selectedUser}
                        selectedUserRoles={selectedUserRoles}
                        setSelectedUserRoles={setSelectedUserRoles}
                        setAlert={setAlert}
                        icon="-"
                        className="h-[13rem] overflow-y-auto"
                        />
                </div>
                <div className="bg-gray-100 w-96 mx-auto rounded-xl">
                    <div className="text-center py-1">not owned</div>
                    <ListWithIcon
                        loading={loading}
                        setLoading={setLoading}
                        selectedUserRoles={selectedUserRoles}
                        setSelectedUserRoles={setSelectedUserRoles}
                        selectedUser={selectedUser}
                        setAlert={setAlert}
                        icon="+"
                        className="h-[13rem] overflow-y-auto"
                        allRoles={allRoles}
                    />
                </div>
            </div>
            <div>
                <Alert
                    open={alert.isOpen}
                    onClose={() => setAlert(prevAlert => ({...prevAlert, isOpen: false}))}
                    color={alert.color}
                    className="w-[20rem] fixed top-6 right-10 py-4"
                    animate={{
                        mount: { opacity: 1, y: 0 },
                        unmount: { opacity: 0, y: 0 },
                    }}
                >
                    {alert.message}
                </Alert>
            </div>
        </>
    );
}
