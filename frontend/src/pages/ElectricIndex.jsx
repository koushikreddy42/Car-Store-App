import React, { useState, useContext, useEffect } from "react";
import { Header } from "../components/ElectricIndex/ElectricHeader";
import SortAndCars from "../components/ElectricIndex/SortAndCars";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { store } from "../App";

function ElectricIndex() {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://car-store-app-api.vercel.app/api/myprofile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!token) {
    return <Navigate to="/sign" />;
  }
  return (
    <>
      {data && <Header username={data.username} />}
      {data && <SortAndCars ownerId={data._id} />}
    </>
  );
}

export default ElectricIndex;