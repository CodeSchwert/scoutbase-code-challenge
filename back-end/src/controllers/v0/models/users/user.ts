import * as Sequelize from 'sequelize';

const { TEXT } = Sequelize

const user = {
  username: { type: TEXT, allowNull: false },
  password: { type: TEXT, allowNull: false }
}

export default user;
