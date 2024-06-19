import { useState } from 'react';
import './RandomColor.css';


export default function RandomColor() {

    const [type, settype] = useState('hash');
    const [background, setbackground] = useState('#118382');
    const [previouscolor, setpreviouscolor] = useState('#118382');
    const [favcolors, setfavcolors] = useState([]);

    function randomrgb() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return 'rgb(' + r + "," + g + "," + b + ")";
    }
    function randomhash() {
        const choice = '0123456789abcdef';
        let hash = "#";
        for (let i = 0; i < 6; i++) {
            hash += choice.charAt(Math.floor(Math.random() * choice.length));
        }
        return hash;
    }

    function onclicksetfavcolors() {
        let fav = favcolors.filter(item => item !== background);
        if (favcolors.length < 10)
            setfavcolors([...fav, background]);
        else
            alert("Can't add more than 10")
    }

    function onclickPreviouscolor() {
        setbackground(previouscolor);
    }

    function onclickchangetype(newtype) {
        settype(newtype);
        let col = null;
        if (newtype === 'hash') {
            col = randomhash();
            setbackground(col);
        }
        else {
            col = randomrgb();
            setbackground(col);
        }

        setpreviouscolor(background);
    }



    function onclickchangecolor() {
        let col = null;
        if (type === 'rgb') {
            col = randomrgb();
            setbackground(col);
        }
        else {
            col = randomhash();
            setbackground(col);
        }
        setpreviouscolor(background);
    }

    function onclickremovefavcolors() {
        let re = prompt('Which color to remove ? (Enter Number)');

        let lists = document.querySelectorAll('.favs');
        if (re > 0 && re <= lists.length) {
            // Create a copy of favcolors array
            let updatedFavColors = [...favcolors];
            // Remove the color at index re
            updatedFavColors.splice(re - 1, 1);
            // Update the state with the updated array
            setfavcolors(updatedFavColors);
        }
    }

    //note:- to hardcode styles we need to pass a object with all the data , and to pass a object we need to use {} in jsx do essential writing two sets of { }
    return (
        <div style={{ backgroundColor: background }} className="containerparent">
            <div className='container'>
                <button onClick={() => onclickPreviouscolor()}>Previous color</button>
                <button onClick={() => onclickchangetype('hash')} className='hash'>Hash color</button>
                <button onClick={() => onclickchangetype('rgb')} className='rgb'>RGB color</button>
                <button onClick={() => onclickchangecolor()} className='random'>Random color</button>

            </div>
            <div className='container'>
                <button onClick={() => onclicksetfavcolors()}>Fav Color</button>
                <button onClick={() => onclickremovefavcolors()}>Remove from fav</button>
            </div>
            <div className='colorvalue'>
                {background}
            </div>
            <div className=''>
                {
                    favcolors.map((coloritem, index) => {
                        return <ol>
                            <li className='favs' key={index} value={index + 1}>{coloritem}</li>
                        </ol>

                    })
                }
            </div>

        </div>
    );
}