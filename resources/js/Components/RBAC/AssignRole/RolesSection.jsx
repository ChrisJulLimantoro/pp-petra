import { SearchInput } from "./SearchInput";
import { ListWithIcon } from "./ListWithIcon";
import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRoleSearchContext } from "./RoleSearchContext";
import { RoleAssignmentProvider } from "./RoleAssignmentContext";

export function RolesSection({ selectedUser }) {
    const [loading, setLoading] = useState(false);
    const [selectedUserRoles, setSelectedUserRoles] = useState([]);
    const [assignmentButtonDisabled, setAssignmentButtonDisabled] =
        useState(false);
    const [alert, setAlert] = useState({
        isOpen: false,
        color: "red",
        message: "Role unassigned successfully!",
    });

    const { filteredRoles, handleRoleSearch } = useRoleSearchContext();

    useEffect(() => {
        if (!selectedUser) {
            setSelectedUserRoles(null);
            return;
        }
        if (!loading) {
            setLoading(true);
        }
        axios
            .get(route("rbac.getUserRoles", { user_id: selectedUser }))
            .then((response) => {
                setSelectedUserRoles(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedUser]);

    return (
        <>
            <div className="text-center font-semibold text-2xl mb-3">Role</div>
            <div className="mb-3">
                <SearchInput className="mx-auto" onChange={handleRoleSearch} />
            </div>
            <div className="">
                <RoleAssignmentProvider
                    setAlert={setAlert}
                    selectedUser={selectedUser}
                    setSelectedUserRoles={setSelectedUserRoles}
                >
                    <div className="mb-3 bg-gray-100 w-96 mx-auto rounded-xl">
                        <div className="text-center py-1">owned</div>
                        <ListWithIcon
                            loading={loading}
                            selectedUserRoles={selectedUserRoles}
                            icon="-"
                            filteredRoles={filteredRoles}
                        />
                    </div>
                    <div className="bg-gray-100 w-96 mx-auto rounded-xl">
                        <div className="text-center py-1">not owned</div>
                        <ListWithIcon
                            loading={loading}
                            selectedUserRoles={selectedUserRoles}
                            icon="+"
                            filteredRoles={filteredRoles}
                        />
                    </div>
                </RoleAssignmentProvider>
            </div>
            <div>
                <Alert
                    open={alert.isOpen}
                    onClose={() =>
                        setAlert((prevAlert) => ({
                            ...prevAlert,
                            isOpen: false,
                        }))
                    }
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
