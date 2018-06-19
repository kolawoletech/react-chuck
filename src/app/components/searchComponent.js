import React from "react";

const SearchComponent = ({
  searchTerm,
  userSearch,
  clearSearch,
  placeHolder
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="fas fa-search" />
        </span>
      </div>

      <input
        type="text"
        className="form-control"
        placeholder={!placeHolder ? "Search..." : placeHolder}
        onChange={event => userSearch(event)}
        value={searchTerm}
      />

      {searchTerm !== "" ? (
        <div className="reset">
          <a href="#" onClick={event => clearSearch(event)}>
            <i className="fas fa-times" />
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default SearchComponent;
