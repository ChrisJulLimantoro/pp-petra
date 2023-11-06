import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import { Button, Card, Typography } from "@material-tailwind/react";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";


export default function viewKelas({dataTable}){
    const columns = [
        "#",
        "Hari",
        "Jam",
        "Mata Kuliah Praktikum",
        "Kelas",
        "Lab",
        "Ruang"
    ];
    const data = dataTable;
    // const renderBody = (data, index, context) => {
    //     // if no data found
    //     if (data.empty) {
    //         return (
    //             <tr key={"notFound"}>
    //                 <TableCell colSpan={4}>
    //                     <Typography
    //                         variant="small"
    //                         color="blue-gray"
    //                         className="font-normal text-center"
    //                     >
    //                         No data found
    //                     </Typography>
    //                 </TableCell>
    //             </tr>
    //         );
    //     }

    //     return (
    //         <tr key={index}>
    //             <TableCell>
    //                 <Typography
    //                     variant="small"
    //                     color="blue-gray"
    //                     className="font-normal"
    //                 >
    //                     {index +
    //                         1 +
    //                         context.perPage * (context.currentPage - 1)}
    //                 </Typography>
    //             </TableCell>

    //             {columns.map((column) =>
    //                     <TableCell>
    //                             <Typography
    //                                 variant="small"
    //                                 color="blue-gray"
    //                                 className="font-normal"
    //                             >
    //                                 {
    //                                     data[
    //                                         column
    //                                             .toLowerCase()
    //                                             .replaceAll(" ", "_")
    //                                     ]
    //                                 }
    //                             </Typography>
    //                     </TableCell>
    //             )}
    //         </tr>
    //     );
    // };

    const state = {
        rawData: [],
        filteredData: [],
        paginatedData: [],
        columns: [],
        currentPage: 1,
        perPage: 10,
        totalPages: 1,
        sort: {
            column: null,
            direction: 'asc'
        },
    }
    const search = (keyword) => {
        // when no keyword is provided
        console.log(keyword)
        if (keyword.trim() == '' || keyword == null) {
            setState({
                paginatedData: paginateData(state.rawData),
                filteredData: state.rawData,
                currentPage: 1, 
                totalPages: Math.ceil(state.rawData.length / state.perPage)
            });
        }

        else {
            const filtered = state.rawData.filter((data) => {
                let found = false;

               state.columns.map((column) => {
                    let columnName = (column.toString().toLowerCase());
                    console.log(columnName);
                    if (data[columnName]?.toString().toLowerCase().includes(keyword.toLowerCase())) {
                        found = true;
                    }
                })

                return found;
            });

            let paginateData = [];

            if (filtered.length > 0) {
                paginateData = paginateData();
            }
            else {
                filtered.push({empty: "No data found"})
                paginateData =paginateData(filtered);
            }

            setState({
                filteredData: filtered,
                paginatedData: paginateData,
                currentPage: 1, 
                totalPages: Math.ceil(filtered.length / state.perPage)
            });
        }
    }
    // console.log(data);
    return(
        <SidebarUser>
            <DataTable rawData={data} columns={columns}>
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="w-full z-[1]">
                                        <TableHeader
                                            title="KELAS PRAKTIKUM"
                                            perPage={context.perPage.toString()}
                                            changePerPage={(e) =>
                                                context.changePerPage(e)
                                            }
                                            searchData= {search}
                                            
                                        ></TableHeader>

                                        <TableBody className={"relative "}>
                                            <TableBody.Head />
                                            <TableBody.Content />
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
        </SidebarUser>
    )
}