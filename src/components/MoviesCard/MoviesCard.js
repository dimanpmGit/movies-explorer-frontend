import React from 'react';
import './MoviesCard.css';
import pic01 from '../../images/pic__01.png'
import pic02 from '../../images/pic__02.png'
import pic03 from '../../images/pic__03.png'
import pic04 from '../../images/pic__04.png'
import pic05 from '../../images/pic__05.png'
import pic06 from '../../images/pic__06.png'
import pic07 from '../../images/pic__07.png'
import pic08 from '../../images/pic__08.png'
import pic09 from '../../images/pic__09.png'
import pic10 from '../../images/pic__10.png'
import pic11 from '../../images/pic__11.png'
import pic12 from '../../images/pic__12.png'

const MoviesCard = (props) => {
  if (!props.allMovies) {
  return (
    <>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic01} alt='There are 33 words about design'/>
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name app__link'>33 слова о дизайне</p>
          <div className='movies-card__close-btn app__link'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 47м</p>
      </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic02} alt='There are 33 words about design'/>
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name app__link'>Киноальманах «100 лет дизайна»</p>
          <div className='movies-card__close-btn app__link'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 3м</p>
      </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic03} alt='There are 33 words about design'/>
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name app__link'>В погоне за Бенкси</p>
          <div className='movies-card__close-btn app__link'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 42м</p>
      </div>
      </>
      )};

    return (
      <>
        <div className='movies-card'>
          <img className='movies-card__picture' src={pic01} alt='There are 33 words about design' />
          <div className='movies-card__name-and-like'>
            <p className='movies-card__name app__link'>33 слова о дизайне</p>
            <div className='movies-card__like movies-card__like_active app__link'></div>
          </div>
          <p className='movies-card__movie-duration'>1ч 47м</p>
        </div>
        <div className='movies-card'>
          <img className='movies-card__picture' src={pic02} alt='There are 33 words about design' />
          <div className='movies-card__name-and-like'>
            <p className='movies-card__name app__link'>Киноальманах «100 лет дизайна»</p>
            <div className='movies-card__like app__link'></div>
          </div>
          <p className='movies-card__movie-duration'>1ч 3м</p>
        </div>
        <div className='movies-card'>
          <img className='movies-card__picture' src={pic03} alt='There are 33 words about design' />
          <div className='movies-card__name-and-like'>
            <p className='movies-card__name app__link'>В погоне за Бенкси</p>
            <div className='movies-card__like app__link'></div>
          </div>
          <p className='movies-card__movie-duration'>1ч 42м</p>
        </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic04} alt='There are 33 words about design' />
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name'>Баския: Взрыв реальности</p>
          <div className='movies-card__like'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 21м</p>
      </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic05} alt='There are 33 words about design' />
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name'>Бег это свобода</p>
          <div className='movies-card__like'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 44м</p>
      </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic06} alt='There are 33 words about design' />
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name'>Книготорговцы</p>
          <div className='movies-card__like movies-card__like_active'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 37м</p>
      </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic07} alt='There are 33 words about design' />
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name'>Когда я думаю о Германии ночью</p>
          <div className='movies-card__like'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 56м</p>
      </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic08} alt='There are 33 words about design' />
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name'>Gimme Danger: История Игги и The Stooge...</p>
          <div className='movies-card__like'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 59м</p>
      </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic09} alt='There are 33 words about design' />
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name'>Дженис: Маленькая девочка грустит</p>
          <div className='movies-card__like movies-card__like_active'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 42м</p>
      </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic10} alt='There are 33 words about design' />
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name'>Соберись перед прыжком</p>
          <div className='movies-card__like movies-card__like_active'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 10м</p>
      </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic11} alt='There are 33 words about design' />
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name'>Пи Джей Харви: A dog called money</p>
          <div className='movies-card__like'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 4м</p>
      </div>
      <div className='movies-card'>
        <img className='movies-card__picture' src={pic12} alt='There are 33 words about design' />
        <div className='movies-card__name-and-like'>
          <p className='movies-card__name'>По волнам: Искусство звука в кино</p>
          <div className='movies-card__like'></div>
        </div>
        <p className='movies-card__movie-duration'>1ч 7м</p>
      </div>
    </>
  )
};

export default MoviesCard;