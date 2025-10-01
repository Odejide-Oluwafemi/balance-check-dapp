import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);

  const loadData = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Need to install a Crypto Wallet like Metamask!");
      return;
    }

    if (address !== null)
    {
      alert(
        "Doctor Segun's Wallet is already Connected! Run small USDT for boys na"
      );
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const account = (
        await window.ethereum.request({ method: "eth_requestAccounts" })
      )[0];
      const signer = await provider.getSigner(account);
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setAddress(address);
      setBalance(ethers.formatEther(balance));
      setNetwork(network.name);
    } catch (error) {
      console.error(error);
      alert("Wallet Connection Rejected by Bro. Segun. Sorry, Doctor Segun🤭");
    }
    // const balance = await provider.getBalance(account);
    // setAddress(ethers.getAddress(account));

    // setProvider(provider);
    // setAccount(account);
    //

    window.ethereum.on("accountsChanged", async () => {
      window.location.reload();
    });
  };

  return (
    <>
      <header>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          width="40px"
        >
          <path d="M311.9 260.8L160 353.6 8 260.8 160 0 311.9 260.8zM160 383.4L8 290.6 160 512 312 290.6 160 383.4z" />
        </svg>
        <h1>ETH Balance Check</h1>
      </header>

      <main>
        <div>
        <button
          className={
            "big-round-button-container" +
            " " +
            (address !== null ? "connected" : "")
          }
          onClick={() => loadData()}
        >
          {address === null ? "Connect Wallet" : "Connected"}
        </button>

        {address !== null && (
          <div>
            <p>Network: {network}</p>
            <p>Address: {address}</p>
            <p>Balance: {balance} ETH</p>

            <strong>Doctor Segun's Wallet is already Connected! Run small USDT for boys na</strong>
          </div>
        )}
        </div>
      </main>

      <footer>
        <p>
          &copy;{new Date().getFullYear()} ElyteTechnologies. All Rights
          Reserved.
        </p>
      </footer>
    </>
  );
}

export default App;
