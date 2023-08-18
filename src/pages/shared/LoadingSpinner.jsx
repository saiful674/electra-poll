import { RotatingLines } from "react-loader-spinner";

const LoadingSpinner = () => {
    return (
        <div className="h-[calc(100vh-90px)] w-full flex justify-center items-center z-30">
            <RotatingLines
                strokeColor="#00E05A"
                strokeWidth="5"
                animationDuration="0.85"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default LoadingSpinner;