/* Functions
############################################################################ */

/* Slideshow
---------------------------------------------------------------------------- */

const initSlideshow = (ele) => {
  if(!ele.id) return;
  document.getElementById(ele.id).onclick = function (event) {
    event = event || window.event
    var target = event.target || event.srcElement
    var link = target.src ? target.parentNode : target
    var options = { index: link, event: event }
    var links = this.getElementsByTagName('a')
    blueimp.Gallery(links, options)
  }
}

const slideshows = document.querySelectorAll(".gallery");
slideshows.forEach(slideshow => {
  initSlideshow(slideshow);
});


/* Filter
---------------------------------------------------------------------------- */

const filterTypeMap = {
  'teaching': 'Lehre',
  'research': 'Forschung',
  'project': 'Projekte',
  'publication': 'Publikationen',
  'event': 'Veranstaltungen',
  'other': 'Sonstiges',
  'vita': 'Meilensteine',
  'award': 'Auszeichnungen',
  'university-related-commitment': "Hochschulnahes Engagement",
};

const addFilter = () => {

  let currentFilter = false;
  const filterTargetElement = document.querySelector('[data-js-filter]');
  
  if(!filterTargetElement) return;
  const filterContent = filterTargetElement.dataset.jsFilter;

  const filterContentElement = document.getElementById(filterContent);
  if(!filterContentElement) return;

  filterContentElement.classList.add('filter-items');

  const filterItems = filterContentElement.querySelectorAll('[data-type]');
  const filterTypes = [];
  filterItems.forEach(item => {
    const type = item.dataset.type;
    const types = type.split(', ');

    types.forEach(type => {
      if(!filterTypes.includes(type)) filterTypes.push(type);
    });
  });

  /* Erstelle Filter-Buttons */
  const filterButtons = filterItems.length > 0 ? filterTypes.sort().map(type => {
    return `<li><button class="filter-button" data-filter="${type}">${filterTypeMap[type]}</button></li>`;
  }) : [];

  filterTargetElement.innerHTML = filterButtons.join('');

  /* Filter-Buttons Event-Listener */
  const filterButtonsElement = filterTargetElement.querySelectorAll('[data-filter]');
  filterButtonsElement.forEach(button => {
    button.addEventListener('click', (e) => {
      
      e.preventDefault();
      button.classList.toggle('is-active');

      currentFilter && currentFilter.classList.remove('is-active');
      currentFilter = e.target;

      const filterType = e.target.dataset.filter;      
      const allItems = filterContentElement.querySelectorAll('[data-type]');
      const regEx = new RegExp(filterType, 'g');

      allItems.forEach(item => {

        if(item.dataset.type.match(regEx)) {
          item.classList.remove('is-hidden');
          return;
        }else{
          item.classList.add('is-hidden');
        }
      });
    });
  });


};


/* Main
############################################################################ */

document.addEventListener('DOMContentLoaded', function () {
  addFilter();
});