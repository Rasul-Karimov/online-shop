"use strick"
isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


window.onload = function () {
    document.addEventListener('click', documentActions)

}
window.onscroll = function () {

    const headerElement = document.querySelector('.header')
    if (window.scrollY < 10) {
        headerElement.classList.remove('_scroll')
    } else {
        headerElement.classList.add('_scroll')
    }
}

function documentActions(e) {
    const tartgetElement = e.target;
    if (isMobile.any) {
        if (tartgetElement.classList.contains('menu__arrow')) {
            tartgetElement.closest('.menu__item').classList.toggle('_hover')
        }
        if (!tartgetElement.closest('.menu__item')) {
            const menuItem = document.querySelectorAll('.menu__item');
            menuItem.forEach(item => {
                item.classList.remove('_hover')

            })
        }
    }
    if (tartgetElement.classList.contains('search-form__icon')) {
        document.querySelector('.search-form').classList.toggle('_active')
    }
    if (tartgetElement.closest('.icon-menu')) {
        document.querySelector('.menu__body').classList.toggle('_active')
        document.querySelector('.header').classList.toggle('_keyframe')
    }
    if (tartgetElement.classList.contains('menu-footer__btn')) {
        e.preventDefault
        e.target.closest('.menu-footer__column').classList.toggle('_active')
    }
    if (!tartgetElement.closest('.menu-footer__column')) {
        const footerMenu = document.querySelectorAll('.menu-footer__column')
        footerMenu.forEach(item => {
            item.classList.remove('_active')
        })
    }
    if (tartgetElement.classList.contains('products__more-btn')) {
        e.preventDefault();
        getProduct(tartgetElement);

    }
    if (tartgetElement.classList.contains('actions-product__button')) {
        e.preventDefault()
        const productId = tartgetElement.closest('.item-product').dataset.pid;
        addToCard(tartgetElement, productId)
    }
    if (tartgetElement.classList.contains("card-header__icon") || tartgetElement.closest(".card-header__icon")) {
        if (document.querySelector('.card-list').children.length > 0) {
            document.querySelector('.card-header').classList.toggle('_active')
        }
        e.preventDefault()
    } else if (!tartgetElement.closest('.card-header') && !tartgetElement.classList.contains('actions-product__button')) {
        document.querySelector('.card-header').classList.remove('_active')
    }

}

function addToCard(productsButton, productId) {
    if (!productsButton.classList.contains('_hold')) {
        productsButton.classList.add('_hold');
        productsButton.classList.add('_fly');

        const card = document.querySelector('.card-header__icon');
        const product = document.querySelector(`[data-pid="${productId}"]`);
        const productImage = product.querySelector(".item-product__image");

        var productImageFly = productImage.cloneNode(true)
        const productImageWidth = productImage.offsetWidth;
        const productImageHeight = productImage.offsetHeight;
        const productImageFlyTop = productImage.getBoundingClientRect().top;
        const productImageFlyLeft = productImage.getBoundingClientRect().left;

        productImageFly.setAttribute('class', '_flyImage ibg')
        productImageFly.style.cssText =
            `
        left:   ${productImageFlyLeft}px;
        top:    ${productImageFlyTop}px;
        width:  ${productImageWidth}px;
        height: ${productImageHeight}px;
        `;

        document.body.append(productImageFly)

        const cardFlyLeft = card.getBoundingClientRect().left;
        const cardFlyTop = card.getBoundingClientRect().top;

        productImageFly.style.cssText =
            `
        left:   ${cardFlyLeft}px;
        top:    ${cardFlyTop}px;
        width:  0px;
        height: 0px;
        opacity:0;
        `;

    }
    productImageFly.addEventListener('transitionend', function () {
        if (productsButton.classList.contains("_fly")) {
            productImageFly.remove()
            updateCard(productsButton, productId);
            productsButton.classList.remove("_fly")
        }
    })
}



const swiper = new Swiper('.slider-main__wrapper', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,

    // If we need pagination
    pagination: {
        el: '.controls-slider-main__dotta',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.slider-arrow__next',
        prevEl: '.slider-arrow__prev',
    },


})



window.addEventListener("resize", function () {
    if (window.innerWidth < 767.98) {
        const button = document.querySelector('.content-main__button')
        const place = document.querySelector('.slider-main')
        place.after(button)
    } else {
        const button = document.querySelector('.content-main__button')
        const takeBack = document.querySelector('.main-slider__content')
        takeBack.append(button)
    }
});


async function getProduct(button) {
    if (!button.classList.contains('_hold')) {
        button.classList.add("_hold");
        const file = "json/products.json"
        var response = await fetch(file, {
            method: "GET"
        })
    };
    if (response.ok) {
        let result = await response.json();
        loadProducts(result)
        console.log(result)
        button.classList.remove('_hold');
        button.remove()
    } else {
        alert('Ошибка')
    }
}

