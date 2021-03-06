const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
  });

const setToken = async (key, value) => {
    return new Promise((resolve, reject) => {
      try {
      return client.set(key, value, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

// const setToken = (key, value) => {
//     (async () => {
//         await client.connect();
//         await client.set(key, value);
//       })();
// }

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

//   const getToken = (key) => {
//     (async () => {
//         await client.connect();
//         await client.get(key);
//       })();
// }

const deleteToken = (key) => {
  try {
    client.del(key);
  }
  catch(error) {
    console.log(error);
  }
}

module.exports = {
    setToken,
    getToken,
    deleteToken,
}