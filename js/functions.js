
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
    if (tartgetElement.classList.contains('card-list__delete')) {
        const productId = tartgetElement.closest('.card-list__item').dataset.cardPid;
        updateCard(tartgetElement, productId, false);
        e.preventDefault()
    }

}

export { documentActions }