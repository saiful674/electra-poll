const SectionTitle = ({ title, subTitle }) => {
  return (
    <div className="text-center">
      <h2 className="font-bold text-4xl mb-2">{title}</h2>
      <p className="text-xl">{subTitle}</p>
    </div>
  );
};

export default SectionTitle;
