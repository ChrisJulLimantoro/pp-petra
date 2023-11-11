import { Head } from "@inertiajs/react";
import SidebarUser from "@/Layouts/SidebarUser";
import SelectMatkul from "@/Components/SelectMatkul";
import { Button, Card, Typography, Tooltip } from "@material-tailwind/react";
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
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function viewMahasiswa(){
    const [fileData, setFileData]= useState([]);
    const handleCSV= (e) => {
        const file = e.target.files[0];
        setFileData(file);
        var form_data = new FormData();
        form_data.append('file', file);
        Swal.fire({
            title: "Are you sure upload this file?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Upload it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Uploading...',
                html: '',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: ()=>{
                    Swal.showLoading();
                }

              })
              axios.post(route('uploadMahasiswa'),form_data).then((result)=>{
                if(result.data.success){
                    
                }else{

                }
              }).catch((error)=>{

              })
            }
        });
    }
    return(
        <SidebarUser>
             <Button variant="gradient" className="flex items-center gap-3">
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
                    <input type="file" accept=".csv" onChange={handleCSV} />
                    Upload CSV
                </label>
            </Button>
        </SidebarUser>
    )
}