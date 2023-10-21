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
    Button
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";

export default function SideBar({ children, props }) {
    const [open, setOpen] = React.useState(0);
    const [minimized, setMinimized] = React.useState(false  );

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <>
            <Head>
                <style>
                {`
                    body, html {
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100vw !important;
                    }
                `}
                </style>
            </Head>

            <div className="box-border flex flex-row min-h-screen gap-x-7 bg-blue-gray-50 overflow-x-hidden">
                <Card className={(minimized ? 'max-w-[60px] p-2' : 'w-1/5 p-4') + " h-full shadow-xl shadow-blue-gray-900/5 fixed rounded-none transition-all"}>
                    <div className="mb-2 w-full flex justify-center">
                        <Typography variant="h5" color="blue-gray">
                            {minimized ? <Button variant="text" className="p-3"><Bars3Icon width={20} /></Button> : 'SAOCP'}
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
                                    <Link href={route('rbac.manageRole')}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon
                                                    strokeWidth={3}
                                                    className="h-3 w-5"
                                                />
                                            </ListItemPrefix>
                                            Manage Role
                                        </ListItem>
                                    </Link>
                                    <Link href={route('rbac.assignRoleView')}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon
                                                    strokeWidth={3}
                                                    className="h-3 w-5"
                                                />
                                            </ListItemPrefix>
                                            Add User to Role
                                        </ListItem>
                                    </Link>
                                    <Link href={route('rbac.assignRoutes')}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon
                                                    strokeWidth={3}
                                                    className="h-3 w-5"
                                                />
                                            </ListItemPrefix>
                                            Add Routes to Role
                                        </ListItem>
                                    </Link>
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

                <div className={minimized ? 'w-[60px]' : 'w-1/5'}></div>       
                <div className="p-7 w-4/5">{children}</div>
            </div>
        </>
    );
}
