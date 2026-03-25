export default function ProgressBar({ progress } : { progress : number}) {


    return (
        <div className={"bg-[rgb(var(--very-dark-green))] h-[8px] my-4 progressbar min-w-[5%] transition-all duration-500 ease-out"} style={{ width: `${progress}vw` }}></div>
    )
}
