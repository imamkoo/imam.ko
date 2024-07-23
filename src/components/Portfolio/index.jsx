import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "react-loaders";
import { db } from "../../firebase";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        const portfolioData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPortfolio(portfolioData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio data: ", error);
        setLoading(false);
      }
    };

    getPortfolio();
  }, []);

  const renderPortfolio = (portfolio) => {
    return (
      <div className="images-container">
        {portfolio.map((port, idx) => (
          <div className="image-box" key={idx}>
            <img src={port.image} className="portfolio-image" alt="portfolio" />
            <div className="content">
              <p className="title">{port.name}</p>
              <h4 className="description">{port.description}</h4>
              <button className="btn" onClick={() => window.open(port.url)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"Portfolio".split("")}
            idx={15}
          />
        </h1>
        {loading ? <Loader type="pacman" /> : renderPortfolio(portfolio)}
      </div>
    </>
  );
};

export default Portfolio;
