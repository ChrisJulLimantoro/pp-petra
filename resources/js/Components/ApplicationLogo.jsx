import { useState } from "react";

export default function ApplicationLogo(props) {
    const [width, setWidth] = useState(window.innerWidth);

    window.addEventListener('resize', function() {
        setWidth(window.innerWidth);
    })

    return (
        <div
            className="draw_text items-center justify-center"
            {...props}
        >
            <svg width={width} height="220" className="flex items-center justify-center">
                <text
                    x="50%"
                    y="80%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="transparent"
                    stroke="#333"
                    id="text-logo"
                    strokeWidth="2"
                    fontSize="95"
                >
                    SAOCP
                </text>
            </svg>
        </div>
    );
}
