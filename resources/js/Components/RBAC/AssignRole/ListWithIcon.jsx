import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
    Spinner,
} from "@material-tailwind/react";

import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export function ListWithIcon({
    icon,
    className,
    selectedUser,
    selectedUserRoles,
    setSelectedUserRoles,
    setAlert,
    loading,
    setLoading,
    allRoles = null,
}) {
    const [assignmentButtonDisabled, setAssignmentButtonDisabled] = useState(false);

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

    const iconMap = {
        "+": <PlusCircleIcon className="w-6 h-6" />,
        "-": <MinusCircleIcon className="w-6 h-6" />,
    };
    const assignmentFunctionMap = {
        "+": assignRole,
        "-": unassignRole,
    };

    let roles = selectedUserRoles;
    if (!loading && allRoles && icon == "+") {
        roles = getNotOwnedRoles(selectedUserRoles, allRoles);
    }

    return (
        <Card className={"w-96 " + className}>
            <List>
                {loading ? (
                    <div className="flex justify-center gap-8">
                        <Spinner className="h-6 w-6" />
                    </div>
                ) : (
                    roles.map((role) => (
                        <ListItem
                            ripple={false}
                            className="py-1 pr-1 pl-4 cursor-default py-0"
                            key={role.id}
                        >
                            {role.name}
                            <ListItemSuffix>
                                <IconButton
                                    variant="text"
                                    color="blue-gray"
                                    className="rounded-full h-9 w-9 my-1"
                                    disabled={assignmentButtonDisabled}
                                    data-role-id={role.id}
                                    onClick={(e) =>
                                        assignmentFunctionMap[icon](
                                            e,
                                            selectedUser,
                                            setAlert,
                                            setSelectedUserRoles,
                                            setAssignmentButtonDisabled,
                                            allRoles
                                        )
                                    }
                                >
                                    {iconMap[icon]}
                                </IconButton>
                            </ListItemSuffix>
                        </ListItem>
                    ))
                )}
            </List>
        </Card>
    );
}

function assignRole(e, selectedUser, setAlert, setSelectedUserRoles, setAssignmentButtonDisabled, allRoles) {
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
        }).finally(() => {
            setAssignmentButtonDisabled(false);
        });
}

function unassignRole(e, selectedUser, setAlert, setSelectedUserRoles, setAssignmentButtonDisabled, allRoles) {
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
            showAlert(setAlert, "red", error.response);
        }).finally(() => {
            setAssignmentButtonDisabled(false);
        });
}

function getNotOwnedRoles(selectedUserRoles, allRoles) {
    return allRoles.filter((role) => {
        return !selectedUserRoles.some((userRole) => {
            return userRole.id == role.id;
        });
    });
}

function showAlert(setAlert, color, message) {
    setAlert({
        isOpen: true,
        color: color,
        message: message,
    });

    setTimeout(() => {
        setAlert(prevAlert => {
            return {...prevAlert, isOpen: false}
        });
    }, 1000);
}
