import { getUserTX, getDB } from "./init";
// 去除proxy
const removeProxy = (data) => JSON.parse(JSON.stringify(data));

// 新增
const add = (data) =>
  new Promise((resolve, reject) => {
    const request = getUserTX().add(removeProxy(data));

    request.onsuccess = (event) => resolve(event);
    request.onerror = (event) => reject(event);
  });

//   获取单个
const read = (id) =>
  new Promise((resolve, reject) => {
    const request = getUserTX().get(id);

    request.onsuccess = (event) => resolve(event);
    request.onerror = (event) => reject(event);
  });

//   获取所有
const readAll = () =>
  new Promise((resolve, reject) => {
    const objectStore = getUserTX();
    const rst = [];
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        rst.push({
          id: cursor.key,
          name: cursor.value.name,
          age: cursor.value.age,
          sex: cursor.value.sex,
        });
        cursor.continue();
      } else {
        resolve(rst);
      }
    };
  });

//   更新
const update = (data) =>
  new Promise((resolve, reject) => {
    const request = getUserTX().put(data);

    request.onsuccess = (event) => resolve(event);
    request.onerror = (event) => reject(event);
  });

//   删除
const remove = (id) =>
  new Promise((resolve, reject) => {
    const request = getUserTX().delete(id);

    request.onsuccess = (event) => resolve(event);
    request.onerror = (event) => reject(event);
  });

const searchByName = (name) =>
  new Promise((resolve, reject) => {
    const request = getUserTX().index("name").get(name);

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event);
  });

export { add, read, readAll, update, remove, getDB, searchByName };

const useIndexedDB = {
  add,
  read,
  readAll,
  update,
  remove,
  getDB,
  searchByName,
};

export default useIndexedDB
