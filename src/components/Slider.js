import React, { useState, useEffect } from 'react'
import "../scss/Slider.scss"

const Slider = ({ SliderData = [] }) => {

    const [currentData, setCurrentData] = useState(SliderData[0])
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        autoPlay();
    }, [])

    useEffect(() => {
        //Change backgroud image to current
        document.getElementById("sliderDiv").style.backgroundImage = "url('" + currentData.Image + "')";
        //Focus current slide button
        document.getElementById("SliderBtn" + currentIndex).focus();
    }, [currentData])


    function changeSlide(index) {

        //Change data on slider
        setCurrentIndex(index);
        setCurrentData(SliderData[index]);

        //Restart loading animation
        const loadingBar = document.getElementById("LoadingBar");
        loadingBar.style.animationName = "none"
        requestAnimationFrame(() => {
            loadingBar.style.animationName = ""
        }, 0)
    }

    function autoPlay(){
        //Changing slide after 5s
        let i = 0;
        setInterval(() => {
            if( i + 1 === SliderData.length){
                i = 0
                changeSlide(0)
            }
            else{
                i++
                changeSlide(i)
            }
        }, 5000);
    }
    
    //Render buttons for all slides
    const SliderButtons = SliderData.map((item, index) => {
        return <button className='SliderButton' id={'SliderBtn' + index} key={'SliderBtnKey' + index} onClick={() => changeSlide(index)}></button>
    })

    return (
        <div className='SliderDiv' id="sliderDiv">
            <div className='BackgroundDiv'>

                <div className='ContentWrapper'>
                    <div className='TitleWrapper'>

                        <div className='SliderButtonsDiv'>
                            {SliderButtons}
                        </div>

                        <div>
                            <h1>{currentData.Title}</h1>
                            <h2>{currentData.SubTitle}</h2>
                        </div>

                        <div className='LoadingBar'>
                            <div className='LoadingBarAnim' id='LoadingBar'></div>
                        </div>

                        <p>
                            {currentData.Content}
                        </p>

                        <div className="ButtonWrapper">
                            <button className='SlideBtn SlideBtn1'>{currentData.Btn1Value}</button>
                            <button className='SlideBtn SlideBtn2'>{currentData.Btn2Value}</button>
                        </div>
                    </div>

                    <div className='SignatureDiv'>
                        <p>{currentData.Signature}</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Slider