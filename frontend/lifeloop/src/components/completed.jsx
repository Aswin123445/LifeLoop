const CompletedTask = ({text}) => {
    return (
        <div className="flex h-full mx-32 mb-2">
            <div className="flex bg-gray-200 rounded-md hover:bg-gray-100 transition-colors duration-500 w-full">
                <div className="w-3  bottom-1 h-3 m-1  bg-green-600  ml-2 rounded-full bg-white text-black flex hover:bg-green-500  items-center justify-center"></div>
                <div>{text}</div>
            </div>
        </div>
    )
}
export default CompletedTask