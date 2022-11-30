const tree = {
  name: "page.js",
  require: [
    {
      name: "A.js",
      require: [
        {
          name: "B.js",
          require: [
            {
              name: "C.js",
            },
          ],
        },
      ],
    },
    {
      name: "D.js",
      require: [
        {
          name: "C.js",
        },
        {
          name: "E.js",
        },
      ],
    },
  ],
};

/**
 * @param {string} name
 * @param {Array[DependTree]} requireList
 */
function DependTree(name, requireList) {
  this.name = name;
  this.require = requireList ?? null;
}

/**
 * 根据js的依赖关系树tree，输出合理的打包顺序的数组
 * @param {DependTree} tree
 * @returns {Array[String]}
 */
const depend = (tree) => {
    
};
