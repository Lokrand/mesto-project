export const getCards = async () => {
  const res = await fetch("https://nomoreparties.co/v1/plus-cohort-12/cards", {
  headers: {
    authorization: "a930b285-48bc-4fb0-af5d-2133c0eb4e79",
  },
})
  const data = await res.json();
  return data;
}
export const getProfileData = async () => {
  const res = await fetch("https://nomoreparties.co/v1/plus-cohort-12/users/me", {
  headers: {
    authorization: "a930b285-48bc-4fb0-af5d-2133c0eb4e79",
  },
})
  const data = await res.json();
  return data;
}

export const sendProfileRequest = (profileName, profileAbout) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-12/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'a930b285-48bc-4fb0-af5d-2133c0eb4e79',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  });
}

export const sendCardsRequest = (cardName, cardLink) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-12/cards', {
    method: 'POST',
    headers: {
      authorization: 'a930b285-48bc-4fb0-af5d-2133c0eb4e79',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  });
}

export const addLikeToCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-12/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'a930b285-48bc-4fb0-af5d-2133c0eb4e79',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  });
}
// https://nomoreparties.co/v1/:cohortId/cards/likes/:cardId
