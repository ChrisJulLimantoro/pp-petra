import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
    Spinner,
} from "@material-tailwind/react";

import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

export function ListWithIcon({
    icon,
    className,
    selectedUserRoles,
    handleClick,
    assignmentButtonDisabled,
    loading,
    allRoles = null,
}) {
    const iconMap = {
        "+": <PlusCircleIcon className="w-6 h-6" />,
        "-": <MinusCircleIcon className="w-6 h-6" />,
    };

    const getNotOwnedRoles = () => {
        return allRoles.filter((role) => {
            return !selectedUserRoles.some((userRole) => {
                return userRole.id == role.id;
            });
        });
    };

    let roles = selectedUserRoles;
    if (!loading && allRoles && icon == "+") {
        roles = getNotOwnedRoles();
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
                                    onClick={handleClick}
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
