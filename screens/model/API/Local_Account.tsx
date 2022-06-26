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
            (txObj, error) => console.log('Error', error)
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
          "INSERT INTO local_account (account_id, name, image, email, password) VALUES (?, ?, ?, ?, ?);",
          [data.account_id, data.name, data.image, data.email, data.password],
          (_, result) => {
            callback(result.rows._array);
            // resolve(result.rows._array);
          },
        );
      });
    // })
  }

  export function DoiTen(account_id:any, name:any, callback:any) {
    db.transaction(function(tx) {
      tx.executeSql(
        `UPDATE local_account SET name = ? WHERE account_id = ?`, [name, account_id],
        callback('thay ten thanh cong'),
      );
    })
  }

  export function DoiAnhDaiDien(account_id:any, ava:any, callback:any) {
    db.transaction(function(tx) {
      tx.executeSql(
        `UPDATE local_account SET image = ? WHERE account_id = ?`, [ava, account_id],
        callback('thay anh dai dien thanh cong'),
      );
    })
  }