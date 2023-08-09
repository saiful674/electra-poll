import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const About = () => {
  return (
    <section className="my-container mb-20">
      <SectionTitle
        title={"About Electro-Poll"}
        subTitle={"Revolutionizing online elections since 2023"}
      ></SectionTitle>
      <div className="grid lg:grid-cols-2 mt-5 gap-6 items-center">
        <div className="">
          <img className="w-[85%] mx-auto" src="about.jpg" alt="" />
        </div>
        <div className="space-y-3 text-lg">
          <p>
            Electro Poll is your trusted e-voting companion. We make voting simple, secure, and secret. With just a few clicks, you're done! Our system verifies voter authenticity and ensures complete privacy. Renowned for its reliability and ease of use, Electro Poll boosts voter turnout by making the process smooth for everyone.
          </p>
          <p>
            We've proudly served diverse industries, ensuring every vote is secure and counts. Our strengths? Auditable, straightforward, and rock-solid security.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
