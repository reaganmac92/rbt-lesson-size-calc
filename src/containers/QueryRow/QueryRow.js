import React from 'react';
import ItemInput from '../../components/ItemInput/ItemInput';

export default function QueryRow(props) {

    const seriesChangeHandler = (e) => {
        props.seriesChange(props.id, e.target.value)
    }

    const lessonStartChangeHandler = (e) => {
        props.lessonStartChange(props.id, e.target.value)
    }

    const lessonEndChangeHandler = (e) => {
        props.lessonEndChange(props.id, e.target.value)
    }
    
    return(
        <>
            <ItemInput 
                val={props.series}
                change={seriesChangeHandler}
                id={`series_${props.id}`} 
                labelText={'Series Number'}/>
            <ItemInput 
                val={props.lessonStart}
                change={lessonStartChangeHandler}
                id={`series_${props.id}`} 
                labelText={'Lesson Start'}/>
            <ItemInput 
                val={props.lessonEnd}
                change={lessonEndChangeHandler}
                id={`series_${props.id}`} 
                labelText={'Lesson End'}/>
        </>
    )
}
// }