import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCity,setCurrentAddress,setCurrentState, setUserData } from "../redux/userSlice";
import { setAddress, setLocation } from "../redux/mapSlice";

function useGetCity() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apikey = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      // console.log(position)
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({lat:latitude,lon:longitude}))
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`,
      );
      console.log(result.data)
      dispatch(setCurrentCity(result?.data?.results[0]?.city
      ));
      dispatch(setCurrentAddress(result?.data?.results[0]?.address_line2));
      dispatch(setCurrentState(result?.data?.results[0]?.state));

      const finalAddress = result?.data?.results[0]?.address_line2
      dispatch(setAddress(finalAddress))
    });
  }, [userData]);
}

export default useGetCity;
