import React, { useContext, useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    IconButton,
    Drawer,
    Button,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    PowerIcon,
    ComputerDesktopIcon,
    BookOpenIcon,
    EyeIcon,
    Square2StackIcon,
    KeyIcon,
    MapPinIcon,
    UserPlusIcon,
    CalendarDaysIcon,
    TableCellsIcon,
    UserGroupIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    Bars3BottomLeftIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import prodiImg from "../../../public/assets/prodi.jpeg";
import { Link, Head } from "@inertiajs/react";

export default function MultiLevelSidebar({
    children,
    routes,
    className = "",
}) {
    const [open, setOpen] = useState(-1);
    const [sidebarState, setSidebarState] = useState(
        window.innerWidth < 577 ? 0 : window.innerWidth < 1024 ? 1 : 2
    );
    const [isMobile, setIsMobile] = useState(window.innerWidth < 577);
    const [open2, setOpen2] = useState(false);
    const openDrawer = () => setOpen2(true);
    const closeDrawer = () => setOpen2(false);

    window.addEventListener("resize", () => {
        setSidebarState(
            window.innerWidth < 577 ? 0 : window.innerWidth < 1024 ? 1 : 2
        );
        setIsMobile(window.innerWidth < 577);
    });

    // console.log(typeof routes);
    if (routes == "all") {
        routes = {
            Dashboard: "Dashboard",
            Praktikum: [
                "Praktikum.Daftar Praktikum",
                "Praktikum.View Kelas Praktikum",
                "Praktikum.Manage Praktikum",
            ],
            Mahasiswa: ["Mahasiswa.Manage Mahasiswa", "Mahasiswa.View Jadwal"],
            Asisten: ["Asisten.Manage Asisten", "Asisten.View Jadwal Ajar"],
            Ruangan: "Ruangan",
            Event: "Event",
            RBAC: [
                "RBAC.Manage Role",
                "RBAC.Add User to Role",
                "RBAC.Add Routes to Role",
            ],
            LogOut: "LogOut",
        };
    }
    const icons = {
        Dashboard: <PresentationChartBarIcon className="h-5 w-5" />,
        Praktikum: <ComputerDesktopIcon className="h-5 w-5" />,
        "Praktikum.Daftar Praktikum": (
            <Square2StackIcon strokeWidth={3} className="h-3 w-5" />
        ),
        "Praktikum.View Kelas Praktikum": (
            <EyeIcon strokeWidth={3} className="h-3 w-5" />
        ),
        "Praktikum.Manage Praktikum": <TableCellsIcon className="h-5 w-5" />,
        Mahasiswa: <UserCircleIcon className="h-5 w-5" />,
        "Mahasiswa.Manage Mahasiswa": <UserGroupIcon className="h-5 w-5" />,
        "Mahasiswa.View Jadwal": <CalendarDaysIcon className="h-5 w-5" />,
        Asisten: <UserPlusIcon className="h-5 w-5" />,
        "Asisten.Manage Asisten": <UserGroupIcon className="h-5 w-5" />,
        "Asisten.View Jadwal Ajar": <CalendarDaysIcon className="h-5 w-5" />,
        Ruangan: <MapPinIcon className="h-5 w-5" />,
        Event: <CalendarDaysIcon className="h-5 w-5" />,
        RBAC: <KeyIcon className="h-5 w-5" />,
        "RBAC.Manage Role": (
            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
        ),
        "RBAC.Add User to Role": (
            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
        ),
        "RBAC.Add Routes to Role": (
            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
        ),
        LogOut: <PowerIcon className="h-5 w-5" />,
    };

    const mobileOpenedStyle = "w-1/2 p-5";
    const desktopMinimizedStyle = "pl-[80px] w-screen p-3";
    const desktopFullStyle = "w-4/5 p-7";

    const handleOpen = (value) => {
        console.log(value);
        setOpen(open === value ? 0 : value);
    };

    const minimize = () => {
        setSidebarState(1);
        setOpen(0);
    };

    console.log(routes);
    const openedSidebar = () => {
        return (
            <Card
                className={
                    "w-1/5 h-screen px-4 shadow-xl shadow-slate-950 rounded-none transition-all duration-300 fixed top-0 left-0 " +
                    className
                }
            >
                <div className="flex px-4 h-fit justify-between items-center">
                    <img src={prodiImg} alt="Logo Prodi" className="w-20" />
                    <IconButton variant="text" onClick={minimize}>
                        <Bars3BottomLeftIcon className="w-5" />
                    </IconButton>
                </div>

                <List className="min-w-full">
                    <Link href={route("Dashboard")}>
                        <ListItem className="w-full">
                            <ListItemPrefix>
                                <PresentationChartBarIcon
                                    className="h-5 w-5"
                                    onClick={() => setSidebarState(1)}
                                />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                    </Link>

                    {Object.keys(routes).map((rute, index) => {
                        if (Array.isArray(routes[rute])) {
                            return (
                                <Accordion
                                    open={open === index}
                                    className="max-w-[1/5]"
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${
                                                open === index
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    }
                                >
                                    <ListItem
                                        className="p-0"
                                        selected={open === index}
                                    >
                                        <AccordionHeader
                                            onClick={() => handleOpen(index)}
                                            className="border-b-0 p-3"
                                        >
                                            <ListItemPrefix>
                                                {icons[rute]}
                                            </ListItemPrefix>
                                            <Typography
                                                color="blue-gray"
                                                className="mr-auto font-normal"
                                            >
                                                {rute}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>

                                    <AccordionBody className="py-1">
                                        <List className="p-0" key={rute}>
                                            {routes[rute].map((r) => {
                                                return (
                                                    <Link href={route(r)}>
                                                        <ListItem className="mx-5">
                                                            <ListItemPrefix>
                                                                {icons[r]}
                                                            </ListItemPrefix>
                                                            {r.split(".")[1]}
                                                        </ListItem>
                                                    </Link>
                                                );
                                            })}
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                            );
                        } else if (rute != "Dashboard" && rute != "LogOut") {
                            return (
                                <Link href={route(rute)}>
                                    <ListItem className="w-full">
                                        <ListItemPrefix>
                                            {icons[rute]}
                                        </ListItemPrefix>
                                        {rute}
                                    </ListItem>
                                </Link>
                            );
                        }
                    })}

                    <Link href={route("LogOut")}>
                        <ListItem className="w-full">
                            <ListItemPrefix>
                                <PowerIcon className="w-5 h-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </Link>
                </List>
            </Card>
        );
    };

    const minimizedSidebar = () => {
        return (
            <Card
                className={
                    "w-[60px] h-screen shadow-xl shadow-slate-950 rounded-none transition-all duration-300 fixed top-0 left-0 " +
                    className
                }
            >
                <div className="px-3">
                    <img src={prodiImg} alt="" className="w-20" />
                </div>

                <List>
                    <Link href={route("Dashboard")}>
                        <ListItem className="w-fit p-3">
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItem>
                    </Link>

                    {Object.keys(routes).map((rute) => {
                        if (rute != "Dashboard" && rute != "LogOut") {
                            return (
                                <ListItem
                                    className="w-fit p-3"
                                    onClick={() => setSidebarState(2)}
                                >
                                    {icons[rute]}
                                </ListItem>
                            );
                        }
                    })}

                    <Link href={route("Dashboard")}>
                        <ListItem className="w-fit p-3">
                            <PowerIcon className="h-5 w-5" />
                        </ListItem>
                    </Link>
                </List>
            </Card>
        );
    };

    const mobileSidebarBtn = () => {
        return (
            <IconButton
                variant="text"
                className="mx-4 mb-3"
                onClick={openDrawer}
            >
                <Bars3BottomLeftIcon className="w-5 h-5" />
            </IconButton>
        );
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

            <div className="box-border flex flex-row min-h-screen gap-x-7 overflow-x-hidden">
                {sidebarState === 1
                    ? minimizedSidebar()
                    : sidebarState === 2
                    ? openedSidebar()
                    : null}

                <div
                    className={
                        sidebarState === 2 && isMobile
                            ? "w-1/2"
                            : sidebarState === 2
                            ? "w-1/5"
                            : "hidden"
                    }
                ></div>
                <div
                    className={
                        (sidebarState === 1
                            ? desktopMinimizedStyle
                            : sidebarState === 2 && isMobile
                            ? mobileOpenedStyle
                            : sidebarState === 2
                            ? desktopFullStyle
                            : "w-screen p-5") +
                        " transition-all duration-300 bg-white"
                    }
                >
                    {sidebarState === 0 ? mobileSidebarBtn() : null}
                    {children}

                    {sidebarState === 0 && (
                        <Drawer
                            open={open2}
                            onClose={closeDrawer}
                            className="p-4"
                            overlayProps={{
                                className: "fixed backdrop-blur-none",
                            }}
                        >
                            <div className="px-6 flex items-center justify-between">
                                <img
                                    src={prodiImg}
                                    alt="Logo Prodi"
                                    className="w-20"
                                />
                                <IconButton
                                    variant="text"
                                    color="blue-gray"
                                    onClick={closeDrawer}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </IconButton>
                            </div>

                            <List>
                                <Link href={route("Dashboard")}>
                                    <ListItem className="w-full">
                                        <ListItemPrefix>
                                            <PresentationChartBarIcon
                                                className="h-5 w-5"
                                                onClick={() =>
                                                    setSidebarState(1)
                                                }
                                            />
                                        </ListItemPrefix>
                                        Dashboard
                                    </ListItem>
                                </Link>

                                {Object.keys(routes).map((rute, index) => {
                                    if (Array.isArray(routes[rute])) {
                                        return (
                                            <Accordion
                                                open={open === index}
                                                className="max-w-[1/5]"
                                                icon={
                                                    <ChevronDownIcon
                                                        strokeWidth={2.5}
                                                        className={`mx-auto h-4 w-4 transition-transform ${
                                                            open === index
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                }
                                            >
                                                <ListItem
                                                    className="p-0"
                                                    selected={open === index}
                                                >
                                                    <AccordionHeader
                                                        onClick={() =>
                                                            handleOpen(index)
                                                        }
                                                        className="border-b-0 p-3"
                                                    >
                                                        <ListItemPrefix>
                                                            {icons[rute]}
                                                        </ListItemPrefix>
                                                        <Typography
                                                            color="blue-gray"
                                                            className="mr-auto font-normal"
                                                        >
                                                            {rute}
                                                        </Typography>
                                                    </AccordionHeader>
                                                </ListItem>

                                                <AccordionBody className="py-1">
                                                    <List
                                                        className="p-0"
                                                        key={rute}
                                                    >
                                                        {routes[rute].map(
                                                            (r) => {
                                                                return (
                                                                    <Link
                                                                        href={route(
                                                                            r
                                                                        )}
                                                                    >
                                                                        <ListItem className="mx-5">
                                                                            <ListItemPrefix>
                                                                                {
                                                                                    icons[
                                                                                        r
                                                                                    ]
                                                                                }
                                                                            </ListItemPrefix>
                                                                            {
                                                                                r.split(
                                                                                    "."
                                                                                )[1]
                                                                            }
                                                                        </ListItem>
                                                                    </Link>
                                                                );
                                                            }
                                                        )}
                                                    </List>
                                                </AccordionBody>
                                            </Accordion>
                                        );
                                    } else if (
                                        rute != "Dashboard" &&
                                        rute != "LogOut"
                                    ) {
                                        return (
                                            <Link href={route(rute)}>
                                                <ListItem className="w-full">
                                                    <ListItemPrefix>
                                                        {icons[rute]}
                                                    </ListItemPrefix>
                                                    {rute}
                                                </ListItem>
                                            </Link>
                                        );
                                    }
                                })}

                                <Link href={route("LogOut")}>
                                    <ListItem className="w-full">
                                        <ListItemPrefix>
                                            <PowerIcon className="w-5 h-5" />
                                        </ListItemPrefix>
                                        Log Out
                                    </ListItem>
                                </Link>
                            </List>
                        </Drawer>
                    )}
                </div>
            </div>
        </>
    );
}
