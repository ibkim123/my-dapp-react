import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        setError("MetaMask가 설치되어 있지 않습니다.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setError("");
    } catch (err) {
      setError("지갑 연결 실패: " + err.message);
    }
  }

  return (
    <div style={{padding: "20px" }}>
      <h1>React + DApp 실습</h1>

      <button onClick={connectWallet}>지갑 연결</button>

      {account && (
        <p>연결된 계정: {account}</p>
      )}

      {error && (
        <p style={{color: "red" }}>{error}</p>
      )}
    </div>
  );
}

export default App;