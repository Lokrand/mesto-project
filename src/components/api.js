export const getCards = async () => {
  const res = await fetch("https://nomoreparties.co/v1/plus-cohort-12/cards", {
    headers: {
      authorization: "a930b285-48bc-4fb0-af5d-2133c0eb4e79",
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
    "https://nomoreparties.co/v1/plus-cohort-12/users/me",
    {
      headers: {
        authorization: "a930b285-48bc-4fb0-af5d-2133c0eb4e79",
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
  return fetch("https://nomoreparties.co/v1/plus-cohort-12/users/me", {
    method: "PATCH",
    headers: {
      authorization: "a930b285-48bc-4fb0-af5d-2133c0eb4e79",
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

export const sendCardsRequest = (cardName, cardLink) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-12/cards", {
    method: "POST",
    headers: {
      authorization: "a930b285-48bc-4fb0-af5d-2133c0eb4e79",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
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
  return fetch(`https://nomoreparties.co/v1/plus-cohort-12/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "a930b285-48bc-4fb0-af5d-2133c0eb4e79",
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
    `https://nomoreparties.co/v1/plus-cohort-12/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "a930b285-48bc-4fb0-af5d-2133c0eb4e79",
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
    `https://nomoreparties.co/v1/plus-cohort-12/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "a930b285-48bc-4fb0-af5d-2133c0eb4e79",
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
  return fetch("https://nomoreparties.co/v1/plus-cohort-12/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "a930b285-48bc-4fb0-af5d-2133c0eb4e79",
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
