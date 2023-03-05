import { Author } from "./mongos";

(async () => {
  try {
    const autor = await Author.findOne({
      _id: "63dc61af40db2e6ca2b2cf27",
    }).populate("books").set();
    console.log(autor);
  } catch (e) {
    console.log(e.message);
  }
})();
