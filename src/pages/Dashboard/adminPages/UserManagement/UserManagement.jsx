import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Providers/AuthProvider";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import AdminUserName from "../AdminHome/AdminUserName";

const UserManagement = () => {
  const { user } = useContext(AuthContext);

  const {
    data: data = [],
    refetch,
    isLoading,
  } = useQuery(["users", user], async () => {
    const res = await axios.get(
      `https://electra-poll-server.vercel.app/all-users`
    );
    return res.data;
  });
  const users = data;

  // /all-users/

  const handleMakeAdmin = (user) => {
    fetch(`https://electra-poll-server.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user?.name} is Admin now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleMakeUser = (user) => {
    fetch(`https://electra-poll-server.vercel.app/users/user/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user?.name} is user now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // user remove function
  const handleRemoveVoter = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://electra-poll-server.vercel.app/all-users/${id}`)
          .then((data) => {
            if (data.status === 200) {
              Swal.fire({
                icon: "success",
                title: `Your user removed`,
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          });
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <AdminUserName></AdminUserName>

      {/* whwn voter is zero/empty */}
      {(users?.length === 0 || data.length === 0) && (
        <div className="flex flex-col h-[calc(100vh-135px)] justify-center items-center space-y-2">
          <p>No user available right now</p>
        </div>
      )}

      {/* when voter data length is more then 0 */}
      {users?.length > 0 && (
        <>
          <div className="overflow-x-auto mt-5">
            <table className="table table-zebra-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th className="bg-teal-900 text-white">#</th>
                  <th className="bg-teal-900 text-white">User Image</th>
                  <th className="bg-teal-900 text-white">User Name</th>
                  <th className="bg-teal-900 text-white">USer Email</th>
                  <th className="bg-teal-900 text-white">Organization Name</th>
                  <th className="bg-teal-900 text-white">role</th>
                  <th className="bg-teal-900 text-white">MakeUer</th>
                  <th className="bg-teal-900 text-white">MakeAdmin</th>
                  <th className="bg-teal-900 text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {users?.map((us, index) => (
                  <tr key={index} className="bg-base-200">
                    <th>{index + 1}</th>
                    <th>
                      {" "}
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={us?.uploadedImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </th>
                    <td>{us?.name}</td>
                    <td>{us?.email}</td>
                    <td>{us?.organizationName}</td>
                    <td>{us?.role}</td>
                    <td>
                      {us.role === "user" ? (
                        <button
                          disabled
                          className="btn btn-success text-sm btn-sm normal-case"
                        >
                          user
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeUser(us)}
                          className="btn btn-success  text-sm btn-sm normal-case"
                        >
                          user
                        </button>
                      )}
                    </td>
                    <td>
                      {us.role === "admin" ? (
                        <button
                          disabled
                          className="btn btn-success text-sm btn-sm normal-case"
                        >
                          Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(us)}
                          className="btn btn-success text-sm btn-sm normal-case"
                        >
                          Admin
                        </button>
                      )}
                    </td>
                    <td>
                      {us?.role === "admin" ? (
                        <button
                          disabled
                          className="btn btn-error text-sm btn-sm normal-case"
                        >
                          <FaTrashAlt className="h-3 w-3" />{" "}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemoveVoter(us?._id)}
                          className="btn btn-error text-sm btn-sm normal-case"
                        >
                          <FaTrashAlt className="h-3 w-3" />{" "}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
