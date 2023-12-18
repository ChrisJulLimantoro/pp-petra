import React, { useState } from 'react'
import { Button, Card, Typography, Tooltip, Select, Option } from '@material-tailwind/react'
import DataTable from '@/Components/DataTable/DataTable'
import { DataTableContext } from '@/Components/DataTable/DataTable'
import TableHeader from '@/Components/DataTable/TableHeader'
import TableBody from '@/Components/DataTable/TableBody'
import TableFooter from '@/Components/DataTable/TableFooter'
import TableCell from '@/Components/DataTable/TableCell'
import ConfirmationIconButton from "../Button/ConfirmationIconButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function DataTableAddAssistant(props){

    const {TABLE_HEAD, TABLE_ROWS, practicum_id, slot_used, total_slot, total_available} = props

     // custom render function
     const renderCustom = (assistant, index) => {
        // if no data found
        if (assistant.empty) {
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
            <tr key={index} className='hover:bg-gray-100'>
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
                    <ConfirmationIconButton variant="text" practicum_id={practicum_id} assistant_id={assistant.id}  slot_used={slot_used} total_slot={total_slot}>
                        <Tooltip content="Add" placement="top">
                            <PlusCircleIcon width={20} cursor={'pointer'} stroke="green"/>
                        </Tooltip>
                    </ConfirmationIconButton>
                </TableCell>
            </tr>
        )
    }

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
                            title="Available Asisten"
                            description={`Asisten yang available : ${total_available} Orang`}
                            className="font-bold"
                        >
                        </TableHeader>

                        <TableBody className="relative">
                            <TableBody.Head />
                            <TableBody.Content>
                                {/* kalau mau custom render taruh di sini */}
                                {context.paginatedData.map((assistant, index) => renderCustom(assistant, index))}
                            </TableBody.Content>
                        </TableBody>

                        <TableFooter />
                    </Card>
                )}
            </DataTableContext.Consumer>
        </DataTable>
    </div> 
    )

}