import React, { useState } from 'react'

import FoodDetail from 'src/components/FoodDetail'
import Prompt from 'src/components/Prompt'

import { ADD_MENU_FOOD, ADD_FOOD } from 'src/actions'

import style from './home.module.scss'
import { connect } from 'react-redux'

const Home = (props) => {
  const { dispatchAddMenu, dispatchAddFood, foods } = props

  const [ showFoodDetail, setShowFoodDetail ] = useState(false)


  const handleConfirm = (item) => {
    setShowFoodDetail(false)
    if (item.name) {
      dispatchAddFood(item)
    }
  }

  return (
    <div>
      <div className={style.desc}>
        <span>以下是 100g 食品含有的三大营养（g）</span>
        <button onClick={() => setShowFoodDetail(true)}>增加食材</button>
      </div>

      {
        showFoodDetail && (
          <Prompt onPromptClick={() => setShowFoodDetail(false)} clickToClose>
            <FoodDetail
              handleCancel={() => setShowFoodDetail(false)}
              handleConfirm={handleConfirm}
            />
          </Prompt>
        )
      }

      <div className={style.foodList}>
        <div className={`${style.foodListLine} ${style.foodListHeader}`}>
          <span>名称</span>
          <span>蛋白质</span>
          <span>脂肪</span>
          <span>碳水</span>
          <span>操作</span>
        </div>
        {
          foods.map(item => (
            <div
              key={item.id}
              className={`${style.foodListLine} ${style.foodListBody}`}
            >
              <span>{ item.name }</span>
              <span>{ item.protein }</span>
              <span>{ item.fat }</span>
              <span>{ item.carbohydrate }</span>
              <div className={style.operation}>
                <button onClick={() => dispatchAddMenu(item)}>加入菜谱</button>
                <button>加入购物车</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAddMenu: (item) => dispatch({
    type: ADD_MENU_FOOD,
    payload: item
  }),
  dispatchAddFood: (item) => dispatch({
    type: ADD_FOOD,
    payload: item
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
