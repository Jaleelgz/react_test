import React, { useEffect, useState } from "react";
import * as restServices from "../Utils/reastUtils";
import "./homeStyles.scss";

function Home() {
  const [strores, setStores] = useState([]);
  const getStoreData = async () => {
    const storeRes = await restServices.getData();
    if (!storeRes) {
      return;
    }
    if (storeRes.status === 200) {
      setStores(storeRes.data.data);
    }
  };
  useEffect(() => {
    getStoreData();
  }, []);
  return (
    <div className="homeContainer">
      <div className="defPadding navContainer">
        <div className="logoContainer">
          <img src="./test_icon1.png" alt="logo" />
          <p>store Locations</p>
        </div>
        <div className="rightContainer">
          <p>Sujith</p>
          <p>Cart</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
