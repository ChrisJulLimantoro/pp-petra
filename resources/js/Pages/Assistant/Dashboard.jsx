import { Head } from '@inertiajs/react';
import SidebarUser from "@/Layouts/SidebarUser";
import Carousel from "@/Components/Carousel";
import { Select, Option } from "@material-tailwind/react";
export default function Dashboard({ auth }) {
    const styles = `


    @import url('https://fonts.googleapis.com/css2?family=Bitter&family=Cabin:wght@700&family=Titillium+Web:wght@600&display=swap');

    * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .waviy {
    position: relative;
  }
  .waviy span {
    position: relative;
    display: inline-block;
    font-size: 90px;
    font-family: 'Bitter', serif;
    font-family: 'Cabin', sans-serif;
    
    background: #A7CFDF;
    background: linear-gradient(to right, #A7CFDF 0%, #23538A 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    

    text-transform: uppercase;
    animation: flip 2s infinite;
    animation-delay: calc(.2s * var(--i))
  }
  @keyframes flip {
    0%,80% {
      transform: rotateY(360deg) 
    }
  }
    
  `;
    return (
        <>
            <Head>
                <title>SAOCP-Dashboard</title>
                <style>{styles}</style>
            </Head>
            <SidebarUser>
                <div className="row grid justify-items-center">
                    <div className="waviy">
                        <span style={{ "--i": 1 }} className="mx-2">S</span>
                        <span style={{ "--i": 2 }} className="mx-2">A</span>
                        <span style={{ "--i": 3 }} className="mx-2">O</span>
                        <span style={{ "--i": 4 }} className="mx-2">C</span>
                        <span style={{ "--i": 5 }} className="mx-2">P</span>
                    </div>
                </div>
                <div className="row grid justify-items-center">                
                    <div className="waviy">
                        <span style={{ "--i": 1 }} className="mx-2">S</span>
                        <span style={{ "--i": 2 }} className="mx-2">A</span>
                        <span style={{ "--i": 3 }} className="mx-2">O</span>
                        <span style={{ "--i": 4 }} className="mx-2">C</span>
                        <span style={{ "--i": 5 }} className="mx-2">P</span>
                    </div>
                </div>
            </SidebarUser>
        </>
    );
}
