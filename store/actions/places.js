import axios from "axios";
import { GET_PLACES, LOADING_PLACES } from "./types";

export const getPlaces = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING_PLACES,
      });
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      };
      const res = await axios.get("/api/places/", config);
      console.log(res.data);
      dispatch({
        type: GET_PLACES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
