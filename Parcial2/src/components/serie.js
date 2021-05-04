import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Temporada from "./temporada";
import { FormattedMessage } from "react-intl";

const Serie = (props) => {
  const [series, setSeries] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("series") === null) setSeries("loading...");
      else {
        setSeries(localStorage.getItem("series"));
      }
    } else {
      fetch(props.URL)
        .then((res) => res.json())
        .then((res) => {
          var json = JSON.stringify(res);
          setSeries(json);
          localStorage.setItem("series", json);
        });
    }
  }, []);

  return (
    <Container>
      <h1>Seasons</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="#" />
            </th>
            <th>
              <FormattedMessage id="Name" />
            </th>
            <th>
              <FormattedMessage id="Channel" />
            </th>
            <th>
              <FormattedMessage id="Description" />
            </th>
          </tr>
        </thead>
        <tbody>
          {(series &&
            series !== "loading..." &&
            JSON.parse(series).map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.channel}</td>
                <td>{t.description}</td>
              </tr>
            ))) || (
            <tr>
              <td>{series}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <br />
      <h1>Seasons</h1>
      {series && series !== "loading..." && <Temporada series={series} />}
    </Container>
  );
};

export default Serie;
