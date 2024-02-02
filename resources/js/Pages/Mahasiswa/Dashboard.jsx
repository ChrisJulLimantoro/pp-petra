import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import Carousel from "@/Components/Carousel";
import { Select, Option } from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import { Button, Card, Typography } from "@material-tailwind/react";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";

export default function Dashboard({ auth, dataTable, routes }) {
    const columns = [
        "#",
        "Hari",
        "Jam",
        "Mata Kuliah Praktikum",
        "Kelas",
        "Ruangan",
    ];

    const data = dataTable;

    const styles = `


    @import url('https://fonts.googleapis.com/css2?family=Bitter&family=Cabin:wght@700&family=Titillium+Web:wght@600&display=swap');

    html{
      overflow-x: hidden;
    }

    * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .waviy {
    position: relative;
  }
  .waviy span {
    position: relative;
    display: inline-block;
    font-size: 90px;
    font-family: 'Bitter', serif;
    font-family: 'Cabin', sans-serif;
    
    background: #959595;
    background: linear-gradient(to right, #959595 0%, #0D0D0D 46%, #010101 50%, #0A0A0A 53%, #4E4E4E 76%, #383838 87%, #1B1B1B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
        

        text-transform: uppercase;
        animation: flip 2s infinite;
        animation-delay: calc(.2s * var(--i))
      }
      @keyframes flip {
        0%,80% {
          transform: rotateY(360deg) 
        }
      }
    
  `;

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
            direction: "asc",
        },
    };
    const search = (keyword) => {
        // when no keyword is provided
        if (keyword.trim() == "" || keyword == null) {
            setState({
                paginatedData: paginateData(state.rawData),
                filteredData: state.rawData,
                currentPage: 1,
                totalPages: Math.ceil(state.rawData.length / state.perPage),
            });
        } else {
            const filtered = state.rawData.filter((data) => {
                let found = false;

                state.columns.map((column) => {
                    let columnName = column.toString().toLowerCase();
                    if (
                        data[columnName]
                            ?.toString()
                            .toLowerCase()
                            .includes(keyword.toLowerCase())
                    ) {
                        found = true;
                    }
                });

                return found;
            });

            let paginateData = [];

            if (filtered.length > 0) {
                paginateData = paginateData();
            } else {
                filtered.push({ empty: "No data found" });
                paginateData = paginateData(filtered);
            }

            setState({
                filteredData: filtered,
                paginatedData: paginateData,
                currentPage: 1,
                totalPages: Math.ceil(filtered.length / state.perPage),
            });
        }
    };

    return (
        <>
            <Head>
                <title>SAOCP-Dashboard</title>
                <style>{styles}</style>
            </Head>
            <SidebarUser routes={routes}>
                <div className="row grid justify-items-center">
                    <div className="waviy">
                        <span style={{ "--i": 1 }} className="mx-2">
                            S
                        </span>
                        <span style={{ "--i": 2 }} className="mx-2">
                            A
                        </span>
                        <span style={{ "--i": 3 }} className="mx-2">
                            O
                        </span>
                        <span style={{ "--i": 4 }} className="mx-2">
                            C
                        </span>
                        <span style={{ "--i": 5 }} className="mx-2">
                            P
                        </span>
                    </div>
                </div>
                {/* START DATA TABLE */}
                <DataTable rawData={data} columns={columns} className="">
                    <DataTableContext.Consumer>
                        {(context) => (
                            <Card className="w-full z-[1]">
                                <TableHeader
                                    title="KELAS PRAKTIKUM"
                                    perPage={context.perPage.toString()}
                                    changePerPage={(e) =>
                                        context.changePerPage(e)
                                    }
                                    searchData={search}
                                ></TableHeader>

                                <TableBody className={"relative "}>
                                    <TableBody.Head />
                                    <TableBody.Content />
                                </TableBody>

                                <TableFooter
                                    currentPage={context.currentPage}
                                    perPage={context.perPage}
                                    totalPages={context.totalPages}
                                    totalData={context.filteredData.length}
                                    prev={context.prevPage}
                                    next={context.nextPage}
                                ></TableFooter>
                            </Card>
                        )}
                    </DataTableContext.Consumer>
                </DataTable>
                {/* END DATA TABLE */}
            </SidebarUser>
        </>
    );
}
