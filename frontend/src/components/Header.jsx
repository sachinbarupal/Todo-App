import { CheckBox } from "@mui/icons-material";
import { FormatQuoteOutlined } from "@mui/icons-material";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
function Header() {
  if (!localStorage.getItem("quote"))
    localStorage.setItem("quote", "No Pain !! No Gain 💯");
  const localQuote = localStorage.getItem("quote");
  const [quote, setQuote] = useState(localQuote);
  const isLaptop = useMediaQuery("(min-width:1024px)");

  const fetchQuote = async () => {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    if (data.content?.length > 70) fetchQuote();
    else if (data.content) {
      setQuote(data.content);
      localStorage.setItem("quote", data.content);
    }
  };
  setInterval(fetchQuote, 100000);

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
        <div style={{ flex: 1, textAlign: "center" }}>
          <span
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
