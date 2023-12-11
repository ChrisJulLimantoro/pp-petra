import React, { useState } from "react";
import {
    Button,
    Card,
    Typography,
    Tooltip,
    Select,
    Option,
    IconButton,
} from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import ConfirmationIconButton from "../Button/ConfirmationIconButton";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {  UserPlusIcon } from "@heroicons/react/24/solid";

export default function DataTableViewStudent(props) {
    const { TABLE_HEAD, TABLE_ROWS, type, slot_used, total_slot, addHref} = props;

    // custom render function
    const renderCustom = (students, index) => {
        // if no data found
        if (students.empty) {
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
            <tr key={index} className="hover:bg-gray-100">
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {students.nama}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {students.nrp}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {students.jurusan}
                    </Typography>
                </TableCell>
                <TableCell>
                    <div className="flex gap-3">
                        <a
                            href={route("practicum.move", {
                                id: students.id,
                                type,
                                student_assistant_practicum_id: students.student_assistant_practicum_id,
                            })}
                        >
                            <IconButton variant="text">
                                <Tooltip content="Move" placement="top">
                                    <PencilIcon
                                        width={20}
                                        cursor={"pointer"}
                                        stroke="orange"
                                    />
                                </Tooltip>
                            </IconButton>
                        </a>
                        <ConfirmationIconButton
                            variant="text"
                            nrp={students.nrp}
                            type={type}
                            student_assistant_practicum_id={
                                students.student_assistant_practicum_id
                            }
                        >
                            <Tooltip content="Delete" placement="top">
                                <TrashIcon
                                    width={20}
                                    cursor={"pointer"}
                                    stroke="red"
                                />
                            </Tooltip>
                        </ConfirmationIconButton>
                    </div>
                </TableCell>
            </tr>
        );
    };

    return (
        <div>
            {/* <h1 className='font-bold text-xl'>Contoh 2</h1>
        <p className='mb-5'>Data statis dengan custom render</p> */}

            <DataTable
                className="w-full"
                rawData={TABLE_ROWS}
                columns={TABLE_HEAD}
            >
                <DataTableContext.Consumer>
                    {(context) => (
                        <Card className="w-full z-1 md:py-0 overflow-auto">
                            <TableHeader
                                title="List Mahasiswa"
                                description={`Jumlah Mahasiswa : ${slot_used}/${total_slot}  Orang`}
                                className="font-bold"
                            >
                                <a href={addHref}>
                                    <Button className="flex items-center gap-3" size="sm">
                                        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add {type}
                                    </Button>
                                </a>
                            </TableHeader>

                            <TableBody className="relative">
                                <TableBody.Head />
                                <TableBody.Content>
                                    {/* kalau mau custom render taruh di sini */}
                                    {context.paginatedData.map(
                                        (students, index) =>
                                            renderCustom(students, index)
                                    )}
                                </TableBody.Content>
                            </TableBody>

                            <TableFooter />
                        </Card>
                    )}
                </DataTableContext.Consumer>
            </DataTable>
        </div>
    );
}
