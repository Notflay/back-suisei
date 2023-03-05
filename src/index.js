import mongoose, { mongo, Schema } from "mongoose";
import express from "express";
import { config } from "dotenv";

config();

const app = express();

try {
  mongoose.connect(process.env.MONGODB_URL);
} catch (error) {
  console.log(error);
}

// PRUEBAS MONGOOSE

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

/* async function createCharac() {
  const doc = new Blog();
  await doc.save();
}
 */

(async () => {
  // Function body
  const doc = new Blog();
  await doc.save();
})();

app.listen(3000);

// Object

db.blogs.find({ age: { $gt: 40 } }); // mayor que number
db.blogs.find({ age: { $lt: 40 } });
// gt mayor que
// gte mayor igual
// lt menor que
// lte menor igual

db.blogs.find({ meta: { votes: { $gt: 5 }, favs: { $gt: 15 } } });

db.blogs
  .find({
    age: { $lt: 50 },
  })
  .count(); // Cantidad de docs que cumplemen con la condicion

db.blogs.find({ votes: 10 }).count();

db.blogs.find({
  $and: [
    {
      title: "Blog 4",
    },
    {
      author: "sebas",
    },
  ],
}); /// 2 CONDICIONALES AND

db.blogs.find({
  age: { $ne: 50 },
}); // CONDICIONAL DE DIFERENTE !==

db.blogs.find({
  $or: [{ age: 50 }, { title: "Blog 1" }],
}); // CONDICION DE OR

db.blogs.find({
  age: { $in: [50, 40, 15, 20, 15, 24, 16] },
}); // CONDICION DE OR EN IN CON UN LISTADO DE OPCIONES

db.blogs.find({
  age: { $exists: true },
}); // CONDICION DE QUE EL ATRIBUTO EXISTA

db.blogs.find({
  $and: [{ age: { $exists: true } }, { age: 15 }],
}); // doble condición

db.blogs.find({ age: { $exists: true } }).sort({
  age: -1,
}); // ORDENER POR ATRIBUTOS (DESCENDENTE - 1)

db.blogs
  .find({ age: { $exists: true } })
  .sort({ age: -1 })
  .limit(1); // ORDER EL LIMITE DE BLOGS SOLO 1

// db.blogs.find({ age: { $exists: true } }).sort({ age: 1 }).limit(2);

db.blogs.find({
  title: /.5$/, // todos los docs que finaliza con el texto "5"
});

db.blogs.find({
  title: /^B/,
}); // todos los docs que empiece con el texto "5"

db.blogs.find().skip(10); // Empieza desde el documento 10

db.blogs.find().skip(10).limit(2); // Empieza el documento desde 10 y termina en 12

// Find, sort, limit y skip > retornar cursores
// count y pretty

db.blogs.find().forEach((blog) => print(blog.title)); // Itera en todos los titles

// db.blogs.find({ author: {$exists: true  }, age: {$exists: true } }, {author: true, age: true})
// Llama al cursor y solo obtiene author y age

// db.blogs.find({ author: {$exists: true  }, age: {$exists: true } }, {_id: false, author: true, age: true})

// db.blogs.update({ _id: ObjectId("63db02e9f5b6ef965874edc1") }, { $set: { title: "Blog 1564564" }}); // Actualiza un dato
// db.blogs.update({ _id: ObjectId("63cc7d73d953cfe52b011949") }, { $set: { title: "Blog 1000000" }});

// $unset quitas un atributo
db.blogs.update(
  {
    _id: ObjectId("63cc7d73d953cfe52b011949"),
  },
  {
    $unset: {
      title: true,
    },
  }
);

db.blogs.update({ age: { $exists: false } }, { $set: { age: 18 } }); // Solo un documento

//* db.blogs.update({ age: { $exists: false } }, { $set: { age: 18 }}, { multi: true });
// Todos los elementos que cumplan con la condicion

db.blogs.updateMany(
  {
    comments: { $exists: false },
  },
  {
    $set: {
      comments: [{ bio: "Inserte bio" }],
    },
  }
);

db.blogs.updateMany(
  {},
  {
    $inc: {
      // Incrementa la edad para todos los documentos o segun condicion
      age: 1,
    },
  }
);

// remove
db.blogs.remove({ _id: ObjectId("63db02e9f5b6ef965874edc1") });

db.blogs.find({ "meta.favs": 45 });

db.blogs.find(
  { "meta.favs": 45 },
  { _id: false, title: true, "meta.votes": true }
);

db.blogs.find({
  comments: {
    $elemMatch: {
      //Nos permite filtrar sobre attrs de docs dentro de listas
      like: false,
    },
  },
});

db.blogs.updateOne(
  { title: "Blog 1" },
  {
    $push: {
      // Añade un nuevo objeto dentro de un array
      comments: {
        like: true,
        body: "El curso de mongo db me está gustando",
      },
    },
  }
);

db.blogs.updateOne(
  {
    username: "user 13",
  },
  {
    $push: {
      courses: "Rust", // Añade un nuevo elemento dentro de un array
    },
  }
);

db.blogs.updateOne(
  {
    username: "user 13",
  },
  {
    $push: {
      "comments.3.tags": "Tutor",
    },
  }
);

db.authors.insertOne({
  name: { firstName: "Jamie", lastName: "Munro" },
  biography:
    "Jamie is the author of ASP.NET MVC 5 with Bootstrap and Knockout.js.",
  twitter: "https://twitter.com/endyourif",
  facebook: "https://www.facebook.com/End-Your-If-194251957252562/",
  books: [{}],
});

db.authors.findOne({ name: { firstName: "Jamie", lastName: "Munro" } });

db.authors.updateOne(
  { name: { firstName: "Jamie", lastName: "Munro" } },
  {
    $push: {
      books: "Elephant",
    },
  }
);

db.authors.find(
  {
    books: {
      $elemMatch: {
        title: "Elephant",
        cantidad: { $exists: true },
      },
    },
  },
  {
    books: {
      $elemMatch: {
        title: "Elephant",
        cantidad: { $exists: true },
      },
    },
  }
);

db.authors.updateOne(
  {
    books: {
      $elemMatch: {
        title: "Elephant",
        cantidad: { $exists: true },
      },
    },
  },
  {
    books: {
      "3":  {
        $inc: {
          cantidad: 1,
        },
      },
    },
  }
);



db.blogs.updateOne(
  {
    username: "user 13",
  },
  {
    $push: {
      "comments.3.tags": "Tutor",
    },
  }
);
