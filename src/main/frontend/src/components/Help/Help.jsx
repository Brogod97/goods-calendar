import React from "react";

const Help = () => {
  return (
    <div className="mt-2 mb-4 mx-4">
      <div className="flex justify-end text-xs text-gray-600">
        <p className="pr-3">
          <div className="w-2 h-2 bg-cgv inline-block"></div> CGV
        </p>
        <p className="pr-3">
          <div className="w-2 h-2 bg-mega inline-block"></div> 메가박스
        </p>
        <p>
          <div className="w-2 h-2 bg-lotte inline-block"></div> 롯데시네마
        </p>
      </div>
    </div>
  );
};

export default Help;
