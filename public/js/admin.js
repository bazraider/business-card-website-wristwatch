const admin = document.getElementById('js-admin');
const adminBtns = document.querySelectorAll('.js-hidden');

if (admin) {
  for (let i = 0; i < adminBtns.length; i += 1) {
    adminBtns[i].style.display = 'initial';
  }
}

// удаление товара:
const allProducts = document.querySelector('.js-products');

allProducts?.addEventListener('click', async (event) => {
  if (event.target.classList.contains('js-delete')) {
    const id = event.target.id.slice(6);
    const response = await fetch('/products/delete', {
      // создаем роутер delete
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }), // посылаем на ручку id, чтобы в базе по нему можно было удалить
    });

    // будем удалять только если все ок и статус 200
    if (response.status === 200) {
      // удаляем родительских элемент кнопки (маленький div) со страницы, но не из базы
      allProducts.removeChild(event.target.parentNode);
    }
  }
});
