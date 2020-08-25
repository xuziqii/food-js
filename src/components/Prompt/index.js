import React, { useRef } from 'react'

import style from './prompt.module.scss'

const Prompt = (props) => {
  const promptRef = useRef(null)
  const { clickToClose, onPromptClick } = props

  const handleClick = (e) => {

    const { current } = promptRef
    if (clickToClose && e.target === current) {
      onPromptClick()
    }
  }

  return (
    <div
      ref={promptRef}
      className={style.prompt}
      onClick={handleClick}
    >
      <div className={style.promptContent}>
        { props.children }
      </div>
    </div>
  )
}
export default Prompt
