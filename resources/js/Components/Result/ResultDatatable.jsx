import { Card, Option, Select, Typography } from "@material-tailwind/react";
import TableCell from "../DataTable/TableCell";
import DataTable, { DataTableContext } from "../DataTable/DataTable";
import TableHeader from "../DataTable/TableHeader";
import TableBody from "../DataTable/TableBody";
import TableFooter from "../DataTable/TableFooter";
import { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export function ResultDatatable(props) {
    const FILTER = {
        NO_FILTER: "No Filter",
        REJECTED: "Rejected",
        ACCEPTED: "Accepted",
    };

    const [occupancies, setOccupancies] = useOccupancies(props.subjectPracticums);

    const [filter, setFilter] = useState(FILTER.NO_FILTER);

    const [studentResults, setStudentResults] = useState(props.data !== undefined ? Object.entries(props.data).map(
        ([_, studentResult]) => {
            const r = {
                user_id: studentResult.student.user.id,
                nrp: studentResult.student.user.email
                    .substring(0, 9)
                    .toUpperCase(),
                name: studentResult.student.user.name,
                accepted: studentResult.accepted,
                class: studentResult.practicum.code,
                class_id: studentResult.practicum.id,
            };

            return r;
        }
    ) : []);

    const assignStudent = async (e, practicumId, student_id, context) => {
        try {
            var response = await axios.post(
                route('result.assign-student', 
                {practicum_id: practicumId, student_id: student_id}));
            
            if (response.data.code == 200) {
                props.alertRef.current?.show(
                    "Berhasil assign praktikum",
                    "green",
                    2000 
                )
                const newStudentResults = [...studentResults].map(studentResult => {
                    if (studentResult.user_id == student_id) {
                        studentResult.class_id = practicumId;
                        studentResult.class = props.selectedSubject?.practicums.filter((practicum) => practicum.id == practicumId)[0].code;
                        studentResult.accepted = true;
                    }
                    return studentResult;
                });
                context.updateData(newStudentResults);
                setStudentResults(newStudentResults);
                setOccupancies(() => {
                    const newOccupancies = {...occupancies};
                    newOccupancies[practicumId]++;
                    if (e.target.dataset.oldValue != '-') {
                        newOccupancies[e.target.dataset.oldValue]--;
                    }
                    return newOccupancies;
                });
            }
        }
        catch (error) {
            e.target.value = e.target.dataset.oldValue;
            props.alertRef.current?.show(
                "Gagal assign praktikum",
                "red",
                2000 
            )
        }
    }

    // custom render function
    const renderCustom = (studentResult, index, context) => {
        // if no data found
        if (studentResult.empty) {
            return (
                <tr key={"notFound"}>
                    <TableCell colSpan={4}>
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
        const studentPracticum = props.selectedSubject?.practicums.filter((practicum) => practicum.code === studentResult.class)[0];
        const practicums = props.selectedSubject?.practicums;
        return (
            <tr key={index}>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index + 1}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {studentResult.nrp}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {studentResult.name}
                    </Typography>
                </TableCell>
                <TableCell>
                    <div className="flex max-w-[1px]">
                        <div className="min-w-[140px] flex items-center gap-x-2">
                            {/* <Select
                                variant="outlined"
                                label="Select Class"
                                value={(studentPracticum !== undefined && studentResult.accepted) ? studentPracticum.id : "-"}
                                onChange={(e) => assignStudent(e, studentResult.student.id)}
                                className="relative z-99"
                                containerProps={{ className: "!min-w-[110px] !w-[110px]" }}
                            >
                                {practicums.map((p) => {
                                    console.log(p.id)
                                    return (
                                        <Option key={p.id} value={p.id}>
                                            {p.code}
                                        </Option>
                                    );
                                }) }
                            </Select> */}
                            <select defaultValue={studentResult.accepted ? studentPracticum.id : '-'} style={(!studentResult.accepted) ? {color: 'red'} : {}} className="ms-3 me-6" data-old-value={studentResult.accepted ? studentResult.class_id : '-'} onChange={(e) => {assignStudent(e, e.target.value, studentResult.user_id, context)}}>
                                <option value="-" disabled>Rejected</option>
                                {practicums.map((p) => {
                                    return (
                                        <option key={p.id} value={p.id}>
                                            {p.code} ({occupancies[p.id]}/{p.quota}; {practicumTime(p.time, props.selectedSubject.duration)})
                                        </option>
                                    );
                                }) }
                            </select>
                            {studentResult.accepted && studentPracticum !== undefined
                                && <Link href={route('practicum.detail', studentPracticum.id)}  >
                                    <ArrowTopRightOnSquareIcon 
                                        className="h-6 w-6 text-blue-400 hover:text-blue-800 cursor-pointer" />
                                </Link>}
                        </div>
                    </div>
                </TableCell>
            </tr>
        );
    };

    const handleChange = (e, context) => {
        if (e === FILTER.NO_FILTER) {
            context.updateData(studentResults);
            return;
        }
        const accepted = (e === FILTER.ACCEPTED);
        context.updateData(studentResults.filter((studentResult) => studentResult.accepted === accepted));
    };

    return (
        <div>
            <DataTable
                className="w-full"
                rawData={studentResults}
                columns={["#", "NRP", "Name", "Class (Capacity; Time)"]}
            >
                <DataTableContext.Consumer>
                    {(context) => (
                        
                        <Card className="w-full z-1 md:py-0 overflow-auto">
                            <TableHeader
                                title={`Praktikum ${props.selectedSubject?.name}`}
                                description={`These are the students who apply for praktikum ${props.selectedSubject?.name.toLowerCase()}`}
                                className="font-bold table-header"
                            >
                                <div>
                                    <Select
                                        variant="outlined"
                                        label="Select Filter"
                                        value={filter}
                                        onChange={(e) => {
                                            handleChange(e, context);
                                            setFilter(e);
                                        }}
                                        className="relative z-10 select-button"
                                    >
                                        <Option value={FILTER.NO_FILTER}>
                                            {FILTER.NO_FILTER}
                                        </Option>
                                        <Option value={FILTER.REJECTED}>
                                            {FILTER.REJECTED}
                                        </Option>
                                        <Option value={FILTER.ACCEPTED}>
                                            {FILTER.ACCEPTED}
                                        </Option>
                                    </Select>
                                </div>
                            </TableHeader>

                            <TableBody className="relative" containerProps={{ className: 'overflow-visible' }} >
                                <TableBody.Head />
                                <TableBody.Content>
                                    {context.paginatedData.map(
                                        (studentResult, index) =>
                                            renderCustom(studentResult, index, context)
                                    )}
                                </TableBody.Content>
                            </TableBody>

                            <TableFooter />
                        </Card>
                    )}
                </DataTableContext.Consumer>
            </DataTable>
        </div>
    );
}

function useOccupancies(subjectPracticums) {
    const occupancies = {};
    subjectPracticums.forEach((practicum) => {
        occupancies[practicum.id] = 0;
        practicum.student_practicum.forEach((sp) => {
            if (sp.accepted % 2 == 1) {
                occupancies[practicum.id]++;
            }
        })
    });

    return useState(occupancies);
}

function practicumTime(start, duration) {
    const end = start + duration * 100;
    return `${formatTime(start)}-${formatTime(end)}`;
}

function formatTime(time) {
    const hour = time.toString().substring(0, 2);
    const minute = time.toString().substring(2, 4);
    return `${hour}:${minute}`;
}
