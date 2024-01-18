import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const UserBackButton = () => {
  let navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
    </>
  );
};
