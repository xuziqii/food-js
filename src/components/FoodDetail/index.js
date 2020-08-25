import React, { useState } from 'react'

import style from './foodDetail.module.scss'

const FoodDetail = ({ handleConfirm, handleCancel }) => {
	const nameInputState = useInputState('')
	const proteinInputState = useInputState('')
	const fatInputState = useInputState('')
	const carboInputState = useInputState('')
	const calorieInputState = useInputState('')

	const handleButton = (type) => {
		if (type === 'cancel') {
			handleCancel()
		} else if (type === 'confirm') {
			const res = {
        name: nameInputState.value,
        protein: Number(proteinInputState.value),
        fat: Number(fatInputState.value),
        carbohydrate: Number(carboInputState.value),
        calorie: Number(calorieInputState.value),
			}
			handleConfirm(res)
		}
	}

	return (
		<div className={style.box}>
		  <div className={style.inputLines}>
				<div className={style.line}>
					<span>名称</span>
					<input {...nameInputState} />
				</div>
				<div className={style.line}>
					<span>蛋白质</span>
					<input type='number' { ...proteinInputState } />
				</div>
				<div className={style.line}>
					<span>脂肪</span>
					<input type='number' { ...fatInputState } />
				</div>
				<div className={style.line}>
					<span>碳水</span>
					<input type='number' { ...carboInputState } />
				</div>
				<div className={style.line}>
					<span>卡路里</span>
					<input type='number' { ...calorieInputState } />
				</div>
		  </div>
			<div className={style.operation}>
			  <button onClick={() => handleButton('cancel')}>取消</button>
			  <button onClick={() => handleButton('confirm')}>确定</button>
			</div>
		</div>
	)
}


function useInputState (initValue) {
  const [ value, onValueChange] = useState(initValue);
  const onChange = (e) => {
  	onValueChange(e.target.value)
  }

  return {
    value,
    onChange,
  }
}

export default FoodDetail
