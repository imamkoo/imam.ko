import { faHandPaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Loader from "react-loaders";
import { Link } from "react-router-dom";
import LogoTitle from "../../assets/images/III.png";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import Logo from "./Logo";

const Home = () => {
  const [letterClass, setLetterClass] = useState("text-animate");

  const nameArray = ["m", "a", "m", ".", "k", "o"];
  const jobArray = [
    "w",
    "e",
    "b",
    " ",
    "d",
    "e",
    "v",
    "e",
    "l",
    "o",
    "p",
    "e",
    "r",
    ".",
  ];

  useEffect(() => {
    async function animate() {
      await new Promise((resolve) => setTimeout(() => resolve(), 4000));
      setLetterClass("text-animate-hover");
    }
    animate();
    return () => {};
  }, []);

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>{`'m`}</span>
            <img
              src={LogoTitle}
              alt="JavaScript Developer Name, Web Developer Name"
            />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={22}
            />
          </h1>
          <h2>Front End Developer</h2>
          <Link to="/contact" className="flat-button">
            Say Hello
            <FontAwesomeIcon
              icon={faHandPaper}
              color="#ffd700"
              className="anchor-icon"
            />
          </Link>
        </div>
        <Logo />
      </div>
      <Loader type="pacman" />
    </>
  );
};

export default Home;
