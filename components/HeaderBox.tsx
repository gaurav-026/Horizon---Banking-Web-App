import React from 'react'


const HeaderBox = ({type = "title", title, subtext, user} : HeaderBoxProps) => {
  return (
    <div className='header-box'>
        <h1 className='header-box-title text-24 lg:text-30'>
            {title}
            {type === "greeting" && (
                <span className='text-bank-gradient'>&nbsp;{user}</span>

            )}
            </h1>
            <p className='header-box-subtext text-14 lg:text-16 '>{subtext}</p>
      
    </div>
  )
}

export default HeaderBox
