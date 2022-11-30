// 使用 IndexedDB 的第一步是打开数据库，使用indexedDB.open()方法。
let db;
const request = indexedDB.open("myDB", 3);

// 打开数据库失败
request.onerror = (event) => {
  console.log("连接失败", event);
};

// 成功打开数据库
request.onsuccess = (event) => {
  db = request.result;
  console.log("数据库打开成功");
};

// 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
request.onupgradeneeded = (event) => {
  db = event.target.result;
  // 建表
  let objectStore;
  if (!db.objectStoreNames.contains("users")) {
    objectStore = db.createObjectStore("users", {
      keyPath: "id",
      autoIncrement: true,
    });
    // 新建索引，三个参数分别为索引名称、索引所在的属性、配置对象
    objectStore.createIndex("name", "name", { unique: false });
  }
};

const getUserTX  = () => {
    return db?.transaction(["users"], "readwrite")?.objectStore("users")
}

const getDB = () => db

export {
    getUserTX,
    getDB
}