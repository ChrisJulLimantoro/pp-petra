import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import { Button, Card } from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import { dataLowongan, dataAjar } from "./arr";

export default function viewKelas({ auth }) {
    const [lowongan, setLowongan] = useState(dataLowongan);
    const [ajar, setAjar] = useState(dataAjar);

    function processData(dataLowongan) {
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

    const kolomAjar = [
        "Hari",
        "Jam",
        "Mata Kuliah Praktikum",
        "Kelas",
        "Jumlah_Asisten",
        "Daftar_Pengajar",
        "Status",
        "Action",
    ];

    const kolomLowongan = [
        "Hari",
        "Jam",
        "Mata_Kuliah_Praktikum",
        "Kelas",
        "Jumlah_Asisten",
        "Daftar_Pengajar",
        "Status",
        "Action",
    ];
    
    
    const processedDataLowongan = processData(dataLowongan);
    const processedDataAjar = processData(dataAjar);

    const titleAjar = "Daftar Praktikum";
    const titleLowongan = "Daftar Lowongan Praktikum";

    return (
        <>
            <Head>
                <title>SAOCP-Daftar Ajar Praktikum</title>
            </Head>
            <div className="grid grid-cols-3">
                <div className="flex-none col-span-1">
                    <SidebarUser></SidebarUser>
                </div>
                <div className="flex flex-wrap min-w-full">
                    <div
                        className="col-span-1 flex-auto lg:ml-[-11vw] mt-5"
                        //style={{ width: "70vw" }}
                    >
                        <DataTable
                            rawData={processedDataAjar}
                            columns={kolomAjar}
                            title={titleAjar}
                        >
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="w-full z-[1]">
                                        <TableHeader
                                            title={titleAjar}
                                            perPage={context.perPage.toString()}
                                            changePerPage={(e) =>
                                                context.changePerPage(e)
                                            }
                                            searchData={(e) =>
                                                context.searchData(e)
                                            }
                                        ></TableHeader>

                                        <TableBody className={"relative "}>
                                            <thead className="sticky top-0 z-10">
                                                <tr>
                                                    {context.columns?.map(
                                                        context.renderHead
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {context.paginatedData?.map(
                                                    (e, value) =>
                                                        context.renderBody(
                                                            e,
                                                            value
                                                        )
                                                )}
                                            </tbody>
                                        </TableBody>

                                        <TableFooter
                                            currentPage={context.currentPage}
                                            perPage={context.perPage}
                                            totalPages={context.totalPages}
                                            totalData={
                                                context.filteredData.length
                                            }
                                            prev={context.prevPage}
                                            next={context.nextPage}
                                        ></TableFooter>
                                    </Card>
                                )}
                            </DataTableContext.Consumer>
                        </DataTable>
                    </div>
                    <div
                        className=" col-span-1 flex-auto lg:ml-[-11vw] mt-5"
                        // style={{ width: "70vw" }}
                    >
                        <DataTable
                            rawData={processedDataLowongan}
                            columns={kolomLowongan}
                            title={titleLowongan}
                        >
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="w-full z-[1]">
                                        <TableHeader
                                            title={titleLowongan}
                                            perPage={context.perPage.toString()}
                                            changePerPage={(e) =>
                                                context.changePerPage(e)
                                            }
                                            searchData={(e) =>
                                                context.searchData(e)
                                            }
                                        ></TableHeader>

                                        <TableBody className={"relative "}>
                                            <thead className="sticky top-0 z-10">
                                                <tr>
                                                    {context.columns?.map(
                                                        context.renderHead
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {context.paginatedData?.map(
                                                    (e, value) =>
                                                        context.renderBody(
                                                            e,
                                                            value
                                                        )
                                                )}
                                            </tbody>
                                        </TableBody>

                                        <TableFooter
                                            currentPage={context.currentPage}
                                            perPage={context.perPage}
                                            totalPages={context.totalPages}
                                            totalData={
                                                context.filteredData.length
                                            }
                                            prev={context.prevPage}
                                            next={context.nextPage}
                                        ></TableFooter>
                                    </Card>
                                )}
                            </DataTableContext.Consumer>
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
}
