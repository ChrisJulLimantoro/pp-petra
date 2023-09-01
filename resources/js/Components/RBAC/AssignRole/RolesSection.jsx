import { SearchInput } from "./SearchInput";
import { ListWithIcon } from "./ListWithIcon";
import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function RolesSection({ selectedUser, allRoles }) {
    const [loading, setLoading] = useState(false);
    const [selectedUserRoles, setSelectedUserRoles] = useState([]);
    const [assignmentButtonDisabled, setAssignmentButtonDisabled] =
        useState(false);
    const [alert, setAlert] = useState({
        isOpen: false,
        color: "red",
        message: "Role unassigned successfully!",
    });

    useEffect(() => {
        if (!loading) {
            setLoading(true);
        }
        axios
            .get(`/saocp/rbac/users/${selectedUser}/roles`)
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

    const assignRole = (e) => {
        setAssignmentButtonDisabled(true);
        const roleId = e.currentTarget.dataset.roleId;
        const userId = selectedUser;
        axios
            .post(`/saocp/rbac/users/${userId}/roles/${roleId}`)
            .then((response) => {
                const newRole = allRoles.find((role) => role.id == roleId);
                setSelectedUserRoles((prevRoles) => [...prevRoles, newRole]);
                showAlert(setAlert, "green", response.data.message);
            })
            .catch((error) => {
                showAlert(setAlert, "red", error.response.data.message);
            })
            .finally(() => {
                setAssignmentButtonDisabled(false);
            });
    };

    const unassignRole = (e) => {
        setAssignmentButtonDisabled(true);
        const roleId = e.currentTarget.dataset.roleId;
        const userId = selectedUser;
        axios
            .delete(`/saocp/rbac/users/${userId}/roles/${roleId}`)
            .then((response) => {
                setSelectedUserRoles((prevRoles) => {
                    return prevRoles.filter((role) => role.id != roleId);
                });
                showAlert(setAlert, "green", response.data.message);
            })
            .catch((error) => {
                showAlert(setAlert, "red", error.response.data.message);
            })
            .finally(() => {
                setAssignmentButtonDisabled(false);
            });
    };

    const assignmentFunctionMap = {
        "+": assignRole,
        "-": unassignRole,
    };

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
                        selectedUserRoles={selectedUserRoles}
                        handleClick={assignmentFunctionMap["-"]}
                        assignmentButtonDisabled={assignmentButtonDisabled}
                        icon="-"
                        className="h-[13rem] overflow-y-auto"
                    />
                </div>
                <div className="bg-gray-100 w-96 mx-auto rounded-xl">
                    <div className="text-center py-1">not owned</div>
                    <ListWithIcon
                        loading={loading}
                        selectedUserRoles={selectedUserRoles}
                        handleClick={assignmentFunctionMap["+"]}
                        assignmentButtonDisabled={assignmentButtonDisabled}
                        icon="+"
                        className="h-[13rem] overflow-y-auto"
                        allRoles={allRoles}
                    />
                </div>
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

function showAlert(setAlert, color, message) {
    setAlert({
        isOpen: true,
        color: color,
        message: message,
    });

    setTimeout(() => {
        setAlert((prevAlert) => {
            return { ...prevAlert, isOpen: false };
        });
    }, 1000);
}
