import { Head } from '@inertiajs/react';
import SidebarUser from "@/Layouts/SidebarUser";
import LabelTable from '@/Components/Assistant/Labels/LabelTable';
import DetailsTitle from '@/Components/Assistant/Title/DetailsTitle';
import TableWithEditDeleteButton from '@/Components/Assistant/Table/TableWithEditDeleteButton';
import DataTable from '@/Components/DataTable2/DataTable';
import TableHeader from '@/Components/DataTable2/TableHeader';
import TableBody from '@/Components/DataTable2/TableBody';
import TableFooter from '@/Components/DataTable2/TableFooter';
import TableCell from '@/Components/DataTable2/TableCell';
import { DataTableContext } from '@/Components/DataTable2/DataTable';
import { Card, Button, Typography, IconButton, Tooltip } from '@material-tailwind/react';
import {  UserPlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import ConfirmationIconButton from '@/Components/Assistant/Button/ConfirmationIconButton';



export default function DetailKelasCopy({ auth, id }) {
    const head_asisten = ["Nama", "NRP", "Jurusan", "Action"];
    const data_asisten = [
        {
            nama: "John Michael",
            nrp: "123456789",
            jurusan: "Informatika",
        },
        {
            nama: "Alexa Liras",
            nrp: "987654321",
            jurusan: "Teknik Mesin",
        },
        {
            nama: "Laurent Perrier",
            nrp: "0987654321",
            jurusan: "Akuntansi",
        },
          
      ];
    
    const head_mhs = ["Nama", "NRP", "Jurusan", "Action"];
    const data_mhs = [
        {
          nama: "Mia Amalia",
          nrp: "234567890",
          jurusan: "Informatika",
        },
        {
          nama: "Reza Irawan",
          nrp: "345678901",
          jurusan: "Data Science",
        },
        {
          nama: "Amelia Putri",
          nrp: "456789012",
          jurusan: "Sistem Informasi Bisnis",
        },
        {
          nama: "Dimas Pratama",
          nrp: "567890123",
          jurusan: "Informatika",
        },
        {
          nama: "Rini Wulandari",
          nrp: "678901234",
          jurusan: "Data Science",
        },
        {
          nama: "Fajar Ramadhan",
          nrp: "789012345",
          jurusan: "Sistem Informasi Bisnis",
        },
        {
          nama: "Aditya Pratama",
          nrp: "890123456",
          jurusan: "Informatika",
        },
        {
          nama: "Dewi Lestari",
          nrp: "901234567",
          jurusan: "Data Science",
        },
        {
          nama: "Rangga Permadi",
          nrp: "012345678",
          jurusan: "Sistem Informasi Bisnis",
        },
      ];
      
      const renderBody =  (index, value, context) => {
        // if no data found
        if (index.empty) {
            return (
                <tr key={'notFound'}>
                    <TableCell colSpan={this.TABLE_HEAD.length + 1}>
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
            <tr key={index.nama ?? value}>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {value + 1 + context.perPage * (context.currentPage - 1)}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index.nama}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index.nrp}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {index.jurusan}
                    </Typography>
                </TableCell>
                <TableCell>
                  <a href="http://pp-petra.test/assistant/detailkelas/move">
                    <IconButton variant="text">
                        <Tooltip content="Move" placement="top">
                            <PencilIcon width={20} cursor={'pointer'} stroke="orange" /> 
                        </Tooltip>
                    </IconButton>
                  </a>
                  <ConfirmationIconButton variant="text">
                    <Tooltip content="Delete" placement="top">
                        <TrashIcon width={20} cursor={'pointer'} stroke="red"/>
                    </Tooltip>
                  </ConfirmationIconButton>
              </TableCell>
            </tr>
        );
    }

    
    return (
        <>
            <Head>
                <title>SAOCP-Detail Kelas</title>
            </Head>
            <div className="grid grid-cols-7 gap-1">
                <div className='col-span-2'>
                    <SidebarUser>

                    </SidebarUser>
                </div>

                <div className="mt-10 w-full h-72 col-span-4">
                    <div className='judul'>
                        <DetailsTitle matkul="Pemrograman Berorientasi Objek" pararel="A" hari="Senin" 
                          jam_start="08.00" jam_end="10.00" ruangan="P.202"/>    
                    </div>

                    <div className='tabel_asisten mt-10'>
                        <LabelTable type="Asisten" slot_used="3" total_slot="3" 
                         />
                        <TableWithEditDeleteButton TABLE_HEAD={head_asisten} TABLE_ROWS={data_asisten}/>
                    </div>

                    <div className='tabel_mahasiswa mt-10'>
                        <LabelTable type="Mahasiswa" slot_used="10" total_slot="20"
                        />
                        {/* <TableWithEditDeleteButton TABLE_HEAD={head_mhs} TABLE_ROWS={data_mhs}/> */}
                        <DataTable rawData={data_mhs} columns={head_mhs}>
                          <DataTableContext.Consumer>
                            {(context) => (
                              <Card className="w-full z-[1]">
                                <TableHeader title="List Mahasiswa" description='Slot Mahasiswa : 10 / 20'> 
                                  <a href="#">
                                      <Button className="flex items-center gap-3" size="sm">
                                          <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Mahasiswa
                                      </Button>
                                  </a>
                                </TableHeader>
                                  <TableBody>
                                    <TableBody.Head></TableBody.Head>
                                    <TableBody.Content>
                                      {/* isi custom render */}
                                      {context.paginatedData?.map((index, value) => renderBody(index, value, context))}
                                    </TableBody.Content>
                                  </TableBody>
                                <TableFooter/>
                              </Card>
                            )}
                          </DataTableContext.Consumer>
                        </DataTable>
                    </div>
                    <div className="mt-10">
                    </div> 
                </div>
                
            </div>
            
           
        </>
    );
}
