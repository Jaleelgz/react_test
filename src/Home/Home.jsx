import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { AiOutlineUser } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { FaShuttleVan } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { BsFillDoorOpenFill, BsFillHandbagFill } from "react-icons/bs";
import * as restServices from "../Utils/reastUtils";
import "./homeStyles.scss";

function Home() {
  const [loading, setLoading] = useState(true);
  const [strores, setStores] = useState([]);
  const [filteredStrores, setFilteredStores] = useState([]);
  const [search, setSearch] = useState("");
  const getStoreData = async () => {
    setLoading(true);
    const storeRes = await restServices.getData();
    if (!storeRes) {
      setLoading(false);
      return;
    }
    if (storeRes.status === 200) {
      setStores(storeRes.data.data);
      setFilteredStores(storeRes.data.data);
    }
    setLoading(false);
  };

  const searchStores = (value) => {
    setSearch(value);
    const tempFilteredStores = strores.filter((tmpStore) =>
      tmpStore.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStores(tempFilteredStores);
  };

  useEffect(() => {
    getStoreData();
  }, []);
  return (
    <div className="homeContainer">
      {/* Nav */}
      <div className="defPadding navContainer">
        <div className="logoContainer">
          <img src="./test_icon1.png" alt="logo" />
          <p>Store Locations</p>
        </div>
        <div className="rightContainer">
          <div className="navBtn">
            <AiOutlineUser size={20} color="#000" />
            <p>Sujith</p>
          </div>
          <div className="navBtn">
            <div className="cartIcon">
              <CgShoppingBag size={20} color="#000" />
            </div>
            <p>Cart</p>
          </div>
        </div>
      </div>
      {/* banner */}
      <div className="banner">
        <p>
          Home/<span>store location</span>
        </p>
      </div>

      {/* Body */}
      <div className="defPadding innerBody">
        <div className="locationParentContainer">
          <div className="innerLocationContainer">
            <div className="locationItemContainer">
              <p className="locationTxt">New South Wales</p>
            </div>
            <div className="locationItemContainer">
              <p className="locationTxt">Queensland</p>
            </div>
            <div className="locationItemContainer locationItemContainer_border">
              <p className="locationTxt">South Australia</p>
            </div>
            <div className="locationItemContainer">
              <p className="locationTxt">Tasmania</p>
            </div>
            <div className="locationItemContainer">
              <p className="locationTxt">Victoria</p>
            </div>
          </div>
        </div>

        <div className="storeParentContainer">
          <p className="ourStoresTxt">Our Stores</p>
          <div className="searchBar">
            <BiSearch size={20} color="#9d9d9d" />
            <input
              type={"text"}
              placeholder="Search Store"
              onChange={(event) => searchStores(event.target.value)}
              value={search}
            />
          </div>
          <hr className="hrLine" />

          {/* stores */}

          <div className="storesBody">
            {loading && (
              <div className="loaderContainer">
                <ReactLoading
                  type={"spokes"}
                  color="#333333"
                  height={50}
                  width={50}
                />
              </div>
            )}
            {filteredStrores.length === 0 && !loading && (
              <div className="emptyContainer">
                <p>No stores available</p>
              </div>
            )}
            {filteredStrores.map((store, index) => (
              <div key={index} className="storeParent">
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
                    <img
                      src={store.image}
                      alt="store_pic"
                      className="storeImage"
                    />
                  </div>
                  <a href={"tel:" + store.phone}>
                    <div className="callBtn">
                      <IoCall size={18} color="#af4224" />
                      <p>Call</p>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
