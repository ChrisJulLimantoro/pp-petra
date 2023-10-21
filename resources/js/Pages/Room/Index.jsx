import SidebarLayout from "@/Layouts/SidebarLayout";
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
} from "@material-tailwind/react";
import { Head, useForm } from "@inertiajs/react";
import React, { useState, useReducer, useRef } from "react";
import { CheckIcon, PencilIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Index({ rooms }) {
    const [room, setRoom] = useReducer(roomReducer, rooms)

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    
    const [alert, setAlert] = useState({isOpen: false, color: 'gray', message: ''});

    const [data, setData] = useState({name: '', code: '', capacity: 0});
    const [data2, setData2] = useState({name: '', code: '', capacity: 0});
    const [error, setError] = useState();
    const [edit, setEdit] = useState();

    const handleOpen = () => setOpen(!open);
    const handleOpen2 = (index) => {setOpen2(!open2); setDel(index)};

    const handleAdd = (context) => roomReducer(rooms, {type: 'add', context: context});
    const handleSave = (index, context) => roomReducer(rooms, {type: 'save', index: index, context: context});

    const resetForm = () => {
        setData({
            name: '',
            code: '',
            capacity: 0,
        })
        setError(null)
    }

    const showAlert = (message, color) => {
        setAlert({isOpen: true, color: color, message: message});

        setTimeout(() => {
            setAlert({...alert, isOpen: false})
        }, 2000);
    }

    const toggleEdit = (index) => {
        if (edit === index) {
            setEdit(-1)
        }
        else {
            setEdit(index)
            setData2({name: rooms.data[index].name, code: rooms.data[index].code, capacity: rooms.data[index].capacity})
        }
    }

    function roomReducer(rooms, action) {
        if (action.type == 'add') { 
            axios.post(route('room.add'), data)
            .then((response) => {
                if (response.data.success) {
                    resetForm();
    
                    rooms.data.unshift(response.data.data)
                    action.context.updateData(rooms.data)
                    showAlert("New room added!", 'green')
                    setOpen(false)
                }
                else {
                    setError(response.data.error_message)
                }
            })
            .catch((err) => {
                console.log(err)
                showAlert("Something went wrong!", 'red')
            })

            return rooms;
        }

        else if (action.type == 'save') {
            let selectedroom = rooms.data[action.index]

            axios.post(route('room.edit', selectedroom.id), data2)
            .then((response) => {
                if (response.data.success) {
                    setData2({name: '', code: '', capacity: ''});
                    
                    rooms.data[action.index] = response.data.data;
                    action.context.updateData(rooms.data);
                    showAlert("Room detail updated!", 'green');
                    setEdit(-1);
                }
                else {
                    showAlert("Something went wrong!", 'red')
                }
            })
            .catch((err) => {
                console.log(err)
                showAlert("Something went wrong!", 'red')
            })

            return rooms;
        }

        else {
            throw Error('Unknown action type')
        }
    }

    const renderBody = (room, index, context) => {
        // if no data found
        if (room.empty) {
            return (
                <tr key={'notFound'}>
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
            <tr key={room.slug ?? index}>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index + 1 + (context.perPage * (context.currentPage - 1))}
                    </Typography>
                </TableCell>

                <TableCell>
                    {edit === index + (context.perPage * (context.currentPage - 1)) ? (
                        <Input 
                            label='' 
                            size='md' 
                            name='name'
                            variant="standard" 
                            className="text-blue-gray-900"
                            autoFocus
                            value={data2.name ?? room.name} 
                            onChange={(e) => {console.log(e.target.value); setData2({...data2, name: e.target.value})}} 
                        />
                    ) : (
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {room.name}
                        </Typography>
                    )}
                </TableCell>

                <TableCell>
                    {edit === index + (context.perPage * (context.currentPage - 1)) ? (
                        <Input 
                            label='' 
                            size='md' 
                            name='code'
                            variant="standard" 
                            className="text-blue-gray-900"
                            value={data2.code ?? room.code} 
                            onChange={(e) => setData2({...data2, code: e.target.value})} 
                        />
                    ) : (
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {room.code}
                        </Typography>
                    )}
                </TableCell>

                <TableCell>
                    {edit === index + (context.perPage * (context.currentPage - 1)) ? (
                        <Input 
                            label=''
                            type="number"
                            size='md' 
                            name='capacity'
                            variant="standard" 
                            className="text-blue-gray-900"
                            value={parseInt(data2.capacity) ?? parseInt(room.capacity)} 
                            onChange={(e) => setData2({...data2, capacity: parseInt(e.target.value)})} 
                        />
                    ) : (
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {room.capacity}
                        </Typography>
                    )}
                </TableCell>

                <TableCell>
                    <div className="flex gap-5">
                        {edit === index + (context.perPage * (context.currentPage - 1)) && (
                            <>
                                <Tooltip content="Save" placement="top">
                                    <CheckIcon onClick={() => handleSave(index + (context.perPage * (context.currentPage-1)), context)} width={20} cursor='pointer' stroke="green" />
                                </Tooltip>
                                <Tooltip content="Cancel" placement="top">
                                    <XMarkIcon width={20} cursor='pointer' stroke="red" onClick={() => toggleEdit(-1)} />
                                </Tooltip>
                            </>
                        )} 

                        {edit !== index + (context.perPage * (context.currentPage - 1)) && (
                            <>
                                <Tooltip content="Edit" placement="top">
                                    <PencilSquareIcon 
                                        width={20} 
                                        cursor={'pointer'} 
                                        stroke="orange" 
                                        onClick={() => toggleEdit(index + (context.perPage * (context.currentPage-1)))}
                                    /> 
                                </Tooltip>
                            </>
                        )}
                    </div>
                </TableCell>
            </tr>
        );
    }

    return (
        <SidebarLayout>
            <Head>
                <title>Add room</title>
            </Head>

            {alert.isOpen && (
                <Alert
                    open={true}
                    onClose={() => setAlert({...alert, isOpen: false})}
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
                <a href={route('dashboard')} className="opacity-60">
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
                <a href={route('room.all')}>Manage Room</a>
            </Breadcrumbs>

            <DataTable
                className="w-full" 
                rawData={rooms.data} 
                columns={['Name', 'Code', 'Capacity', 'Action']}
            >
                <DataTableContext.Consumer>
                    {(context) => (
                        <>
                            <Card className="max-w-full z-1 md:py-0 overflow-auto">
                                <TableHeader title="Available Rooms">
                                    <Button onClick={handleOpen}>Add New Room</Button>
                                </TableHeader>

                                <TableBody className="relative">
                                    <TableBody.Head />
                                    <TableBody.Content>
                                        {context.paginatedData.map((room, index) => renderBody(room, index, context))}
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
                                        <Typography variant="h4" color="blue-gray">
                                            Add New Room
                                        </Typography>

                                        <Typography variant="h6">
                                            Name
                                        </Typography>
                                        <Input 
                                            label="Name" 
                                            name="name"
                                            size="lg" 
                                            value={data.name} 
                                            onChange={(e) => setData({...data, name: e.target.value})} 
                                            error={error?.name}
                                            success={error?.name}
                                        />
                                        {error?.name && <Typography color="red">{error.name}</Typography>}

                                        <Typography variant="h6">
                                            Code
                                        </Typography>
                                        <Input 
                                            label="Code" 
                                            name="code"
                                            size="lg" 
                                            value={data.code} 
                                            onChange={(e) => setData({...data, code: e.target.value})} 
                                            error={error?.code}
                                            success={error?.code}
                                        />
                                        {error?.code && <Typography color="red">{error.code}</Typography>}

                                        <Typography variant="h6">
                                            Capacity
                                        </Typography>
                                        <Input 
                                            label="Capacity" 
                                            name="capacity"
                                            size="lg" 
                                            value={data.capacity} 
                                            onChange={(e) => setData({...data, capacity: e.target.value})} 
                                            error={error?.capacity}
                                            success={error?.capacity}
                                        />
                                        {error?.capacity && <Typography color="red">{error.capacity}</Typography>}
                                    </CardBody>
                                    <CardFooter className="pt-0 flex gap-3">
                                        <Button variant="filled" className="w-1/2"onClick={() => handleAdd(context)}>Add</Button>
                                        <Button variant="text" className="w-1/2" onClick={() => setOpen(false)}>Cancel</Button>
                                    </CardFooter>
                                </Card>
                            </Dialog>
                        </>
                    )}
                </DataTableContext.Consumer>
            </DataTable>
        </SidebarLayout>
    );
}

