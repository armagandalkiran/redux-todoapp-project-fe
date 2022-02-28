import React from "react";
const Footer = () => {
  return (
    <footer className="info">
        <p>Click to edit a todo</p>
        <p>Created by <a href="/#">Dmitry Sharabin, edited by Armagan Dalkiran</a></p>
        <p>Part of <a href="/#">TodoMVC</a></p>
    </footer>
  )
}

export default React.memo(Footer)