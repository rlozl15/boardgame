const HintNavbar = ({ hints }) => {
  return (
    <div className="navbar">
      {hints.map((hint, index) => (
        <span
          key={index}
          className={`${hint.part}`}
          style={{
            display: hint.isVisible ? "inline" : "none",
          }}
        >
          {hint.text}
        </span>
      ))}
    </div>
  );
};

export default HintNavbar;