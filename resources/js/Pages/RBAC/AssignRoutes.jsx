import SidebarLayout from "@/Layouts/SidebarLayout";
import DataTable from "@/Components/DataTable";
import TableCell from "@/Components/DataTable/TableCell";
import { Typography, Switch, Select, Option, Breadcrumbs } from "@material-tailwind/react";
import { Component } from "react";
import { Head } from "@inertiajs/react";

class AssignRoutes extends Component {
    state = {
        role : this.props.roles.data[0],
        constantData : this.props.routes,
        displayRoutes : [],
    }

    TABLE_HEAD = ["URI", "Name", "Method", "Access"];

    constructor(props) {
        super(props);

        const routes = this.findRoutes(this.props.roles.data[0].name, true);

        this.state.role = this.props.roles.data[0];
        this.state.constantData = routes;
        this.state.displayRoutes = routes
    }

    findRoutes(r, first = false) {
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

        if (!first)
            return this.setState({
                role : selectedRole,
                constantData : routeToDisplay,
                displayRoutes : routeToDisplay,
            });
        else
            return routeToDisplay;
    }

    changeAccess(e) {
        // toggle switch
        let allRoutes = [...this.props.routes].map((route) => route.uri === e.value ? {...route, access: e.checked} : route);
        let routes = [...this.state.displayRoutes].map((route) => route.uri === e.value ? {...route, access: e.checked} : route);

        // find changed route
        let routeChanged = routes.find(route => route.uri === e.value);

        // update state
        this.setState({displayRoutes: routes, constantData: allRoutes});

        // update database
        if (e.checked) {
            axios.post(route('rbac.grantAccess'), {
                'role_id' : this.state.role.id,
                'route' : routeChanged.uri,
                'name' : routeChanged.name,
                'method' : routeChanged.method,
            })
            .then((response) => {
                if (response.status === 200) {
                    this.state.role.role_routes.push(response.data.data);
                }
            })
            .catch(() => {
                allRoutes = [...this.state.displayRoutes].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                routes = [...this.state.displayRoutes].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                this.setState({displayRoutes: routes, constantData: allRoutes});
            })
        }
        else {
            axios.delete(route('rbac.removeAccess', this.state.role.role_routes.find(route => route.route === e.value).id))
            .then((response) => {
                if (response.status === 200) {
                    this.state.role.role_routes = this.state.role.role_routes.filter(route => route.route !== e.value);
                }
            })
            .catch(() => {
                allRoutes = [...this.state.displayRoutes].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                routes = [...this.state.displayRoutes].map((route) => route.uri === e.value ? {...route, access: !e.checked} : route);
                this.setState({displayRoutes: routes, constantData: allRoutes});
            })
        }
    }

    renderRoutes (index, value) {
        const isLast = value === this.state.displayRoutes.length - 1;

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
                        onChange={(e) => this.changeAccess(e.target)}
                        value={index.uri}
                        checked ={index.access}
                    />
                </TableCell>
            </tr>
        );
    }

    updateData(data) {
        this.setState({displayRoutes : data})
    }

    render() {
        return (
            <>
                <Head>
                    <title>Assign Routes</title>
                    <style>
                    {`
                        table::-webkit-scrollbar {
                            width: 10px;
                        }
                        
                        /* Track */
                        table::-webkit-scrollbar-track {
                            background: #f1f1f1;
                        }
                        
                        /* Handle */
                        table::-webkit-scrollbar-thumb {
                            background: #888;
                        }
                        
                        /* Handle on hover */
                        table::-webkit-scrollbar-thumb:hover {
                            background: #555;
                        }
                    `}
                    </style>
                </Head>

                <SidebarLayout>
                    <Breadcrumbs className="mb-4">
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
                        rawData={this.state.constantData}
                        paginatedData={this.state.displayRoutes} 
                        columns={this.TABLE_HEAD}
                        title="Assign Route to Roles"
                        renderBody={this.renderRoutes.bind(this)}
                        updateData={this.updateData.bind(this)}
                    >
                        <div className="flex w-20 justify-center md:justify-start z-100">
                            <Select 
                                variant="outlined" 
                                label="Select Role"
                                value={this.state.role.name ?? ''}
                                onChange = {(r) => this.findRoutes(r)}
                                className="relative z-99"
                            >
                                {this.props.roles?.data?.map((role, index) => (
                                    <Option key={role.name ?? index} value={role.name}>
                                        {role.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </DataTable>
                </SidebarLayout>
            </>
        );
    }
}

export default AssignRoutes;