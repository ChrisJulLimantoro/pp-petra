import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Avatar, Card, CardBody, Tabs, Tab, TabsHeader, TabsBody, TabPanel, Typography, IconButton } from "@material-tailwind/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import SidebarUser from "@/Layouts/SidebarUser";
import Carousel from "@/Components/Carousel";
import { CheckBadgeIcon, CheckIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/solid';
import DataTable from '@/Components/DataTable/DataTable'
import { DataTableContext } from '@/Components/DataTable/DataTable'
import TableBody from '@/Components/DataTable/TableBody'
import TableRowHead from '@/Components/DataTable/TableRowHead';
import TableCell from '@/Components/DataTable/TableCell'

export default function Dashboard({ auth, data, events, registrations }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const applied = data.subjects.reduce((val, data) => {
        return val + data['applied'];
    }, 0);

    const validated = data.subjects.reduce((val, data) => {
        return val + data['validated'];
    }, 0);

    const unapplied = data.subjects.reduce((val, data) => {
        return val + data['total'] - data['applied'] - data['validated'];
    }, 0);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 577);

    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 576))

    const options1 = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                ticks: {
                    min: 0,
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        if (Math.floor(value) === value) {
                            return value;
                        }
                    }
                },
            },
        },
    }

    const chart1 = {
        labels: data.subjects.map((subject) => subject.name),
        datasets: [
            {
                label: 'Sudah Validasi',
                data: data.subjects.map((subject) => subject.validated),
                backgroundColor: 'rgba(75, 192, 192)',
                stack: 'Stack 0',
            },
            {
                label: 'Belum Validasi',
                data: data.subjects.map((subject) => subject.applied),
                backgroundColor: 'rgba(255, 206, 86)',
                stack: 'Stack 1',
            },
            {
                label: 'Belum Daftar',
                data: data.subjects.map((subject) => subject.total - subject.applied - subject.validated),
                backgroundColor: 'rgba(255, 99, 132)',
                stack: 'Stack 2',
            },
        ],
    };

    return (
        <>
            <Head>
                <title>SAOCP-Dashboard</title>
                <style>{styles}</style>
            </Head>

            <SidebarUser className='overflow-x-hidden'>
                <Tabs value="Mahasiswa" className="justify-center">
                    <TabsHeader className='mx-4 md:w-fit flex justify-center'>
                        <Tab value="Mahasiswa" className='px-5'>
                            Mahasiswa
                        </Tab>
                        <Tab value="Asisten" className='px-5'>
                            Asisten
                        </Tab>
                    </TabsHeader>

                    <TabsBody>
                        <TabPanel value="Mahasiswa">
                            {events && (    
                                <Carousel className='col-span-3 mb-3 md:mb-5'>
                                    {events.map((event) => (
                                        <Card key={event.id} className='bg-red-200 p-10 h-full text-center'>
                                            {event.name} sedang berjalan hingga {event.end_date}
                                        </Card>
                                    ))}
                                </Carousel>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 justify-center items-center">
                                <Card className='border'>
                                    <CardBody>
                                        <div className="flex justify-between items-start">
                                            <Typography color="blue-gray" className='mb-2'>Sudah Validasi</Typography>
                                            <CheckBadgeIcon className='w-5 h-5'></CheckBadgeIcon>
                                        </div>
                                        <Typography color="green" className='font-bold text-2xl'>{validated}</Typography>
                                    </CardBody>
                                </Card>
                                
                                <Card className='border'>
                                    <CardBody>
                                        <div className="flex justify-between items-start">
                                            <Typography color="blue-gray" className='mb-2'>Belum Validasi</Typography>
                                            <ClockIcon className='w-5 h-5'></ClockIcon>
                                        </div>
                                        <Typography color="orange" className='font-bold text-2xl'>{applied}</Typography>
                                    </CardBody>
                                </Card>

                                <Card className='border'>
                                    <CardBody>
                                        <div className="flex justify-between items-start">
                                            <Typography color="blue-gray" className='mb-2'>Belum Daftar</Typography>
                                            <XCircleIcon className='w-5 h-5'></XCircleIcon>
                                        </div>
                                        <Typography color="red" className='font-bold text-2xl'>{unapplied}</Typography>
                                    </CardBody>
                                </Card>
                            </div>

                            {!isMobile && ( 
                                <Card className='mt-3 md:mt-5 p-6 h-auto flex flex-col gap-5 border'>
                                    <div className="flex justify-between">
                                        <Typography></Typography>
                                        <Typography className='font-bold text-lg'>Overview</Typography>
                                        <Link href='' className='text-blue-500'>Lihat Semua</Link>
                                    </div>

                                    <Bar options={options1} data={chart1} className='md:p-10' />
                                </Card>
                            )}
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </SidebarUser>
        </>
    );
}
