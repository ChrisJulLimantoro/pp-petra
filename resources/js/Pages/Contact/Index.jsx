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
    Select,
    Option,
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

export default function Index({ contacts, routes }) {
    const columns = ["phone", "type", "Action"];

    const contact = useRef(contacts.data);

    const [open, setOpen] = useState(false);

    const [alert, setAlert] = useState({
        isOpen: false,
        color: "gray",
        message: "",
    });

    const [data, setData] = useState({ phone: "", type: 0 });
    const [data2, setData2] = useState({ phone: "", type: 0 });
    const [error, setError] = useState();
    const [edit, setEdit] = useState();
    const [isEditing, setIsEditing] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleAdd = (context) =>
        contactHandler(contact.current, { type: "add", context: context });
    const handleSave = (index, context) =>
        contactHandler(contact.current, {
            type: "save",
            index: index,
            context: context,
        });

    const handleDelete = (index, context) => {
        contactHandler(contact.current, {
            type: "delete",
            index: index,
            context: context,
        });
    };

    const resetForm = () => {
        setData({
            phone: "",
            type: 0,
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
        setTimeout(() => {
            setIsEditing(true);
            setEdit(index);
            setData2({
                phone: contact.current[index].phone,
                type: contact.current[index].type,
            });
        }, 100);
        handleOpen();
    };

    function contactHandler(contact, action) {
        if (action.type == "add") {
            axios
                .post(route("contact.store"), data)
                .then((response) => {
                    if (response.data.success) {
                        resetForm();

                        contact.unshift(response.data.data);
                        showAlert("New contact added!", "green");
                        setOpen(false);
                    } else {
                        setError(response.data.error_message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    showAlert("Something went wrong!", "red");
                });

            return contacts;
        } else if (action.type == "save") {
            let selectedcontact = contact[action.index];

            axios
                .post(route("contact.update", selectedcontact.id), data2)
                .then((response) => {
                    if (response.data.success) {
                        setData2({ name: "", code: "", capacity: "" });

                        contact[action.index] = response.data.data;
                        showAlert("contact detail updated!", "green");
                        setEdit(-1);
                    } else {
                        showAlert("Something went wrong!", "red");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    showAlert("Something went wrong!", "red");
                });

            return contacts;
        } else if (action.type == "delete") {
            let selectedcontact = contact[action.index];

            axios
                .delete(route("contact.destroy", selectedcontact.id))
                .then((response) => {
                    if (response.data.success) {
                        contact.splice(action.index, 1);
                        showAlert("contact deleted!", "green");
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

    const renderBody = (contact, index, context) => {
        // if no data found
        if (contact.empty) {
            return (
                <tr key={"notFound"}>
                    <TableCell colSpan={4} className="z-50">
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
            <tr key={contact.id}>
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
                        column === "type" ? (
                            <TableCell key={column + index}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {contact.type == 1
                                        ? "WhatsApp"
                                        : contact.type == 2
                                        ? "Line"
                                        : "Instagram"}
                                </Typography>
                            </TableCell>
                        ) : (
                            <TableCell key={column + index}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {
                                        contact[
                                            column
                                                .toLowerCase()
                                                .replaceAll(" ", "_")
                                        ]
                                    }
                                </Typography>
                            </TableCell>
                        )
                    ) : (
                        <TableCell>
                            <div className="flex gap-5">
                                <>
                                    <Tooltip content="Edit" placement="top">
                                        <PencilSquareIcon
                                            width={20}
                                            cursor={"pointer"}
                                            stroke="orange"
                                            onClick={() => toggleEdit(index)}
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
                            </div>
                        </TableCell>
                    )
                )}
            </tr>
        );
    };

    return (
        <SidebarUser routes={routes}>
            <Head>
                <title>Manage Contact Person</title>
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
                    className="fixed top-0 right-2 m-5 px-7 w-50 z-[999]"
                >
                    {alert.message}
                </Alert>
            )}

            <div className="mt-10 md:mt-0 md:px-6">
                <Breadcrumbs className="mb-5">
                    <a href={route("asisten.dashboard")} className="opacity-60">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </a>
                    <a href={route("Contact")}>Manage contact</a>
                </Breadcrumbs>

                <DataTable
                    className="w-full"
                    rawData={contacts.data}
                    columns={["#", "Phone", "Type", "Action"]}
                >
                    <DataTableContext.Consumer>
                        {(context) => (
                            <>
                                <Card className="max-w-full z-1 md:py-0 overflow-auto border border-gray-200">
                                    <TableHeader title="Available contacts">
                                        <Button onClick={handleOpen}>
                                            Add New contact
                                        </Button>
                                    </TableHeader>

                                    <TableBody className="relative">
                                        <TableBody.Head />
                                        <TableBody.Content>
                                            {context.paginatedData.map(
                                                (contact, index) =>
                                                    renderBody(
                                                        contact,
                                                        index,
                                                        context
                                                    )
                                            )}
                                        </TableBody.Content>
                                    </TableBody>

                                    <TableFooter />
                                </Card>

                                {/* Add contact modal */}
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
                                                {isEditing ? "Edit Contact" : "Add New Contact"}
                                            </Typography>

                                            <Typography variant="h6">
                                                Phone or Id
                                            </Typography>
                                            <Input
                                                label="Phone"
                                                name="phone"
                                                size="lg"
                                                value={isEditing ? data2.phone : data.phone}
                                                onChange={(e) =>
                                                    isEditing ?
                                                    setData2({
                                                        ...data2,
                                                        phone: e.target.value,
                                                    }) :
                                                    setData({
                                                        ...data,
                                                        phone: e.target.value,
                                                    })
                                                }
                                                error={error?.phone}
                                                success={error?.phone}
                                            />
                                            {error?.phone && (
                                                <Typography color="red">
                                                    {error.phone}
                                                </Typography>
                                            )}

                                            <Typography variant="h6">
                                                Type
                                            </Typography>
                                            <Select
                                                label="Select Type"
                                                onChange={(e) => {
                                                    isEditing ?
                                                    setData2({
                                                        ...data2,
                                                        type: e,
                                                    }) :
                                                    setData({
                                                        ...data,
                                                        type: e,
                                                    });
                                                }}
                                                value={isEditing ? data2.type.toString() : data.type.toString()}
                                                error={error?.type}
                                                success={error?.type}
                                            >
                                                <Option key="1" value="1">
                                                    WhatsApp
                                                </Option>
                                                <Option key="2" value="2">
                                                    Line
                                                </Option>
                                                <Option key="3" value="3">
                                                    Instagram
                                                </Option>
                                            </Select>
                                        </CardBody>
                                        <CardFooter className="pt-0 flex gap-3">
                                            <Button
                                                variant="filled"
                                                className="w-1/2"
                                                onClick={() =>
                                                    isEditing ? 
                                                    handleSave(edit, context) :
                                                    handleAdd(context)
                                                }
                                            >
                                                Add
                                            </Button>
                                            <Button
                                                variant="text"
                                                className="w-1/2"
                                                onClick={() => {setOpen(false); setIsEditing(false)}}
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
            </div>
        </SidebarUser>
    );
}
