const axios = require("axios");
const passwd = process.argv[2];
const mail = process.argv[3];

// console.log(passwd);
axios
  .post("http://localhost:3000/register/", {
    email: mail,
    password: passwd,
  })
  .then((res) => {
    // console.log(res.data);
  })
  .catch((err) => {
    console.log("ERREUR REGISTER");
});

// axios
//   .post("http://localhost:3000/login/", {
//     email: mail,
//     password: passwd,
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log("ERREUR LOGIN");
//   });
// // 