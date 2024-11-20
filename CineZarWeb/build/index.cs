@import url("https://fonts.googleapis.com/css2?family=Allerta&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Allerta", sans-serif;
}

body {
  font-family: Arial, sans-serif;
  background-color: #0F645C;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
}

body {
  font-family: Arial, sans-serif;
  background-color: #125c4c;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #083D38;
  color: #FFFFFF;
  width: 111%;
  margin-left: -5%;
  margin-top: -5%;
}
.header__logo {
  font-size: 2rem;
}
.header__title {
  font-size: 1.8rem;
  font-weight: bold;
}
.header__login-btn {
  padding: 0.5rem 1rem;
  background-color: #FFB800;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.header__login-btn:hover {
  background-color: #e6a700;
}

.banner {
  text-align: center;
  margin: 1rem 0;
}
.banner__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.banner__carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}
.banner__carousel-slide {
  min-width: 100%;
  box-sizing: border-box;
  text-align: center;
}
.banner__carousel-slide .movie-poster {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  margin: 0 auto;
}
.banner__carousel-slide .movie-title {
  font-weight: bold;
  margin-top: 0.5rem;
  color: #FFF;
}
.banner .banner__carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: -7px;
  margin-right: -6px;
}
.banner--prev {
  left: 10px;
}
.banner--next {
  right: 10px;
}

.movies-section__title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-align: center;
}
.movies-section__movies-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.movies-section__movie {
  text-align: center;
}
.movies-section__movie .movie-poster {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 0.5rem;
}
.movies-section__movie .movie-title {
  font-weight: bold;
}
.movies-section__movie .movie-genre {
  font-size: 0.85rem;
  color: #9EB3B0;
}

.banner {
  text-align: center;
  margin: 1rem 0;
  position: relative;
  overflow: hidden;
}
.banner__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.banner__carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}
.banner__carousel-slide {
  min-width: 100%;
  box-sizing: border-box;
  text-align: center;
}
.banner__carousel-slide .movie-poster {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  margin: 0 auto;
}
.banner__carousel-slide .movie-title {
  font-weight: bold;
  margin-top: 0.5rem;
  color: #FFF;
}
.banner__carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
}
.banner__carousel-button--prev {
  left: 10px;
}
.banner__carousel-button--next {
  right: 10px;
}

.container-oferta {
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
}
.container-oferta .imagen__oferta {
  margin-top: 1rem;
}
.container-oferta .imagen__oferta img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}
.container-oferta .imagen__oferta h3 {
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #FFF;
}
.container-oferta .imagen__oferta p {
  color: #9EB3B0;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.footer {
  background-color: #083D38;
  color: #FFFFFF;
  padding: 2rem 1rem;
  text-align: center;
}
.footer__credits {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.footer__column {
  width: 100%;
  text-align: center;
}
.footer__column:not(:last-child) {
  margin-bottom: 1rem;
}
.footer__section--contact, .footer__section--legal {
  text-align: center;
}
.footer__title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer__list-item {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.footer__link {
  color: #FFB800;
  text-decoration: none;
  font-size: 0.9rem;
}
.footer__link:hover {
  text-decoration: underline;
}

/*# sourceMappingURL=index.cs.map */
