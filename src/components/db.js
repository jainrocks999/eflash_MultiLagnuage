var SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({
  name: 'eFlashEngishinappnew.db',
  createFromLocation: 1,
});
export default database = async (tableName, category, random, limit) => {
  return new Promise((resolve, reject) => {
    let data = [];
    db.transaction(tx => {
      let sqlQuery = `SELECT * FROM ${tableName}`;

      if (category !== null) {
        sqlQuery += ` WHERE Category = ?`;
      }

      if (random) {
        sqlQuery += ` ORDER BY RANDOM()`;
      }

      if (limit > 0) {
        sqlQuery += ` LIMIT ?`;
      }

      let params = [];
      if (category !== null) {
        params.push(category);
      }
      if (limit > 0) {
        params.push(limit);
      }

      tx.executeSql(
        sqlQuery,
        params,
        (tx, results) => {
          let len = results.rows.length;

          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);

            data.push(row);
          }

          resolve(data);
        },
        err => {
          console.log(err);
          reject(err);
        },
      );
    });
  });
};
