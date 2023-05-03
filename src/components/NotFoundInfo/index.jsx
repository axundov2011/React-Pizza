import React from 'react'
import styles from './NotFoundBlock.module.scss'

const NodeFoundbLock = () => {
  return (
    <div className={styles.root}>
        <span></span>
      <h1>Ничего не найдено </h1>
      <p className={styles.description}>К сожалений  данная сстраница  отсутствает  в нашем  интернет-магазин  </p>
    </div>
  )
}

export default NodeFoundbLock
