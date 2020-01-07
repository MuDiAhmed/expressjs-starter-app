const React = require("react");
const Header = require("./header");
const Footer = require("./footer");

const index = ({ name }) => {
  return (
    <div>
      <Header></Header>
      {name}
      <Footer></Footer>
    </div>
  );
};

module.exports = index;
