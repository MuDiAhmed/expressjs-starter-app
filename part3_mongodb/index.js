const db = require("./db");
const post = require("./models/posts");
const user = require("./models/users");

db.on("error", console.log.bind(console, "connection error: "));
db.once("connected", () => {
  console.log("connected successfully");
  updateSample();
});
db.once("disconnected", () => {
  console.log("disconnected");
});

async function createSample() {
  let userModel = user.Model(db)({
    // firstName: "Mohamed",
    lastName: "Youssef",
    email: "test2@test.com",
    age: 19
  });
  let postModel = post.Model(db)({
    // title: "third post",
    body: "this is an awesome post to read",
    auther: userModel,
    tags: ["awesome", "must read"]
  });

  try {
    await postModel.save();
  } catch (error) {
    for (let key in error.errors) {
      console.log(error.errors[key].message);
    }
  }
}

async function updateSample() {
  const postBeforeUpdate = await post.Model(db).updateMany(
    { title: /^post/i },
    {
      $inc: { "meta.votes": 1, "auther.age": 2 },
      $set: { title: "post with set operator" }
    },
    { useFindAndModify: false, new: true }
  );
  const userAfterUpdate = await user.Model(db).findOneAndUpdate(
    { fn: /^Mohamed/i },
    {
      $set: { fn: "Mohamed" }
    },
    { useFindAndModify: false, new: true }
  );
  console.log(userAfterUpdate);
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
