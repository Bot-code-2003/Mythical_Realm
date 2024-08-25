import React from "react";

const Footer = () => {
  return (
    <div className="bg-black bg-custom-dark-gradient  min-h-[100vh] flex flex-col item-center p-5 text-gray-300 mt-10">
      <div className="navBar text-center border-gray-500 border-b-[1px] p-2">
        <p
          onClick={() => navigate("/")}
          className="inline-block cursor-pointer"
        >
          THE <br />
          <span className="text-2xl">MYTHICAL REALM</span>
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
