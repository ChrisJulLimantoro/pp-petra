import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import SelectMatkul from "@/Components/SelectMatkul";
import { Button, Card, Typography, Tooltip, Breadcrumbs } from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";
import NotificationAlert from "@/Components/NotificationAlert";
import { useRef } from "react";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Dashboard({
    auth,
    matkul,
    id,
    practicumID,
    dataTable,
    ValidateStatus,
    Event,
    routes,
}) {
    let [course, setCourse] = useState("");
    let [selected1Options, setSelected1Options] = useState([]);
    let [selected2Options, setSelected2Options] = useState([]);
    const [class1Options, setClass1Options] = useState([]);
    const [class2Options, setClass2Options] = useState([]);
    let [pracID, setPracID] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const alertRef = useRef();
    const alertGagal = useRef();

    useEffect(() => {
        // console.log(course)
        if (course) {
            axios
                .get(route("mahasiswa.getClass", course))
                .then((response) => {
                    const { class1, class2, practicumID } = response.data;
                    setClass1Options(class1);
                    setClass2Options(class2);
                    setPracID(practicumID);
                })
                .catch((error) => {});
        }
    }, [course]);

    const dataMatkul = matkul;
    const idMatkul = id;
    const Pilihan = ["A", "B", "C", "D", "E"];
    const columnssss = [
        "#",
        "Hari",
        "Jam",
        "Mata Kuliah Praktikum",
        "Kelas",
        "Pilihan",
        "Status",
    ];

    const data = dataTable;
    const renderBody = (data, index, context, practicumID) => {
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
            <tr key={index} id={practicumID[index]}>
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
                    ) : (
                        <TableCell key={column}>
                            {column === "Status" && ValidateStatus === false ? (
                                <Tooltip content="Delete" placement="top">
                                    <TrashIcon
                                        className="justify-self-center mx-6"
                                        width={20}
                                        cursor={"pointer"}
                                        stroke="red"
                                        onClick={() =>
                                            handleDelete(practicumID[index])
                                        }
                                    />
                                </Tooltip>
                            ) : (
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
                            )}
                        </TableCell>
                    )
                )}
            </tr>
        );
    };

    const handleValidate = () => {
        Swal.fire({
            title: "Are you sure want to validate?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                setShowLoader(true);
                axios
                    .post(route("mahasiswa.validate"))
                    .then((response) => {
                        if (response.data.success) {
                            alertRef.current?.show(
                                "Berhasil Validate, Silahkan cek email!",
                                "green",
                                10000
                            );
                        } else {
                            alertGagal.current?.show(
                                response.data.error_message,
                                "red",
                                10000
                            );
                        }
                    })
                    .catch((error) => {
                        alertGagal.current?.show(
                            "Gagal Validasi",
                            "red",
                            10000
                        );
                    })
                    .finally(() => {
                        setTimeout(() => {
                            setShowLoader(false);
                        }, 3000);
                        setTimeout(function () {
                            window.location.reload();
                        }, 4000);
                    });
            }
        });
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
                    .delete(route("mahasiswa.deletePracticum", deleteID))
                    .then((response) => {
                        if (response.data.success) {
                            alertRef.current?.show(
                                "Berhasil menghapus",
                                "green",
                                2000
                            );
                        } else {
                            alertGagal.current?.show(
                                "Gagal Menghapussss",
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
    const styles = `

    html{
        overflow-x: hidden;
    }
    .divLabel{
        width: 15vw;
    }

    .divButton{
        margin-left: 6vw !important;
    }

    .btn{
        width: 10vw;
    }

    .page-loader{
        width: 100%;
        height: 130vh;
        position: absolute;
        background: #272727;
        z-index: 1000;
        .txt{
          color: #666;
          text-align: center;
          top: 25%;
          position: relative;
          text-transform: uppercase;
          letter-spacing: 0.3rem;
          font-weight: bold;
          line-height: 1.5;
        }
      }
      
      /* SPINNER ANIMATION */
      .spinner {
        position: relative;
        top: 20%;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        background-color: #fff;
      
        border-radius: 100%;  
        -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
        animation: sk-scaleout 1.0s infinite ease-in-out;
      }
      
      @-webkit-keyframes sk-scaleout {
        0% { -webkit-transform: scale(0) }
        100% {
          -webkit-transform: scale(1.0);
          opacity: 0;
        }
      }
      
      @keyframes sk-scaleout {
        0% { 
          -webkit-transform: scale(0);
          transform: scale(0);
        } 100% {
          -webkit-transform: scale(1.0);
          transform: scale(1.0);
          opacity: 0;
        }
      }
    
  `;

    const handleCourseChange = (selectedOption) => {
        setCourse(selectedOption);
    };

    const handle1Change = (selectedOption) => {
        setSelected1Options(selectedOption);
    };

    const handle2Change = (selectedOption) => {
        setSelected2Options(selectedOption);
    };

    const resetForm = () => {
        setData({
            course: "",
            selected1Options: "",
            selected2Options: "",
        });
        setError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            matkul: course,
            pilihan1: selected1Options,
            pilihan2: selected2Options,
        };
        if (
            data["matkul"] == "" ||
            (data["pilihan1"] || data["pilihan2"]) == ""
        ) {
            Swal.fire(
                "All fields must be filled in!",
                "Please Check Your Form",
                "error"
            );
        } else {
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
                        .post(route("mahasiswa.addPracticum"), data)
                        .then((response) => {
                            if (response.data.success) {
                                alertRef.current?.show(
                                    "Berhasil mendaftar",
                                    "green",
                                    2000
                                );
                            } else {
                                alertGagal.current?.show(
                                    "Gagal Mendaftar",
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
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                }
            });
        }
    };

    return (
        <>
            <Head>
                <title>SAOCP-Daftar Praktikum</title>
                <style>{styles}</style>
            </Head>

            {showLoader && (
                <div className="page-loader">
                    <div className="spinner"></div>
                    <div className="txt">
                        Please Wait...
                        <br />
                    </div>
                </div>
            )}
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
            {/* <div className="grid grid-cols-3"> */}
            <SidebarUser routes={routes}>
                <Breadcrumbs className="mb-5">
                    <a href={route('Dashboard')} className="opacity-60">
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
                        <span>Mahasiswa</span>
                    </a>
                    <a href='#'>Daftar Praktikum</a>
                </Breadcrumbs>
                <div className="mt-2 w-full h-72 bg-slade lg:mx-44 md:mx-8 sm:mx-4">
                    {!ValidateStatus &&(
                    <div className="col-span-1 flex-auto lg:ml-[-11vw]">
                    <form onSubmit={handleSubmit} method="POST" className="max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        <div className="mb-4 md:mb-0">
                            {/* <h1 className="w-full">Mata Kuliah Praktikum</h1> */}
                            <div className="w-full md:w-72">
                                <Select label="Pilih Mata Kuliah" size="md" variant="outlined" id='course' onChange={handleCourseChange}>
                                    {dataMatkul.map((item, index) => (
                                        <Option key={idMatkul[index]} value={idMatkul[index]}>{item}</Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
        
                        <div className="mb-4 md:mb-0">
                            {/* <h1 className="w-full">Pilihan 1</h1> */}
                            <div className="w-full md:w-72">
                                <Select label="Pilihan 1" size="md" variant="outlined" id='class1' onChange={handle1Change}>
                                    {class1Options.map((item, index) => (
                                        <Option key={index} value={pracID[index]}>{item}</Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
        
                        <div className="mb-4 md:mb-0">
                            {/* <h1 className="w-full">Pilihan 2</h1> */}
                            <div className="w-full md:w-72">
                                <Select label="Pilihan 2" size="md" variant="outlined" id='class2' onChange={handle2Change}>
                                    {class2Options.map((item, index) => (
                                        <Option key={index} value={pracID[index]}>{item}</Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>
        
                    <div className="grid place-content-center">
                    <Button
                        variant="gradient"
                        color="indigo"
                        className="btn w-full md:w-auto"
                        type="submit"
                    >
                        Input
                    </Button>
                    </div>
                </form>
                
            </div>
                    )}
                    <div
                        className="col-span-1 flex-auto lg:ml-[-11vw]"
                        style={{ width: "70vw" }}
                    >
                        <DataTable rawData={data} columns={columnssss}>
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="w-full z-[1]">
                                        <TableHeader
                                            title={Event}
                                            perPage={context.perPage.toString()}
                                            changePerPage={(e) =>
                                                context.changePerPage(e)
                                            }
                                            searchData={(e) =>
                                                context.searchData(e)
                                            }
                                        >
                                            {!ValidateStatus && (
                                                <Button
                                                    className="bg-lime-800 hover:bg-lime-950 justify-self-end rounded-full"
                                                    onClick={handleValidate}
                                                >
                                                    VALIDATE
                                                </Button>
                                            )}
                                        </TableHeader>

                                        <TableBody className={"relative "}>
                                            <TableBody.Head />
                                            <TableBody.Content>
                                                {context.paginatedData.map(
                                                    (data, index) =>
                                                        renderBody(
                                                            data,
                                                            index,
                                                            context,
                                                            practicumID
                                                        )
                                                )}
                                            </TableBody.Content>
                                        </TableBody>

                                        <TableFooter
                                            currentPage={context.currentPage}
                                            perPage={context.perPage}
                                            totalPages={context.totalPages}
                                            totalData={
                                                context.filteredData.length
                                            }
                                            prev={context.prevPage}
                                            next={context.nextPage}
                                        ></TableFooter>
                                    </Card>
                                )}
                            </DataTableContext.Consumer>
                        </DataTable>
                    </div>
                </div>
            </SidebarUser>
            {/* </div> */}
        </>
    );
}
