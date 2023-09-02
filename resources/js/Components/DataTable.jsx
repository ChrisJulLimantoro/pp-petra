import { Card, Typography, Select, Option, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Component, useState, useContext } from "react";
import { Head } from "@inertiajs/react";
import TableHeader from "./DataTable/TableHeader";
import TableBody from "./DataTable/TableBody";
import TableFooter from "./DataTable/TableFooter";
import Table from "./DataTable/Table";
import TableRowHead from "./DataTable/TableRowHead";
import TableCell from "./DataTable/TableCell";

class DataTable extends Component {
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
            direction: 'asc'
        },
    }

    constructor(props) {
        super(props);
        this.state.rawData = props.rawData;
        this.state.filteredData = props.paginatedData;
        this.state.paginatedData = props.paginatedData;
        this.state.columns = props.columns.unshift('#');
        this.state.totalPages = Math.ceil((props.paginatedData?.length ?? 0) / this.state.perPage);
    }

    static getDerivedStateFromProps(props) {
        return {
            rawData : props.rawData,
            paginatedData : props.paginatedData,
            columns : props.columns,
        }
    }

    componentDidUpdate(prevProps) {
        const displayData = this.paginateData();

        if (JSON.stringify(displayData) != JSON.stringify(prevProps.paginatedData)) {
            this.props.updateData ? 
            this.props.updateData(displayData) : 
            this.setState({paginatedData: displayData});
        }
    }

    searchData(keyword) {
        if (keyword.trim() == '' || keyword == null) {
            this.props.updateData ? 
            this.props.updateData(this.paginateData(this.state.rawData)) : 
            this.setState({paginatedData: this.paginateData(this.state.rawData)});
        }

        else {
            const filtered = this.props.rawData.filter((data) => {
                let found = false;
                this.state.columns.map((column) => {
                    let columnName = (column.toString().toLowerCase());
                    if (data[columnName]?.toString().toLowerCase().includes(keyword.toLowerCase())) {
                        found = true;
                    }
                })
                return found;
            });

            if (filtered.length > 0) {
                let paginateData = this.paginateData();
                this.props.updateData ? this.props.updateData(paginateData) : this.setState({paginatedData: paginateData});
            }
            else {
                filtered.push({empty: "No data found"})
                this.props.updateData ? this.props.updateData(filtered) : this.setState({paginatedData: filtered});
            }

            this.setState({
                filteredData : filtered,
                currentPage: 1, 
                totalPages: Math.ceil(filtered.length / this.state.perPage)
            });
        }
    }

    paginateData(source = this.state.filteredData) {
        return source.slice((this.state.currentPage - 1) * this.state.perPage, this.state.perPage * this.state.currentPage);
    }

    nextPage() {
        if (this.state.currentPage + 1 <= this.state.totalPages) {
            this.setState({currentPage: this.state.currentPage + 1}, 
                this.props.updateData ? 
                this.props.updateData(this.paginateData()) : 
                this.setState({paginatedData: this.paginateData()})
            );
        }
    }

    prevPage() {
        if (this.state.currentPage - 1 > 0) {
            this.setState({currentPage: this.state.currentPage - 1}, 
                this.props.updateData ? 
                this.props.updateData(this.paginateData()) : 
                this.setState({paginatedData: this.paginateData()})
            );
        }
    }

    changePerPage(e) {
        if (e === "All") {
            this.setState({perPage: this.state.filteredData.length, currentPage: 1, totalPages: 1}, 
                this.props.updateData ? 
                this.props.updateData(this.paginateData()) : 
                this.setState({paginatedData: this.paginateData()})
            );
            return;
        }
        this.setState({perPage: e, currentPage: 1, totalPages: Math.ceil(this.state.filteredData.length / e)},  
            this.props.updateData ? 
            this.props.updateData(this.paginateData()) : 
            this.setState({paginatedData: this.paginateData()})
        );
    }

    sortData(column, direction) {
        this.setState({ sort: {column: column, direction: direction} }, () => {
            let sortedData = this.state.filteredData.sort((a, b) => {
                if (a[column] < b[column]) {
                    return direction === 'asc' ? -1 : 1;
                }
                if (a[column] > b[column]) {
                    return direction === 'asc' ? 1 : -1;
                }
                return 0;
            });

            this.setState({filteredData: sortedData}, 
                this.props.updateData ? 
                this.props.updateData(this.paginateData()) : 
                this.setState({paginatedData: this.paginateData()})
            );
        });
    }

    renderHeader(name) {
        return (
            <TableRowHead 
                key={name} 
                label={name} 
                sort={this.sortData.bind(this)} 
                direction={this.state.sort.column === name.toLowerCase() ? this.state.sort.direction : ''}
            >
            </TableRowHead>
        );
    }

    renderBody(index, value) {
        return (
            <tr key={value}>
                {this.state.columns.map((column) => (
                    <TableCell isLast={value === this.state.displayData.length}>
                        <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {column == "#" ? (value + 1) : index[column.toLowerCase()]}
                        </Typography>
                    </TableCell>
                ))}
            </tr>
        )
    }

    render() {
        return (
            <>
                <Head>
                    <style>
                    {`
                       .tableBody::-webkit-scrollbar {
                            width: 7px;
                            background-color: transparent;
                        }
                        
                        /* Track */
                        .tableBody::-webkit-scrollbar-track {
                            // background: #ddd;
                            border-radius: .5em;
                        }
                        
                        /* Handle */
                        .tableBody::-webkit-scrollbar-thumb {
                            background: #ddd    ;
                            border-radius: .5em;
                        }
                        
                        /* Handle on hover */
                        .tableBody::-webkit-scrollbar-thumb:hover {
                            background: #ccc;
                        }
                    `}
                    </style>
                </Head>
                <Card className="w-full">
                    <TableHeader title={this.props.title} description={this.props.description}>
                    </TableHeader>

                    <TableBody>
                        {this.props.children}

                        <div className="flex items-center justfiy-start gap-4">
                            <Select
                                value={this.state.perPage.toString()}
                                onChange = {(e) => this.changePerPage(e)}
                                className="relative z-99 numItemSelect"
                            >
                                <Option key="10" value="10">10</Option>
                                <Option key="25" value="25">25</Option>
                                <Option key="50" value="50">50</Option>
                                <Option key="100" value="100">100</Option>
                                <Option key="semua" value="All">All</Option>
                            </Select>
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                onChange={(e) => this.searchData(e.target.value)}
                            />
                        </div>
                    </TableBody>

                    <Table className={"relative " + this.props.className}>
                        <thead className="sticky top-0">
                            <tr>
                                {   this.props.renderHead ? 
                                    this.state.columns?.map((e) => this.props.renderHead(e)) : 
                                    this.state.columns?.map(this.renderHeader.bind(this))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {   this.props.renderBody ? 
                                this.state.paginatedData?.map((e, value) => this.props.renderBody(e, value)) :
                                this.state.paginatedData?.map(this.renderBody.bind(this))
                            }
                        </tbody>
                    </Table>

                    <TableFooter 
                        currentPage={this.state.currentPage} 
                        perPage={this.state.perPage} 
                        totalPages={this.state.totalPages} 
                        totalData={this.state.filteredData.length}
                        prev={this.prevPage.bind(this)}
                        next={this.nextPage.bind(this)}
                    />
                </Card>
            </>
        );
    }
}

export default DataTable;