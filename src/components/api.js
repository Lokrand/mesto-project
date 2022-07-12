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

export const deleteCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-12/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'a930b285-48bc-4fb0-af5d-2133c0eb4e79',
      'Content-Type': 'application/json'
    }
  });
}

export const addLikeToCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-12/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'a930b285-48bc-4fb0-af5d-2133c0eb4e79',
      'Content-Type': 'application/json'
    }
  });
}

export const removeLikeFromCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-12/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'a930b285-48bc-4fb0-af5d-2133c0eb4e79',
      'Content-Type': 'application/json'
    }
  });
}
// https://nomoreparties.co/v1/:cohortId/cards/likes/:cardId
export const sendUpdateAvatar = (avatarLink) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-12/users/me/avatar ', {
    method: 'PATCH',
    headers: {
      authorization: 'a930b285-48bc-4fb0-af5d-2133c0eb4e79',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  });
}

export async function compareId () {
  const [data1, data2] = await Promise.all([
    getCards(),
    getProfileData()
  ])
  // console.log('////////////////////////////////////')
  // console.log(data1)
  // console.log('///////////////////////////////////////////')
  // console.log(data2)
  // console.log('///////////////////////////////////////////')
  // data1.forEach(el => {
  //   if (el.owner._id === data2._id) {
  //     return true;
  //   }
    return [data1, data2];
  // })

}
// compareId().then()
// const profile = getProfileData()
// const userId = profile._id
// console.log(userId)
// const cards = getCards()
// const myCards = cards.filter(card => card.owner._id === userId)
// Объединяешь запрос на получение карточек и данных профиля через promise.all,
// сохраняешь нужные данные в переменные и передаешь в функции
