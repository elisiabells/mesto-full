import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import * as auth from '../utils/auth';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipError, setTooltipError] = useState(false);

  useEffect(() => {
    loggedIn && Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  // ставим лайки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // удаляем карточку
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // обновляем информацию пользователя
  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // обновляем аватар
  const handleUpdateAvatar = (data) => {
    api.changeAvatar(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // добавляем карточку
  const handleAddPlaceSubmit = (newCard) => {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Аутентификация
  const handleLogin = (email, password) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        console.log(`это пришло из handleLogin ${JSON.stringify(data)}`);
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate('/users/me');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // Регистрация
  const handleRegister = ({ email, password }) => {
    return auth
      .register({ email, password })
      .then((res) => {
        if (res) {
          navigate('/sign-in');
          setIsTooltipOpen(true);
          setTooltipError(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipOpen(true);
        setTooltipError(true);
      });
  }

  // Проверка токена
   useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    console.log(`это пришло из useEffect ${jwt}`);
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email)
            navigate("/users/me");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/users/me" />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />

            <Route
              path="/sign-in"
              element={
                <>
                  <Header isLoginPage />
                  <Login onLogin={handleLogin} />
                </>
              }
            />

            <Route
              path="/sign-up"
              element={
                <>
                  <Header isRegisterPage />
                  <Register onRegister={handleRegister} />
                </>
              }
            />

            <Route
              path="/users/me"
              element={
                <>
                  <Header userEmail={userEmail} isMainPage />
                  <ProtectedRoute
                    element={Main}
                    loggedIn={loggedIn}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </>
              }
            />
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            isError={tooltipError}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;