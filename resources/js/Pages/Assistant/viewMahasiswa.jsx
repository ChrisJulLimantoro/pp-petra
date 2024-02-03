import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import { Button, Card, Typography, Breadcrumbs } from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import axios from "axios";
import React, { useState, } from "react";
import NotificationAlert from "@/Components/NotificationAlert";
import { useRef } from "react";
import Swal from "sweetalert2";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function viewMahasiswa({ dataTable, routes }) {
    const styles = `
    input[type="file"] {
        color: transparent;
        display: none;
    }

    /* Tambahkan teks placeholder kustom */
    `;
    const columnssss = [
        "#",
        "NRP",
        "Nama",
        "Program Studi",
        "IPK",
        "IPS",
        "Semester",
        "Action",
    ];
    const [data, setData] = useState(dataTable);

    const renderBody = (data, index, context) => {
        // if no data found
        if (data.empty) {
            return (
                <tr key={"notFound"}>
                    <TableCell colSpan={columnssss.length}>
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
            <tr>
                {columnssss.map((column) =>
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
                    ) : column === "Action" ? (
                        <TableCell key={column}>
                            <div className="flex gap-5">
                            <EyeIcon color="#039be5" className="w-5 h-5 cursor-pointer" onClick={() => (window.location.href = route("viewPRS", data["id_student"]))} />
                            <TrashIcon color="red" className="w-5 h-5 cursor-pointer" onClick={() => handleDelete(data["id_student"])} />
                            </div>
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

    const alertRef = useRef();
    const alertGagal = useRef();
    const handleDelete = (deleteID) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(route("deleteMahasiswa", deleteID))
                    .then((response) => {
                        if (response.data.success) {
                            alertRef.current?.show(
                                "Berhasil menghapus",
                                "green",
                                2000
                            );
                        } else {
                            alertGagal.current?.show(
                                "Gagal Menghapus",
                                "red",
                                2000
                            );
                        }
                    })
                    .catch((error) => {
                        alertGagal.current?.show(
                            "Gagal Menghapus",
                            "red",
                            2000
                        );
                    });
            }
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        });
    };

    const [fileData, setFileData] = useState([]);
    const [separator, setSeparator] = useState("");

    const handleCSV = (e) => {
        const file = e.target.files[0];
        setFileData(file);
        var form_data = new FormData();
        form_data.append("file", file);

        Swal.fire({
            title: "Are you sure to upload this file?",
            text: "Pilih separator CSV",
            input: "select",
            inputOptions: {
                ";": ";",
                ":": ":",
                ",": ",",
            },
            inputAttributes: {
                autocapitalize: "off",
                id: "fileType", // Add an id to the select input
            },
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Upload it!",
        }).then((result) => {
            // console.log(result)
            if (result.isConfirmed) {
                form_data.append("separator", result.value);
                Swal.fire({
                    title: "Uploading...",
                    html: "",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });

                axios
                    .post(route("uploadMahasiswa"), form_data)
                    .then((result) => {
                        if (result.data.success) {
                           
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: "File berhasil diupload",
                            }); 
                            setData(result.data.data);
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: result.data.error_msg,
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        // Handle error
                    });
            }
        });
    };

    return (
        <>
            <Head>
                <title>Manage Mahasiswa</title>
                <style>{styles}</style>
            </Head>
            <NotificationAlert
                ref={alertRef}
                className="w-[20rem] fixed top-6 right-10 py-4 z-10"
                defaultColor="red"
                defaultShowTime={4000}
            />
            <NotificationAlert
                ref={alertGagal}
                className="w-[20rem] fixed top-6 right-10 py-4 z-10"
                defaultColor="red"
                defaultShowTime={4000}
            />
            <SidebarUser routes={routes}>
                <div className="mt-10 md:mt-0 md:px-5 overflow-auto">
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
                        <a>Mahasiswa</a>
                        <a href={route("Mahasiswa.Manage Mahasiswa")}>Manage Mahasiswa</a>
                    </Breadcrumbs>

                    <DataTable rawData={data} columns={columnssss}>
                        <DataTableContext.Consumer>
                            {(context) => (
                                <Card className="w-full z-[1] border">
                                    <TableHeader
                                        title="List Mahasiswa"
                                        perPage={context.perPage.toString()}
                                        changePerPage={(e) =>
                                            context.changePerPage(e)
                                        }
                                        searchData={(e) => context.searchData(e)}
                                    >
                                        <div className="flex gap-4">
                                            <Button
                                                variant="gradient"
                                                className="flex items-center gap-3"
                                            >
                                                {window.innerWidth < 768 ? 
                                                <label>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="currentColor"
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                        />
                                                    </svg>
                                                    <input
                                                            type="file"
                                                            accept=".csv"
                                                            onChange={handleCSV}
                                                        />
                                                </label> 
                                                : 
                                                <>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="currentColor"
                                                        className="h-5 w-5"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                    />
                                                    </svg>
                                                    <label>
                                                        <input
                                                            type="file"
                                                            accept=".csv"
                                                            onChange={handleCSV}
                                                        />
                                                        Upload CSV
                                                    </label>
                                                </>
                                                }
                                            </Button>
                                            
                                            <Button
                                                variant="gradient"
                                                className="flex items-center gap-3 mr-1"
                                                color="amber"
                                            >
                                                {window.innerWidth < 768 ? 
                                                <a href="/saocp/download-template-prs" download="template_prs.csv">
                                                    <svg
                                                        className="svg-icon"
                                                        viewBox="0 0 20 20"
                                                        fill="black"
                                                        width="20"
                                                        height="20"
                                                    >
                                                        <path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path>
                                                    </svg>
                                                </a> 
                                                : 
                                                <>
                                                    <svg
                                                        className="svg-icon"
                                                        viewBox="0 0 20 20"
                                                        fill="black"
                                                        width="20"
                                                        height="20"
                                                    >
                                                        <path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path>
                                                    </svg>
                                                    <a
                                                            href="/saocp/download-template-prs"
                                                            download="template_prs.csv"
                                                        >
                                                            Download template
                                                        </a>
                                                </>
                                            }
                                            </Button>

                                            <Button
                                                variant="gradient"
                                                className="flex items-center gap-3 mr-12"
                                                color="red"
                                            >
                                                <svg
                                                    class="svg-icon"
                                                    viewBox="0 0 20 20"
                                                    width="20"
                                                    height="20"
                                                    fill="white"
                                                >
                                                    <path d="M15.684,16.959L10.879,8.52c0.886-0.343,1.517-1.193,1.517-2.186c0-1.296-1.076-2.323-2.396-2.323S7.604,5.037,7.604,6.333c0,0.993,0.63,1.843,1.517,2.186l-4.818,8.439c-0.189,0.311,0.038,0.708,0.412,0.708h10.558C15.645,17.667,15.871,17.27,15.684,16.959 M8.562,6.333c0-0.778,0.645-1.382,1.438-1.382s1.438,0.604,1.438,1.382c0,0.779-0.645,1.412-1.438,1.412S8.562,7.113,8.562,6.333 M5.55,16.726L10,8.91l4.435,7.815H5.55z M15.285,9.62c1.26-2.046,1.26-4.525,0-6.572c-0.138-0.223-0.064-0.512,0.162-0.646c0.227-0.134,0.521-0.063,0.658,0.16c1.443,2.346,1.443,5.2,0,7.546c-0.236,0.382-0.641,0.17-0.658,0.159C15.221,10.131,15.147,9.842,15.285,9.62 M13.395,8.008c0.475-1.063,0.475-2.286,0-3.349c-0.106-0.238,0.004-0.515,0.246-0.62c0.242-0.104,0.525,0.004,0.632,0.242c0.583,1.305,0.583,2.801,0,4.106c-0.214,0.479-0.747,0.192-0.632,0.242C13.398,8.523,13.288,8.247,13.395,8.008 M3.895,10.107c-1.444-2.346-1.444-5.2,0-7.546c0.137-0.223,0.431-0.294,0.658-0.16c0.226,0.135,0.299,0.424,0.162,0.646c-1.26,2.047-1.26,4.525,0,6.572c0.137,0.223,0.064,0.512-0.162,0.646C4.535,10.277,4.131,10.489,3.895,10.107 M5.728,8.387c-0.583-1.305-0.583-2.801,0-4.106c0.106-0.238,0.39-0.346,0.631-0.242c0.242,0.105,0.353,0.382,0.247,0.62c-0.475,1.063-0.475,2.286,0,3.349c0.106,0.238-0.004,0.515-0.247,0.62c-0.062,0.027-0.128,0.04-0.192,0.04C5.982,8.668,5.807,8.563,5.728,8.387"></path>
                                                </svg>
                                                {window.innerWidth < 768 ? "" : "Connect API"}
                                            </Button>
                                        </div>
                                    </TableHeader>

                                    <TableBody>
                                        <TableBody.Head />
                                        <TableBody.Content>
                                            {context.paginatedData.map(
                                                (data, index) =>
                                                    renderBody(data, index, context)
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
