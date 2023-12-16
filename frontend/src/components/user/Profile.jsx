import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  return (
    <div className="w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
      <div className="w-96 h-96 rounded-md bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {user ? (
          <>
            <img
              src={`http://localhost:8080/images/${user.avatar}`}
              alt="avatar"
              className="h-[128px] w-[128px] rounded-full"
            />
            <p>
              <strong>Name: </strong> {user.name}
            </p>
            <p>
              <strong>Email: </strong> {user.email}
            </p>
          </>
        ) : (
          <p>No user information available</p>
        )}
      </div>
      <div className="">
        <Link to={"/profile/edit"}>Update Information</Link>
      </div>
    </div>
  );
};

export default Profile;
