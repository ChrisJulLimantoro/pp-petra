import SidebarLayout from "@/Layouts/SidebarLayout";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import DataTable from "@/Components/DataTable/DataTable";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import {
    Typography,
    Switch,
    Select,
    Option,
    Breadcrumbs,
    Card,
    Alert,
} from "@material-tailwind/react";
import { Component } from "react";
import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";

export default class AssignRoutes extends Component {
    state = {
        role: this.props.roles.data[0],
        alert: { isOpen: false, color: "gray", message: "" },
        routes: [],
    };

    TABLE_HEAD = ["#", "URI", "Name", "Method", "Access"];
    static contextType = DataTableContext;

    findRoutes(r, context, first = false) {
        const selectedRole = this.props.roles.data.find(
            (role) => role.name === r
        );

        const roleRoutes = selectedRole.role_routes;
        const routeToDisplay = this.props.routes.map((route) => ({
            ...route,
            access: false,
        }));

        if (roleRoutes.length > 0) {
            routeToDisplay.map((route) => {
                roleRoutes.map((r) => {
                    if (route.name === r.name) {
                        route.access = true;
                    }
                });
            });
        }

        if (!first) {
            this.setState({ role: selectedRole, routes: routeToDisplay });
            context.updateData(routeToDisplay)
        } else this.setState({ routes: routeToDisplay });
    }

    componentDidMount() {
        this.findRoutes(this.props.roles.data[0].name, null, true);
    }

    changeAccess(e, context) {
        // toggle switch
        let allRoutes = [...this.props.routes].map((route) =>
            route.name === e.value ? { ...route, access: e.checked } : route
        );
        let routes = [...context.filteredData].map((route) =>
            route.name === e.value ? { ...route, access: e.checked } : route
        );

        // find changed route
        let routeChanged = routes.find((route) => route.name === e.value);

        // update state
        // context.updateData(allRoutes, routes);

        // grant access
        if (e.checked) {
            axios
                .post(route("rbac.grantAccess"), {
                    role_id: this.state.role.id,
                    route: routeChanged.uri,
                    name: routeChanged.name,
                    method: routeChanged.method,
                })
                .then((response) => {
                    if (response.data.success) {
                        this.state.role.role_routes.push(response.data.data);
                        context.updateData(allRoutes, routes);
                        this.showAlert("Route access granted!", "green");
                    } else {
                        // revert changes
                        allRoutes = [...context.rawData].map((route) =>
                            route.name === e.value
                                ? { ...route, access: !e.checked }
                                : route
                        );
                        routes = [...context.filteredData].map((route) =>
                            route.name === e.value
                                ? { ...route, access: !e.checked }
                                : route
                        );
                        context.updateData(allRoutes, routes);

                        this.showAlert("Failed to update data!", "red");
                    }
                })
                .catch(() => {
                    // revert changes
                    allRoutes = [...context.rawData].map((route) =>
                        route.name === e.value
                            ? { ...route, access: !e.checked }
                            : route
                    );
                    routes = [...context.filteredData].map((route) =>
                        route.name === e.value
                            ? { ...route, access: !e.checked }
                            : route
                    );
                    context.updateData(allRoutes, routes);

                    this.showAlert("Failed to update data!", "red");
                });
        }

        // remove access
        else {
            axios
                .delete(
                    route(
                        "rbac.removeAccess",
                        this.state.role.role_routes.find(
                            (route) => route.name === e.value
                        ).id
                    )
                )
                .then((response) => {
                    if (response.data.success) {
                        this.state.role.role_routes =
                            this.state.role.role_routes.filter(
                                (route) => {route.name !== e.value}
                            );
                        context.updateData(allRoutes, routes);
                        this.showAlert("Route access removed!", "green");
                    } else {
                        // revert changes
                        allRoutes = [...context.rawData].map((route) =>
                            route.name === e.value
                                ? { ...route, access: !e.checked }
                                : route
                        );
                        routes = [...context.filteredData].map((route) =>
                            route.name === e.value
                                ? { ...route, access: !e.checked }
                                : route
                        );
                        context.updateData(allRoutes, routes);

                        this.showAlert("Failed to update data!", "red");
                    }
                })
                .catch(() => {
                    // revert changes
                    allRoutes = [...context.rawData].map((route) =>
                        route.name === e.value
                            ? { ...route, access: !e.checked }
                            : route
                    );
                    routes = [...context.filteredData].map((route) =>
                        route.name === e.value
                            ? { ...route, access: !e.checked }
                            : route
                    );
                    context.updateData(allRoutes, routes);

                    this.showAlert("Failed to update data!", "red");
                });
        }
    }

