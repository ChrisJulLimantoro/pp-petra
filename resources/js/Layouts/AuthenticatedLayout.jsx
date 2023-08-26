import { useState } from "react";
import SidebarLayout from "@/Layouts/SidebarLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, Head } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";

export default function Authenticated({ user, header, children, title }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="h-screen w-screen">
            <Head>
                <style>
                    {`
                        body,html{
                            height:100vh;
                            width:100vw;
                        }
                    `}
                </style>
            </Head>
            <SidebarLayout></SidebarLayout>
        </div>
    );
}
