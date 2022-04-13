const admin = document.getElementById('js-admin');
const adminBtns = document.querySelectorAll('.js-hidden');

if (admin) {
  console.log('hello from admin', admin.innerHTML);
  for (let i = 0; i < adminBtns.length; i += 1) {
    adminBtns[i].style.display = 'initial';
  }
  // console.log(adminBtns[0]);
}
