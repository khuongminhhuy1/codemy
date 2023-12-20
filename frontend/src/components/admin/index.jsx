import React from "react";

const AdminPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="">
      <div className="w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
        <h1 className="animate-fade-up text-4xl py-8  text-white uppercase font-black">
          Admin
        </h1>
        <div className="animate-fade-down animate-delay-[500ms] p-4 flex flex-col justify-center items-center w-96 border bg-white rounded-lg">
          <h1 className="text-xl my-8 uppercase font-black">  </h1>

         
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
