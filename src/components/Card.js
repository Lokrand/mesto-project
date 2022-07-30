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
    this._counter = this._cardElement.querySelector(".place__counter");
  }

  render() {
    this._fillTemplate();
    this._addLikeButton();
    if (this.data.isMyCard) {
      this._addDeleteButton();
    }
    this._setEventListener();
    return this._cardElement;
  }

  _setEventListener() {
    this._cardImage.addEventListener("click", () => {
      this.handleCardClick(this.data.name, this.data.link);
    });
  }

  _setLikesCount(counter) {
    this._counter.textContent = counter;
  }

  _isLikedByOwner() {
    return this.data.likes.some((el) => {
      return el._id === window.profile;
    });
  }

  _fillTemplate() {
    this._cardImage.src = this.data.link;
    this._cardImage.alt = this.data.name;
    this._cardElement.querySelector(".place__title").textContent =
      this.data.name;
    this._cardElement.querySelector(".place").id = `card${this.data._id}`;
    this._setLikesCount(this.data.likes.length);
    return this._cardElement;
  }

  _addLikeButton() {
    if (this._isLikedByOwner()) {
      this._likeButton.classList.add("place__button_like");
    } else {
      this._likeButton.classList.remove("place__button_like");
    }
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("place__button_like")) {
        this.api.removeLikeFromCard(this.data._id).then((res) => {
          this._likeButton.classList.remove("place__button_like");
          this._setLikesCount(res.likes.length);
        });
      } else {
        this.api.addLikeToCard(this.data._id).then((res) => {
          this._likeButton.classList.add("place__button_like");
          this._setLikesCount(res.likes.length);
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
}
