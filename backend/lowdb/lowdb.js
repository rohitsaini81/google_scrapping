import { Low } from "lowdb";
import { JSONFile, JSONFilePreset } from "lowdb/node";
import { db } from "../app.js";
// import { Print } from "../app.js";

// db.posts.remove()

const mydata = {
  id: 0,
  ip: "127.0.0.1:8080",
  status: true,
};

const readData = async () => {
  await db.read();
  const { posts } =await db.data;
  console.log(posts);
  return posts;
};
const createData = async (mydata) => {
  await db.update(({ posts }) => posts.push(mydata));
  return "success";
};

const deleteData = async (id) => {
  await db.read();
  // db.data.posts = db.data.posts.filter(post => post.status !== false);
  db.data.posts = db.data.posts.filter((post) => post.id !== id);

  await db.write();

  console.log("Deleted posts where status=false");
  return "success";
};

// createData(mydata);

// deleteData(1)
// readData()

export { readData, createData, deleteData };
