import $ from 'jquery'
import Swiper from 'swiper'
import { templateRenderer } from './utils'

const slider = new Swiper(".js-slider", {
  slidesPerView: 1,
})

slider.on('slideChange', (swiper) => {
  const $thumb = $('.js-slider-thumb')

  $thumb.removeClass('active');
  $thumb.eq(swiper.activeIndex).addClass('active')
})

$(document).on('click', '.js-slider-thumb', ({ currentTarget }) => {
  const $this = $(currentTarget)
  const $thumb = $('.js-slider-thumb')

  $thumb.removeClass('active')
  $this.addClass('active')
  slider.slideTo($this.index())
})

$(document).on('click', '.js-nav-btn', () => {
  $('.js-nav').toggleClass('hidden')
})

$(document).on('click', '.js-basket-btn', () => {
  $('.js-basket').toggleClass('hidden')
})

$(document).on('click', '.js-qty-minus', () => {
  const $input = $('.js-qty');
  const value = parseInt($input.val());

  if (value === 1) return

  $input.val(value - 1)
})

$(document).on('click', '.js-qty-plus', () => {
  const $input = $('.js-qty');
  const value = parseInt($input.val());

  $input.val(value + 1)
})


$(document).on('blur', '.js-qty', () => {
  const $input = $('.js-qty');
  const value = parseInt($input.val())

  $input.val(value)
})

$(document).on('click', '.js-add-to-cart', ({ currentTarget }) => {
  const $this = $(currentTarget);
  const qty = $('.js-qty').val();
  const template = $('.js-basket-template').html();
  const basketLength = $('.js-basket-qty').text();
  const newQty = basketLength ? parseInt(qty) + parseInt(basketLength) : qty

  if (!basketLength) {
    $('.js-basket-content, .js-basket-empty').toggleClass('hidden');
    $('.js-basket-content').append(templateRenderer(template, {
      name: $this.data('name'),
      price: $this.data('price'),
      total: new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
      }).format(parseFloat($this.data('price')) * parseInt(qty)),
      qty,
    }))
  } else {
    $('.js-basket-item-qty').text(newQty)
    $('.js-basket-item-total').text('$' + parseFloat($this.data('price')) * parseInt(newQty))
  }
  
  $('.js-basket-qty').removeClass('hidden').text(newQty);
})

$(document).on('click', '.js-basket-remove', () => {
  $('.js-basket-content, .js-basket-empty').toggleClass('hidden');
  $('.js-basket-content').find('.js-basket-item').remove();
  $('.js-basket-qty').addClass('hidden').text('');
})

