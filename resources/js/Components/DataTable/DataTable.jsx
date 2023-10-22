import { Button, Typography } from "@material-tailwind/react";
import { Component, createContext } from "react";
import TableRowHead from "./TableRowHead";
import DialogSuccess from "../DialogSuccess";
import DialogAsk from "../DialogAsk";
import TableCell from "./TableCell";

export const DataTableContext = createContext(null);

export default class DataTable extends Component {
    state = {
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

    constructor(props) {
        super(props);

        props.columns.splice(0, 0, "#");
        this.state.rawData = props.rawData;
        this.state.filteredData = props.rawData;
        this.state.paginatedData = this.paginateData(props.rawData);
        this.state.columns = props.columns;
        this.state.totalPages = Math.ceil(
            (props.rawData.length ?? 0) / this.state.perPage
        );
        this.state.title = props.title;
    }

    // make sure data is diplayed correctly after update
    componentDidUpdate(prevProps, prevState) {
        const displayData = this.paginateData();

        if (
            JSON.stringify(displayData) !=
            JSON.stringify(prevState.paginatedData)
        ) {
            this.setState({ paginatedData: displayData });
        }
    }

    searchData(keyword) {
        // when no keyword is provided
        if (keyword.trim() == "" || keyword == null) {
            this.setState({
                paginatedData: this.paginateData(this.state.rawData),
                filteredData: this.state.rawData,
                currentPage: 1,
                totalPages: Math.ceil(
                    this.state.rawData.length / this.state.perPage
                ),
            });
        } else {
            const filtered = this.state.rawData.filter((data) => {
                let found = false;

                this.state.columns.map((column) => {
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
                paginateData = this.paginateData();
            } else {
                filtered.push({ empty: "No data found" });
                paginateData = this.paginateData(filtered);
            }

            this.setState({
                filteredData: filtered,
                paginatedData: paginateData,
                currentPage: 1,
                totalPages: Math.ceil(filtered.length / this.state.perPage),
            });
        }
    }

    sortData(column, direction) {
        let sortedData = this.state.filteredData.sort((a, b) => {
            if (a[column].toLowerCase() < b[column].toLowerCase()) {
                return direction === "asc" ? -1 : 1;
            }
            if (a[column].toLowerCase() > b[column].toLowerCase()) {
                return direction === "asc" ? 1 : -1;
            }
            return 0;
        });

        this.setState({
            filteredData: sortedData,
            sort: { column: column, direction: direction },
            currentPage: 1,
        });
    }

    paginateData(source = this.state.filteredData) {
        return source.slice(
            (this.state.currentPage - 1) * this.state.perPage,
            this.state.perPage * this.state.currentPage
        );
    }

    nextPage() {
        if (this.state.currentPage + 1 <= this.state.totalPages) {
            this.setState(
                { currentPage: this.state.currentPage + 1 },
                this.props.updateData
                    ? this.props.updateData(this.paginateData())
                    : this.setState({ paginatedData: this.paginateData() })
            );
        }
    }

    prevPage() {
        if (this.state.currentPage - 1 > 0) {
            this.setState(
                { currentPage: this.state.currentPage - 1 },
                this.props.updateData
                    ? this.props.updateData(this.paginateData())
                    : this.setState({ paginatedData: this.paginateData() })
            );
        }
    }

    changePerPage(e) {
        if (e === "All") {
            this.setState(
                {
                    perPage: this.state.filteredData.length,
                    currentPage: 1,
                    totalPages: 1,
                },
                this.props.updateData
                    ? this.props.updateData(this.paginateData())
                    : this.setState({ paginatedData: this.paginateData() })
            );
            return;
        }
        this.setState(
            {
                perPage: e,
                currentPage: 1,
                totalPages: Math.ceil(this.state.filteredData.length / e),
            },
            this.props.updateData
                ? this.props.updateData(this.paginateData())
                : this.setState({ paginatedData: this.paginateData() })
        );
    }

    renderHead(name) {
        return (
            <TableRowHead
                key={name}
                label={name}
                sort={this.sortData.bind(this)}
                direction={
                    this.state.sort.column === name.trim().toLowerCase()
                        ? this.state.sort.direction
                        : ""
                }
            ></TableRowHead>
        );
    }

    renderBody(value, index) {
        console.log(value["name"]);
        // const {title} = this.props.title
        // if data is empty
        if (value.empty) {
            return (
                <tr key={"notFound"}>
                    <TableCell
                        isLast={true}
                        colSpan={this.state.columns.length + 1}
                    >
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
            <tr key={index}>
                {this.state.columns.map((column) => (
                    <TableCell
                        isLast={index === this.state.filteredData.length}
                    >
                        <Typography
                            variant="small"
                            color={
                                value[column.toLowerCase()] === "Seleksi Kelas"
                                    ? "orange"
                                    : value[column.toLowerCase()] ===
                                          "Ditolak" ||
                                      value[column.toLowerCase()] === "FULL"
                                    ? "red"
                                    : value[column.toLowerCase()] === "Diterima"
                                    ? "green"
                                    : "blue-gray"
                            }
                            className="font-normal"
                        >
                            {column == "#"
                                ? index + 1
                                : value[
                                      column.toLowerCase().replaceAll(" ", "_")
                                  ]}

                            {column === "Action" ? (
                                this.props.title ===
                                "Daftar Lowongan Praktikum" ? (
                                    <DialogSuccess
                                        title="Ajar"
                                        dialog="PENDAFTARAN"
                                        id={index}
                                    ></DialogSuccess>
                                ) : this.props.title === "Daftar Praktikum" ? (
                                    <DialogAsk
                                        title="Delete"
                                        dialog=" MENGAJAR KELAS INI"
                                    ></DialogAsk>
                                ) : null
                            ) : null}
                        </Typography>
                    </TableCell>
                ))}
            </tr>
        );
    }
    // renderBody(value, index) {
    //     console.log(value["name"]);
    //     }
    // for syncing data from parent component
    updateData(rawData, filteredData = rawData) {
        this.setState({
            rawData: rawData,
            filteredData: filteredData,
            paginatedData: this.paginateData(this.filteredData),
            totalPages: Math.ceil(
                this.state.filteredData.length / this.state.perPage
            ),
        });
    }

    render() {
        return (
            <DataTableContext.Provider
                value={{
                    ...this.state,
                    searchData: this.searchData.bind(this),
                    changePerPage: this.changePerPage.bind(this),
                    nextPage: this.nextPage.bind(this),
                    prevPage: this.prevPage.bind(this),
                    sortData: this.sortData.bind(this),
                    renderHead: this.renderHead.bind(this),
                    renderBody: this.renderBody.bind(this),
                    updateData: this.updateData.bind(this),
                }}
            >
                {this.props.children}
            </DataTableContext.Provider>
        );
    }
}