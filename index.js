const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./firebase/config");
const firestore = require("firebase/firestore");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const payment = async (req, res) => {
  const request = req.body;
  const ref = firestore.collection(db, "payments");
  await firestore.setDoc(firestore.doc(ref, `${request.status}/${request.udf1}`, `${request.addedon}`), request);
  if (request.status === "success") {
    const executeFunction = () => {
      const ref = firestore.collection(db, `users/cart/${request.udf1}`);
      firestore.onSnapshot(ref, (querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          const ref = firestore.collection(db, "users");
          firestore.setDoc(firestore.doc(ref, `orders`, `${request.udf1}/${doc.id}`), { ...doc.data() });
          firestore.deleteDoc(firestore.doc(db, `users/cart/${request.udf1}/${doc.id}`));
        });
      });
    };
    executeFunction();
    res.redirect("/orders");
    // res.redirect("http://localhost:5000/orders");
  } else {
    res.redirect("/cart");
    // res.redirect("http://localhost:5000/cart");
  }
};

const commonRedirect = async (req, res) => {
  // res.sendFile(path.join("I:/LakshmiEmbroidery/Prod/client/public/index.html"));
  res.sendFile(path.join(__dirname + "/public/index.html"));
};

app.post("/payment", payment);
app.get("*", commonRedirect);

app.listen(PORT, () => {
  console.log(PORT, "Port is listening....");
});
