import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";

export default function SideBar({ children, props }) {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <>
            <Head>
                <style>
                {`
                    body {
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                `}
                </style>
            </Head>
            <div className="box-border flex flex-row h-screen gap-x-7 bg-blue-gray-50">
                <Card className="h-full w-1/5 p-4 shadow-xl shadow-blue-gray-900/5 fixed">
                    <div className="mb-2 p-4">
                        <Typography variant="h5" color="blue-gray">
                            SAOCP
                        </Typography>
                    </div>
                    <List>
                        <Accordion
                            open={open === 1}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${
                                        open === 1 ? "rotate-180" : ""
                                    }`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 1}>
                                <AccordionHeader
                                    onClick={() => handleOpen(1)}
                                    className="border-b-0 p-3"
                                >
                                    <ListItemPrefix>
                                        <PresentationChartBarIcon className="h-5 w-5 mr-2" />
                                    </ListItemPrefix>
                                    <Typography
                                        color="blue-gray"
                                        className="mr-auto font-normal"
                                    >
                                        RBAC
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon
                                                strokeWidth={3}
                                                className="h-3 w-5"
                                            />
                                        </ListItemPrefix>
                                        Add Role
                                    </ListItem>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon
                                                strokeWidth={3}
                                                className="h-3 w-5"
                                            />
                                        </ListItemPrefix>
                                        Assign User to Role
                                    </ListItem>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon
                                                strokeWidth={3}
                                                className="h-3 w-5"
                                            />
                                        </ListItemPrefix>
                                        Assign Routes to Role
                                    </ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        {/* <Accordion
                            open={open === 2}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${
                                        open === 2 ? "rotate-180" : ""
                                    }`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 2}>
                                <AccordionHeader
                                    onClick={() => handleOpen(2)}
                                    className="border-b-0 p-3"
                                >
                                    <ListItemPrefix>
                                        <ShoppingBagIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    <Typography
                                        color="blue-gray"
                                        className="mr-auto font-normal"
                                    >
                                        E-Commerce
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon
                                                strokeWidth={3}
                                                className="h-3 w-5"
                                            />
                                        </ListItemPrefix>
                                        Orders
                                    </ListItem>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon
                                                strokeWidth={3}
                                                className="h-3 w-5"
                                            />
                                        </ListItemPrefix>
                                        Products
                                    </ListItem>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <hr className="my-2 border-blue-gray-50" />
                        <ListItem>
                            <ListItemPrefix>
                                <InboxIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Inbox
                            <ListItemSuffix>
                                <Chip
                                    value="14"
                                    size="sm"
                                    variant="ghost"
                                    color="blue-gray"
                                    className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Settings
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem> */}
                    </List>
                </Card>
                <div className="w-1/5"></div>
                <div className="p-7 w-4/5">{children}</div>
            </div>
        </>
    );
}
