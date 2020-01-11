const db = require("./db");
const post = require("./models/posts");
const user = require("./models/users");
const userRepo = require("./repositories/users");
const postRepo = require("./repositories/posts");

db.on("error", console.log.bind(console, "connection error: "));
db.once("connected", () => {
  console.log("connected successfully");
  updateSample();
});
db.once("disconnected", () => {
  console.log("disconnected");
});

async function createSample() {
  let userDoc = await userRepo.createUser({
    firstName: "Mohamed",
    lastName: "Youssef",
    email: "test6@test.com",
    age: 19
  });
  let postDoc = await postRepo.createPost({
    title: "third post",
    body: "this is an awesome post to read",
    auther: userDoc,
    tags: ["awesome", "must read"]
  });

  try {
    console.log(postDoc);
  } catch (error) {
    for (let key in error.errors) {
      console.log(error.errors[key].message);
    }
  }
}

async function updateSample() {
  const postBeforeUpdate = await postRepo.updatePost(
    { title: /^post/i },
    {
      $inc: { "meta.votes": 1, "auther.age": 2 },
      $set: { title: "post with set operator" }
    }
  );
  const userAfterUpdate = await userRepo
    .updateUser()
    .where("age")
    .eq(19)
    .set({ fn: "Said" });
  console.log(userAfterUpdate);
  console.log(postBeforeUpdate);
}

async function getSample() {
  let users = await user.Model(db).find();
  console.log(users[0].fullName);
}

async function getCondition() {
  let posts = await postRepo
    .getPostModel()
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
