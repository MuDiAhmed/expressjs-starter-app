const db = require("./db");
const post = require("./models/posts");
const user = require("./models/users");

db.on("error", console.log.bind(console, "connection error: "));
db.once("connected", () => {
  console.log("connected successfully");
  createSample();
});
db.once("disconnected", () => {
  console.log("disconnected");
});

function createSample() {
  let userModel = user.Model(db)({
    firstName: "Mohamed",
    lastName: "Youssef",
    email: "test2@test.com",
    age: 19
  });
  let postModel = post.Model(db)({
    title: "third post",
    body: "this is an awesome post to read",
    auther: userModel,
    tags: ["awesome", "must read"]
  });

  postModel.save();
}

async function getSample() {
  let users = await user.Model(db).find();
  console.log(users[0].fullName);
}

async function getCondition() {
  let posts = await post
    .Model(db)
    .find()
    .or([{ "auther.firstName": "Mohamed" }, { "auther.fn": "Mohamed" }])
    .where("auther.age")
    .gt(18)
    .lt(66)
    .where("title")
    .in([/first.*/, /Second.*/])
    .limit(5)
    .sort("-createDate")
    .select("title body createDate");
  console.log(posts);
}
