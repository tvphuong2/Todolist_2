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
            []
        )
    })
  }
  
  
  export function DangXuat(callback:any) {
    return new Promise((resolve, reject) => {
        db.transaction(function (tx) {
          tx.executeSql(
            'DELETE FROM local_account', [],
            (_, result) => {
              callback(result.rows._array);
              resolve(result.rows._array);
            },
          )
        })
      })
  }
  
  export function LayTaiKhoan(callback:any) {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx) {
        tx.executeSql(
          'SELECT * FROM local_account;', [],
          (_, result) => {
            callback(result.rows._array[0]);
            resolve(result.rows._array[0]);
          },
          
        )
      })
    })
  }
  
  export function DangNhap(data:any, callback:any) {
    // return new Promise((resolve, reject) => {
      console.log("Đăng nhập 1");
      db.transaction(function (tx) {
        tx.executeSql(
          'DELETE FROM local_account', [],
        );
        console.log('Xóa dữ liệu trong local_account');

        tx.executeSql(
          "INSERT INTO local_account ( name, image, email, password) VALUES (?, ?, ?, ?);",
          [data.name, data.image, data.email, data.password],
          (_, result) => {
            callback(result.rows._array);
            // resolve(result.rows._array);
          },
        );
      });
    // })
  }