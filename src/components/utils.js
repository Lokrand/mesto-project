const openPopup = (elem) => {
  elem.classList.add('popup_opened')
};

const closePopup = (elem) => elem.classList.remove('popup_opened');

export {openPopup, closePopup}
