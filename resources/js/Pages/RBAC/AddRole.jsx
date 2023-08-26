import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function AddRole({ auth, errors, message, status }) {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>Add Role</title>
            </Head>
        </AuthenticatedLayout>
    );
}
