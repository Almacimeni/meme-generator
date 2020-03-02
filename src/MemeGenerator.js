import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function MemeGenerator() {

    const [topText, setTopText] = useState("")
    const [bottomText, setBottomText] = useState("")
    const [memes, setMemes] = useState([])
    const [randomImg, setRandomImg] = useState("http://i.imgflip.com/1bij.jpg")
    const [margin, setMargin] = useState(20)
    const [color, setColor] = useState("#ffffff")
    const [fontSize, setFontSize] = useState(25)

    useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes").then(response => response.data.data)
            .then(response => {
                setMemes(response.memes)
            })
    }, [])

    function handleChange(e) {
        if (e.target.name === "topText") {
            setTopText(e.target.value)
        } else if (e.target.name === "bottomText") {
            setBottomText(e.target.value)
        } else if (e.target.name === "color") {
            setColor(e.target.value)
        } else if (e.target.name === "fontSize") {
            setFontSize(e.target.value)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const randNum = Math.floor(Math.random() * memes.length)
        const randMemeImg = memes[randNum].url
        setRandomImg(randMemeImg)
    }

    function handleClick(e) {
        setMargin(e.target.value)
    }

    const styles = {
        meme: {
            margin: "" + margin + "px 0",
            color: color,
            fontSize: "" + fontSize + "px",
        }
    }

    return (
        <div>
            <form className="meme-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bottomText"
                    placeholder="Bottom Text"
                    onChange={handleChange}
                />
                <button>Change</button>
            </form>
            <div class="flex-container">
                <div className="meme">
                    <img src={randomImg} alt=""></img>
                    <h2 style={styles.meme} className="top">{topText}</h2>
                    <h2 style={styles.meme} className="bottom">{bottomText}</h2>
                </div>

                <div className="side">
                    <label>Location: </label><br />
                    <input className="point-input" type="number" name="points" step="10" onChange={handleClick} value={margin} /> <br />

                    <label>Font Size: </label><br />
                    <input className="point-input" type="number" name="fontSize" step="5" onChange={handleChange} value={fontSize} /> <br />

                    <label className="color-picker-label"> Font Color: </label>
                    <input className="color-picker" type="color" id="head" name="color"
                        value={color} onChange={handleChange} /> <br />

                </div>

            </div >

        </div >
    )
}