function loadProducts(data) {
    const productsItems = document.querySelector(".products__items")
    data.products.forEach(item => {
        const productId = item.id;
        const productUrl = item.url;
        const productImage = item.image;
        const productTitle = item.title;
        const productText = item.text;
        const productPrice = item.price;
        const productOldPrice = item.priceOld;
        const productShareUrl = item.shareUrl;
        const productLikeUrl = item.likeUrl;;
        const productLabels = item.labels;


        let productTemplateStart = `  <article data-pid="${productId}" class="products__item item-product">`;
        let productTemplateEnd = ` </article>`;

        let productTemplateLabels = ""
        if (productLabels) {
            let productTemplateLabelsStart = `   <div class="item-product__labels">`;
            let productTemplateLabelsEnd = `</div>`;
            let productTemplateLabelsContent = ""
            productLabels.forEach(labelItem => {
                productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`
            });

            productTemplateLabels += productTemplateLabelsStart;
            productTemplateLabels += productTemplateLabelsContent;
            productTemplateLabels += productTemplateLabelsEnd;
        }
        let productTemplateImage = ` 
        <a href="${productUrl}" class="item-product__image">
          <img src="img/products/${productImage}" alt="${productTitle}">
        </a>
        `;

        let productTemplateBodyStart = `<div class="item-product__body">`
        let productTemplateBodyEnd = `</div>`;

        let productTemplateBodyContent = `
            <div class="item-product__content">
                 <h5 class="item-product__title"> ${productTitle}</h5>
                <div class="item-product__text">${productText}</div>
            </div>
        
        `;
        let productTemplatePrices = ""
        let productTemplatePricesStart = `<div class="item-product__prices">`
        let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`
        let productTemplatePricesOld = `<div class="item-product__price_old">Rp ${productOldPrice}</div>`
        let productTemplatePricesEnd = `</div>`
        productTemplatePrices = productTemplatePricesStart;
        productTemplatePrices += productTemplatePricesCurrent;
        if (productOldPrice) {
            productTemplatePrices += productTemplatePricesOld
        }
        productTemplatePrices += productTemplatePricesEnd;

        let productTemplateActions = `
         <div class="item-product__actions actions-product">
            <div class="actions-product__body">
                <a href="#" class="actions-product__button">Add to card</a>
                <a href="${productShareUrl}" class="actions-product__link __icon-share">Share</a>
                <a href="${productLikeUrl} class="actions-product__link __icon-favorite">Like</a>
            </div>
        </div>
        `;

        let productTemplateBody = '';
        productTemplateBody += productTemplateBodyStart;
        productTemplateBody += productTemplateBodyContent;
        productTemplateBody += productTemplatePrices
        productTemplateBody += productTemplateActions
        productTemplateBody += productTemplateBodyEnd


        let productTemplate = "";
        productTemplate += productTemplateStart;
        productTemplate += productTemplateLabels;
        productTemplate += productTemplateImage;
        productTemplate += productTemplateBody
        productTemplate += productTemplateEnd

        productsItems.insertAdjacentHTML('beforeend', productTemplate)
    });
}


function updateCard(productsButton, productId, productAdd = true) {
    const card = document.querySelector('.card-header');
    const cardIcon = document.querySelector('.card-header__icon');
    const cardQuantity = cardIcon.querySelector('span');
    const cardProduct = document.querySelector(`[data-card-pid="${productId}"]`)
    const cardList = document.querySelector('.card-list');

    if (productAdd) {
        if (cardQuantity) {
            cardQuantity.innerHTML = ++cardQuantity.innerHTML
        } else {
            cardIcon.insertAdjacentHTML('beforeend', `<span>1</span>`)
        }

        if (!cardProduct) {
            const product = document.querySelector(`[data-pid="${productId}"]`)
            const cardProductImage = product.querySelector(".item-product__image").innerHTML
            const cardProductTitle = product.querySelector(".item-product__title").innerHTML
            const cardProductContent = `
            <a href="" class="card-list__image ibg">${cardProductImage}</a>
            <div class="card-list__body">
                <a href="" class="card-list__title">${cardProductTitle}</a>
                <div class="card-list__quantity">Quantity: <span>1</span></div>
                <a href="" class="card-list__delete">Delete</a>
            </div>
            `;
            cardList.insertAdjacentHTML('beforeend', `<li data-card-pid="${productId}" class="card-list__item">${cardProductContent}</li>`)
        } else {
            const cardProductQuantity = cardProduct.querySelector('.card-list__quantity span');
            cardProductQuantity.innerHTML = ++cardProductQuantity.innerHTML
        }
        productsButton.classList.remove('_hold')
    }
}