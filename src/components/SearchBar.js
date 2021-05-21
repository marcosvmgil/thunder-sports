import React, { useState, useRef, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { SearchOptions } from "./ComboOptions";
import { Link, useHistory } from "react-router-dom";

//
export default function SearchBar(props) {
  const history = useHistory();

  return (
    <Typeahead
      onChange={(selected) => {
        //   console.log()
        (selected[0].id.includes("r"))?
        history.push(`/team/f1/${selected[0].id.split('r')[1]}`):
        history.push(`/team/nba/${selected[0].id.split('g')[1]}`)
        // (selected[0].id.includes("r"))? console.log("corrida"):console.log("jogo");
      }}
      options={SearchOptions}
    />
  );
}
