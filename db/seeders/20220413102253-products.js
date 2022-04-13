module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        title: 'Часы1',
        description: 'Описание часов1',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRHV8RvDQlmoobsgrTc2ifO41tLaLhgKkwpg&usqp=CAU',
        price: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Часы2',
        description: 'Описание часов2',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQTRp8OwSjhoaQOesoTYiU3CBWxcKIW_I6g&usqp=CAU',
        price: 7000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Часы3',
        description: 'Описание часов3',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVe5hNFO6X-8T8ZEIk1Oh9ooGqjeAlDpjJQ&usqp=CAU',
        price: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products');
  },
};
