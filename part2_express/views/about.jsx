const React = require("react");
const Header = require("./header");
const Footer = require("./footer");

const about = ({ name }) => {
  return (
    <div>
      <Header></Header>
      {name}
      <Footer></Footer>
    </div>
  );
};

module.exports = about;
