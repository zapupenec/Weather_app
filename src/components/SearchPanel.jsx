import React from "react";
import { SearchForm } from "../components";

function SearchPanel({ state, setState, block, searchFieldRef }) {
  const searchPanelClassName = [
    block ? `${block}__search-panel` : "",
    "search-panel",
    state === "shown" ? "search-panel_shown" : "",
  ].join(" ").trim();

  return (
    <div className={searchPanelClassName}>
      <button className="search-panel__button-close button-close" type="button" id="button-close-search-panel" onClick={setState('hidden')} />
      <SearchForm searchFieldRef={searchFieldRef} />
    </div>
  );
}

export default SearchPanel;
