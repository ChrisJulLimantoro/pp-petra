import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import SelectMatkul from "@/Components/SelectMatkul";
import { Button, Card } from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";

export default function Dashboard({ auth }) {
    const dataMatkul = ["Basis Data Lanjutan", "Basis Data", "Struktur Data"];
    const Pilihan = ["A", "B", "C", "D", "E"];
    const kolom = [
        "Hari",
        "Jam",
        "Mata Kuliah Praktikum",
        "Kelas",
        "Pilihan",
        "Status",
    ];
    const data = [
        {
            hari: "Selasa",
            jam: "16.30 - 19.30",
            "mata kuliah praktikum": "Struktur Data",
            kelas: "A",
            pilihan: "Pilihan 1",
            status: "Seleksi Kelas",
        },
        {
            hari: "Kamis",
            jam: "16.30 - 19.30",
            "mata kuliah praktikum": "Struktur Data",
            kelas: "B",
            pilihan: "Pilihan 2",
            status: "Ditolak",
        },
        {
            hari: "Kamis",
            jam: "16.30 - 19.30",
            "mata kuliah praktikum": "Struktur Data",
            kelas: "B",
            pilihan: "Pilihan 2",
            status: "Diterima",
        },
    ];
    const handleUpdateData = (updatedData) => {
        // Handle updated data here
        console.log(updatedData);
    };
    const styles = `
    .divLabel{
        width: 15vw;
    }

    .divButton{
        margin-left: 6vw !important;
    }

    .btn{
        width: 10vw;
    }
    
  `;
    return (
        <>
            <Head>
                <title>SAOCP-Daftar Praktikum</title>
                <style>{styles}</style>
            </Head>
            <div className="grid grid-cols-3">
                <div className="col-span-1">
                    <SidebarUser></SidebarUser>
                </div>
                <div className="mt-16 w-full h-72 mx-8">
                    <div>
                        <form action="">
                            <div className="grid grid-cols-2 mb-8">
                                <div className="mt-2 divLabel">
                                    <h1 className="w-full">
                                        Mata Kuliah Praktikum
                                    </h1>
                                </div>
                                <div>
                                    <SelectMatkul
                                        data={dataMatkul}
                                        title="Pilih Mata Kuliah"
                                    ></SelectMatkul>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mb-8">
                                <div className="mt-2 divLabel">
                                    <h1 className="w-full">Pilihan 1</h1>
                                </div>
                                <div>
                                    <SelectMatkul
                                        data={Pilihan}
                                        title="Pilihan Pertama"
                                    ></SelectMatkul>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mb-8">
                                <div className="mt-2 divLabel">
                                    <h1 className="w-full">Pilihan 2</h1>
                                </div>
                                <div>
                                    <SelectMatkul
                                        data={Pilihan}
                                        title="Pilihan Pertama"
                                    ></SelectMatkul>
                                </div>
                            </div>

                            <div className="grid place-content-center divButton">
                                <div>
                                    <Button
                                        variant="gradient"
                                        color="indigo"
                                        className="btn"
                                    >
                                        Input
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div
                        className="col-span-1 flex-auto lg:ml-[-11vw]"
                        style={{ width: "70vw"}}
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
                </div>
            </div>
        </>
    );
}
