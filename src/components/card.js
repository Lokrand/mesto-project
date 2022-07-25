export class Card {
  constructor(data, handleCardClick, selector, api, popupDelete) {
    this.data = data;
    this.handleCardClick = handleCardClick;
    this.api = api;
    this.popupDelete = popupDelete;
    this._cardElement = document.querySelector(selector).content.cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".place__image");
    this._likeButton = this._cardElement.querySelector(".place__button");
  }

  render() {
    const name = this.data.name;
    const link = this.data.link;
    const likesCount = this.data.likes.length;
    this._getTemplate(name, link);
    this._changeCounter(this._cardElement, likesCount);
    this._addLikeButton();
    this._renderViewBlock(name, link);
    if (this.data.isMyCard) {
      this._addDeleteButton();
    }
    return this._cardElement;
  }

  _setEventListener() {

  }

  _changeCounter(card, counter) {
    card.querySelector(".place__counter").textContent = counter;
    return card;
  }

  _setLikeButtonState() {
    return this.data.likes.some((el) => el._id === window.profile._id);
  }

  _getTemplate(name, link) {
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardElement.querySelector(".place__title").textContent = name;
    this._cardElement.querySelector(".place").id = `card${this.data._id}`;
    return this._cardElement;
  }

  _addLikeButton() {
    if (this._setLikeButtonState()) {
      this._likeButton.classList.add("place__button_like");
    } else {
      this._likeButton.classList.remove("place__button_like");
    }
    this._likeButton.addEventListener("click", (event) => {
      const elem = event.target;
      const card = elem.closest(".place");
      if (this._likeButton.classList.contains("place__button_like")) {
        this.api
          .removeLikeFromCard(this.data._id)
          .then((res) => {
            this._likeButton.classList.remove("place__button_like");
            this._changeCounter(card, res.likes.length);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this.api
          .addLikeToCard(this.data._id)
          .then((res) => {
            this._likeButton.classList.add("place__button_like");
            this._changeCounter(card, res.likes.length);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  }

  _addDeleteButton() {
    const deleteBut = this._cardElement.querySelector(".place__delete");
    const deleteCardButton = document.querySelector('#button_delete-card');
    deleteBut.classList.remove("place__delete_hidden");
    deleteBut.addEventListener("click", () => {
      deleteCardButton.setAttribute("data-card-id", this.data._id);
      this.popupDelete.open();
    });
  }

  _renderViewBlock(name, link) {
    this._cardImage.addEventListener("click", () => {
      this.handleCardClick(name, link);
    });
  }
}
