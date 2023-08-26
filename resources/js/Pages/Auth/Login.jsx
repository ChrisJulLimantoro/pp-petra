import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/GoogleButton";
import Alert from "@/Components/Alert";
import { Head, Link, useForm } from "@inertiajs/react";
import GoogleButton from "@/Components/GoogleButton";

export default function Login({ link, status, message }) {
    return (
        <GuestLayout home="/saocp/" status={status} message={message}>
            <Head>
                <title>Login</title>
                <style>
                    {`
                    body,html{
                        height:100vh;
                        width:100vw;
                    }
                    .button {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 9px 12px;
                        gap: 8px;
                        height: 40px;
                        width: 100%;
                        border: none;
                        background: #FF342B;
                        border-radius: 20px;
                        cursor: pointer;
                        transition: all 0.3s ease-in-out;
                        }
                    .svg-icon{
                        fill:white;
                    }
                    .lable {
                        line-height: 22px;
                        font-size: 17px;
                        color: #fff;
                        font-weight:bold;
                        font-family: sans-serif;
                        letter-spacing: 1px;
                    }
        
                    .button:hover {
                        background: #fff;
                        color:#FF342B;
                        border: 1px solid #FF342B;
                    }
        
                    .button:hover .lable{
                        /* background: #fff; */
                        color:#FF342B;
                    }
                    .button:hover  .svg-icon {
                        animation: slope 1s linear infinite;
                        fill:#FF342B;
                    }
                    .svg-icon:hover{
                        fill:#FF342B;
                    }
        
                    @keyframes slope {
                        0% {
                        }
        
                        50% {
                            transform: rotate(25deg);
                        }
        
                        100% {
                        }
                    }
                    #text-logo {
                        font-family: 'Shrikhand', cursive;
                        stroke-dashoffset: 100%;
                        stroke-dasharray: 100%;
                        -webkit-animation: draw 6s forwards ease-in,up 2s 6s forwards ease-in;
                        animation: draw 6s forwards ease-in,up 2s 6s forwards ease-in;
                        background-clip: text;
                    }
                    
                    @-webkit-keyframes draw {
                    100% {
                        stroke-dashoffset: 0%;
                        fill: #000000;
                    }
                    
                    @keyframes draw {
                    100% {
                        stroke-dashoffset: 0%;
                        fill: #000000;
                    }
                    
                    @-webkit-keyframes up{
                        100%{
                            translate: translateY(-20vh);
                        }
                    }
                    @keyframes up{
                        100%{
                            translate: translateY(-20vh);
                        }
                    }
                    }
                    }
                    `}
                </style>
            </Head>

            <GoogleButton link={link} className="w-full"></GoogleButton>
        </GuestLayout>
    );
}
