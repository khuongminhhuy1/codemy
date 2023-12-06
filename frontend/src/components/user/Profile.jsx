import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  return (
    <div className="w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
      <div className="w-96 h-96 rounded-md bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {user ? (
          <>
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
    </div>
  );
};

export default Profile;
