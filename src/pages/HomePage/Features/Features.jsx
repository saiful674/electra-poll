import { AiOutlineMobile } from "react-icons/ai";
import { BsPieChart } from "react-icons/bs";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdOutlineVpnKey, MdSupportAgent } from "react-icons/md";
import { RxAccessibility } from "react-icons/rx";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
const Features = () => {
  return (
    <section className="my-container mb-20">
      <SectionTitle title={'Features'} subTitle={"ElectraPoll Provides All The Capabilities You Need To Create And Manage A Successful Poll."} />


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        <div className="text-center">
          <MdOutlineVpnKey className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">Secure Voting</h3>
          <p>Each voter has a unique "Voter ID" and "Voter Key" and those have voter ID and Key they can only vote once.</p>
        </div>
        <div className="text-center">
          <AiOutlineMobile className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">Mobile Ready</h3>
          <p>Elections are optimized for desktop and mobile devices. Voters can vote from a web browser</p>
        </div>
        <div className="text-center">
          <RxAccessibility className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">Accessibility</h3>
          <p>The voting application targets Section 508 and WCAG 2.0 AA compliance.</p>
        </div>
        <div className="text-center">
          <BsPieChart className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">Results Tabulation</h3>
          <p>Election results are automatically calculated and presented with beautiful charts.</p>
        </div>

        <div className="text-center">
          <HiOutlineLockClosed className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">256-Bit Encryption</h3>
          <p>All elections have SSL grade security with 256bit encryption that keeps your election and ballots secure.</p>
        </div>
        <div className="text-center">
          <MdSupportAgent className="h-16 w-16 text-teal-500 mx-auto" />
          <h3 className="font-bold text-xl mt-3 mb-2">Amazing Support</h3>
          <p>Each voter has a unique "Voter ID" and "Voter Key" and those have voter ID and Key they can only vote once.</p>
        </div>

      </div>
    </section>
  );
};

export default Features;
