import * as SQLite from 'expo-sqlite';
import { PATH } from './api_chung';

const db = SQLite.openDatabase('db.todolist') // returns Database object

// Xóa tất cả bản ghi
export function reset() {
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS local_account', [], console.log("Xóa bảng account thành công!"));
    tx.executeSql('DROP TABLE IF EXISTS local_list', []);
  });
  // FileSystem.deleteAll();
  console.log("Reset local");
}

// Tạo bảng
export function createLocalList() {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS local_list(' +
      'list_id integer NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
      'steps text NOT NULL, ' +
      'image text DEFAULT NULL, ' +
      'onl integer NOT NULL DEFAULT 0, ' +
      'name text NOT NULL, ' +
      'description text DEFAULT NULL, ' +
      'progress text DEFAULT NULL, ' +
      'type_id integer NOT NULL' +
      ');',
      [],
      console.log('Tạo bảng local_list thành công!'),
      (txObj, error) => console.log('Error', error)
    )
  })
}

export function Upload(data, callback) {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      console.log('Chèn vào bảng local_list');
      tx.executeSql(
        "INSERT INTO local_list (steps, image, onl, name, description, progress, type_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [data.steps, data.image, 0, data.name, data.description, data.progress, data.type_id],
        // callback('ThanhCong'),
        (_, result) => {
          console.log('aaa');
          console.log(result.rows._array);
          callback(result.rows._array);
          resolve(result.rows._array);
        },
        (txObj, error) => {
          console.log('Error ', error);
          callback("Error");
        }
      );
      tx.executeSql("select * from local_list", [], (_, { rows }) => {
        console.log('abc');
        console.log(JSON.stringify(rows));
      });
    });
  });
}

// Thêm dữ liệu
export function Download(data, callback) {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      console.log('Chèn vào bảng local_list');
      tx.executeSql(
        "INSERT INTO local_list (list_id, steps, image, onl, name, description, progress, type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [data.list_id, data.steps, data.image, 0, data.name, data.description, data.progress, data.type_id],
        callback('ThanhCong'),
        (_txObj, error) => {
          console.log('Error ', error);
          callback("Error");
        }
      );
      // tx.executeSql("select * from local_list", [], (_, { rows }) => {
      //   console.log('abc');
      //   console.log(JSON.stringify(rows));
      // });
    });
  });
}

export function setProgress(progress, list_id, callback) {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        `UPDATE local_list SET progress = ? WHERE list_id = ?`, [progress, list_id],
        callback('thay tien do thanh cong'),
        (txObj, error) => console.log('Error ', error)
      );
      // tx.executeSql("select * from todolists where list_id=?", [data.list_id], (_, { rows }) =>
      //       console.log(JSON.stringify(rows))
      //     );
    });
  });
}


export function setOff(list_id, callback) {
  db.transaction(function (tx) {
    tx.executeSql(
      `UPDATE local_list SET onl = '0' WHERE list_id = ?`, [list_id],
      callback(),
    )
  })
}



// Lấy dữ liệu
export function getAll(callback) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log("Lấy tất cả bản ghi lưu trữ");
      tx.executeSql(
        'SELECT * FROM local_list', [],
        (_, result) => {
          // console.log('getAllllll');
          // console.log(result.rows._array);
          callback(result.rows._array);
          resolve(result.rows._array);
        },
        (_, error) => reject(error),
      )
    })
  })
}

export function getList(list_id, callback) {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM local_list WHERE list_id=?', [list_id],
        (_, result) => {
          callback(result.rows._array);
          resolve(result.rows._array);
        },
        (_, error) => reject(error),
      )
    })
  })
}



export function getProgress(callback) {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM local_list WHERE onl = '1'", [],
        (_, result) => {
          callback(result.rows._array);
          resolve(result.rows._array);
        },
        (_, error) => reject(error),
      )
    })
  })
}



// Xóa bản ghi
export function deleteList(list_id, callback) {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        'DELETE FROM local_list WHERE list_id=?', [list_id],
        (_, result) => {
          callback(result.rows._array);
          resolve(result.rows._array);
        },
        (_, error) => reject(error),
      )
    })
  })
}




// Cập nhật dữ liệu
export function useList(list_id, callback) {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE local_list SET onl = 1 WHERE list_id = ?', [list_id],
        (_, result) => {
          callback(result.rows._array);
          resolve(result.rows._array);
        },
        (_, error) => reject(error),
      )
    })
  })
}

export function cancelList(list_id, callback) {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE local_list SET onl = 0 WHERE list_id = ?', [list_id],
        (_, result) => {
          callback(result.rows._array);
          resolve(result.rows._array);
        },
        (_, error) => reject(error),
      )
    })
  })
}


export function layAnh(link) {
  var name = link.split("\\");
  name = name[name.length - 1];
  return PATH + "/img/" + name;
}

