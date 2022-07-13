const dataApi = {
  url: "https://nomoreparties.co/v1/plus-cohort-12/",
  token: "a930b285-48bc-4fb0-af5d-2133c0eb4e79"
}

export const getCards = async () => {
  const res = await fetch(`${dataApi.url}cards`, {
    headers: {
      authorization: dataApi.token,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export const getProfileData = async () => {
  const res = await fetch(
    `${dataApi.url}users/me`,
    {
      headers: {
        authorization: dataApi.token,
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export const sendProfileRequest = (profileName, profileAbout) => {
  return fetch(`${dataApi.url}users/me`, {
    method: "PATCH",
    headers: {
      authorization: dataApi.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const sendCardsRequest = (name, link) => {
  return fetch(`${dataApi.url}cards`, {
    method: "POST",
    headers: {
      authorization: dataApi.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      link
    }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const deleteCard = (cardId) => {
  return fetch(`${dataApi.url}cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: dataApi.token,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const addLikeToCard = (cardId) => {
  return fetch(
    `${dataApi.url}cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: dataApi.token,
        "Content-Type": "application/json",
      },
    }
  )
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const removeLikeFromCard = (cardId) => {
  return fetch(
    `${dataApi.url}cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: dataApi.token,
        "Content-Type": "application/json",
      },
    }
  )
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const sendUpdateAvatar = (avatarLink) => {
  return fetch(`${dataApi.url}users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: dataApi.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};
