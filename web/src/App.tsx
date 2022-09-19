import "./styles/main.css";
import { GameBanner } from "./components/GameBanner";
import logImg from "./assets/logo-nlw.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { CreateAdModal } from "./components/CreateAdModal";
import { CreateAdBanner } from "./components/CreateAdBanner";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center my-20">
      <img src={logImg} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-16">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16 w-9/12">
        {games.map(({ id, title, bannerURL, _count: { ads } }) => (
          <GameBanner
            key={id}
            bannerUrl={bannerURL}
            title={title}
            adsCount={ads}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
