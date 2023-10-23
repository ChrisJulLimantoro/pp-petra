import React, { createContext, useState, useContext } from "react";
import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import { Button, Card, Typography } from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import { dataLowongan, dataAjar } from "./arr";
import DialogSuccess from "@/Components/DialogSuccess";
import DialogAsk from "@/Components/DialogAsk";

export const viewKelasContext = createContext();

export default function viewKelas({ auth }) {
    function processData(dataLowongan, context) {
        return dataLowongan.map((item) => ({
            ...item,
            status:
                item.jumlah_asisten - item.daftar_pengajar.length === 0
                    ? "FULL"
                    : `-${
                          item.jumlah_asisten - item.daftar_pengajar.length
                      } Asisten`,
        }));
    }

    const [lowongan, setLowongan] = useState(processData(dataLowongan));
    const [ajar, setAjar] = useState(processData(dataAjar));

    const kolomAjar = [
        "Hari",
        "Jam",
        "Mata Kuliah Praktikum",
        "Kelas",
        "Jumlah Asisten",
        "Daftar Pengajar",
        "Status",
        "Action",
    ];

    const kolomLowongan = [
        "Hari",
        "Jam",
        "Mata Kuliah Praktikum",
        "Kelas",
        "Jumlah Asisten",
        "Daftar Pengajar",
        "Status",
        "Action",
    ];
    
    const updateDataLowongan = (updatedData) => {
        const processedUpdatedData = processData(updatedData)
        // dataLowongan.length = 0;
        // Array.prototype.push.apply(dataLowongan, updatedData);
        setLowongan(processedUpdatedData)
        console.log("Updating dataLowongan:", dataLowongan);
    };

    const updateDataAjar = (updatedData) => {
        const processedUpdatedData = processData(updatedData)
        // dataAjar.length = 0;
        // Array.prototype.push.apply(dataAjar, updatedData);
        setAjar(processedUpdatedData)
        console.log("Updating dataAjar:", dataAjar);
    };

    const titleAjar = "Daftar Praktikum";
    const titleLowongan = "Daftar Lowongan Praktikum";

    const renderDataAjar = (item, index, context) => {
        if (item.empty) {
            return (
                <tr key={'notFound'}>
                    <TableCell colSpan={kolomAjar.length}>
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
            <tr key={index + 1 + (context.perPage * (context.currentPage - 1))}>
                <TableCell>
                    <Typography variant="small" color="blue-gray">
                        {index + 1 + (context.perPage * (context.currentPage - 1))}
                    </Typography>
                </TableCell>

                {kolomAjar.map((kolom) => (
                    kolom !== "Action" ? (
                        <TableCell>
                            <Typography variant="small"
                            color={
                                item[kolom.toLowerCase().replaceAll(' ', '_')] === "Seleksi Kelas"
                                    ? "orange"  
                                    : item[kolom.toLowerCase().replaceAll(' ', '_')] ===
                                            "Ditolak" ||
                                        item[kolom.toLowerCase().replaceAll(' ', '_')] === "FULL"
                                    ? "red"
                                    : item[kolom.toLowerCase().replaceAll(' ', '_')] === "Diterima"
                                    ? "green"
                                    : "blue-gray"
                            }>
                                {item[kolom.toLowerCase().replaceAll(' ', '_')]}
                            </Typography>
                        </TableCell>
                    ) : (
                    <TableCell>
                        <DialogAsk 
                            title="Delete" 
                            dialog="MENGAJAR KELAS INI"
                            updater1={updateDataAjar} 
                            updater2={updateDataLowongan} 
                        />
                    </TableCell>
                    )
                ))}
            </tr>
        )
    }

    const renderDataLowongan = (item, index, context) => {
        if (item.empty) {
            return (
                <tr key={'notFound'}>
                    <TableCell colSpan={kolomLowongan.length}>
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
            <tr key={index + 1 + (context.perPage * (context.currentPage - 1)) + '_2'}>
                <TableCell>
                    <Typography variant="small" color="blue-gray">
                        {index + 1 + (context.perPage * (context.currentPage - 1))}
                    </Typography>
                </TableCell>

                {kolomLowongan.map((kolom) => (
                    kolom !== "Action" ? (
                        <TableCell>
                            <Typography variant="small"
                            color={
                                item[kolom.toLowerCase().replaceAll(' ', '_')] === "Seleksi Kelas"
                                    ? "orange"  
                                    : item[kolom.toLowerCase().replaceAll(' ', '_')] ===
                                            "Ditolak" ||
                                        item[kolom.toLowerCase().replaceAll(' ', '_')] === "FULL"
                                    ? "red"
                                    : item[kolom.toLowerCase().replaceAll(' ', '_')] === "Diterima"
                                    ? "green"
                                    : "blue-gray"
                            }>
                                {item[kolom.toLowerCase().replaceAll(' ', '_')]}
                            </Typography>
                        </TableCell>
                    ) : (
                    <TableCell>
                        <DialogSuccess 
                        title="Ajar" 
                        dialog="PENDAFTARAN" 
                        id={index} 
                        updateDataAjar={updateDataAjar} 
                        updateDataLowongan={updateDataLowongan}
                        data1={ajar}
                        data2={lowongan}
                    />
                    </TableCell>
                    )
                ))}
            </tr>
        )
    }

    return (
        <viewKelasContext.Provider value={{ lowongan: lowongan, ajar: ajar }}>
            <Head>
                <title>SAOCP-Daftar Ajar Praktikum</title>
            </Head>
            <div className="grid grid-cols-3">
                <div className="flex-none col-span-1">
                    <SidebarUser></SidebarUser>
                </div>
                <div className="flex flex-wrap max-w-min">
                    {/* Table Ajar */}
                    <div
                        className="col-span-1 flex-auto lg:ml-[-11vw] mt-5"
                        //style={{ width: "70vw" }}
                    >
                        <DataTable
                            rawData={ajar}
                            columns={kolomAjar}
                            title={titleAjar}
                        >
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="w-full z-[1]">
                                        <TableHeader title={titleAjar} />

                                        <TableBody className={"relative "}>
                                            <TableBody.Head />  
                                            <TableBody.Content>
                                                {
                                                    context.paginatedData.map((item, index) => renderDataAjar(item, index, context))
                                                }
                                            </TableBody.Content>
                                        </TableBody>

                                        <TableFooter />
                                    </Card>
                                )}
                            </DataTableContext.Consumer>
                        </DataTable>
                    </div>

                    {/* Table Lowongan */}
                    <div
                        className=" col-span-1 flex-auto lg:ml-[-11vw] mt-5"
                        // style={{ width: "70vw" }}
                    >
                        <DataTable
                            rawData={lowongan}
                            columns={kolomLowongan}
                            title={titleLowongan}
                        >
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="w-full z-[1]">
                                        <TableHeader title={titleLowongan} />

                                        <TableBody className={"relative "}>
                                            <TableBody.Head />
                                            <TableBody.Content>
                                                {
                                                    context.paginatedData.map((item, index) => renderDataLowongan(item, index, context))
                                                }
                                            </TableBody.Content>
                                        </TableBody>

                                        <TableFooter />
                                    </Card>
                                )}
                            </DataTableContext.Consumer>
                        </DataTable>
                    </div>
                </div>
            </div>
        </viewKelasContext.Provider>
    );
}