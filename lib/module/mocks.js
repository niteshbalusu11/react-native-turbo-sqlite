"use strict";

import initSqlJs from "sql.js";
let sql = null;
(() => {
  initSqlJs().then(SQL => {
    sql = new SQL.Database();
  });
})();
const TurboSqlite = {
  getVersionString: () => "0.0.1",
  openDatabase: _path => {
    return {
      executeSql: (sqlStatement, params) => {
        if (!sql) {
          console.warn("SQL.js is not initialized yet. This query will be ignored.");
          return {
            insertId: 0,
            rowsAffected: 0,
            rows: []
          };
        }
        try {
          const result = sql.exec(sqlStatement, params);
          return {
            insertId: sql.getRowsModified(),
            rowsAffected: result[0]?.values.length || 0,
            rows: result[0]?.values || []
          };
        } catch (error) {
          console.error("SQL execution error:", error);
          return {
            insertId: 0,
            rowsAffected: 0,
            rows: []
          };
        }
      },
      close: () => {
        if (sql) {
          sql.close();
          sql = null;
        }
      }
    };
  }
};
export default TurboSqlite;
//# sourceMappingURL=mocks.js.map