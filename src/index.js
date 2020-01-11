import React, { useState } from "react";
import { render } from "react-dom";
import Collapse from "react-css-collapse";
import styled from "styled-components";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Button = styled.button`
  transition: all 0.5s ease-in-out;
  width: 100%;
  padding: 20px;
  font-family: Roboto;
  font-size: 1em;
  color: #3282b8;
  text-align: left;
  -webkit-appearance: none;
  border: 0px solid #2e444e;
  cursor: pointer;
  background-color: white;

  @media screen and (max-width: 1000px) {
    font-size: 0.9em;
    max-height: 5em;
  }

  &:hover {
    color: white;
    background-color: lightblue;
    transition: 200ms;
  }
`;

const Content = styled.div`
  width: 90%;
  padding: 20px;
  font-size: 0.9em;
  color: #2e444e;
  font-family: Roboto;
`;

const C = styled(Collapse)`
  transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

function App() {
  const [openItemIndex, setOpenItemIndex] = useState(undefined);

  function toggle(id) {
    setOpenItemIndex(openItemIndex === id ? undefined : id);
  }

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      var data = await fetch(apiUrl).then(res => {
        return res.json();
      });
      setItems(data);
      console.log(data);
    }
    fetchData();
  }, []);

  items.sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <List>
      {items.map(x => (
        <li key={x}>
          <Button type="button" onClick={() => toggle(x)}>{`${x.name}`}</Button>
          <C isOpen={openItemIndex === x}>
            <Content>
              <strong>Name:</strong> {`${x.name}`}
              <br />
              <strong>Username:</strong> {`${x.username}`}
              <br />
              <strong>Email:</strong> {`${x.email}`}
              <br />
              <strong>Address:</strong> {`${x.address.suite}`}{" "}
              {`${x.address.street}`}, {`${x.address.city}`}{" "}
              {`${x.address.zipcode}`}{" "}
              <i>
                ({`${x.address.geo.lat}`}, {`${x.address.geo.lng}`})
              </i>
              <br />
              <strong>Phone Number:</strong> {`${x.phone}`}
              <br />
              <strong>Website:</strong>{" "}
              <a href={`${"http://" + x.website}`}>{`${x.website}`}</a>
              <br />
              <strong>Works for:</strong> {`${x.company.name}`}{" "}
              <i>"{`${x.company.catchPhrase}`}"</i> ({`${x.company.bs}`})
              <br />
            </Content>
          </C>
        </li>
      ))}
    </List>
  );
}

render(<App />, document.getElementById("root"));
