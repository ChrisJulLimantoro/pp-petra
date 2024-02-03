import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import { Button, Card, Breadcrumbs } from "@material-tailwind/react";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";

export default function viewKelas({ dataTable, routes }) {
    const columns = [
        "#",
        "Hari",
        "Jam",
        "Mata Kuliah Praktikum",
        "Kelas",
        "Lab",
        "Ruang",
    ];
    const data = dataTable;

    return (
        <>
            <Head>
                <title>View Kelas Praktikum</title>
            </Head>
            
            <SidebarUser routes={routes}>
                <div className="mt-10 md:mt-0 md:px-6">
                    <Breadcrumbs className="mb-5">
                        <a
                            href={route("Dashboard")}
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
                        <a href="#" className="opacity-60">
                            <span>Mahasiswa</span>
                        </a>
                        <a href="#">Lihat Kelas Praktikum</a>
                    </Breadcrumbs>

                    <DataTable rawData={data} columns={columns}>
                        <Card className="w-full z-[1]  border border-gray-200">
                            <TableHeader title="KELAS PRAKTIKUM" />

                            <TableBody className={"relative "}>
                                <TableBody.Head />
                                <TableBody.Content />
                            </TableBody>

                            <TableFooter />
                        </Card>
                    </DataTable>
                </div>
            </SidebarUser>
        </>
    );
}
