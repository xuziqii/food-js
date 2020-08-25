import React, { useState } from 'react'
import { connect } from 'react-redux'

import { DELETE_MENU_FOOD, EDIT_MENU_FOOD } from 'src/actions'

import style from './menu.module.scss'

const Menu = (props) => {
  const [ itemWeight, setItemWeight ] = useState(100)
  const { menu, dispatchDelete, dispatchEditing } = props

  // set total
  let proteinSum = 0, fatSum = 0, carbohydrateSum = 0, calorieSum = 0, ids = []
  menu.forEach(item => {
    const { id, protein = 0, fat = 0, carbohydrate = 0, calorie = 0 } = item
    const weight = item.weight / 100
    !ids.includes(id) && ids.push(id)

    proteinSum += protein * weight
    fatSum += fat * weight
    carbohydrateSum += carbohydrate * weight
    calorieSum += calorie * weight
  })


  const handleWeight = (item) => {
    setItemWeight(item.weight)
    dispatchEditing({
      ...item,
      editing: true,
    })
  }

  const confirmWeight = (item) => {
    dispatchEditing({
      ...item,
      editing: false,
      weight: itemWeight,
    })
  }

  const handleInput = (e) => {
    setItemWeight(Number(e.target.value))
  }

  return (
    <div className={style.foodList}>
      <div className={`${style.foodListLine} ${style.foodListHeader}`}>
        <span>名称</span>
        <span>蛋白质</span>
        <span>脂肪</span>
        <span>碳水</span>
        <span>卡路里</span>
        <span>分量</span>
        <span>操作</span>
      </div>
      {
        menu.map(item => (
          <div
            key={item.menuId}
            className={`${style.foodListLine} ${style.foodListBody}`}
          >
            <div>{ item.name }</div>
            <div>{ item.protein }</div>
            <div>{ item.fat }</div>
            <div>{ item.carbohydrate }</div>
            <div>{ item.calorie }</div>
            {
              item.editing ? (
                <div className={style.foodWeight}>
                  <input
                    type='number'
                    value={itemWeight}
                    onChange={handleInput}
                  />
                </div>
              ) : <div>{ item.weight }</div>
            }
            <div className={style.operation}>
              <button onClick={() => dispatchDelete(item)}>删除</button>
              { item.editing ? <button onClick={() => confirmWeight(item)}>确认分量</button> : <button onClick={() => handleWeight(item)}>更改分量</button>}
            </div>
          </div>
        ))
      }
      <div className={`${style.foodListLine} ${style.foodSumHeader}`}>
        <span>总计</span>
        <span>蛋白质</span>
        <span>脂肪</span>
        <span>碳水</span>
        <span>卡路里</span>
        <span>食物种类</span>
      </div>
      <div className={`${style.foodListLine}`}>
        <span>总计</span>
        <span>{proteinSum}</span>
        <span>{fatSum}</span>
        <span>{carbohydrateSum}</span>
        <span>{calorieSum}</span>
        <span>{ids.length}</span>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchDelete: (item) => {
      dispatch({
        type: DELETE_MENU_FOOD,
        payload: item
      })
    },
    dispatchEditing: (item) => {
      dispatch({
        type: EDIT_MENU_FOOD,
        payload: item
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
