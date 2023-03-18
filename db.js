const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

const User = sequelize.define("User", {
  openid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5
  },
  isVip: {
    type: DataTypes.STRING,
    defaultValue:'0'
  },
  nickName:{
    type:DataTypes.STRING
  },
  avatarUrl:{
    type:DataTypes.STRING
  },
  isSignIn:{
    type:DataTypes.STRING
  }
});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
  // await sequelize.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
  // User
};
