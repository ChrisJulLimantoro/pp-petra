import React, { createContext, useState, useContext } from "react";
import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import { Breadcrumbs, Card, Typography } from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";
// import { dataLowongan,dataAjar } from "./arr";
import DialogSuccess from "@/Components/DialogSuccess";
import DialogAsk from "@/Components/DialogAsk";

export const viewKelasContext = createContext();
export default function viewKelas({ auth, dataAjar, dataLowongan, routes }) {
    function processData(dataLowongan, context) {
        return dataLowongan.map((item) => ({
            ...item,
            status:
                item.jumlah_asisten === item.kuota
                    ? "FULL"
                    : `${item.jumlah_asisten} / ${item.kuota}`,
        }));
    }

    const [lowongan, setLowongan] = useState(processData(dataLowongan));
    const [ajar, setAjar] = useState(processData(dataAjar));

    const kolomAjar = [
        "#",
        "Hari",
        "Jam",
        "Mata Kuliah Praktikum",
        "Kelas",
        "Status",
        "Action",
    ];

    const kolomLowongan = [
        "#",
        "Hari",
        "Jam",
        "Mata Kuliah Praktikum",
        "Kelas",
        "Status",
        "Action",
    ];

    const updateDataLowongan = (updatedData) => {
        const processedUpdatedData = processData(updatedData);
        axios.post("/asisten/ngajar", ["id"]);
        setLowongan(processedUpdatedData);
    };

    const updateDataAjar = (updatedData) => {
        const processedUpdatedData = processData(updatedData);
        setAjar(processedUpdatedData);
    };

    const titleAjar = "Daftar Ajar Praktikum";
    const titleLowongan = "Daftar Lowongan Praktikum";

    const renderDataAjar = (item, index, context) => {
        if (item.empty) {
            return (
                <tr key={"notFound"}>
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
            <tr key={item.id}>
                {kolomAjar.map((kolom) =>
                    kolom === "#" ? (
                        <TableCell>
                            <Typography variant="small" color="blue-gray">
                                {index +
                                    1 +
                                    context.perPage * (context.currentPage - 1)}
                            </Typography>
                        </TableCell>
                    ) : kolom === "Action" ? (
                        <TableCell>
                            <DialogAsk
                                title="Delete"
                                id={item.id}
                                dialog="MENGAJAR KELAS INI"
                                updateDataAjar={updateDataAjar}
                                updateDataLowongan={updateDataLowongan}
                                user={auth}
                            />
                        </TableCell>
                    ) : (
                        <TableCell>
                            <Typography
                                variant="small"
                                color={
                                    item[
                                        kolom.toLowerCase().replaceAll(" ", "_")
                                    ] === "Seleksi Kelas"
                                        ? "orange"
                                        : item[
                                              kolom
                                                  .toLowerCase()
                                                  .replaceAll(" ", "_")
                                          ] === "Ditolak" ||
                                          item[
                                              kolom
                                                  .toLowerCase()
                                                  .replaceAll(" ", "_")
                                          ] === "FULL"
                                        ? "red"
                                        : item[
                                              kolom
                                                  .toLowerCase()
                                                  .replaceAll(" ", "_")
                                          ] === "Diterima"
                                        ? "green"
                                        : "blue-gray"
                                }
                            >
                                {item[kolom.toLowerCase().replaceAll(" ", "_")]}
                            </Typography>
                        </TableCell>
                    )
                )}
            </tr>
        );
    };

    const renderDataLowongan = (item, index, context) => {
        if (item.empty) {
            return (
                <tr key={"notFound"}>
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
            <tr
                key={
                    index +
                    1 +
                    context.perPage * (context.currentPage - 1) +
                    "_2"
                }
            >
                {kolomLowongan.map((kolom) =>
                    kolom === "#" ? (
                        <TableCell>
                            <Typography variant="small" color="blue-gray">
                                {index +
                                    1 +
                                    context.perPage * (context.currentPage - 1)}
                            </Typography>
                        </TableCell>
                    ) : kolom === "Action" && item.status !== "FULL" ? (
                        <TableCell>
                            <DialogSuccess
                                title="Ajar"
                                dialog="PENDAFTARAN"
                                id={item.practicum_id}
                                updateDataAjar={updateDataAjar}
                                updateDataLowongan={updateDataLowongan}
                                data1={ajar}
                                data2={lowongan}
                            />
                        </TableCell>
                    ) : (
                        <TableCell>
                            <Typography
                                variant="small"
                                color={
                                    item[
                                        kolom.toLowerCase().replaceAll(" ", "_")
                                    ] === "Seleksi Kelas"
                                        ? "orange"
                                        : item[
                                              kolom
                                                  .toLowerCase()
                                                  .replaceAll(" ", "_")
                                          ] === "Ditolak" ||
                                          item[
                                              kolom
                                                  .toLowerCase()
                                                  .replaceAll(" ", "_")
                                          ] === "FULL"
                                        ? "red"
                                        : item[
                                              kolom
                                                  .toLowerCase()
                                                  .replaceAll(" ", "_")
                                          ] === "Diterima"
                                        ? "green"
                                        : "blue-gray"
                                }
                            >
                                {item[kolom.toLowerCase().replaceAll(" ", "_")]}
                            </Typography>
                        </TableCell>
                    )
                )}
            </tr>
        );
    };

    return (
        <viewKelasContext.Provider value={{ lowongan: lowongan, ajar: ajar }}>
            <Head>
                <title>Atur Jadwal Ajar</title>
            </Head>
            <div>
                <SidebarUser routes={routes}>
                    <div className="flex flex-wrap mt-10 md:mt-0">
                        <Breadcrumbs className="mb-5">
                            <a
                                href={route("asisten.dashboard")}
                                className="opacity-60"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </a>
                            <a>Asisten</a>
                            <a href={route("Asisten.View Jadwal Ajar")}>
                                View Jadwal Ajar
                            </a>
                        </Breadcrumbs>

                        <DataTable
                            className="w-full overflow-hidden"
                            rawData={ajar}
                            columns={kolomAjar}
                            title={titleAjar}
                        >
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="max-w-full z-1 md:py-0 overflow-x-hidden border border-gray-200 mb-6">
                                        <TableHeader title={titleAjar} />

                                        <TableBody className={"relative "}>
                                            <TableBody.Head />
                                            <TableBody.Content>
                                                {context.paginatedData.map(
                                                    (item, index) =>
                                                        renderDataAjar(
                                                            item,
                                                            index,
                                                            context
                                                        )
                                                )}
                                            </TableBody.Content>
                                        </TableBody>

                                        <TableFooter />
                                    </Card>
                                )}
                            </DataTableContext.Consumer>
                        </DataTable>

                        <DataTable
                            className="overflow-hidden"
                            rawData={lowongan}
                            columns={kolomLowongan}
                            title={titleLowongan}
                        >
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="max-w-full z-1 md:py-0 overflow-x-hidden border border-gray-200 mb-6">
                                        <TableHeader
                                            title={titleLowongan}
                                        />

                                        <TableBody className={"relative "}>
                                            <TableBody.Head />
                                            <TableBody.Content>
                                                {context.paginatedData.map(
                                                    (item, index) =>
                                                        renderDataLowongan(
                                                            item,
                                                            index,
                                                            context
                                                        )
                                                )}
                                            </TableBody.Content>
                                        </TableBody>

                                        <TableFooter />
                                    </Card>
                                )}
                            </DataTableContext.Consumer>
                        </DataTable>
                    </div>
                </SidebarUser>
            </div>
        </viewKelasContext.Provider>
    );
}
