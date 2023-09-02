import SidebarLayout from "@/Layouts/SidebarLayout";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import DataTable from "@/Components/DataTable/DataTable";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import { Typography, Switch, Select, Option, Breadcrumbs, Card } from "@material-tailwind/react";
import { Component } from "react";
import { Head } from "@inertiajs/react";

class AssignRoutes extends Component {
    state = {
        role : this.props.roles.data[0],
        alert : null,
    }
    TABLE_HEAD = ["URI", "Name", "Method", "Access"];
    static contextType = DataTableContext;

    constructor(props) {
        super(props);
        this.state.role = this.props.roles.data[0];
    }

    findRoutes(r, context, first = false) {
        const selectedRole = this.props.roles.data.find(role => role.name === r);
        
        const roleRoutes = selectedRole.role_routes;
        const routeToDisplay = this.props.routes.map(route => ({...route, access: false}));

        if (roleRoutes.length > 0) {
            routeToDisplay.map((route) => {
                roleRoutes.map((r) => {
                    if (route.name === r.name) {
                        route.access = true;
                    }   
                })
            });
        }

        // this.setState({role : selectedRole})
        if (!first) {
            this.setState({role : selectedRole});
            context.updateData({rawData : routeToDisplay, filteredData: routeToDisplay});
        }
        else
            return routeToDisplay;
    }

    changeAccess(e, context) {
        // toggle switch
        let allRoutes = [...this.props.routes].map((route) => route.uri === e.value ? {...route, access: e.checked} : route);
        let routes = [...context.paginatedData].map((route) => route.uri === e.value ? {...route, access: e.checked} : route);

        // find changed route
        let routeChanged = routes.find(route => route.uri === e.value);

        // update state
        context.updateData({rawData : allRoutes, filteredData : routes});

        // grant access
        if (e.checked) {
            axios.post(route('rbac.grantAccess'), {
                'role_id' : this.state.role.id,
                'route' : routeChanged.uri,
                'name' : routeChanged.name,
                'method' : routeChanged.method,
            })
            .then((response) => {
                if (response.data.success) {
                    this.state.role.role_routes.push(response.data.data);
                }
                else {
                    allRoutes = [...this.props.routes].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                    routes = [...context.paginatedData].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                    context.updateData({rawData : allRoutes, filteredData : routes});
                }
            })
            .catch(() => {
                allRoutes = [...this.props.routes].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                routes = [...context.paginatedData].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                context.updateData({rawData : allRoutes, filteredData : routes});
            })
        }

        // remove access
        else {
            axios.delete(route('rbac.removeAccess', this.state.role.role_routes.find(route => route.route === e.value).id))
            .then((response) => {
                if (response.data.success) {
                    this.state.role.role_routes = this.state.role.role_routes.filter(route => route.route !== e.value);
                }
                else {
                    allRoutes = [...this.props.routes].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                    routes = [...context.paginatedData].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                    context.updateData({rawData : allRoutes, filteredData : routes});
                }
            })
            .catch(() => {
                allRoutes = [...this.props.routes].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                routes = [...context.paginatedData].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                context.updateData({rawData : allRoutes, filteredData : routes});
            })
        }
    }

    renderAlert() {
    
    }

    renderBody (index, value, context) {
        const isLast = value === context.paginatedData.length - 1;

        // if no data found
        if (index.empty) {
            return (
                <tr key={'notFound'}>
                    <TableCell isLast={isLast} colSpan={this.TABLE_HEAD.length + 1}>
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
            <tr key={index.uri ?? value}>
                <TableCell isLast={isLast}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {value + 1}
                    </Typography>
                </TableCell>
                <TableCell isLast={isLast}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index.uri}
                    </Typography>
                </TableCell>
                <TableCell isLast={isLast}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index.name}
                    </Typography>
                </TableCell>
                <TableCell isLast={isLast}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index.method}
                    </Typography>
                </TableCell>
                <TableCell isLast={isLast}>
                    <Switch 
                        onChange={(e) => this.changeAccess(e.target, context)}
                        value={index.uri || ''}
                        checked ={index.access}
                    />
                </TableCell>
            </tr>
        );
    }

    render() {
        return (
            <>
                <Head>
                    <title>Assign Routes</title>
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

                <SidebarLayout>
                    <Breadcrumbs className="mb-2">
                        <a href={route('dashboard')} className="opacity-60">
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
                            <span>RBAC</span>
                        </a>
                        <a href={route('rbac.assignRoutes')}>Assign Routes</a>
                    </Breadcrumbs>
                    
                    <DataTable
                        className="w-full overflow-hidden" 
                        rawData={this.findRoutes(this.props.roles.data[0].name, null, true)}
                        columns={this.TABLE_HEAD}
                    >
                        <DataTableContext.Consumer>
                            {(context) => (
                                <Card className="w-full">
                                    <TableHeader 
                                        title="Assign Routes to Role"
                                        perPage={context.perPage.toString()}
                                        changePerPage={(e) => context.changePerPage(e)}
                                        searchData={(e) => context.searchData(e)}
                                    >
                                        <div className="flex w-20 justify-center md:justify-start z-100">
                                            <Select 
                                                variant="outlined" 
                                                label="Select Role"
                                                value={this.state.role.name ?? ''}
                                                onChange = {(r) => this.findRoutes(r, context)}
                                                className="relative z-99"
                                            >
                                                {this.props.roles?.data?.map((role, index) => (
                                                    <Option key={role.name ?? index} value={role.name}>
                                                        {role.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </TableHeader>

                                    <TableBody className={"relative " + this.props.className}>
                                        <thead className="sticky top-0 z-50">
                                            <tr>
                                                {   this.renderHead ? 
                                                    context.columns?.map((e) => this.renderHead(e)) : 
                                                    context.columns?.map(context.renderHead)
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {   this.renderBody ? 
                                                context.paginatedData?.map((e, value) => this.renderBody(e, value, context)) :
                                                context.paginatedData?.map((e, value) => context.renderBody(e, value))
                                            }
                                        </tbody>
                                    </TableBody>
        
                                    <TableFooter 
                                        currentPage={context.currentPage} 
                                        perPage={context.perPage} 
                                        totalPages={context.totalPages} 
                                        totalData={context.filteredData.length}
                                        prev={context.prevPage}
                                        next={context.nextPage}
                                    />
                                </Card>
                            )}
                        </DataTableContext.Consumer>
                    </DataTable>
                </SidebarLayout>
            </>
        );
    }
}

export default AssignRoutes;