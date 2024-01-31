import React, { useState } from "react";
import Helpicon from "./help.svg";
import "./help.css";

const Help = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="helpicon">
      <img src={Helpicon} alt="help" onClick={toggleModal} />

      {isModalOpen && (
        <div className="modal">
          {/* 모달 내용 추가 */}
          <p>
            <div className="mega"></div> 메가박스
          </p>
          <p>
            {" "}
            <div className="lotte"></div> 롯데시네마
          </p>
          <p>
            <div className="cgv"></div> CGV
          </p>
        </div>
      )}
    </div>
  );
};

export default Help;
