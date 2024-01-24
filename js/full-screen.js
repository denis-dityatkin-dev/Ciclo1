let wrapper = document.querySelector('.wrapper');

let pageSlider = new Swiper('.page', {
	// Свои классы
	wrapperClass: "page__wrapper",
	slideClass: "page__screen",

	// Вертикальный слайдер
	direction: 'vertical',
	IOSEdgeSwipeDetection: true,
	onTouchStart: function()
    {
        return false;
    },
    scrollbarDraggable: true,
		scrollbarHide: true,
	// Количество слайдов для показа
	slidesPerView: 'auto',

	// Включаем параллакс
	parallax: true,

	// Управление клавиатурой
	keyboard: {
		// включить/выключить
		enabled: true,
		// включить/выключить только,когда слайдер в пределах вьюпорта
		onlyInViewport: true,
		// включить/выключить управление клавишами pageUp, pageDown
		pageUpDown: true,
	},

	// Управление колесом мыши
	mousewheel: {
		// Чувствительность колеса мыши
		sensitivity: 1,
		// Класс объекта, на котором будет срабатывать прокрутка мышью.
		// eventsTarget: ".swiper-container",
	},

	// Отключение функционала, если слайдов меньше, чем нужно
	watchOverflow: true,

	// Скорость
	speed: 800,

	// Обновить свайпер при изменении элементов слайдера
	observer: true,

	// Обновить свайпер при изменении родительских элементов слайдера
	observeParents: true,

	// Обновить свайпер при изменении дочерних элементов слайдера
	observeSlideChildren: true,


	// Навигация
		// Буллеты,текущее положение. прогрессбар
		pagination: {
		  el: ".page__pagination",
			type: 'bullets',
		  // Буллеты
		  clickable: true,
			bulletClass: "page__bullet",
			bulletActiveClass: "page__bullet_active",
		  // // Динамические буллеты
		  // dynamicBullets: true,
		  // // Кастомные буллеты
		  // renderBullet: function (index, className) {
		  //   return '<span class="' + className + '">' + (index + 1) + '</span>';
		  },

	// Скролл
	scrollbar: {
		container: '.swiper-scrollbar',
        hide: false,
        draggable: true,
        snapOnRelease: true
		// el: ".page__scroll",
		// dragClass: "page__drag-scroll",
		// // Возможность перетаскивать скролл
		// draggable: true,
	},
	// Отключаем автоинициализацию
	init: false,

	//  События
	on:{
		// Событие инициализации
		init: function(){
			menuSlider();
			setScrollType();
			wrapper.classList.add('_loaded');
		},
		// Событие смены слайда
		slideChange: function(){
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active');
		},
		resize: function(){
			setScrollType();
		}
	},
});


// Навигация по сайту

let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider(){
	if(menuLinks.length > 0){
		menuLinks[pageSlider.realIndex].classList.add('_active');
		for(let index = 0; index < menuLinks.length; index++){
			const menuLink = menuLinks[index];
			menuLink.addEventListener('click', function(e){
				menuSliderRemove();
				pageSlider.slideTo(index, 800);
				menuLink.classList.add('_active');
				e.preventDefault();
			});
		}
	}
}

function menuSliderRemove(){
	let menuLinkActive = document.querySelector('.menu__link._active');
	if(menuLinkActive){
		menuLinkActive.classList.remove('_active');
	}
}
function setScrollType(){
	if(wrapper.classList.contains('_free')){
		wrapper.classList.remove('_free');
		pageSlider.params.freeMode = false;
	}
	for(let index = 0; index < pageSlider.slides.length; index++){
		const pageSlide = pageSlider.slides[index];
		const pageSlideContent = pageSlide.querySelector('.screen__content');
		if(pageSlideContent){
			const pageSlideContentHeight = pageSlideContent.offsetHeight;
			if(pageSlideContentHeight > window.innerHeight){
				wrapper.classList.add('_free');
				pageSlider.params.freeMode = true;
				break;
			}
		}
	}
}

pageSlider.init();