import pic01 from '../images/pic__01.jpg';
import pic02 from '../images/pic__02.jpg';
import pic03 from '../images/pic__03.jpg';
import pic04 from '../images/pic__04.jpg';
import pic05 from '../images/pic__05.jpg';
import pic06 from '../images/pic__06.jpg';
import pic07 from '../images/pic__07.jpg';
import pic08 from '../images/pic__08.jpg';
import pic09 from '../images/pic__09.jpg';
import pic10 from '../images/pic__10.jpg';
import pic11 from '../images/pic__11.jpg';
import pic12 from '../images/pic__12.jpg';
import studentPic from '../images/student.jpg';

export const BASE_URL = 'https://api.movies.dimanpm.nomoreparties.sbs';
export const BEATFILM_MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const MOVIES_IMAGES_URL = 'https://api.nomoreparties.co';
export const SHORT_MOVIES_LIMIT = 40;
export const EMAIL_REGXPT_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const cards = [
  {
    'picture': pic01,
    'alt': 'Фото1',
    'title': '33 слова о дизайне',
    'duration': '1ч 47м',
    'like': true,
    'saved': true,
    'link': 'https://www.youtube.com/watch?v=OAZWXUkrjPc&pp=ygUQ0L3QsNC_0L7Qu9C10L7QvQ%3D%3D',
  },
  {
    'picture': pic02,
    'alt': 'Фото2',
    'title': 'Киноальманах «100 лет дизайна»',
    'duration': '1ч 3м',
    'like': false,
    'saved': true,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
  {
    'picture': pic03,
    'alt': 'Фото3',
    'title': 'В погоне за Бенкси',
    'duration': '1ч 42м',
    'like': false,
    'saved': true,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
  {
    'picture': pic04,
    'alt': 'Фото4',
    'title': 'Баския: Взрыв реальности',
    'duration': '1ч 21м',
    'like': false,
    'saved': false,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
  {
    'picture': pic05,
    'alt': 'Фото5',
    'title': 'Бег это свобода',
    'duration': '1ч 44м',
    'like': false,
    'saved': false,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
  {
    'picture': pic06,
    'alt': 'Фото6',
    'title': 'Книготорговцы',
    'duration': '1ч 42м',
    'like': true,
    'saved': false,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
  {
    'picture': pic07,
    'alt': 'Фото7',
    'title': 'Когда я думаю о Германии ночью',
    'duration': '1ч 56м',
    'like': false,
    'saved': false,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
  {
    'picture': pic08,
    'alt': 'Фото8',
    'title': 'Gimme Danger: История Игги и The Stooge...',
    'duration': '1ч 59м',
    'like': false,
    'saved': false,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
  {
    'picture': pic09,
    'alt': 'Фото9',
    'title': 'Дженис: Маленькая девочка грустит',
    'duration': '1ч 42м',
    'like': true,
    'saved': false,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
  {
    'picture': pic10,
    'alt': 'Фото10',
    'title': 'Соберись перед прыжком',
    'duration': '1ч 10м',
    'like': true,
    'saved': false,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
  {
    'picture': pic11,
    'alt': 'Фото11',
    'title': 'Пи Джей Харви: A dog called money',
    'duration': '1ч 4м',
    'like': false,
    'saved': false,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
  {
    'picture': pic12,
    'alt': 'Фото12',
    'title': 'По волнам: Искусство звука в кино',
    'duration': '1ч 7м',
    'like': false,
    'saved': false,
    'link': 'https://www.youtube.com/watch?v=_YUzQa_1RCE&pp=ygUZ0LTRjtC90LAgMiDRgtGA0LXQudC70LXRgA%3D%3D',
  },
];

export { cards, studentPic };