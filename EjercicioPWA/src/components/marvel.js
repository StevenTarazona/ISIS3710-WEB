import React, { useEffect, useState } from "react";

const Marvel = () => {
  const [characters, setCharacters] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("characters") === null)
        setCharacters("loading...");
      else {
        setCharacters(localStorage.getItem("characters"));
      }
    } else {
      const URL =
        "https://gateway.marvel.com:443/v1/public/characters?&ts=hola&hash=1e98aadad8bb25525fc0e9d658760ad1&apikey=8e0cfcde0bc59c75d72106f1ac68a939";
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          var obj = JSON.stringify(
            res.data.results.map((t) => {
              return {
                name: t.name,
                description: t.description,
                thumbnail: t.thumbnail.path + "." + t.thumbnail.extension,
              };
            })
          );
          setCharacters(obj);
          localStorage.setItem("characters", obj);
        });
    }
  }, []);

  return (
    <div>
      <h1>Marvel characters</h1>
      {(characters &&
        characters !== "loading..." &&
        JSON.parse(characters).map((t) => (
          <div className="card">
            <div className="image">
              <img
                src={t.thumbnail}
                alt="Avatar"
                style={{ width: "100%" }}
              ></img>
            </div>
            <div className="container">
              <h4>
                <b>{t.name}</b>
              </h4>
              <p>{t.description}</p>
            </div>
          </div>
        ))) || <p>{characters}</p>}
    </div>
  );
};

export default Marvel;
