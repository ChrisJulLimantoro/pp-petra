import SidebarUser from "@/Layouts/SidebarUser";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import DataTable from "@/Components/DataTable/DataTable";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import {
    Breadcrumbs,
    Card,
    Tooltip,
    Typography,
    Button,
    Dialog,
    CardBody,
    CardFooter,
    Input,
    Alert,
    Switch,
} from "@material-tailwind/react";
import { Head, useForm } from "@inertiajs/react";
import React, { useState, useReducer, useRef } from "react";
import {
    CheckIcon,
    PencilIcon,
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Index({ events }) {
    const columns = ["Name", "Start date", "End Date", "Status", "Action"];

    const [event, setEvent] = useReducer(eventReducer, events);

    // for the switch
    const initialCheckedStates = events.data.map((event) => event.status === 1);
    const [isSwitchChecked, setIsSwitchChecked] =
        useState(initialCheckedStates);

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [alert, setAlert] = useState({
        isOpen: false,
        color: "gray",
        message: "",
    });

    const [data, setData] = useState({
        name: "",
        startdate: "",
        enddate: "",
        status: "",
    });
    const [data2, setData2] = useState({
        name: "",
        startdate: "",
        enddate: "",
        status: "",
    });
    const [error, setError] = useState();
    const [edit, setEdit] = useState();

    const handleOpen = () => setOpen(!open);
    const handleOpen2 = (index) => {
        setOpen2(!open2);
        setDel(index);
    };

    const handleAdd = (context) =>
        eventReducer(events, { type: "add", context: context });
    const handleSave = (index, context) =>
        eventReducer(events, { type: "save", index: index, context: context });

    const handleDelete = (index, context) => {
        eventReducer(events, {
            type: "delete",
            index: index,
            context: context,
        });
    };

    const resetForm = () => {
        setData({
            name: "",
            startdate: "",
            enddate: "",
            status: "",
        });
        setError(null);
    };

    const showAlert = (message, color) => {
        setAlert({ isOpen: true, color: color, message: message });

        setTimeout(() => {
            setAlert({ ...alert, isOpen: false });
        }, 2000);
    };

    const toggleEdit = (index) => {
        if (edit === index) {
            setEdit(-1);
        } else {
            setEdit(index);
            setData2({
                name: events.data[index].name,
                start_date: events.data[index].start_date,
                end_date: events.data[index].end_date,
                status: events.data[index].status,
            });
        }
    };

    function changeStatus(event, context) {
        let selectedEvent = events.data[event.value];

        let raw = events.data.map((currentEvent) =>
            currentEvent.id === selectedEvent.id
                ? { ...currentEvent, access: event.checked }
                : currentEvent
        );

        let filtered = [...context.filteredData].map((currentEvent) =>
            currentEvent.id === selectedEvent.id
                ? { ...currentEvent, access: event.checked }
                : currentEvent
        );

        axios
            .post(route("event.changeStatus", selectedEvent.id), {
                status: event.checked ? 1 : 0,
            })
            .then((response) => {
                if (response.data.success) {
                    // Update the event status in the local state
                    selectedEvent.status = event.checked ? 1 : 0;
                    context.updateData(raw, filtered);
                    showAlert("Event status updated!", "green");
                } else {
                    showAlert("Something went wrong!", "red");
                }
            })
            .catch((err) => {
                console.log(err);
                showAlert("Something went wrong!", "red");
            });
    }

    function eventReducer(events, action) {
        if (action.type == "add") {
            axios
                .post(route("event.add"), data)
                .then((response) => {
                    if (response.data.success) {
                        resetForm();

                        events.data.push(response.data.data);
                        showAlert("New event added!", "green");
                        setOpen(false);
                    } else {
                        setError(response.data.error_message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    showAlert("Something went wrong!", "red");
                });

            return events;
        } else if (action.type == "save") {
            let selectedevent = events.data[action.index];

            axios
                .post(route("event.edit", selectedevent.id), data2)
                .then((response) => {
                    if (response.data.success) {
                        setData2({
                            name: "",
                            startdate: "",
                            enddate: "",
                            status: "",
                        });

                        events.data[action.index] = response.data.data;
                        showAlert("Event detail updated!", "green");
                        setEdit(-1);
                    } else {
                        showAlert("Something went wrong!", "red");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    showAlert("Something went wrong!", "red");
                });

            return events;
        } else if (action.type == "delete") {
            axios
                .post(route("event.delete", events.data[action.index].id))
                .then((response) => {
                    if (response.data.success) {
                        events.data.splice(action.index, 1);
                        showAlert("Event deleted!", "green");
                    } else {
                        showAlert("Something went wrong!", "red");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    showAlert("Something went wrong!", "red");
                });
        } else {
            throw Error("Unknown action type");
        }
    }

    const renderBody = (event, index, context) => {
        // if no data found
        if (event.empty) {
            return (
                <tr key={"notFound"}>
                    <TableCell colSpan={4}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
                        >
                            No data found
                        </Typography>
                    </TableCell>
                </tr>
            );
        }

        return (
            <tr key={index}>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index +
                            1 +
                            context.perPage * (context.currentPage - 1)}
                    </Typography>
                </TableCell>

                {columns.map((column) =>
                    column !== "Action" ? (
                        column !== "Status" ? (
                            <TableCell>
                                {edit ===
                                index +
                                    context.perPage *
                                        (context.currentPage - 1) ? (
                                    <Input
                                        label=""
                                        size="md"
                                        name={column
                                            .toLowerCase()
                                            .replaceAll(" ", "_")}
                                        variant="standard"
                                        className="text-blue-gray-900"
                                        autoFocus
                                        value={
                                            data2[
                                                column
                                                    .toLowerCase()
                                                    .replaceAll(" ", "_")
                                            ] ??
                                            event[
                                                column
                                                    .toLowerCase()
                                                    .replaceAll(" ", "_")
                                            ]
                                        }
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setData2({
                                                ...data2,
                                                [column
                                                    .toLowerCase()
                                                    .replaceAll(" ", "_")]:
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                ) : (
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {
                                            event[
                                                column
                                                    .toLowerCase()
                                                    .replaceAll(" ", "_")
                                            ]
                                        }
                                    </Typography>
                                )}
                            </TableCell>
                        ) : (
                            <TableCell>
                                <Switch
                                    onChange={(e) => {
                                        const newCheckedStates = [
                                            ...isSwitchChecked,
                                        ];
                                        newCheckedStates[index] =
                                            e.target.checked;
                                        setIsSwitchChecked(newCheckedStates);
                                        changeStatus(e.target, context);
                                    }}
                                    value={index}
                                    checked={isSwitchChecked[index]}
                                />
                            </TableCell>
                        )
                    ) : (
                        <TableCell>
                            <div className="flex gap-5">
                                {edit ===
                                    index +
                                        context.perPage *
                                            (context.currentPage - 1) && (
                                    <>
                                        <Tooltip content="Save" placement="top">
                                            <CheckIcon
                                                width={20}
                                                cursor="pointer"
                                                stroke="green"
                                                onClick={() =>
                                                    handleSave(
                                                        index +
                                                            context.perPage *
                                                                (context.currentPage -
                                                                    1),
                                                        context
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            content="Cancel"
                                            placement="top"
                                        >
                                            <XMarkIcon
                                                width={20}
                                                cursor="pointer"
                                                stroke="red"
                                                onClick={() => toggleEdit(-1)}
                                            />
                                        </Tooltip>
                                    </>
                                )}

                                {edit !==
                                    index +
                                        context.perPage *
                                            (context.currentPage - 1) && (
                                    <>
                                        <Tooltip content="Edit" placement="top">
                                            <PencilSquareIcon
                                                width={20}
                                                cursor={"pointer"}
                                                stroke="orange"
                                                onClick={() =>
                                                    toggleEdit(
                                                        index +
                                                            context.perPage *
                                                                (context.currentPage -
                                                                    1)
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            content="Delete"
                                            placement="top"
                                        >
                                            <TrashIcon
                                                width={20}
                                                cursor={"pointer"}
                                                stroke="red"
                                                onClick={() =>
                                                    handleDelete(
                                                        index +
                                                            context.perPage *
                                                                (context.currentPage -
                                                                    1),
                                                        context
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </div>
                        </TableCell>
                    )
                )}
            </tr>
        );
    };

    return (
        <SidebarUser>
            <Head>
                <title>Add Event</title>
            </Head>

            {alert.isOpen && (
                <Alert
                    open={true}
                    onClose={() => setAlert({ ...alert, isOpen: false })}
                    animate={{
                        mount: { y: 0 },
                        unmount: { y: 100 },
                    }}
                    color={alert.color}
                    className="fixed top-0 right-2 m-5 px-7 w-50 z-50"
                >
                    {alert.message}
                </Alert>
            )}

            <Breadcrumbs className="mb-2">
                <a href={route("dashboard")} className="opacity-60">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </a>
                <a href="#" className="opacity-60">
                    <span>RBAC</span>
                </a>
                <a href={route("event.all")}>Manage Events</a>
            </Breadcrumbs>

            <DataTable
                className="w-full"
                rawData={events.data}
                columns={["Name", "Start Date", "End Date", "Status", "Action"]}
                changeStatus={changeStatus}
            >
                <DataTableContext.Consumer>
                    {(context) => (
                        <>
                            <Card className="max-w-full z-1 md:py-0 overflow-auto">
                                <TableHeader title="Available Events">
                                    <Button onClick={handleOpen}>
                                        Add New Event
                                    </Button>
                                </TableHeader>

                                <TableBody className="relative">
                                    <TableBody.Head />
                                    <TableBody.Content>
                                        {context.paginatedData.map(
                                            (event, index) =>
                                                renderBody(
                                                    event,
                                                    index,
                                                    context
                                                )
                                        )}
                                    </TableBody.Content>
                                </TableBody>

                                <TableFooter />
                            </Card>

                            {/* Add room modal */}
                            <Dialog
                                size="xs"
                                open={open}
                                handler={handleOpen}
                                className="bg-transparent shadow-none"
                            >
                                <Card className="mx-auto w-full max-w-[24rem]">
                                    <CardBody className="flex flex-col gap-4">
                                        <Typography
                                            variant="h4"
                                            color="blue-gray"
                                        >
                                            Add New Event
                                        </Typography>

                                        <Typography variant="h6">
                                            Name
                                        </Typography>
                                        <Input
                                            label="Name"
                                            name="name"
                                            size="lg"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    name: e.target.value,
                                                })
                                            }
                                            error={error?.name}
                                            success={error?.name}
                                        />
                                        {error?.name && (
                                            <Typography color="red">
                                                {error.name}
                                            </Typography>
                                        )}

                                        <Typography variant="h6">
                                            Start Date
                                        </Typography>
                                        <Input
                                            label="start date"
                                            name="startdate"
                                            size="lg"
                                            type="date"
                                            value={data.startdate}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    startdate: e.target.value,
                                                })
                                            }
                                            error={error?.startdate}
                                            success={error?.startdate}
                                        />
                                        {error?.startdate && (
                                            <Typography color="red">
                                                {error.startdate}
                                            </Typography>
                                        )}

                                        <Typography variant="h6">
                                            End Date
                                        </Typography>
                                        <Input
                                            label="End Date"
                                            name="enddate"
                                            size="lg"
                                            type="date"
                                            value={data.enddate}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    enddate: e.target.value,
                                                })
                                            }
                                            error={error?.enddate}
                                            success={error?.enddate}
                                        />
                                        {error?.enddate && (
                                            <Typography color="red">
                                                {error.enddate}
                                            </Typography>
                                        )}
                                    </CardBody>
                                    <CardFooter className="pt-0 flex gap-3">
                                        <Button
                                            variant="filled"
                                            className="w-1/2"
                                            onClick={() => handleAdd(context)}
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            variant="text"
                                            className="w-1/2"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Dialog>
                        </>
                    )}
                </DataTableContext.Consumer>
            </DataTable>
        </SidebarUser>
    );
}
