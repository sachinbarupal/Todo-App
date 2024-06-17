import CountBox from "../components/CountBox";
import Header from "../components/Header";
import Todos from "../components/Todos";

export default function Home() {
  return (
    <div style={{ marginBottom: "70px" }}>
      <CountBox />
      <Todos />
    </div>
  );
}
