import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import SelectMatkul from "@/Components/SelectMatkul";
import {
    Button,
    Breadcrumbs,
    Typography,
    Tooltip,
    Dialog,
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Select, Option, Input } from "@material-tailwind/react";
import NotificationAlert from "@/Components/NotificationAlert";
import { useRef } from "react";
import Swal from "sweetalert2";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function viewMahasiswa({ dataTable, routes }) {
    const [fileData, setFileData] = useState([]); // File data to be sent to the server
    const [formData, setFormData] = useState({
        kodeMataKuliah: "",
        namaMataKuliah: "",
        kelas: "",
        hari: 1, // Default value is set to Senin
        jamMulai: "",
        durasi: "",
    });

    const style = `
        input[type="file"] {
            color: transparent;
            display: none;
          }

        html{
            overflow-x: hidden;
        }
        .custom-sweetalert-container {
            z-index: 1100 !important;
        }

        .modal{
            z-index:1000 !important;
        }

        .btn-submit{
          
        }
    `;

    const fileInputRef = React.createRef();

    const openFileInput = () => {
        fileInputRef.current.click()
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(formData).some((value) => value === "")) {
            Swal.fire(
                "All fields must be filled in!",
                "Please Check Your Form",
                "error"
            );
            return;
        }
        const data = {
            kodeMatkul: formData.kodeMataKuliah,
            namaMatkul: formData.namaMataKuliah,
            kelas: formData.kelas,
            hari: parseInt(formData.hari),
            jamMulai: parseInt(formData.jamMulai.replace(":", ""), 10),
            durasi: parseInt(formData.durasi),
        };

        // console.log(data);

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
                    .post(route("addMasterJadwal"), data)
                    .then((response) => {
                        if (response.data.success) {
                            alertRef.current?.show(
                                "Berhasil mendaftar",
                                "green",
                                2000
                            );
                        } else {
                            alertGagal.current?.show(
                                "Gagal Mendaftarrrrr",
                                "red",
                                2000
                            );
                        }
                    })
                    .catch((error) => {
                        alertGagal.current?.show(
                            "Gagal Mendaftar",
                            "red",
                            2000
                        );
                    });
                // setTimeout(function() {
                //     window.location.reload();
                // },2000)
            }
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        });

        // console.log(data)
    };

    const alertRef = useRef();
    const alertGagal = useRef();

    const columnssss = [
        "#",
        "Kode",
        "Mata Kuliah",
        "Kelas",
        "Hari",
        "Jam",
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
                            <div className="flex gap-1">
                                <Tooltip content="Delete" placement="top">
                                    <TrashIcon
                                        className="justify-self-center mx-6"
                                        width={20}
                                        cursor={"pointer"}
                                        stroke="red"
                                        onClick={() => handleDelete(data["id"])}
                                    />
                                </Tooltip>
                                <Tooltip content="Edit" placement="top">
                                    <PencilSquareIcon
                                        width={20}
                                        cursor={"pointer"}
                                        stroke="orange"
                                        onClick={() => handleEdit(data)}
                                    />
                                </Tooltip>
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
                    .delete(route("deleteMasterJadwal", deleteID))
                    .then((response) => {
                        if (response.data.success) {
                            alertRef.current?.show(
                                "Berhasil menghapus",
                                "green",
                                2000
                            );
                        } else {
                            alertGagal.current?.show(
                                "Gagal Menghapusss",
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
                    .post(route("uploadSchedule"), form_data)
                    .then((result) => {
                        console.log(result);
                        if (result.data.success) {
                            Swal.fire({
                                title: "Success!",
                                text: "Data berhasil diupload",
                                icon: "success",
                            });
                            setData(result.data.data);
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: result.data.error_message,
                                icon: "error",
                            });
                        }
                    })
                    .catch((error) => {
                        // Handle error
                    });
            }
        });
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [editFormData, setEditFormData] = useState({
        kodeMataKuliah: "",
        namaMataKuliah: "",
        kelas: "",
        hari: 1,
        jamMulai: "",
        durasi: "",
        id: "",
    });

    const [dataOld, setDataOld] = useState({
        kodeMataKuliah: "",
        namaMataKuliah: "",
        kelas: "",
        hari: 1,
        jamMulai: "",
        durasi: "",
        id: "",
    });

    const handleEdit = (rowData) => {
        const waktuString = rowData.jam;

        var hari = 0;

        if (rowData.hari == "Senin") {
            hari = 1;
        } else if (rowData.hari == "Selasa") {
            hari = 2;
        } else if (rowData.hari == "Rabu") {
            hari = 3;
        } else if (rowData.hari == "Kamis") {
            hari = 4;
        } else if (rowData.hari == "Jumat") {
            hari = 5;
        } else if (rowData.hari == "Sabtu") {
            hari = 6;
        }

        // Pecah menjadi dua bagian berdasarkan tanda hubung (-)
        const [jamMulaiString, jamSelesaiString] = waktuString.split(" - ");

        // Fungsi untuk menghapus tanda ":" dan mengonversi ke integer
        const stringKeInteger = (waktu) => parseInt(waktu.replace(":", ""), 10);

        const stringKeDate = (waktu) => {
            const [jam, menit] = waktu.split(":");
            const tanggalHariIni = new Date();
            tanggalHariIni.setHours(parseInt(jam, 10));
            tanggalHariIni.setMinutes(parseInt(menit, 10));
            return tanggalHariIni;
        };
        var jamForm = stringKeDate(jamMulaiString);

        // Konversi jam mulai dan jam selesai ke dalam bentuk integer
        const jamMulai = stringKeInteger(jamMulaiString);
        const jamSelesai = stringKeInteger(jamSelesaiString);

        // Hitung durasi
        const durasi = (jamSelesai - jamMulai) / 100;
        const temp = {
            kodeMataKuliah: rowData.kode,
            namaMataKuliah: rowData.mata_kuliah,
            kelas: rowData.kelas,
            hari: hari,
            jamMulai: jamForm
                .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                .replace(/\./g, ":"),
            durasi: durasi,
            id: rowData.id,
        };
        handleOpen();

        setDataOld(temp);
        setEditFormData((editFormData) => ({
            ...editFormData,
            ...temp,
        }));
        // console.log(editFormData);
    };

    const handleEditChange = (e, field) => {
        // console.log(e.target.value);
        if (field != "hari") {
            setEditFormData({
                ...editFormData,
                [field]: e.target.value,
            });
        } else {
            setEditFormData({
                ...editFormData,
                [field]: e,
            });
        }
    };
    const handleEditSubmit = (e, editID) => {
        e.preventDefault();
        // console.log(dataOld);
        handleOpen();

        if (Object.values(editFormData).some((value) => value === "")) {
            handleCloseEditModal();
            Swal.fire(
                "All fields must be filled in!",
                "Please Check Your Form",
                "error"
            );
            return;
        }
        console.log(editFormData.hari);
        const data = {
            kodeMatkul: editFormData.kodeMataKuliah,
            namaMatkul: editFormData.namaMataKuliah,
            kelas: editFormData.kelas,
            hari: parseInt(editFormData.hari),
            jamMulai: parseInt(editFormData.jamMulai.replace(":", ""), 10),
            durasi: parseInt(editFormData.durasi),
        };
        console.log(data);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            customClass: {
                container: "custom-sweetalert-container",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .patch(route("updateMasterJadwal", editID), data)
                    .then((response) => {
                        console.log(response);
                        if (response.data.success) {
                            alertRef.current?.show(
                                "Berhasil Update",
                                "green",
                                2000
                            );
                        } else {
                            alertGagal.current?.show(
                                "Gagal Update",
                                "red",
                                2000
                            );
                        }
                    });
                // setTimeout(function() {
                //     window.location.reload();
                // },2000)
            } else {
                handleOpen();
            }
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        });
    };

    const handleCloseEditModal = () => {
        // Lakukan reset atau inisialisasi kembali objek editFormData sesuai kebutuhan
        setEditFormData({
            kodeMataKuliah: "",
            namaMataKuliah: "",
            kelas: "",
            hari: "",
            jamMulai: "",
            durasi: "",
        });

        // Tutup modal dengan mengubah state open menjadi false
        handleOpen();
    };

    return (
        <>
            <Head>
                <title>SAOCP-Daftar Praktikum</title>
                <style>{style}</style>
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
                    <a href={route("Mahasiswa.View Jadwal")}>View Jadwal</a>
                </Breadcrumbs>
                <form onSubmit={handleSubmit} className="mx-auto md:w-2/3 lg:w-1/2 xl:w-1/2">
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4 md:mb-0">
                        <label className="block text-sm font-medium text-gray-600">Kode Mata Kuliah</label>
                        <input
                            type="text"
                            name="kodeMataKuliah"
                            value={formData.kodeMataKuliah}
                            onChange={handleChange}
                            className="mt-1 p-2 text-sm border border-gray-400 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-600">Nama Mata Kuliah</label>
                        <input
                            type="text"
                            name="namaMataKuliah"
                            value={formData.namaMataKuliah}
                            onChange={handleChange}
                            className="mt-1 p-2 text-sm border border-gray-400 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4 md:mb-0">
                        <label className="block text-sm font-medium text-gray-600">Kelas</label>
                        <input
                            type="text"
                            name="kelas"
                            value={formData.kelas}
                            onChange={handleChange}
                            className="mt-1 p-2 text-sm border border-gray-400 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-600">Hari</label>
                        <select
                            name="hari"
                            value={formData.hari}
                            onChange={handleChange}
                            className="mt-1 p-2 text-sm border border-gray-400 rounded-md w-full focus:outline-none focus:border-blue-500"
                        >
                            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((day, index) => (
                            <option key={index + 1} value={index + 1}>
                                {day}
                            </option>
                            ))}
                        </select>
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4 md:mb-0">
                        <label className="block text-sm font-medium text-gray-600">Jam Mulai</label>
                        <input
                            type="time"
                            name="jamMulai"
                            value={formData.jamMulai}
                            onChange={handleChange}
                            className="mt-1 p-2 text-sm border border-gray-400 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-600">Durasi</label>
                        <input
                            type="number"
                            name="durasi"
                            value={formData.durasi}
                            onChange={handleChange}
                            className="mt-1 p-2 text-sm border border-gray-400 rounded-md w-full focus:outline-none focus:border-blue-500"
                        />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-submit bg-blue-500 text-white px-4 py-2 md:py-3 w-full md:w-1/2 md:h-11 rounded-xl hover:bg-blue-600 md:ml-28"
                    >
                        Submit
                    </button>
                </form>



                <DataTable rawData={data} columns={columnssss}>
                    <DataTableContext.Consumer>
                        {(context) => (
                            <Card className="w-full z-[1]">
                                <TableHeader
                                    title="List Mata Kuliah"
                                    perPage={context.perPage.toString()}
                                    changePerPage={(e) =>
                                        context.changePerPage(e)
                                    }
                                    searchData={(e) => context.searchData(e)}
                                >
                                    <Button
                                        variant="gradient"
                                        className="flex items-center gap-3"
                                        onClick={openFileInput}
                                    >
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
                                                ref={fileInputRef}
                                            />
                                            Upload CSV
                                        </label>
                                    </Button>
                                    <Button
                                        variant="gradient"
                                        className="flex items-center gap-3 mr-1"
                                        color="amber"
                                    >
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
                                            href="/saocp/download-template-jadwal"
                                            download="template_jadwal.csv"
                                        >
                                            Download Template
                                        </a>
                                    </Button>
                                    <Button
                                        variant="gradient"
                                        className="flex items-center gap-3 mr-12"
                                        color="red"
                                    >
                                        <svg
                                            className="svg-icon"
                                            viewBox="0 0 20 20"
                                            width="20"
                                            height="20"
                                            fill="white"
                                        >
                                            <path d="M15.684,16.959L10.879,8.52c0.886-0.343,1.517-1.193,1.517-2.186c0-1.296-1.076-2.323-2.396-2.323S7.604,5.037,7.604,6.333c0,0.993,0.63,1.843,1.517,2.186l-4.818,8.439c-0.189,0.311,0.038,0.708,0.412,0.708h10.558C15.645,17.667,15.871,17.27,15.684,16.959 M8.562,6.333c0-0.778,0.645-1.382,1.438-1.382s1.438,0.604,1.438,1.382c0,0.779-0.645,1.412-1.438,1.412S8.562,7.113,8.562,6.333 M5.55,16.726L10,8.91l4.435,7.815H5.55z M15.285,9.62c1.26-2.046,1.26-4.525,0-6.572c-0.138-0.223-0.064-0.512,0.162-0.646c0.227-0.134,0.521-0.063,0.658,0.16c1.443,2.346,1.443,5.2,0,7.546c-0.236,0.382-0.641,0.17-0.658,0.159C15.221,10.131,15.147,9.842,15.285,9.62 M13.395,8.008c0.475-1.063,0.475-2.286,0-3.349c-0.106-0.238,0.004-0.515,0.246-0.62c0.242-0.104,0.525,0.004,0.632,0.242c0.583,1.305,0.583,2.801,0,4.106c-0.214,0.479-0.747,0.192-0.632,0.242C13.398,8.523,13.288,8.247,13.395,8.008 M3.895,10.107c-1.444-2.346-1.444-5.2,0-7.546c0.137-0.223,0.431-0.294,0.658-0.16c0.226,0.135,0.299,0.424,0.162,0.646c-1.26,2.047-1.26,4.525,0,6.572c0.137,0.223,0.064,0.512-0.162,0.646C4.535,10.277,4.131,10.489,3.895,10.107 M5.728,8.387c-0.583-1.305-0.583-2.801,0-4.106c0.106-0.238,0.39-0.346,0.631-0.242c0.242,0.105,0.353,0.382,0.247,0.62c-0.475,1.063-0.475,2.286,0,3.349c0.106,0.238-0.004,0.515-0.247,0.62c-0.062,0.027-0.128,0.04-0.192,0.04C5.982,8.668,5.807,8.563,5.728,8.387"></path>
                                        </svg>
                                        Connect API
                                    </Button>
                                </TableHeader>

                                <TableBody className={"relative"}>
                                    <TableBody.Head />
                                    <TableBody.Content>
                                        {context.paginatedData.map(
                                            (data, index) =>
                                                renderBody(data, index, context)
                                        )}
                                    </TableBody.Content>
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

                <Dialog
                    size="sm"
                    open={open}
                    handler={handleOpen}
                    className="bg-transparent shadow-none modal"
                >
                    <Card className="mx-auto w-full">
                    <CardBody className="flex flex-col gap-4 p-6">
  <Typography variant="h4" color="blue-gray">
    Edit Data
  </Typography>

  <div className="flex flex-col gap-4 mb-4 md:flex-row md:gap-8">
    <div className="flex-1">
      <Input
        label="Kode Mata Kuliah"
        size="lg"
        value={editFormData.kodeMataKuliah}
        onChange={(e) => handleEditChange(e, "kodeMataKuliah")}
      />
    </div>

    <div className="flex-1">
      <Input
        label="Nama Mata Kuliah"
        size="lg"
        value={editFormData.namaMataKuliah}
        onChange={(e) => handleEditChange(e, "namaMataKuliah")}
      />
    </div>
  </div>

  <div className="flex flex-col gap-4 mb-4 md:flex-row md:gap-8">
    <div className="flex-1">
      <Input
        label="Kelas"
        size="lg"
        value={editFormData.kelas}
        onChange={(e) => handleEditChange(e, "kelas")}
      />
    </div>

    <div className="flex-1">
      <Select
        label="Hari"
        name="hari"
        value={editFormData.hari}
        onChange={(e) => handleEditChange(e, "hari")}
      >
        {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((day, index) => (
          <Option key={index + 1} value={index + 1}>
            {day}
          </Option>
        ))}
      </Select>
    </div>
  </div>

  <div className="flex flex-col gap-4 mb-4 md:flex-row md:gap-8">
    <div className="flex-1">
      <Input
        label="Jam Mulai"
        type="time"
        name="jamMulai"
        value={editFormData.jamMulai}
        onChange={(e) => handleEditChange(e, "jamMulai")}
      />p
    </div>

    <div className="flex-1">
      <Input
        label="Durasi"
        type="number"
        name="durasi"
        value={editFormData.durasi}
        onChange={(e) => handleEditChange(e, "durasi")}
      />
    </div>
  </div>
</CardBody>

                        <CardFooter className="pt-0">
                            <Button
                                variant="gradient"
                                onClick={(e) =>
                                    handleEditSubmit(e, editFormData.id)
                                }
                                fullWidth
                            >
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                </Dialog>
            </SidebarUser>
        </>
    );
}
