import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { createContext, useCallback, useContext, useState } from "react";
import { useRoleSearchContext } from "./RoleSearchContext";

const RoleAssignmentContext = createContext();

export function useRoleAssignmentContext() {
    return useContext(RoleAssignmentContext);
}

export function RoleAssignmentProvider({
    children,
    setAlert,
    selectedUser,
    setSelectedUserRoles,
}) {
    const {filteredRoles} = useRoleSearchContext();
    const [assignmentButtonDisabled, setAssignmentButtonDisabled] =
        useState(false);

    const showAlert = useCallback((color, message) => {
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
    }, []);

    const assignRole = useCallback((e) => {
        setAssignmentButtonDisabled(true);
        const roleId = e.currentTarget.dataset.roleId;
        const userId = selectedUser;
        axios
            .post(route('rbac.assignRole', {user_id: userId, role_id: roleId}))
            .then((response) => {
                const newRole = filteredRoles.find((role) => role.id == roleId);
                setSelectedUserRoles((prevRoles) => [...prevRoles, newRole]);
                showAlert("green", response.data.message);
            })
            .catch((error) => {
                showAlert("red", error.response.data.message);
            })
            .finally(() => {
                setAssignmentButtonDisabled(false);
            });
    }, [selectedUser, filteredRoles]);

    const unassignRole = useCallback((e) => {
        setAssignmentButtonDisabled(true);
        const roleId = e.currentTarget.dataset.roleId;
        const userId = selectedUser;
        axios
            .delete(route('rbac.unassignRole', {user_id: userId, role_id: roleId}))
            .then((response) => {
                setSelectedUserRoles((prevRoles) => {
                    return prevRoles.filter((role) => role.id != roleId);
                });
                showAlert("green", response.data.message);
            })
            .catch((error) => {
                showAlert("red", error.response.data.message);
            })
            .finally(() => {
                setAssignmentButtonDisabled(false);
            });
    }, [selectedUser]);

    const assignmentFunctionMap = {
        "+": assignRole,
        "-": unassignRole,
    };

    const iconMap = {
        "+": <PlusCircleIcon className="w-6 h-6" />,
        "-": <MinusCircleIcon className="w-6 h-6" />,
    };

    return (
        <RoleAssignmentContext.Provider value={{ assignmentButtonDisabled, assignmentFunctionMap, iconMap }}>
            {children}
        </RoleAssignmentContext.Provider>
    );
}
