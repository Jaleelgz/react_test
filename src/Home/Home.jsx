import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { AiOutlineUser } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import * as restServices from "../Utils/restUtils";
import "./homeStyles.scss";
import StoreItem from "./Store/StoreItem";

function Home() {
  const [loading, setLoading] = useState(true);
  const [strores, setStores] = useState([]);
  const [filteredStrores, setFilteredStores] = useState([]);
  const [location, setLocation] = useState("South Australia");
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
            <button
              className={
                location === "New South Wales"
                  ? "locationItemContainer locationItemContainer_border"
                  : "locationItemContainer"
              }
              onClick={() => setLocation("New South Wales")}
            >
              <p className="locationTxt">New South Wales</p>
            </button>
            <button
              className={
                location === "Queensland"
                  ? "locationItemContainer locationItemContainer_border"
                  : "locationItemContainer"
              }
              onClick={() => setLocation("Queensland")}
            >
              <p className="locationTxt">Queensland</p>
            </button>
            <button
              className={
                location === "South Australia"
                  ? "locationItemContainer locationItemContainer_border"
                  : "locationItemContainer"
              }
              onClick={() => setLocation("South Australia")}
            >
              <p className="locationTxt">South Australia</p>
            </button>
            <button
              className={
                location === "Tasmania"
                  ? "locationItemContainer locationItemContainer_border"
                  : "locationItemContainer"
              }
              onClick={() => setLocation("Tasmania")}
            >
              <p className="locationTxt">Tasmania</p>
            </button>
            <button
              className={
                location === "Victoria"
                  ? "locationItemContainer locationItemContainer_border"
                  : "locationItemContainer"
              }
              onClick={() => setLocation("Victoria")}
            >
              <p className="locationTxt">Victoria</p>
            </button>
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
              <StoreItem key={store.name + index} store={store} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
