import * as SQLite from 'expo-sqlite';
import { PATH } from './api_chung';


const db = SQLite.openDatabase('db.todolist') // returns Database object



// Tác giả
export function createAccount() {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS local_account(' +
            'account_id integer NOT NULL PRIMARY KEY, ' +
            'name text NOT NULL, ' +
            'image text DEFAULT NULL, ' +
            'email text NOT NULL, ' +
            'password text NOT NULL ' +
            ');',
            [],
            console.log('Tạo bảng local_account thành công!'),
            (txObj, error) => console.log('Error', error)
        )
    })
  }
  
  
  export function deleteAccount(account_id, callback) {
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
          tx.executeSql(
            'DELETE FROM local_account WHERE account_id=?;', [account_id],
            (_, result) => {
              callback(result.rows._array);
              resolve(result.rows._array);
            },
            (_, error) => reject(error),
          )
        })
      })
  }
  
  export function LayTaiKhoan(callback) {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx) {
        tx.executeSql(
          'SELECT * FROM local_account;', [],
          (_, result) => {
            callback(result.rows._array[0]);
            resolve(result.rows._array[0]);
          },
          (_, error) => reject(error),
        )
      })
    })
  }
  
  export function DangNhap(data, callback) {
    return new Promise((resolve, reject) => {
      console.log('Chèn vào bảng local_account11111');
      db.transaction(function (tx) {
        console.log('Chèn vào bảng local_account');
        tx.executeSql(
          "INSERT INTO local_account (account_id, name, image, email, password) VALUES (?, ?, ?, ?, ?);",
          [data.account_id, data.name, data.image, data.email, data.password],
          (_, result) => {
            // console.log(result.rows._array);
            callback(result.rows._array);
            resolve(result.rows._array);
          },
          (_, error) => reject(error)
        );
        // tx.executeSql(
        //   'SELECT * FROM local_account;', [],
        //   (_, result) => {
        //     // console.log(result.rows._array);
        //     callback(result.rows._array);
        //     resolve(result.rows._array);
        //   },
        //   (_, error) => reject(error),
        // );
      });
    })
  }