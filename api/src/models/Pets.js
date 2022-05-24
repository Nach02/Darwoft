const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('pets', {
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      type:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      breed:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      age:{
          type: DataTypes.INTEGER,
          allowNull:false
      },
      weight:{
          type: DataTypes.DOUBLE,
          allowNull:false
      },
      height:{
          type: DataTypes.DOUBLE,
          allowNull:false
      },
      photo:{
        type: DataTypes.STRING,
      }
  });
}; 