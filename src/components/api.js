const dataApi = {
  url: "https://nomoreparties.co/v1/plus-cohort-12/",
  token: "a930b285-48bc-4fb0-af5d-2133c0eb4e79"
}

const checkResponse = async (res) => {
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}





const commonFetch = async (path, params = {}) => {
  const res = await fetch(`${dataApi.url}${path}`,
  {
    headers: {
      authorization: dataApi.token,
      "Content-Type": "application/json",
    },
    ...params
  }
  )
  return await checkResponse(res);
}

export const getCards = async () => {
  return await commonFetch('cards');
};

export const getProfileData = async () => {
  return await commonFetch('users/me');
};

export const sendProfileRequest = async (name, about) => {
  return await commonFetch('users/me', {
    method: "PATCH",
    body: JSON.stringify({
      name,
      about
    }),
  });
};

export const sendCardsRequest = async (name, link) => {
  return await commonFetch('cards', {
    method: "POST",
    body: JSON.stringify({
      name,
      link
    }),
  });
};

export const deleteCard = async (cardId) => {
  return await commonFetch(`cards/${cardId}`, {
    method: "DELETE",
  });
};

export const addLikeToCard = async (cardId) => {
  return await commonFetch(`cards/likes/${cardId}`, {
    method: "PUT",
  });
};

export const removeLikeFromCard = async (cardId) => {
  return await commonFetch(`cards/likes/${cardId}`, {
    method: "DELETE",
  });
};

export const sendUpdateAvatar = async (avatarLink) => {
  return await commonFetch('users/me/avatar', {
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarLink
    }),
  });
};
