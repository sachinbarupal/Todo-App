import { CheckBox } from "@mui/icons-material";
import { FormatQuoteOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
function Header() {
  const [quote, setQuote] = useState("No Pain !! No Gain 💯");
  const isLaptop = useMediaQuery("(min-width:1024px)");

  const fetchQuote = async () => {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    if (data.content?.length > 70) return;
    else if (data.content) {
      setQuote(data.content);
      localStorage.setItem("quote", data.content);
    }
  };

  useEffect(() => {
    const storedQuote = localStorage.getItem("quote");
    if (storedQuote) {
      setQuote(storedQuote);
    } else {
      fetchQuote();
    }

    const intervalId = setInterval(() => {
      fetchQuote();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="header">
      <CheckBox
        sx={{
          fontSize: "50px",
        }}
      />
      <h1>TODO</h1>
      {isLaptop && (
        <div onClick={fetchQuote} style={{ marginLeft: "10px" }}>
          <FormatQuoteOutlined className="iconQuoteRotate flip" />
        </div>
      )}
      {isLaptop && (
        <div className="float" style={{ flex: 1, textAlign: "center" }}>
          <span
            className="float"
            style={{
              fontFamily: "Playwrite FR Moderne, sans-serif",
              fontSize: "2rem",
            }}
          >
            {quote}
          </span>
        </div>
      )}

      {isLaptop && (
        <div onClick={fetchQuote}>
          <FormatQuoteOutlined className="iconQuote" />
        </div>
      )}
    </div>
  );
}

export default Header;
