import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import AdminUserName from "../AdminHome/AdminUserName";

const ManageBlogs = () => {
  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/blogs`
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure, Want to Delete",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      axios.delete(`${import.meta.env.VITE_URL}/blogDelete/${id}`).then((res) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
        refetch();
      });
    });
  };
  return (
    <div>
      <AdminUserName></AdminUserName>
      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-teal-900 text-white">#</th>
              <th className="bg-teal-900 text-white">Blog Image</th>
              <th className="bg-teal-900 text-white">Title</th>
              <th className="bg-teal-900 text-white">Date</th>
              <th className="bg-teal-900 text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {blogs &&
              blogs.map((b, i) => (
                <tr key={i} className="bg-base-200">
                  <th>{i + 1}</th>
                  <th>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={b?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </th>
                  <td>{b?.title?.slice(0, 20)}...</td>
                  <td>{moment(b?.date).format("MMM Do YY")}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(b?._id)}
                      className="btn btn-error text-sm btn-sm normal-case"
                    >
                      <FaTrashAlt className="h-3 w-3" />{" "}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlogs;
