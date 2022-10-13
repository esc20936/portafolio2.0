import React from "react";
import "./Hero.css";
export default function Hero() {

    return (
      <>
        <div className="heroSection">
            <div className="heroText">
                <h1 className="text1">Pablo</h1>
                <h1 className="text1">Escobar</h1>
                <h1 className="text2">BCS Student</h1>

                <div className="icons">
                    <a href="https://github.com/esc20936"> <i className="fa-brands fa-github icono" /></a>
                    <a href="https://www.linkedin.com/in/pabloescobar/"> <i className="fa-brands fa-linkedin"></i></a>
                    <a href="mailto: pablo.pees@gmail.com"> <i class="fa-solid fa-envelope"></i></a>
                </div>
            </div>
        </div>
      </>  
    );

}