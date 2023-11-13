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
    TableCellsIcon
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    Bars3BottomLeftIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import prodiImg from "../../../public/assets/prodi.jpeg";
import { Link, Head } from "@inertiajs/react";

export default function MultiLevelSidebar({ children, className = "" }) {
    const [open, setOpen] = useState(0);
    const [sidebarState, setSidebarState] = useState(window.innerWidth < 577 ? 0 : window.innerWidth < 1024 ? 1 : 2);
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

    const mobileOpenedStyle = "w-1/2 p-5";
    const desktopMinimizedStyle = "pl-[80px] w-screen p-3";
    const desktopFullStyle = "w-4/5 p-7";

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const minimize = () => {
        setSidebarState(1);
        setOpen(0);
    };

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
                    {/* Dashboard */}
                    <Link href={route("asisten.dashboard")}>
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

                    {/* Praktikum */}
                    <Accordion
                        open={open === 2}
                        className="max-w-[1/5]"
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
                                    <ComputerDesktopIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal"
                                >
                                    Praktikum
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link href={route("mahasiswa.daftarPraktikum")}>
                                    <ListItem className="mx-5">
                                        <ListItemPrefix>
                                            <Square2StackIcon
                                                strokeWidth={3}
                                                className="h-3 w-5"
                                            />
                                        </ListItemPrefix>
                                        Daftar Praktikum
                                    </ListItem>
                                </Link>

                                <Link href={route("mahasiswa.viewKelasPraktikum")}>
                                    <ListItem className="mx-5">
                                        <ListItemPrefix>
                                            <EyeIcon
                                                strokeWidth={3}
                                                className="h-3 w-5"
                                            />
                                        </ListItemPrefix>
                                        Lihat Kelas Praktikum
                                    </ListItem>
                                </Link>

                                <Link href={route("practicum.index")}>
                                    <ListItem className="mx-5">
                                        <ListItemPrefix>
                                            <TableCellsIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Manage Praktikum
                                    </ListItem>
                                </Link>
                            </List>
                        </AccordionBody>
                    </Accordion>

                    <Link href={route("assistant.index")}>
                        <ListItem>
                            <ListItemPrefix>
                                <UserPlusIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Asisten
                        </ListItem>
                    </Link>

                    {/* Room */}
                    <Link href={route("room.all")}>
                        <ListItem>
                            <ListItemPrefix>
                                <MapPinIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Ruangan
                        </ListItem>
                    </Link>

                    {/* Event */}
                    <Link href={route("event.all")}>
                        <ListItem>
                            <ListItemPrefix>
                                <CalendarDaysIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Event
                        </ListItem>
                    </Link>

                    {/* RBAC */}
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
                                    <KeyIcon className="h-5 w-5" />
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
                                <Link href={route("rbac.manageRole")}>
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
                                <Link href={route("rbac.assignRoleView")}>
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
                                <Link href={route("rbac.assignRoutes")}>
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

                    {/* Log Out */}
                    <Link href={route("logout")}>
                        <ListItem>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </Link>

                    {/* Laporan */}
                    {/* <ListItem>
            <ListItemPrefix>
              <BookOpenIcon className="h-5 w-5" />
            </ListItemPrefix>
            Laporan
          </ListItem> */}
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
                    <ListItem
                        className="w-fit p-3"
                        onClick={() => setSidebarState(2)}
                    >
                        <Bars3BottomLeftIcon className="w-5 h-5" />
                    </ListItem>

                    {/* Dashboard */}
                    <Link href={route("asisten.dashboard")}>
                        <ListItem className="w-fit p-3">
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItem>
                    </Link>

                    {/* Praktikum */}
                    <Accordion
                        open={open === 2}
                        className="max-w-[60px]"
                        onClick={() => setSidebarState(2)}
                    >
                        <ListItem selected={open === 2} className="p-0 w-fit">
                            <AccordionHeader
                                onClick={() => handleOpen(2)}
                                className="border-b-0 p-3 pr-0"
                            >
                                <ComputerDesktopIcon className="h-5 w-5" />
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link href={route("mahasiswa.daftarPraktikum")}>
                                    <ListItem className="mx-5">
                                        <Square2StackIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItem>
                                </Link>

                                <Link href={route("View Kelas")}>
                                    <ListItem className="mx-5">
                                        <ListItemPrefix>
                                            <EyeIcon
                                                strokeWidth={3}
                                                className="h-3 w-5"
                                            />
                                        </ListItemPrefix>
                                    </ListItem>
                                </Link>

                                <Link href={route("practicum.index")}>
                                    <ListItem className="mx-5">
                                        <ListItemPrefix>
                                            <UserPlusIcon
                                                strokeWidth={3}
                                                className="h-3 w-5"
                                            />
                                        </ListItemPrefix>
                                    </ListItem>
                                </Link>
                            </List>
                        </AccordionBody>
                    </Accordion>

                    {/* Room */}
                    <Link href={route("room.all")}>
                        <ListItem className="w-fit p-3">
                            <MapPinIcon className="h-5 w-5" />
                        </ListItem>
                    </Link>

                    {/* RBAC */}
                    <Accordion
                        open={open === 1}
                        className="max-w-[5vw]"
                        onClick={() => setSidebarState(2)}
                    >
                        <ListItem className="p-0 w-fit" selected={open === 1}>
                            <AccordionHeader
                                onClick={() => handleOpen(1)}
                                className="border-b-0 p-3 pr-0"
                            >
                                <KeyIcon className="h-5 w-5" />
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link href={route("rbac.manageRole")}>
                                    <ListItem>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                        Manage Role
                                    </ListItem>
                                </Link>
                                <Link href={route("rbac.assignRoleView")}>
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
                                <Link href={route("rbac.assignRoutes")}>
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

                    {/* Log Out */}
                    <Link href={route("logout")}>
                        <ListItem className="w-fit p-3">
                            <PowerIcon className="h-5 w-5" />
                        </ListItem>
                    </Link>

                    {/* Laporan */}
                    {/* <ListItem>
            <ListItemPrefix>
              <BookOpenIcon className="h-5 w-5" />
            </ListItemPrefix>
            Laporan
          </ListItem> */}
                </List>
            </Card>
        );
    };

    const mobileSidebarBtn = () => {
        return (
            <IconButton variant="text" className="mx-4 mb-3" onClick={openDrawer}>
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
                            : "w-screen p-5") + " transition-all duration-300 bg-white"
                    }
                >

                    {sidebarState === 0 ? mobileSidebarBtn() : null}
                    {children}

                    {sidebarState === 0 && 
                        <Drawer 
                            open={open2} 
                            onClose={closeDrawer} 
                            className="p-4" 
                            overlayProps={{ className:'fixed backdrop-blur-none' }}
                         >
                            <div className="px-6 flex items-center justify-between">
                                <img src={prodiImg} alt="Logo Prodi" className="w-20" />
                                <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
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
                                {/* Dashboard */}
                                <Link href={route("asisten.dashboard")}>
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

                                {/* Praktikum */}
                                <Accordion
                                    open={open === 2}
                                    className="max-w-[1/5]"
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
                                                <ComputerDesktopIcon className="h-5 w-5" />
                                            </ListItemPrefix>
                                            <Typography
                                                color="blue-gray"
                                                className="mr-auto font-normal"
                                            >
                                                Praktikum
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            <Link href={route("mahasiswa.daftarPraktikum")}>
                                                <ListItem className="mx-5">
                                                    <ListItemPrefix>
                                                        <Square2StackIcon
                                                            strokeWidth={3}
                                                            className="h-3 w-5"
                                                        />
                                                    </ListItemPrefix>
                                                    Daftar Praktikum
                                                </ListItem>
                                            </Link>

                                            <Link href={route("mahasiswa.viewKelasPraktikum")}>
                                                <ListItem className="mx-5">
                                                    <ListItemPrefix>
                                                        <EyeIcon
                                                            strokeWidth={3}
                                                            className="h-3 w-5"
                                                        />
                                                    </ListItemPrefix>
                                                    Lihat Kelas Praktikum
                                                </ListItem>
                                            </Link>

                                            <Link href={route("practicum.index")}>
                                                <ListItem className="mx-5">
                                                    <ListItemPrefix>
                                                        <UserPlusIcon className="h-5 w-5" />
                                                    </ListItemPrefix>
                                                    Asisten
                                                </ListItem>
                                            </Link>
                                        </List>
                                    </AccordionBody>
                                </Accordion>

                                {/* Room */}
                                <Link href={route("room.all")}>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <MapPinIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Ruangan
                                    </ListItem>
                                </Link>

                                {/* Event */}
                                <Link href={route("event.all")}>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <CalendarDaysIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Event
                                    </ListItem>
                                </Link>

                                {/* RBAC */}
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
                                                <KeyIcon className="h-5 w-5" />
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
                                            <Link href={route("rbac.manageRole")}>
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
                                            <Link href={route("rbac.assignRoleView")}>
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
                                            <Link href={route("rbac.assignRoutes")}>
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

                                {/* Log Out */}
                                <Link href={route("logout")}>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <PowerIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Log Out
                                    </ListItem>
                                </Link>

                                {/* Laporan */}
                                {/* <ListItem>
                        <ListItemPrefix>
                        <BookOpenIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Laporan
                    </ListItem> */}
                            </List>
                        </Drawer>
                    }
                </div>
            </div>
        </>
    );
}