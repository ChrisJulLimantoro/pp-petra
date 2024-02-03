import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export function ListWithAvatar({
    users,
    className,
    selectedUser,
    setSelectedUser,
}) {
    return (
        <Card className={className}>
            <List>
                {users.map((user) => (
                    <ListItem
                        key={user.id}
                        selected={selectedUser == user.id}
                        onClick={() => {
                            setSelectedUser(user.id);
                        }}
                    >
                        <ListItemPrefix>
                            <Avatar
                                variant="circular"
                                alt="candice"
                                src="/saocp/img/default-pfp-0.jpg"
                            />
                        </ListItemPrefix>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                {user.name}
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                            >
                                {user.email}
                            </Typography>
                        </div>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}
