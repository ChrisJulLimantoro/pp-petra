import React, { useState, useRef } from "react";
import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import NotificationAlert from "@/Components/NotificationAlert";
import {
    Card,
    Select,
    Option,
    Spinner,
    Typography,
    Chip,
} from "@material-tailwind/react";

export default function DetailReport({
    title,
    subjects,
    events,
    initialReport,
    routes,
}) {
    const [activeSubject, setActiveSubject] = useState(subjects[0].id);
    const [activeEvent, setActiveEvent] = useState(events[0].id);
    const [loading, setLoading] = useState(false);
    const applied = useRef(initialReport.applied);
    const notYetApplied = useRef(initialReport.unapplied);
    const alertRef = useRef();
    const columns1 = [
        "#",
        "NRP",
        "Nama",
        "Program",
        "Semester",
        "Pilihan 1",
        "Pilihan 2",
        "Status",
    ];
    const columns2 = ["#", "NRP", "Nama", "Program", "Semester"];

    const handleChangeSubject = (subject) => {
        setLoading(true);
        axios
            .get(route("reports.getApplicationData", [subject, activeEvent]))
            .then((response) => {
                applied.current = response.data.applied;
                notYetApplied.current = response.data.unapplied;
                setLoading(false);
                setActiveSubject(subject);
            })
            .catch((err) => {
                console.log(err);
                alertRef.current?.show("Error", "red", 2000);
            });
    };

    const handleChangeEvent = (event) => {
        setLoading(true);
        axios
            .get(route("reports.getApplicationData", [activeSubject, event]))
            .then((response) => {
                applied.current = response.data.applied;
                notYetApplied.current = response.data.unapplied;
                setLoading(false);
                setActiveEvent(event);
            })
            .catch((err) => {
                console.log(err);
                alertRef.current?.show("Error", "red", 2000);
            });
    };

    const renderApplied = (data, index, context) => {
        if (data.empty || applied.current.length === 0) {
            return (
                <tr key={"notFound_1"}>
                    <TableCell colSpan={columns1.length}>
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
            <tr key={data.id}>
                {columns1.map((column) =>
                    column === "#" ? (
                        <TableCell>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {index +
                                    1 +
                                    context.perPage * (context.currentPage - 1)}
                            </Typography>
                        </TableCell>
                    ) : column === "Status" ? (
                        <TableCell key={column}>
                            {data.status === "Applied" ? (
                                <Chip
                                    color="orange"
                                    variant="ghost"
                                    value={data.status}
                                    className="text-center"
                                />
                            ) : (
                                <Chip
                                    color="green"
                                    variant="ghost"
                                    value={data.status}
                                    className="text-center"
                                />
                            )}
                        </TableCell>
                    ) : (
                        <TableCell key={column}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {
                                    data[
                                        column
                                            .toLowerCase()
                                            .replaceAll(" ", "_")
                                    ]
                                }
                            </Typography>
                        </TableCell>
                    )
                )}
            </tr>
        );
    };

    return (
        <>
            <Head>
                <title>{title}</title>
                <style>
                    {`
                        html {
                            overflow-x: hidden;
                        }
                    `}
                </style>
            </Head>

            <SidebarUser routes={routes}>
                <NotificationAlert
                    ref={alertRef}
                    className="w-[20rem] fixed top-6 right-10 py-4 z-10"
                    defaultColor="red"
                    defaultShowTime={2000}
                />

                <div className="flex flex-col gap-5 md:mr-5">
                    <div className="flex flex-col md:flex-row gap-5">
                        <Select
                            variant="outlined"
                            label="Mata Kuliah"
                            value={activeSubject}
                            onChange={(e) => handleChangeSubject(e)}
                            className="relative z-99 w-full"
                        >
                            {subjects?.map((subject, index) => (
                                <Option key={subject.name} value={subject.id}>
                                    {subject.name}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            variant="outlined"
                            label="Periode"
                            value={activeEvent}
                            onChange={(e) => handleChangeEvent(e)}
                            className="relative z-99"
                        >
                            {events?.map((event, index) => (
                                <Option key={event.id} value={event.id}>
                                    {event.name}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    {/* Applied */}
                    <DataTable
                        className="w-full overflow-hidden"
                        rawData={applied.current}
                        columns={columns1}
                    >
                        <DataTableContext.Consumer>
                            {(context) => (
                                <Card className="w-full z-[1] border border-gray-200">
                                    <TableHeader title="Sudah daftar" />

                                    <TableBody className="relative">
                                        <TableBody.Head />
                                        <TableBody.Content>
                                            {loading ? (
                                                <tr>
                                                    <TableCell
                                                        colSpan={
                                                            columns1.length
                                                        }
                                                        className="text-center"
                                                    >
                                                        <div className="flex flex-col items-center gap-3">
                                                            <Spinner />
                                                            <Typography>
                                                                Loading...
                                                            </Typography>
                                                        </div>
                                                    </TableCell>
                                                </tr>
                                            ) : (
                                                context.paginatedData?.map(
                                                    (data, index) =>
                                                        renderApplied(
                                                            data,
                                                            index,
                                                            context
                                                        )
                                                )
                                            )}
                                        </TableBody.Content>
                                    </TableBody>

                                    <TableFooter />
                                </Card>
                            )}
                        </DataTableContext.Consumer>
                    </DataTable>

                    {/* Not yet applied */}
                    <DataTable
                        className="w-full overflow-hidden"
                        rawData={notYetApplied.current}
                        columns={columns2}
                    >
                        <Card className="w-full z-[1] border border-gray-200">
                            <TableHeader title="Belum daftar" />

                            <TableBody className="relative">
                                <TableBody.Head />
                                <TableBody.Content>
                                    {loading && (
                                        <tr>
                                            <TableCell
                                                colSpan={columns1.length}
                                                className="text-center"
                                            >
                                                <div className="flex flex-col items-center gap-3">
                                                    <Spinner />
                                                    <Typography>
                                                        Loading...
                                                    </Typography>
                                                </div>
                                            </TableCell>
                                        </tr>
                                    )}
                                </TableBody.Content>
                            </TableBody>

                            <TableFooter />
                        </Card>
                    </DataTable>
                </div>
            </SidebarUser>
        </>
    );
}
