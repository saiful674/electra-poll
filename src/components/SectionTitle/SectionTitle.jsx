
const SectionTitle = ({ title, subTitle }) => {
    return (
        <div className="my-container text-center md:w-2/3">
            <h2 className="font-bold text-xl md:text-2xl mb-2 inline-block px-5 pb-1 border-b-[2px] border-green-400">{title}</h2>
            <p className="">{subTitle}</p>
        </div>
    )
};

export default SectionTitle;
