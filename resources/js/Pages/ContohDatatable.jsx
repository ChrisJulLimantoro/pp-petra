import React, { useState } from 'react'
import { Button, Card, Typography, Tooltip, Select, Option } from '@material-tailwind/react'
import DataTable from '@/Components/DataTable/DataTable'
import { DataTableContext } from '@/Components/DataTable/DataTable'
import TableHeader from '@/Components/DataTable/TableHeader'
import TableBody from '@/Components/DataTable/TableBody'
import TableFooter from '@/Components/DataTable/TableFooter'
import TableCell from '@/Components/DataTable/TableCell'
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ContohDatatable() {
    const roles = []
    const routes = []

    for (let i = 1; i <= 10; i++)
        roles.push({
            name: 'Role ' + i,
            slug: 'role-' + i 
        })

    let counter = 1
    roles.map((role) => {
        for (let i = 1; i <= Math.random() * 10; i++) {
            routes.push({
                role: role.name,
                url: 'route-' + counter,
                method: 'GET'
            })
            counter++
        }
    })

    const [selectedRole, setSelectedRole] = useState(roles[0])

    // custom render function
    const renderCustom = (route, index) => {
        // if no data found
        if (route.empty) {
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

        return(
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
                        {route.url}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {route.method}
                    </Typography>
                </TableCell>
                <TableCell>
                    <div className="flex gap-5">
                        <Tooltip content="Edit" placement="top">
                            <PencilSquareIcon width={20} cursor={'pointer'} stroke="orange" /> 
                        </Tooltip>
                        <Tooltip content="Delete" placement="top">
                            <TrashIcon width={20} cursor={'pointer'} stroke="red"  />
                        </Tooltip>
                    </div>
                </TableCell>
            </tr>
        )
    }

    const handleChange = (e, context) => {
        setSelectedRole(roles.find(role => role.name === e))
        context.updateData(routes.filter(route => route.role === e)) // sync data with parent component
    }

    return (
        <div className='bg-gray-50 p-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {/* Contoh 1 */}
                <div>
                    <h1 className='font-bold text-xl'>Contoh 1</h1>
                    <p className='mb-5'>Buat nampilin data statis atau view only</p>

                    <DataTable
                        className="w-full" 
                        rawData={roles /* data taruh sini */}     
                        columns={['Name', 'Slug'] 
                        /* nama kolom taruh di sini, kalau nama kolom di data ada spasinya, ganti jadi _ */}
                    >
                        <Card className="w-full z-1 md:py-0 overflow-auto">
                            <TableHeader 
                                title="Available Roles" /* judul tabel */
                                description="This are the currently active roles"
                                className="font-bold"
                            >
                                <Button>Add New Role</Button>
                            </TableHeader>

                            <TableBody className="relative">
                                <TableBody.Head />
                                <TableBody.Content />
                            </TableBody>

                            <TableFooter />
                        </Card>
                    </DataTable>
                </div>

                {/* Contoh 2 */}
                <div>
                    <h1 className='font-bold text-xl'>Contoh 2</h1>
                    <p className='mb-5'>Data statis dengan custom render</p>

                    <DataTable
                        className="w-full" 
                        rawData={routes }     
                        columns={['URL', 'Method', 'Action']} 
                    >
                        <DataTableContext.Consumer>
                            {(context) => (
                                <Card className="w-full z-1 md:py-0 overflow-auto">
                                    <TableHeader 
                                        title="Available Routes"
                                        description="This are the currently active routes"
                                        className="font-bold"
                                    >
                                        <Button>Add New Route</Button>
                                    </TableHeader>

                                    <TableBody className="relative">
                                        <TableBody.Head />
                                        <TableBody.Content>
                                            {/* kalau mau custom render taruh di sini */}
                                            {context.paginatedData.map((route, index) => renderCustom(route, index))}
                                        </TableBody.Content>
                                    </TableBody>

                                    <TableFooter />
                                </Card>
                            )}
                        </DataTableContext.Consumer>
                    </DataTable>
                </div> 
            </div>

            {/* Contoh 3 */}
            <div className="w-full pt-10">
                <h1 className='font-bold text-xl'>Contoh 3</h1>
                <p className='mb-5'>Data dinamis dengan custom render</p>

                <DataTable
                        className="w-full overflow-hidden" 
                        rawData={routes.filter(route => route.role === selectedRole.name)}
                        columns={['URL', 'Method', 'Action']}
                    >
                    <DataTableContext.Consumer>
                        {(context) => (
                            <Card className="w-full z-[1]">
                                <TableHeader 
                                    title="Show Routes by Role"
                                >
                                    <div className="flex w-20 justify-center md:justify-start z-20">
                                        {/* select role */}
                                        <Select 
                                            variant="outlined" 
                                            label="Select Role"
                                            value={selectedRole.name ?? ''}
                                            onChange = {(e) => handleChange(e, context)}
                                            className="relative z-99"
                                        >
                                            {roles.map((role, index) => (
                                                <Option key={role.name ?? index} value={role.name}>
                                                    {role.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </TableHeader>

                                <TableBody className="relative">
                                    <TableBody.Head />
                                    <TableBody.Content>
                                        {context.paginatedData.map((r, value) => renderCustom(r, value))}
                                    </TableBody.Content>
                                </TableBody>
    
                                <TableFooter />
                            </Card>
                        )}
                    </DataTableContext.Consumer>
                </DataTable>
            </div>
        </div>
    )
}
