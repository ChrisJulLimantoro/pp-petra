import React, { useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Avatar, Card, CardBody, Tabs, Tab, TabsHeader, TabsBody, TabPanel, Typography } from "@material-tailwind/react";
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
import { CheckBadgeIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function Dashboard({ auth, data, events, registrations }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const validated = useMemo(() => {
        return data.subjects.reduce((val, data) => val + data['validated'], 0);
    }, [data]);

    const applied = useMemo(() => {
        return data.subjects.reduce((val, data) => val + data['applied'] - data['validated'], 0);
    }, [data]);
    
    const unapplied = useMemo(() => {
        return data.subjects.reduce((val, data) => val + data['total'] - data['applied'], 0);
    }, [data])

    const topFive = useMemo(() => {
        return data.assistants.slice(0, 5)
    }, [data])

    const bottomFive = useMemo(() => {
        return data.assistants.slice(-5)
    }, [data])

    const options = {
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        animation : {
            y: {
                from: 0,
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
            },
            y: {
                ticks: {
                    min: 0,
                    maxRotation: 0,
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

    const chart = {
        labels: data.subjects.map((subject) => subject.name),
        datasets: [
            {
                label: 'Sudah Validasi',
                data: data.subjects.map((subject) => subject.validated),
                backgroundColor: 'rgba(96, 165, 250)',
                stack: 'Stack 0',
                borderRadius: 8,
            },
            {
                label: 'Belum Validasi',
                data: data.subjects.map((subject) => subject.applied - subject.validated),
                backgroundColor: 'rgba(255, 206, 86)',
                stack: 'Stack 1',
                borderRadius: 8,
            },
            {
                label: 'Belum Daftar',
                data: data.subjects.map((subject) => subject.total - subject.applied),
                backgroundColor: 'rgba(255, 99, 132)',
                stack: 'Stack 2',
                borderRadius: 8,
            },
        ],
        
    };

    const renderRegistration = (registration, index) => {
        return (
            <tr 
                key={registration.id} 
                className={index < registrations.length-1 ? 'border-b border-b-gray-200' : ''}
            >
                <td className="flex gap-3 py-3">
                    <Avatar
                        variant="circular"
                        alt="default"
                        size='sm'
                        src="/saocp/img/default-pfp-0.jpg"
                    />
                    <div className="flex flex-col">
                        <Typography className='text-sm'>
                            {
                            registration.student.user.name.length > 10 ? 
                            registration.student.user.name.substring(0, 10).concat('...') : 
                            registration.student.user.name
                            }
                        </Typography>
                        <Typography className='text-gray-400 text-sm'>
                            {(registration.student.user.email).substring(0, 9)}
                        </Typography>
                    </div>
                </td>

                <td>
                    <Typography className='text-sm'>
                        {registration.practicum.name.substring(10)}
                    </Typography>
                </td>

                <td>
                    <Typography className='text-sm'>
                        {registration.practicum.code}
                    </Typography>
                </td>
            </tr>
        )
    }

    const renderTopFive = (data, index) => {
        return (
            <tr key={data.name} className={index < 4 ? 'border-b border-b-gray-200' : ''}>
                <td className="flex gap-3 py-3">
                    <Avatar
                        variant="circular"
                        alt="default"
                        size='sm'
                        src="/saocp/img/default-pfp-0.jpg"
                    />
                    <div className="flex flex-col">
                        <Typography className='text-sm'>
                            {
                                data.name.length > 10 ? 
                                data.name.substring(0, 10).concat('...') : 
                                data.name
                            }
                        </Typography>
                        <Typography className='text-gray-400 text-sm'>
                            {data.email.substring(0, 9)}
                        </Typography>
                    </div>
                </td>

                <td>
                    <Typography className='text-sm'>
                        {data.count + " kelas"}
                    </Typography>
                </td>
            </tr>
        )
    }

    return (
        <>
            <Head>
                <title>SAOCP-Dashboard</title>
                <style>
                    {`
                        html {
                            overflow-x: hidden; 
                        }
                    `}
                </style>
            </Head>

            <SidebarUser className='overflow-x-hidden'>
                <Typography variant='h5' className='mb-5 pl-4' color='blue-gray'>Welcome Back, {auth}</Typography>

                <Tabs value="Mahasiswa" className="justify-center">
                    <TabsHeader className='mx-4 md:w-fit flex justify-center'>
                        <Tab value="Mahasiswa" className='px-5'>Mahasiswa</Tab>
                        <Tab value="Asisten" className='px-5'>Asisten</Tab>
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

                            <div className="flex flex-col pb-5 md:items-start gap-5 overflow-auto">
                                {/* Highlights */}
                                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 justify-center items-center">
                                    <Card color='blue'>
                                        <CardBody>
                                            <div className="flex justify-between items-start">
                                                <Typography color="white" className='mb-2 '>Sudah Validasi</Typography>
                                                <CheckBadgeIcon className='w-5 h-5'></CheckBadgeIcon>
                                            </div>
                                            <Typography color="white" className='font-bold text-2xl'>{validated}</Typography>
                                        </CardBody>
                                    </Card>
                                    
                                    <Card color='orange'>
                                        <CardBody>
                                            <div className="flex justify-between items-start">
                                                <Typography color="white" className='mb-2'>Belum Validasi</Typography>
                                                <ClockIcon className='w-5 h-5'></ClockIcon>
                                            </div>
                                            <Typography color="white" className='font-bold text-2xl'>{applied}</Typography>
                                        </CardBody>
                                    </Card>

                                    <Card color='red'>
                                        <CardBody>
                                            <div className="flex justify-between items-start">
                                                <Typography color="white" className='mb-2'>Belum Daftar</Typography>
                                                <XCircleIcon className='w-5 h-5'></XCircleIcon>
                                            </div>
                                            <Typography color="white" className='font-bold text-2xl'>{unapplied}</Typography>
                                        </CardBody>
                                    </Card>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-3 md:gap-5 items-start'>
                                    <div className="flex flex-col md:col-span-2 gap-5">
                                        {/* Breakdown per subject */}
                                        <Card className='p-6 max-h-[75vh] flex flex-col gap-5 border'>
                                            <div className="flex justify-between">
                                                <Typography className='font-bold text-lg'>Overview</Typography>
                                                <Link href={route('reports.detail')} className='text-blue-500'>Lihat Detail</Link>
                                            </div>

                                            <Bar data={chart} options={options} className='mb-10 md:p-5' />
                                        </Card>

                                        {/* Riwayat Pendaftaran */}
                                        <Card className='flex flex-col p-6 border gap-5 overflow-auto max-h-[50vh]'>
                                            <div className="flex justify-between">
                                                <Typography className='font-bold text-lg'>Pendaftaran Terbaru</Typography>
                                                <Link href={route('reports.history')} className='text-blue-500'>Lihat Detail</Link>
                                            </div>

                                            <table className="w-full min-w-max table-auto text-fixed">
                                                <tbody>
                                                    {registrations.map((registration, index) => renderRegistration(registration, index))}
                                                </tbody>
                                            </table>
                                        </Card>
                                    </div>
                                    
                                    {/* Asdos */}
                                    <Card className='p-6 flex flex-col w-full gap-5 border'>
                                        <Typography className='font-bold text-lg'>Pengajar Kelas Terbanyak</Typography>
                                        <table className="w-full min-w-max table-auto text-fixed">
                                            <tbody>
                                                {topFive.map((data, index) => renderTopFive(data, index))}
                                            </tbody>
                                        </table>

                                        <Typography className='font-bold text-lg'>Pengajar Kelas Tersedikit</Typography>
                                        <table className="w-full min-w-max table-auto text-fixed">
                                            <tbody>
                                                {bottomFive.map((data, index) => renderTopFive(data, index))}
                                            </tbody>
                                        </table>
                                    </Card>
                                </div>
                            </div>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </SidebarUser>
        </>
    );
}