import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const About = () => {
  return (
    <section className="my-container mb-20">
      <SectionTitle
        title={"About Electro Poll"}
        subTitle={"Revolutionizing online elections since 2023"}
      ></SectionTitle>
      <div className="md:flex items-start mt-10 gap-6">
        <div className="w-1/2">
          <img className="w-[450px]" src="about.jpg" alt="" />
        </div>
        <div className="w-1/2 space-y-3 text-lg">
          <p>
            Electro poll is an election system that facilitates voters to record
            their secure and secret ballot electronically. It has a friendly
            user interface and enables voters to cast their votes in few simple
            steps. We ensures the authenticity of the voters and the votes cast
            by them along with non-traceability of the casted vote.
          </p>
          <p>
            Electro poll's robust architecture has persistently manifested to be
            one of the most reliable, comprehensible and economical electronic
            voting solution. It renders Simple and Accessible voter experience
            that eventually increases voter engagement and turnout. Auditable,
            Easy To Use, Secure and Reliable is what sets Electro poll apart
            from its competitors. Electro poll has facilitated several
            organizations,across a wide range of industries to conduct
            hassle-free electronic voting with utmost security and integrity.
            Some of our fortes include
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
