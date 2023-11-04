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
} from "@material-tailwind/react";
import { Head } from "@inertiajs/react";
import React, { useState, useRef } from "react";
import { CheckIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ManageRole({ roles }) {
    const columns = ['Name', 'Slug', 'Action']

    const role = useRef(roles.data)

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    
    const [alert, setAlert] = useState({isOpen: false, color: 'gray', message: ''});

    const [data, setData] = useState({name: '', slug: ''});
    const [data2, setData2] = useState({name: '',slug: ''});
    const [error, setError] = useState();
    const [edit, setEdit] = useState();
    const [del, setDel] = useState(0);

    const handleOpen = () => setOpen(!open);
    const handleOpen2 = (index) => {setOpen2(!open2); setDel(index)};

    const handleAdd = () => roleReducer(role.current, {type: 'add'});
    const handleSave = (index) => roleReducer(role.current, {type: 'save', index: index});
    const handleDelete = (index, context) => roleReducer(role.current, {type: 'delete', index: index, context: context});

    const resetForm = () => {
        setData({
            name: '',
            slug: '',
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
            setData2({name: roles.data[index].name, slug: roles.data[index].slug})
        }
    }

    function roleReducer(role, action) {
        if (action.type == 'add') {
            axios.post(route('rbac.addRole'), data)
            .then((response) => {
                if (response.data.success) {
                    resetForm();
    
                    role.unshift(response.data.data)
                    showAlert("New role added!", 'green')
                    setOpen(false)
                }
                else {
                    setError(response.data.error_message)

                    if (error == 'role already exists') {
                        setOpen(false)
                        showAlert("Role already exist!", 'red')
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                showAlert("Something went wrong!", 'red')
            })
        }

        else if (action.type == 'save') {
            let selectedRole = role[action.index]

            axios.post(route('rbac.editRole', selectedRole.id), data2)
            .then((response) => {
                if (response.data.success) {
                    setData2({name: '', slug: ''});
                    
                    role[action.index] = response.data.data;
                    showAlert("Role edited!", 'green');
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
        }

        else if (action.type == 'delete') {
            let selectedRole = role[action.index]

            axios.delete(route('rbac.deleteRole', selectedRole.id))
            .then((response) => {   
                if (response.data.success) {
                    role = role.filter(r => r.id !== selectedRole.id);
                    action.context.updateData(role)
                    showAlert(selectedRole.name + " role deleted!", 'green');
                }
                else {
                    if (response.data.error_message === 'cannot delete admin role') {
                        showAlert("Can't delete that role!", 'red')
                    }
                    else {
                        showAlert("Something went wrong!", 'red')
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                showAlert("Something went wrong!", 'red')
            })

            setDel(0);
            setOpen2(false);
        }

        else {
            throw Error('Unknown action type')
        }
    }

    const renderBody = (role, index, context) => {
        // if no data found
        if (role.empty) {
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
            <tr key={role.slug ?? index}>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index + 1 + (context.perPage * (context.currentPage - 1))}
                    </Typography>
                </TableCell>

                {columns.map((column) => (
                    column !== "Action" ? (
                        <TableCell>
                            {edit === index + (context.perPage * (context.currentPage - 1)) ? (
                                <Input 
                                    label='' 
                                    size='md' 
                                    name={column.toLowerCase().replaceAll(' ', '_')}
                                    variant="standard" 
                                    className="text-blue-gray-900"
                                    autoFocus
                                    value={data2[column.toLowerCase().replaceAll(" ", "_")] ?? role[column.toLowerCase().replaceAll(" ", "_")]} 
                                    onChange={(e) => {console.log(e.target.value); setData2({...data2, [column.toLowerCase().replaceAll(" ", "_")]: e.target.value})}} 
                                />
                            ) : (
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {role[column.toLowerCase().replaceAll(" ", "_")]}
                                </Typography>
                            )}
                        </TableCell>
                    ) : (
                        <TableCell>
                            <div className="flex gap-5">
                                {edit === index + (context.perPage * (context.currentPage - 1)) && (
                                    <>
                                        <Tooltip content="Save" placement="top">
                                            <CheckIcon 
                                            width={20} 
                                            cursor='pointer' 
                                            stroke="green"
                                            onClick={() => handleSave(index + (context.perPage * (context.currentPage-1)), context)} />
                                        </Tooltip>
                                        <Tooltip content="Cancel" placement="top">
                                            <XMarkIcon 
                                            width={20} 
                                            cursor='pointer' 
                                            stroke="red" 
                                            onClick={() => toggleEdit(-1)} />
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
                                        <Tooltip content="Delete" placement="top">
                                            <TrashIcon 
                                                width={20} 
                                                cursor={'pointer'} 
                                                stroke="red"
                                                onClick={() => handleOpen2(index + (context.perPage * (context.currentPage-1)))}  
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </div>
                        </TableCell>
                    )
                ))}
            </tr>
        );
    }

    return (
        <SidebarUser>
            <Head>
                <title>Add Role</title>
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
                <a href={route('rbac.manageRole')}>Add New Role</a>
            </Breadcrumbs>

            <DataTable
                className="w-full" 
                rawData={roles.data} 
                columns={columns}
            >
                <DataTableContext.Consumer>
                    {(context) => (
                        <>
                            <Card className="max-w-full z-1 md:py-0 overflow-auto">
                                <TableHeader title="Roles Avaliable">
                                    <Button onClick={handleOpen}>Add New Role</Button>
                                </TableHeader>

                                <TableBody className="relative">
                                    <TableBody.Head />
                                    <TableBody.Content>
                                        {context.paginatedData.map((role, index) => renderBody(role, index, context))}
                                    </TableBody.Content>
                                </TableBody>

                                <TableFooter />
                            </Card>

                            {/* Add role modal */}
                            <Dialog
                                size="xs"
                                open={open}
                                handler={handleOpen}
                                className="bg-transparent shadow-none"
                            >
                                <Card className="mx-auto w-full max-w-[24rem]">
                                    <CardBody className="flex flex-col gap-4">
                                        <Typography variant="h4" color="blue-gray">
                                            Add New Role
                                        </Typography>

                                        <Typography variant="h6">
                                            Role Name
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
                                            Role Slug
                                        </Typography>
                                        <Input 
                                            label="Slug" 
                                            name="slug"
                                            size="lg" 
                                            value={data.slug} 
                                            onChange={(e) => setData({...data, slug: e.target.value})} 
                                            error={error?.slug}
                                            success={error?.slug}
                                        />
                                        {error?.slug && <Typography color="red">{error.slug}</Typography>}
                                    </CardBody>
                                    <CardFooter className="pt-0 flex gap-3">
                                        <Button variant="filled" className="w-1/2"onClick={() => handleAdd(context)}>Add</Button>
                                        <Button variant="text" className="w-1/2" onClick={() => setOpen(false)}>Cancel</Button>
                                    </CardFooter>
                                </Card>
                            </Dialog>

                            {/* Delete role modal */}
                            <Dialog
                                size="xs"
                                open={open2}
                                handler={handleOpen2}
                                className="bg-transparent shadow-none"
                            >
                                <Card className="mx-auto w-full max-w-[24rem]">
                                    <CardBody className="flex flex-col gap-4">
                                        <Typography className="mb-2" variant="h5">
                                            {"Delete " + roles.data[del].name + " role?"}
                                        </Typography>
                                            
                                    </CardBody>
                                    <CardFooter className="pt-0 flex gap-3">
                                        <Button variant="filled" color="red" className="w-1/2" onClick={() => handleDelete(del, context)}>Delete</Button>
                                        <Button variant="text" className="w-1/2" onClick={() => setOpen2(false)}>Cancel</Button>
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
