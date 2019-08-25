/* export const goHome = () => {
  window.location.href = DLG.config.encodedContextPath;
};

export const sortByRankClick = (e) => sortCriptoData(e, 'rank') */

export const setArrowClasses = (target, arrow) => {
  /* This is a good start, we need to add some logic like when the array < 2  */
  if (arrow === '-up') {
    target.classList.remove('-down')
    target.classList.add('-up')
    
  } else {
    target.classList.remove('-up')
    target.classList.add('-down')
  }
}

export const getDaysBefore = (date, days) => {
  return new Date(
      date.getFullYear(), 
      date.getMonth(), 
      date.getDate() - days,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
  );
}