import React, { useState, useRef } from 'react'
import { Head } from '@inertiajs/react'
import SidebarUser from "@/Layouts/SidebarUser";
import DataTable from '@/Components/DataTable/DataTable';
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import NotificationAlert from "@/Components/NotificationAlert";
import { Card, Select, Option, Spinner, Typography } from '@material-tailwind/react';

export default function DetailReport({ title, subjects, initialReport }) {
    const [activeSubject, setActiveSubject] = useState(subjects[0].id);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialReport);
    const alertRef = useRef();
    const columns = ['#', 'Name', 'Name', 'Program', 'Semester']

    const loadData = (subject) => {
        setLoading(true);
        axios.get(route('asisten.getReportData', subject))
        .then((response) => {
            setLoading(false)
            setData(response.data)
            setActiveSubject(subject);
        })
        .catch((err) => {
            console.log(err)
            alertRef.current?.show(
                "Error",
                "red", 
                2000 
            );
        })
    }

    const renderBody = (data, index, context) => {
        if (data.empty) {
            return (
                <tr key={"notFound"}>
                    <TableCell colSpan={columns.length}>
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
            <tr key={data.id}>
                {columns.map((column) => (
                    column === '#' ? (
                        <TableCell>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {index + 1 + context.perPage * (context.currentPage - 1)}
                            </Typography>
                        </TableCell> 
                    ) : 
                    column === 'Program' ? (
                        <TableCell key={column}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {
                                    data[column.toLowerCase().replaceAll(" ", "_")] === 'i' ? 
                                    'Informatika' : 
                                    data[column.toLowerCase().replaceAll(" ", "_")] === 's' ? 
                                    'SIB' : 'DSA'
                                }
                            </Typography>
                        </TableCell>
                    ) : (
                        <TableCell key={column}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {data[column.toLowerCase().replaceAll(" ", "_")]}
                            </Typography>
                        </TableCell>
                    )
                ))}
            </tr>
        )
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <SidebarUser>
                <NotificationAlert 
                    ref={alertRef}
                    className="w-[20rem] fixed top-6 right-10 py-4 z-10"
                    defaultColor="red" // optional default green
                    defaultShowTime={4000} // optional default 1000 ms
                />

                <DataTable
                    className="w-full overflow-hidden" 
                    rawData={data}
                    columns={columns}
                >
                    <DataTableContext.Consumer>
                        {(context) => (
                            <Card className="w-full z-[1]">
                                <TableHeader 
                                    title="Mahasiswa yang belum daftar"
                                >
                                    <div className="flex w-20 justify-center md:justify-start z-20">
                                        <Select 
                                            variant="outlined" 
                                            label="Select Role"
                                            value={activeSubject}
                                            onChange = {(e) => loadData(e)}
                                            className="relative z-99"
                                        >
                                            {subjects?.map((subject, index) => (
                                                <Option key={subject.name} value={subject.id}>
                                                    {subject.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </TableHeader>

                                <TableBody className="relative">
                                    <TableBody.Head />
                                    <TableBody.Content>
                                        {loading ? (
                                            <tr>
                                                <TableCell colSpan={5} className="text-center">
                                                    <div className="flex flex-col items-center gap-3">
                                                        <Spinner />
                                                        <Typography>Loading...</Typography>
                                                    </div>
                                                </TableCell>
                                            </tr>
                                        ) : 
                                            context.paginatedData?.map((data, index) => renderBody(data, index, context))
                                        }
                                    </TableBody.Content>
                                </TableBody>
    
                                <TableFooter />
                            </Card>
                        )}
                    </DataTableContext.Consumer>
                </DataTable>
            </SidebarUser>
        </>
    )
}


