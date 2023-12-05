import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import {
    Breadcrumbs,
    Button,
    Card,
    Option,
    Select,
    Spinner,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ResultDatatable } from "@/Components/Result/ResultDatatable";
import NotificationAlert from "@/Components/NotificationAlert";

export default function Result(props) {
    const allSubjects = build_subjects(props.subjects);
    const [eventsGeneratedStatus, setEventsGeneratedStatus] = useState(() => {
        const statuses = {};
        props.events.forEach((event) => {
            statuses[event.id] = event.generated;
        });
        return statuses;
    });
    const [eventId, setEventId] = useState(null);
    const [data, setData] = useState({});
    const [tabLoading, setTabLoading] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const emptyTabRef = useRef(null);
    const alertRef = useRef();
    const [filter, setFilter] = useState('No Filter');

    const generateResult = async () => {
        if (eventId === null) {
            Swal.fire({
                icon: "error",
                text: "Please select an event first",
                title: "No Event Selected",
            });
            return;
        }
        const tempEventId = eventId;
        const swalLoading = Swal.fire({
            title: "Generating Result",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                setEventId(null);
                Swal.showLoading();
            },
        });

        const eventSubjects = Object.entries(data).map(
            ([subject, _]) => subject
        );
        const generateResultRequests = [];
        eventSubjects.forEach((subject_id) => {
            generateResultRequests.push(
                axios.post(
                    route("result.generate-result", [eventId, subject_id])
                )
            );
        });

        const responses = await Promise.all(generateResultRequests);
        const eventStatusResponse = await axios.post(
            route("result.update-event-generated-status", eventId)
        );
        swalLoading.close();

        if (
            responses.some((res) => res.data.code != 200) ||
            eventStatusResponse.data.code != 200
        ) {
            Swal.fire("Error!", "Something went wrong.", "error");
            return;
        }
        Swal.fire("Success!", "Result generated successfully.", "success").then(
            () => {
                setEventId(tempEventId);
                setEventsGeneratedStatus((prev) => {
                    const temp = { ...prev };
                    temp[tempEventId] = 1;
                    return temp;
                });
            }
        );
    };

    useEffect(() => {
        if (eventId === null) return;
        setTabLoading(true);
        axios
            .get(route("result.result-by-event", eventId))
            .then((res) => {
                const data = {};
                res.data.forEach((result) => {
                    const subject = result.practicum.subject_id;
                    result.accepted = result.accepted % 2 !== 0;

                    if (data[subject] === undefined) {
                        data[subject] = {};
                    }
                    if (!result.generated) return;

                    if (Object.hasOwn(data[subject], result.student_id)) {
                        if (data[subject][result.student_id].accepted) return;
                        if (result.accepted) {
                            data[subject][result.student_id] = result;
                        }
                    } else {
                        data[subject][result.student_id] = result;
                    }
                });
                setData(data);
            })
            .finally(() => {
                setTabLoading(false);
            });
    }, [eventId]);

    const tabs = Object.entries(data);

    return (
        <>
            <Head>
                <title>Result</title>
                <style>{`
                html {
                    overflow-x: hidden;
                }
                `}</style>
            </Head>
            <SidebarUser routes={props.routes}>
                <NotificationAlert
                    ref={alertRef}
                    className="w-[20rem] fixed top-6 right-10 py-4"
                    defaultColor="red" // optional default green
                    defaultShowTime={4000} // optional default 1000 ms
                />
                <Breadcrumbs className="mb-5">
                    <a href={route("asisten.dashboard")} className="opacity-60">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </a>
                    <a href={route("Result")}>Result</a>
                </Breadcrumbs>
                <main className="pr-7">
                    <div className="mb-5 flex gap-x-8">
                        <Select
                            label="Select Event"
                            containerProps={{ className: "max-w-[250px]" }}
                            onChange={(e) => {
                                emptyTabRef.current?.click();
                                setEventId(e);
                                setSelectedSubject(null);
                            }}
                        >
                            {props.events.map((event) => {
                                return (
                                    <Option key={event.id} value={event.id}>
                                        {event.name}
                                    </Option>
                                );
                            })}
                        </Select>
                        {eventId !== null &&
                            eventsGeneratedStatus[eventId] == 0 && (
                                <Button onClick={generateResult}>
                                    Generate Result
                                </Button>
                            )}
                    </div>
                    <Card className="max-w-full z-1 md:py-0 overflow-auto border border-gray-200 min-h-[200px]">
                        <div className="p-2">
                            <Tabs value="false">
                                <TabsHeader className="grid-cols-6 flex-wrap justify-around gap-y-1.5">
                                    {tabLoading ? (
                                        <Spinner className="h-6 w-6" />
                                    ) : eventId !== null ? (
                                        tabs.length > 0 ? (
                                            <>
                                                {tabs.map(([key, value]) => (
                                                    <Tab
                                                        key={key}
                                                        value={key}
                                                        className="max-w-[200px]"
                                                        onClick={() => {
                                                            setSelectedSubject(
                                                                allSubjects[key]
                                                            );
                                                            setFilter('No Filter');
                                                            document.querySelector('.table-header input[fdprocessedid]').value = '';
                                                        }}
                                                    >
                                                        {allSubjects[key].name}
                                                    </Tab>
                                                ))}
                                                <Tab
                                                    key="blank"
                                                    value="blank"
                                                    className="max-w-[0px] w-0 absolute"
                                                    style={{ right: "-50px" }}
                                                    ref={emptyTabRef}
                                                ></Tab>
                                            </>
                                        ) : (
                                            <Tab value="empty">Empty</Tab>
                                        )
                                    ) : (
                                        <Tab value="no-event">
                                            Please Select an Event
                                        </Tab>
                                    )}
                                </TabsHeader>
                                <TabsBody>
                                    <div className="bg-gray-50 px-6 py-4 min-h-[140px] rounded-lg">
                                        {selectedSubject !== null &&
                                            !tabLoading &&
                                            eventId !== null && (
                                                <ResultDatatable
                                                    selectedSubject={
                                                        selectedSubject
                                                    }
                                                    filter={filter}
                                                    setFilter={setFilter}
                                                    data={
                                                        data[selectedSubject.id]
                                                    }
                                                    alertRef={alertRef}
                                                />
                                            )}
                                    </div>
                                </TabsBody>
                            </Tabs>
                        </div>
                    </Card>
                </main>
            </SidebarUser>
        </>
    );
}

function build_subjects(data) {
    const subjects = {};
    data.forEach((item) => {
        subjects[item.id] = item;
    });
    return subjects;
}
