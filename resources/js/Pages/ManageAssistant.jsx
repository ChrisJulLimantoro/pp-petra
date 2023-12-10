import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import DataTable, { DataTableContext } from "@/Components/DataTable/DataTable";
import {
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogHeader,
    Input,
    Option,
    Select,
    ThemeProvider,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import NotificationAlert from "@/Components/NotificationAlert";
import ButtonWithLoadingSpinner from "@/Components/ButtonWithLoadingSpinner";

export default function ManageAssistant(props) {
    return (
        <>
            <Head>
                <title>Input Kelas</title>
                <style>{`
                html {  
                    height: 100vh;
                }
                `}</style>
            </Head>
            <SidebarUser routes={props.routes}>
                <main className="">
                    <h1 className="font-medium text-2xl mb-4">
                        Manage Asisten
                    </h1>
                    <hr style={{ borderTopWidth: "3px" }} className="mb-8" />
                    <AssistantTable assistants={props.assistants} />
                </main>
            </SidebarUser>
        </>
    );
}

function AssistantTable(props) {
    let assistants = props.assistants.map((assistant) => {
        const email = assistant.user.email;
        const nrp = email.split("@")[0];
        return {
            id: assistant.user_id,
            nama: assistant.user.name,
            nrp,
            ruangan: assistant.room?.name,
        };
    });
    const [assistantRoleId, setAssistantRoleId] = useState(null);
    const alertRef = useRef();
    const addAssistantDialogRef = useRef();

    useEffect(() => {
        try {
            axios.get(route("assistant.getAssistantRoleId")).then((res) => {
                setAssistantRoleId(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleDelete = async (userId, context) => {
        const res = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
        });
        if (!res.isConfirmed) return;

        const deleteAssistant = axios.delete(route("assistant.delete", userId));
        const unassignAstap = axios.delete(
            route("rbac.unassignRole", [userId, assistantRoleId.astap])
        );
        const unassignAsdos = axios.delete(
            route("rbac.unassignRole", [userId, assistantRoleId.asdos])
        );
        const responses = await Promise.all([
            deleteAssistant,
            unassignAstap,
            unassignAsdos,
        ]);

        if (responses.some((res) => res.status !== 200)) {
            Swal.fire("Error!", "Something went wrong.", "error");
            return;
        }
        assistants = assistants.filter((assistant) => {
            if (assistant.id !== userId) return true;

            alertRef.current?.show(
                `${assistant.nrp} is no longer an Assistant`,
                "green",
                2000
            );
            return false;
        });
        context.updateData(assistants);
    };

    return (
        <div className="pb-2 relative">
            <NotificationAlert
                ref={alertRef}
                className="w-[20rem] fixed top-6 right-10 py-4"
            />
            <DataTable
                className="w-full"
                rawData={assistants}
                columns={["#", "Nama", "NRP", "Ruangan", "Action"]}
            >
                <DataTableContext.Consumer>
                    {(context) => (
                        <>
                            <AddAssistantDialog
                                ref={addAssistantDialogRef}
                                assistantRoleId={assistantRoleId}
                                assistants={assistants}
                                alertRef={alertRef}
                                updateAssistants={(newAssistants) => {
                                    assistants = newAssistants;
                                    context.updateData(assistants);
                                }}
                                context={context}
                            />
                            <Card className="w-full z-1 md:py-0 overflow-auto">
                                <TableHeader
                                    title="Active Assistants"
                                    description="These are the currently active assistants"
                                    className="font-bold"
                                >
                                    <Button
                                        onClick={
                                            addAssistantDialogRef.current
                                                ?.handleOpen
                                        }
                                    >
                                        Add New Assistant
                                    </Button>
                                </TableHeader>

                                <TableBody className="relative">
                                    <TableBody.Head />
                                    <TableBody.Content>
                                        {/* kalau mau custom render taruh di sini */}
                                        {context.paginatedData.map(
                                            (assistant, index) =>
                                                renderCustom(
                                                    assistant,
                                                    index,
                                                    handleDelete,
                                                    context,
                                                    addAssistantDialogRef
                                                        .current?.handleOpen
                                                )
                                        )}
                                    </TableBody.Content>
                                </TableBody>
                                <TableFooter />
                            </Card>
                        </>
                    )}
                </DataTableContext.Consumer>
            </DataTable>
        </div>
    );
}

const renderCustom = (assistant, index, handleDelete, context, handleOpen) => {
    // if no data found
    if (assistant.empty) {
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
                    {index + 1}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {assistant.nama}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {assistant.nrp}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {assistant.ruangan ?? "-"}
                </Typography>
            </TableCell>
            <TableCell>
                <div className="flex gap-5">
                    <Tooltip content="Edit" placement="top">
                        <PencilSquareIcon
                            width={20}
                            cursor={"pointer"}
                            onClick={(e) => {
                                handleOpen(e, assistant.id);
                            }}
                            stroke="orange"
                        />
                    </Tooltip>
                    <Tooltip content="Delete" placement="top">
                        <TrashIcon
                            width={20}
                            cursor={"pointer"}
                            stroke="red"
                            onClick={() => handleDelete(assistant.id, context)}
                        />
                    </Tooltip>
                </div>
            </TableCell>
        </tr>
    );
};

const AddAssistantDialog = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [nrp, setNrp] = useState("");
    const [user, setUser] = useState({});
    const [rooms, setRooms] = useState([]);
    const [assistantToEdit, setAssistantToEdit] = useState(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        axios.get(route("assistant.getRooms")).then((res) => {
            res.data.push({
                id: "",
                name: "-",
            });
            setRooms(res.data);
        });
    }, []);

    const handleOpen = (e, assistantId = null) => {
        setOpen(!open);
        setAssistantToEdit(
            props.assistants.filter(
                (assistant) => assistant.id === assistantId
            )[0] ?? null
        );
        if (open) {
            setNrp("");
            setAssistantToEdit(null);
        }
    };

    useImperativeHandle(ref, () => ({
        handleOpen,
    }));

    useEffect(() => {
        const getUser = setTimeout(async () => {
            const res = await axios.get(route("assistant.getUser", nrp));
            setUser(res.data);
        }, 500);

        return () => {
            clearTimeout(getUser);
        };
    }, [nrp]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        buttonRef.current?.setLoading((prev) => !prev);
        const formData = new FormData(e.target);
        formData.append(
            "room_id",
            document
                .querySelector(`button[name="room"] > span`)
                .getAttribute("value")
        );
        formData.append("email", `${nrp.toLowerCase()}@john.petra.ac.id`);

        let res;
        try {
            res = await axios.post(route("assistant.store"), {
                room_id: formData.get("room_id"),
                email: nrp === "" ? "" : formData.get("email"),
                name: formData.get("name"),
            });
        } catch (error) {
            buttonRef.current?.setLoading((prev) => !prev);
            handleOpen();
            props.alertRef.current?.show(
                error.response.data?.message ?? "Something went wrong.",
                "red",
                2000
            );
            return;
        }

        let newAssistant = {
            id: res.data.data.user_id,
            nama: formData.get("name"),
            nrp,
            ruangan: document.querySelector(`button[name="room"] > span`)
                .innerHTML,
        };

        handleOpen();
        buttonRef.current?.setLoading((prev) => !prev);
        if (res.status !== 200) {
            Swal.fire("Error!", "Something went wrong.", "error");
            return;
        }

        props.alertRef.current?.show(
            "Assistant added successfully",
            "green",
            2000
        );
            
        let newAssistants = [...props.assistants];
        newAssistants.push(newAssistant);
        props.updateAssistants(newAssistants);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        buttonRef.current?.setLoading((prev) => !prev);
        const formData = new FormData(e.target);
        formData.append(
            "room_id",
            document
                .querySelector(`button[name="room"] > span`)
                .getAttribute("value")
        );
        formData.append(
            "email",
            `${formData.get("nrp").toLowerCase()}@john.petra.ac.id`
        );

        const updateUser = axios.patch(
            route("assistant.updateUser", formData.get("user_id")),
            {
                name: formData.get("name"),
                email: formData.get("email"),
            }
        );
        const updateRoom = axios.patch(
            route("assistant.updateRoom", formData.get("user_id")),
            {
                room_id: formData.get("room_id"),
            }
        );

        const responses = await Promise.all([updateUser, updateRoom]);
        const updatedAssistant = {
            id: formData.get("user_id"),
            nama: formData.get("name"),
            nrp: formData.get("nrp"),
            ruangan: document.querySelector(`button[name="room"] > span`)
                .innerHTML,
        };

        buttonRef.current?.setLoading((prev) => !prev);
        handleOpen();
        if (responses.some((res) => res.status !== 200)) {
            Swal.fire("Error!", "Something went wrong.", "error");
            return;
        }

        props.alertRef.current?.show(
            "Assistant updated successfully",
            "green",
            2000
        );
        let newAssistants = props.assistants.map((assistant) => {
            if (assistant.id !== formData.get("user_id")) return assistant;

            return updatedAssistant;
        });
        props.updateAssistants(newAssistants);
    };

    const theme = {
        dialog: {
            styles: {
                base: {
                    backdrop: {
                        backgroundOpacity: "bg-opacity-70",
                        backdropFilter: "backdrop-blur-none",
                    },
                },
            },
        },
    };

    return (
        <ThemeProvider value={theme}>
            <Dialog
                open={open}
                size="sm"
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>
                    <div className="text-center mx-auto text-[#19304B]">
                        {assistantToEdit
                            ? "EDIT ASISTEN"
                            : "TAMBAH ASISTEN BARU"}
                    </div>
                </DialogHeader>
                <DialogBody>
                    <form
                        className="px-10"
                        onSubmit={assistantToEdit ? handleEdit : handleSubmit}
                    >
                        <div className="grid grid-cols-5 mb-3">
                            <label htmlFor="" className="col-span-2 my-2">
                                NRP:
                            </label>
                            <div className="col-span-3">
                                <Input
                                    label="NRP"
                                    name="nrp"
                                    autoComplete="off"
                                    defaultValue={assistantToEdit?.nrp}
                                    onChange={(e) => {
                                        setNrp(e.target.value);
                                    }}
                                    autoFocus
                                />
                            </div>
                        </div>
                        {assistantToEdit ? (
                            <input
                                type="hidden"
                                name="user_id"
                                value={assistantToEdit.id}
                            />
                        ) : (
                            ""
                        )}
                        <div className="grid grid-cols-5 mb-3">
                            <label htmlFor="" className="col-span-2 my-2">
                                Nama:
                            </label>
                            <div className="col-span-3">
                                <Input
                                    name="name"
                                    label="Nama"
                                    autoComplete="off"
                                    defaultValue={
                                        assistantToEdit?.nama ?? user.name
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-5 mb-3">
                            <label htmlFor="" className="col-span-2 my-2">
                                Ruangan:
                            </label>
                            <div className="col-span-3">
                                <Select
                                    label="Room"
                                    name="room"
                                    value={
                                        rooms.filter(
                                            (room) =>
                                                room.name ===
                                                assistantToEdit?.ruangan
                                        )[0]?.id ?? ""
                                    }
                                    onChange={() => {}}
                                >
                                    {rooms.map((room) => (
                                        <Option value={room.id} key={room.id}>
                                            {room.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-center gap-8 mt-8">
                            <Button
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <ButtonWithLoadingSpinner
                                type="submit"
                                className="bg-[#19304B] text-[#FFBC00] min-w-[100px]"
                                ref={buttonRef}
                            >
                                <span>
                                    {assistantToEdit ? "EDIT" : "TAMBAH"}
                                </span>
                            </ButtonWithLoadingSpinner>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </ThemeProvider>
    );
});
