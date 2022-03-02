import React from "react";
import { FaShuttleVan } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { BsFillDoorOpenFill, BsFillHandbagFill } from "react-icons/bs";

function StoreItem({ store }) {
  return (
    <>
      <div className="storeParent">
        <div className="detailsContainer">
          <p className="storeName">{store.name}</p>
          <p className="storeAddress">{store.address}</p>
          <div className="openContainer">
            <BsFillDoorOpenFill size={16} color="#808957" />
            <p className="timeTxt">{store.hours.replace(",", " |")}</p>
          </div>
          <div className="btnContainer">
            <button className="storeBtn">
              <BsFillHandbagFill size={16} color="#808957" />
              <p className="btnText">BANJO'S MENU</p>
            </button>
            <button className="storeBtn">
              <FaShuttleVan size={16} color="#808957" />
              <p className="btnText">PLATERS MENU</p>
            </button>
          </div>
        </div>
        <div className="imgContainer">
          <div className="imgDiv">
            <img src={store.image} alt="store_pic" className="storeImage" />
          </div>
          <a href={"tel:" + store.phone}>
            <div className="callBtn">
              <IoCall size={18} color="#af4224" />
              <p>Call</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default StoreItem;
