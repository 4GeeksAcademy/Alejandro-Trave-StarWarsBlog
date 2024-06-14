import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Home } from "./home";
import { useNavigate } from "react-router-dom";


export const Dashboard = () => {
  const {store } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if (!store.isLogin) {
      navigate('/')
    }
  }, [])

  return (
    <div className="container">
        <div className="card">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
    </div>
  )
}