/* eslint-disable react/prop-types */
import "./index.scss";

const AnimatedLetters = ({ letterClass, strArray, idx }) => {
  return (
    <span>
      {strArray &&
        strArray.map((char, i) => (
          <span key={char + i} className={`${letterClass} _${i + idx}`}>
            {char}
          </span>
        ))}
    </span>
  );
};

export default AnimatedLetters;
