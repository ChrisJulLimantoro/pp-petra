export default function ApplicationLogo(props) {
    return (
        <div
            className="draw_text align-items-center justify-content-center"
            {...props}
        >
            <svg width="500" height="220" className="align-items-center">
                <text
                    x="90"
                    y="200"
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
