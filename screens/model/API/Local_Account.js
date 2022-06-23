import * as SQLite from 'expo-sqlite';
import { PATH } from './api_chung';


const db = SQLite.openDatabase('db.todolist') // returns Database object


// Tác giả
export function createAccount() {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS local_account(' +
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
  
  
  export function DangXuat(callback) {
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
          tx.executeSql(
            'DELETE FROM local_account', [],
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
          (_, error) => {
            reject(error);
            callback(null);
          }
        )
      })
    })
  }
  
  export function DangNhap(data, callback) {
    // return new Promise((resolve, reject) => {
      db.transaction(function (tx) {
        tx.executeSql(
          'DELETE FROM local_account', [],
          console.log("Xóa dữ liệu account thành công!"),
          (_, error) => console.log(error),
        );
        console.log('Xóa dữ liệu trong local_account');

        tx.executeSql(
          "INSERT INTO local_account ( name, image, email, password) VALUES (?, ?, ?, ?);",
          [data.name, data.image, data.email, data.password],
          (_, result) => {
            callback(result.rows._array);
            // resolve(result.rows._array);
          },
          (_, error) => {
            console.log(error)
            // reject(error)
          }
        );
      });
    // })
  }