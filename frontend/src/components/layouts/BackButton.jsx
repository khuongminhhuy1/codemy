import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export function BackButton() {
  let navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/admin")}>
        <FaArrowLeft></FaArrowLeft>
      </button>
    </>
  );
}
