module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        allowNull: false,
        type: Sequelize.TEXT,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      img: {
        type: Sequelize.TEXT,
      },
      message: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updateddAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('clients');
  },
};