    showAlert(message, color) {
        this.setState({
            alert: { isOpen: true, color: color, message: message },
        });

        // console.log(this.state.alert);
        setTimeout(() => {
            this.setState({ alert: { ...this.state.alert, isOpen: false } });
        }, 1000);
    }

    renderBody(index, value, context) {
        // if no data found
        if (index.empty) {
            return (
                <tr key={"notFound"}>
                    <TableCell colSpan={this.TABLE_HEAD.length + 1}>
                        <Typography
                            variant="small"
                            color="blue-green"
                            className="font-normal text-center"
                        >
                            No data found
                        </Typography>
                    </TableCell>
                </tr>
            );
        }

        return (
            <tr key={index.id ?? value}>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {value + 1}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index.uri}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index.name}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index.method}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Switch
                        onChange={(e) => this.changeAccess(e.target, context)}
                        value={index.name || ""}
                        checked={index.access}
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

                <SidebarUser routes={this.props.userRoutes}>
                    {this.state.alert.isOpen && (
                        <Alert
                            open={true}
                            onClose={() =>
                                this.setState({
                                    alert: {
                                        ...this.state.alert,
                                        isOpen: false,
                                    },
                                })
                            }
                            animate={{
                                mount: { y: 0 },
                                unmount: { y: 100 },
                            }}
                            color={this.state.alert.color}
                            className="fixed top-0 right-2 m-5 px-7 w-50 z-[999]"
                        >
                            {this.state.alert.message}
                        </Alert>
                    )}

                    <div className="mt-10 md:mt-0 md:px-6 h-full">
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
                            <a href="#" className="opacity-60">
                                <span>RBAC</span>
                            </a>
                            <a href={route("RBAC.Add Routes to Role")}>
                                Assign Routes
                            </a>
                        </Breadcrumbs>

                        <DataTable
                            className="w-full h-full overflow-hidden"
                            rawData={this.state.routes}
                            columns={this.TABLE_HEAD}
                        >
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="w-full z-[1] border border-gray-200">
                                        <TableHeader title="Assign Routes to Role">
                                            <div className="flex justify-center md:justify-start z-20">
                                                <Select
                                                    variant="outlined"
                                                    label="Select Role"
                                                    value={
                                                        this.state.role.name ??
                                                        ""
                                                    }
                                                    onChange={(r) => 
                                                        this.findRoutes(
                                                            r,
                                                            context
                                                        )
                                                    }
                                                    className="relative z-99"
                                                >
                                                    {this.props.roles?.data?.map(
                                                        (role, index) => (
                                                            <Option
                                                                key={
                                                                    role.name ??
                                                                    index
                                                                }
                                                                value={
                                                                    role.name
                                                                }
                                                            >
                                                                {role.name}
                                                            </Option>
                                                        )
                                                    )}
                                                </Select>
                                            </div>
                                        </TableHeader>

                                        <TableBody
                                            className={
                                                "relative " +
                                                this.props.className
                                            }
                                        >
                                            <TableBody.Head />
                                            <TableBody.Content>
                                                {context.paginatedData?.map(
                                                    (e, value) =>
                                                        this.renderBody(
                                                            e,
                                                            value,
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
            </>
        );
    }
}
