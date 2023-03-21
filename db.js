
import { Sequelize, DataTypes } from 'sequelize'
// const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one1111 of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
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
    defaultValue: '0'
  },
  nickName: {
    type: DataTypes.STRING
  },
  avatarUrl: {
    type: DataTypes.STRING
  },
  isSignIn: {
    type: DataTypes.STRING
  }
});

const Dialog = sequelize.define("Dialog", {
  openid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dialogId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  dialogName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


const Answer = sequelize.define("Answer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  openid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dialogId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  answerList: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
  await Dialog.sync({ alter: true });
  await User.sync({ alter: true });
  await Answer.sync({ alter: true });
  // await sequelize.sync({ force: true });
}

// 导出初始化方法和模型
export {
  init,
  Counter,
  User,
  Dialog,
  Answer,
  sequelize
};
