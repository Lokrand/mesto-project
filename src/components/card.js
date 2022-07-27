export class Card {
  constructor(data, handleCardClick, selector, api, popupDelete) {
    this.data = data;
    this.handleCardClick = handleCardClick;
    this.api = api;
    this.popupDelete = popupDelete;
    this._cardElement = document
      .querySelector(selector)
      .content.cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".place__image");
    this._likeButton = this._cardElement.querySelector(".place__button");
  }

  render() {
    this._setEventListener();
    this._renderViewBlock();
    if (this.data.isMyCard) {
      this._addDeleteButton();
    }
    return this._cardElement;
  }

  _setEventListener() {
    this._getTemplate();
    this._changeCounter(this._cardElement, this.data.likes.length);
    this._addLikeButton();
  }

  _changeCounter(card, counter) {
    card.querySelector(".place__counter").textContent = counter;
    return card;
  }

  _setLikeButtonState() {
    return this.data.likes.some((el) => {
      return el._id === window.profile;
    });
  }

  _getTemplate() {
    this._cardImage.src = this.data.link;
    this._cardImage.alt = this.data.name;
    this._cardElement.querySelector(".place__title").textContent =
      this.data.name;
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
    const deleteCardButton = document.querySelector("#button_delete-card");
    deleteBut.classList.remove("place__delete_hidden");
    deleteBut.addEventListener("click", () => {
      deleteCardButton.setAttribute("data-card-id", this.data._id);
      this.popupDelete.open();
    });
  }

  _renderViewBlock() {
    this._cardImage.addEventListener("click", () => {
      this.handleCardClick(this.data.name, this.data.link);
    });
  }
}
