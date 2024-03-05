import React, { useState } from "react";
import Helpicon from "./help.svg";
import "./help.scss";

const Help = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="helpicon"
      onMouseEnter={openModal}
      onMouseLeave={closeModal}
    >
      <img src={Helpicon} alt="help" />

      {isModalOpen && (
        <div
          className="modal"
          onMouseEnter={openModal}
          onMouseLeave={closeModal}
        >
          <p>
            <div className="mega"></div> 메가박스
          </p>
          <p>
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
