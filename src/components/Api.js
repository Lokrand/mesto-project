class CommonApi {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  async checkResponse(res) {
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error(res);
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  async commonFetch(path, params = {}) {
    try {
      const res = await fetch(`${this.url}${path}`, {
        headers: {
          authorization: this.token,
          "Content-Type": "application/json",
        },
        ...params,
      });
      return await this.checkResponse(res);
    } catch (error) {
      console.log("checkresponse = ", error);
      return Promise.reject(error);
    }
  }
}

export class Api extends CommonApi {
  constructor(url, token) {
    super(url, token);
  }
  async getCards() {
    return await super.commonFetch("cards");
  }

  async getProfileData() {
    return await super.commonFetch("users/me");
  }

  async sendProfileRequest(name, about) {
    return await super.commonFetch("users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  async sendCardsRequest(name, link) {
    return await super.commonFetch("cards", {
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  async deleteCard(cardId) {
    return await super.commonFetch(`cards/${cardId}`, {
      method: "DELETE",
    });
  }

  async addLikeToCard(cardId) {
    return await super.commonFetch(`cards/likes/${cardId}`, {
      method: "PUT",
    });
  }

  async removeLikeFromCard(cardId) {
    return await super.commonFetch(`cards/likes/${cardId}`, {
      method: "DELETE",
    });
  }

  async sendUpdateAvatar(avatarLink) {
    return await super.commonFetch("users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    });
  }
}
