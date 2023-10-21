import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import { Button, Card } from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import DialogSuccess from "@/Components/DialogSuccess";
import { DataTableContext } from "@/Components/DataTable/DataTable";

export default function viewKelas({ auth }) {
    const kolom = [
        "Hari",
        "Jam",
        "Mata_Kuliah_Praktikum",
        "Kelas",
        "Jumlah_Asisten",
        "Daftar_Pengajar",
        "Status",
    ];

    const data = [
        {
            hari: "Selasa",
            jam: "16.30 - 19.30",
            mata_kuliah_praktikum: "Struktur Data",
            kelas: "A",
            jumlah_asisten: "2",
            daftar_pengajar: "Leo, CJ",
            status: "FULL",
        },
        {
            hari: "Selasa",
            jam: "16.30 - 19.30",
            mata_kuliah_praktikum: "Desain dan Analisis Algoritma",
            kelas: "A",
            jumlah_asisten: "3",
            daftar_pengajar: "Leo, CJ",
            status: "FULL",
        },
        {
            hari: "Selasa",
            jam: "16.30 - 19.30",
            mata_kuliah_praktikum: "Struktur Data",
            kelas: "A",
            jumlah_asisten: "2",
            daftar_pengajar: "Leo, CJ",
            status: "-1 ASISTEN",
        },
    ];

    const kolom1 = [
        "Hari",
        "Jam",
        "Mata_Kuliah_Praktikum",
        "Kelas",
        "Jumlah_Asisten",
        "Daftar_Pengajar",
        "Status",
        "Action",
    ];

    const data1 = [
        {
            hari: "Senin",
            jam: "07.30 - 10.30",
            mata_kuliah_praktikum: "Struktur Data",
            kelas: "D",
            jumlah_asisten: "2",
            daftar_pengajar: "Leo",
            status: "-1 Asisten",
        },
        {
            hari: "Kamis",
            jam: "16.30 - 19.30",
            mata_kuliah_praktikum: "Desain dan Analisis Algoritma",
            kelas: "B",
            jumlah_asisten: "3",
            daftar_pengajar: "Leo, CJ",
            status: "-1 Asisten",
        },
        {
            hari: "Senin",
            jam: "15.30 - 18.30",
            mata_kuliah_praktikum: "Basis Data Lajutan",
            kelas: "A",
            jumlah_asisten: "2",
            daftar_pengajar: "Jessica",
            status: "-1 Asisten",
        },
    ];

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
                        <DataTable rawData={data} columns={kolom}>
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="w-full z-[1]">
                                        <TableHeader
                                            title="Daftar Praktikum"
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
                        <DataTable rawData={data1} columns={kolom1}>
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="w-full z-[1]">
                                        <TableHeader
                                            title="Daftar Lowongan Praktikum"
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
