import axios from "axios";
import React, { useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ScrollRestoration, useParams } from "react-router-dom";
import { setInitalState } from "../../redux/slices/FormDataSlice";
import Ballot from "./ElectionPages/Ballot/Ballot";
import Confirmation from "./ElectionPages/Confirmation";
import Notice from "./ElectionPages/Notice";
import Overview from "./ElectionPages/Overview";
import Voters from "./ElectionPages/Voters";

const Election = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  const pageNum = useSelector((state) => state.formData.page);
  const formData = useSelector((s) => s.formData);
  const { status } = formData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNum]);

  useEffect(() => {
    axios.get(`http://localhost:5000/election/${id}`).then((res) => {
      console.log(res.data);
      dispatch(setInitalState(res.data));
    });
  }, []);

  return (
    <div className="py-20 my-container">
      <div className="grid lg:grid-cols-5 mt-5 grid-cols-2 border-green-400 border rounded-md py-2 px-5 lg:text-xl font-bold">
        <span
          className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 0 ? `text-green-400` : ""
            }`}
        >
          Overview <FaLongArrowAltRight />
        </span>
        <span
          className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 1 ? `text-green-400` : ""
            }`}
        >
          Ballot
          <FaLongArrowAltRight />
        </span>
        <span
          className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 2 ? `text-green-400` : ""
            }`}
        >
          Notice
          <FaLongArrowAltRight />
        </span>
        <span
          className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 3 ? `text-green-400` : ""
            }`}
        >
          Voters
          <FaLongArrowAltRight />
        </span>
        <span
          className={`flex lg:justify-center lg:gap-10 gap-5 items-center ${pageNum >= 4 ? `text-green-400` : ""
            }`}
        >
          Confirmation
          <FaLongArrowAltRight />
        </span>
      </div>
      {(status && status !== "pending") && (
        <div className="bg-red-100 justify-center mt-5 border-l-4 min-h-16 flex items-center text-lg border-red-600">
          <p>Can't changed election details after it has been published</p>
        </div>
      )}
      <div className="mt-10 flex justify-center">
        {pageNum === 0 && <Overview></Overview>}
        {pageNum === 1 && <Ballot></Ballot>}
        {pageNum === 2 && <Notice></Notice>}
        {pageNum === 3 && <Voters></Voters>}
        {pageNum === 4 && <Confirmation></Confirmation>}
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Election;
