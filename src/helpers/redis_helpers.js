const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
  });

// const setToken = async (key, value) => {
//     return new Promise((resolve, reject) => {
//       try {
//         await client.set(key, value, (err, res) => {
//           if (err) reject(err);
//           resolve(res);
//         });
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };

const setToken = (key, value) => {
    (async () => {
        await client.connect();
        await client.set(key, value);
      })();
}

  const getToken = (key) => {
    return new Promise((resolve, reject) => {
      try {
        client.get(key, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

module.exports = {
    setToken,
    getToken,
}