import React from 'react'
import { Link } from 'react-router-dom'
import emtyImg from '../assets/img/empty-cart.gif'
const CartEmty = () => {
  return (
<>
<div class="content">
    <div class="container container--cart">
      <div class="cart cart--empty">
        <h2>Корзина пустая <icon>😕</icon></h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.<br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emtyImg} alt="Empty cart" />
        <Link to="/" class="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  </div>
</>
  )
}

export default CartEmty
