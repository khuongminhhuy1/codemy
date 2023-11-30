import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import React from "react";

export default function Profile() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Profile</h1>
      {!!user && <h2> Hi {user.name} !</h2>}
    </div>
  );
}
