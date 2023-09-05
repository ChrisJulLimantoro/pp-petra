import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
    Spinner,
} from "@material-tailwind/react";

import { useCallback } from "react";
import { useRoleAssignmentContext } from "./RoleAssignmentContext";

export function ListWithIcon({
    icon,
    className,
    selectedUserRoles,
    loading,
    filteredRoles,
}) {
    const { assignmentButtonDisabled, assignmentFunctionMap, iconMap } =
        useRoleAssignmentContext();

    const getRoles = useCallback(() => {
        if (selectedUserRoles === null) {
            return [];
        } else if (icon == "+") {
            return filteredRoles.filter((role) => {
                return !selectedUserRoles.some((userRole) => {
                    return userRole.id == role.id;
                });
            });
        } else {
            return filteredRoles.filter((role) => {
                return selectedUserRoles.some((userRole) => {
                    return userRole.id == role.id;
                });
            });
        }
    }, [selectedUserRoles, filteredRoles])

    return (
        <Card className={"w-96 h-[13rem] overflow-y-auto" + className}>
            <List className="overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center gap-8">
                        <Spinner className="h-6 w-6" />
                    </div>
                ) : (
                    getRoles().map((role) => (
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
                                    onClick={assignmentFunctionMap[icon]}
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
