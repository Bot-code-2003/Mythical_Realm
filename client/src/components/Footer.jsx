import React from "react";

const Footer = () => {
  return (
    <div className="bg-black bg-custom-dark-gradient min-h-[350px] flex flex-col item-center p-5 text-gray-300 mt-10">
      <div className="navBar text-center border-gray-500 border-b-[1px] p-2">
        <p
          onClick={() => navigate("/")}
          className="inline-block cursor-pointer"
        >
          THE <br />
          <span className="text-2xl">MYTHICAL REALM</span>
        </p>
      </div>
      <div className="text-center mt-5 mb-5">
        <p>© 2023 Mythical Realm. All rights reserved.</p>
        <p>Dharmadeep Madisetty</p>
      </div>
    </div>
  );
};

export default Footer;
