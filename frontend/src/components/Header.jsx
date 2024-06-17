import { CheckBox } from "@mui/icons-material";
import { FormatQuoteOutlined } from "@mui/icons-material";
import { useState } from "react";
function Header() {
  const [quote, setQuote] = useState("No Pain !! No Gain 💯");
  const fetchQuote = async () => {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();

    if (data.content.length > 70) fetchQuote();
    else setQuote(data.content);
  };

  return (
    <div className="header" style={{ display: "flex" }}>
      <CheckBox
        sx={{
          fontSize: "50px",
        }}
      />
      <h1>TODO</h1>
      <div onClick={fetchQuote} style={{ marginLeft: "10px" }}>
        <FormatQuoteOutlined className={["flip", "iconQuoteRotate"]} />
      </div>
      <div style={{ flex: 1, textAlign: "center" }}>
        <span style={{ fontFamily: "Playwrite FR Moderne, sans-serif" }}>
          {quote}
        </span>
      </div>
      <div
        onClick={fetchQuote}
        // style={{ backgroundColor: "brown", padding: "10px" }}
      >
        <FormatQuoteOutlined className="iconQuote" />
      </div>
    </div>
  );
}

export default Header;
