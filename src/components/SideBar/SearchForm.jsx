import React from "react";
import { Button } from ".";

export function SearchForm({ searchFieldRef }) {
  const handlerSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="search-form" onSubmit={handlerSubmit}>
      <input className="search-form__search-field" type="search" name="search" placeholder="Поиск города" id="search-field" ref={searchFieldRef} />
      <Button block="search-form" size="small" type="submit">Найти</Button>
    </form>
  );
}
