import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import SelectMatkul from "@/Components/SelectMatkul";
import { Button, Card } from "@material-tailwind/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableHeader from "@/Components/DataTable/TableHeader";
import TableBody from "@/Components/DataTable/TableBody";
import TableFooter from "@/Components/DataTable/TableFooter";
import TableCell from "@/Components/DataTable/TableCell";
import { DataTableContext } from "@/Components/DataTable/DataTable";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Select, Option } from "@material-tailwind/react";
import NotificationAlert from "@/Components/NotificationAlert";
import { useRef } from "react";


export default function Dashboard({ auth, matkul, id, practicumID, dataTable }) {
    let [course, setCourse] = useState('');
    let [selected1Options, setSelected1Options ]= useState([]);
    let [selected2Options, setSelected2Options ]= useState([]);
    const [class1Options, setClass1Options] = useState([]);
    const [class2Options, setClass2Options] = useState([]);
    let [pracID, setPracID]= useState(null);

    const alertRef = useRef();
    const alertGagal= useRef();
    useEffect(() => {
        if(course){
            axios.get(route('mahasiswa.getClass', course))
            .then(response => {
                const { class1, class2, practicumID } = response.data;
                setClass1Options(class1);
                setClass2Options(class2);
                setPracID(practicumID);
            })
            .catch(error => {
                console.log(error);

            });
        }
    },[course]);

    const dataMatkul = matkul;
    const idMatkul= id;
    const Pilihan = ["A", "B", "C", "D", "E"];
    const kolom = [
        "Hari",
        "Jam",
        "Mata_Kuliah_Praktikum",
        "Kelas",
        "Pilihan",
        "Status",
    ];
    const data = [
        {
            hari: "Selasa",
            jam: "16.30 - 19.30",
            mata_kuliah_praktikum: "Struktur Data",
            kelas: "A",
            pilihan: "Pilihan 1",
            status: "Seleksi Kelas",
        },
        {
            hari: "Kamis",
            jam: "16.30 - 19.30",
            mata_kuliah_praktikum: "Struktur Data",
            kelas: "B",
            pilihan: "Pilihan 2",
            status: "Ditolak",
        },
        {
            hari: "Kamis",
            jam: "16.30 - 19.30",
            mata_kuliah_praktikum: "Struktur Data",
            kelas: "B",
            pilihan: "Pilihan 2",
            status: "Diterima",
        },
    ];
    
    const handleUpdateData = (updatedData) => {
        console.log(updatedData);
    };
    const styles = `
    .divLabel{
        width: 15vw;
    }

    .divButton{
        margin-left: 6vw !important;
    }

    .btn{
        width: 10vw;
    }
    
  `;

  const handleCourseChange = (selectedOption) => {
    setCourse(selectedOption);
  };

  const handle1Change = (selectedOption) => {
    setSelected1Options(selectedOption);
  }

  const handle2Change = (selectedOption) => {
    setSelected2Options(selectedOption);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data= {
        matkul: course,
        pilihan1: selected1Options,
        pilihan2: selected2Options,
    };

    axios.post(route('mahasiswa.addPracticum'), data)
    .then((response) => {
        if (response.data.success) {
            alertRef.current?.show(
                "Berhasil mendaftar",
                "green",
                2000 
            );
        }
        else {
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
    })
  }

    return (
        <>
            <Head>
                <title>SAOCP-Daftar Praktikum</title>
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
            <div className="grid grid-cols-3">
                <div className="col-span-1">
                    <SidebarUser></SidebarUser>
                </div>
                <div className="mt-16 w-full h-72 mx-8">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 mb-8">
                                <div className="mt-2 divLabel">
                                    <h1 className="w-full">
                                        Mata Kuliah Praktikum
                                    </h1>
                                </div>
                                <div>
                                    <div className="w-72">
                                        <Select label="Pilih Mata Kuliah" size="md" variant="outlined" id= 'course' onChange={handleCourseChange}>
                                            {dataMatkul.map((item,index) => (
                                            <Option key={idMatkul[index]} value={idMatkul[index]}>{item}</Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mb-8">
                                <div className="mt-2 divLabel">
                                    <h1 className="w-full">Pilihan 1</h1>
                                </div>
                                <div>
                                    <div className="w-72">
                                        <Select label="Pilihan 1" size="md" variant="outlined" id= 'class1' onChange={handle1Change}>
                                            {class1Options.map((item,index) => (
                                            <Option key={index} value={pracID[index]}>{item}</Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mb-8">
                                <div className="mt-2 divLabel">
                                    <h1 className="w-full">Pilihan 2</h1>
                                </div>
                                <div>
                                    <div className="w-72">
                                        <Select label="Pilihan 2" size="md" variant="outlined" id= 'class2' onChange={handle2Change}>
                                            {class2Options.map((item,index) => (
                                            <Option key={index} value={pracID[index]}>{item}</Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid place-content-center divButton">
                                <div>
                                    <Button
                                        variant="gradient"
                                        color="indigo"
                                        className="btn"
                                        type="submit"
                                    >
                                        Input
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div
                        className="col-span-1 flex-auto lg:ml-[-11vw]"
                        style={{ width: "70vw"}}
                    >
                        <DataTable rawData={data} columns={kolom}>
                            <DataTableContext.Consumer>
                                {(context) => (
                                    <Card className="w-full z-[1]">
                                        <TableHeader
                                            title="Daftar Praktikum"
                                            perPage={context.perPage.toString()}
                                            changePerPage={(e) =>
                                                context.changePerPage(e)
                                            }
                                            searchData={(e) =>
                                                context.searchData(e)
                                            }
                                        ></TableHeader>

                                        <TableBody className={"relative "}>
                                            <thead className="sticky top-0 z-10">
                                                <tr>
                                                    {context.columns?.map(
                                                        context.renderHead
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {context.paginatedData?.map(
                                                    (e, value) =>
                                                        context.renderBody(
                                                            e,
                                                            value
                                                        )
                                                )}
                                            </tbody>
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
            </div>
        </>
    );
}
