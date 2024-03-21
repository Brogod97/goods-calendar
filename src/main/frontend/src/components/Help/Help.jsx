import React from "react";

const Help = () => {
  return (
    <div className="mt-2 mb-4 mx-4">
      <div className="flex justify-end text-xs text-gray-600">
        <div className="pr-3">
          <p className="w-2 h-2 bg-cgv inline-block"></p> CGV
        </div>
        <div className="pr-3">
          <p className="w-2 h-2 bg-mega inline-block"></p> 메가박스
        </div>
        <div>
          <p className="w-2 h-2 bg-lotte inline-block"></p> 롯데시네마
        </div>
      </div>
    </div>
  );
};

export default Help;
