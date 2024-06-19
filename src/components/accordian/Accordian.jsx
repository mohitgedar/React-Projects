import data from "./AccordianData";
import './Accordian.css';
import { useState } from 'react';


export default function Accordian() {
    const [multiselect, setmultiselect] = useState(false);
    const [multiselectids, setmultiselectid] = useState([]);
    const [singleSelect, setsingleSelect] = useState(null);


    function multiselectbutton() {
        setmultiselect(!multiselect);//toggles the multiselect button between true and false
        if (!multiselect)//if multiselect is false now, then in next render it will be true , and singleselect will be set to null on button click , because ,once multiselect is true we don't want singleselect to have any id to work on
            setsingleSelect(null);
        else
            setmultiselectid([]);//if multiselect  is true right now , in next render it will set it to false and multiselectids to empty so , once multiselect is false we don't want multiselect to have ids to work on 
    }

    function handleAnswer(id) {//this gets called when an accordian is clicked , it can get called in two scenarious , one multiselect is false , means we are working on single select ,two multiselect is true means we need to allow multiple selections 

        if (!multiselect)//if right now multiselect is false , means we work on single , then this if work  
        {
            setsingleSelect(singleSelect === id ? null : id); //if the currently clicked accordian is same one that is open , close it by making singleselect null , but if its different change singleselect to it so essentailly closing the previous one and opening the new one
        } else {//if right now multiselect is true , means we are working on multislection
            // Check if the id is already in the multiselectids array
            const index = multiselectids.indexOf(id);//this will give us the index of the id  in multiselectids ,if it is already there / accordian with that id is open ,other wise gives us -1
            if (index === -1) {//index is -1 means the id is not in id list and the accordian is not already open so we add it to the ids array ,to make it open
                setmultiselectid([...multiselectids, id]);//adding a new id to the array
            } else {//but if its not -1 means the id is already there and accordian is open so we close it 
                // If id is in the array, remove it
                const updatedIds = [...multiselectids];//create a "shallow " copy of multiselectids array and remove the item from that 
                updatedIds.splice(index, 1);//using splice to remove the id ,index is the start point to remove elements, 1 is the no. of items to remove
                setmultiselectid(updatedIds);//update the ids list
            }
        }

    }

    return (
        <div className="Wrapper">
            <button onClick={() => multiselectbutton()} className="multiButton">
                {
                    multiselect ? "Disable MultiSelection" : "Enable MultiSelection"//the content of the button is based on if at present multiselect is enables or disabled
                }
            </button>
            <div className="QuestionSection">
                {   //each time a re-render happens this will be displayed , map is used here to work on every object of data array
                    data.map(dataitem => {
                        return (
                            <div onClick={() => handleAnswer(dataitem.id)} className="QuestionsandAnswers">
                                <div className="Questions">
                                    <h3 className="Questionsh3" key={dataitem.id}>
                                        {dataitem.question}
                                    </h3>
                                    <span className="Questionsspan">
                                        +
                                    </span>
                                </div>

                                {
                                    //note:-inside jsx when you use {} to write js code , you can't use if else direclty use ?: for it
                                    dataitem.id === singleSelect && !multiselect ? <div className="Answers">{dataitem.answer}</div> : null
                                    //if the present item of data array have id equal to singleselect and multiselect if false then we display that item on the page other wise display null or nothing
                                }
                                {
                                    multiselectids.includes(dataitem.id) && multiselect ? <div className="Answers">{dataitem.answer}</div> : null
                                    //if the present item of the data array have it's id in multiselectids and multiselect is true , then display it otherwise not
                                }
                            </div>

                        );
                    })
                }
            </div>
        </div>
    );
}