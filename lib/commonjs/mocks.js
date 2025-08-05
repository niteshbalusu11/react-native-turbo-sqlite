"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sql = _interopRequireDefault(require("sql.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let sql = null;
(() => {
  (0, _sql.default)().then(SQL => {
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
var _default = exports.default = TurboSqlite;
//# sourceMappingURL=mocks.js.map