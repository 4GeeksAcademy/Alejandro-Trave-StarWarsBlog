import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const Profile = () => {
  const {store } = useContext(Context)

  return (
    <div className="container">
      <p className="text-success">
        {store.user}
      </p>
    </div>
  )
}