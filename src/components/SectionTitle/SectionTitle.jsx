
const SectionTitle = ({ title, subTitle }) => {
    return (
        <div className="text-center">
            <h2 className="font-bold text-3xl mb-2 inline-block px-5 pb-1 border-b-[2px] border-green-400">{title}</h2>
            <p className="">{subTitle}</p>
        </div>
    )
};

export default SectionTitle;
