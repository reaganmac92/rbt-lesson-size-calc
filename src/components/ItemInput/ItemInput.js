import React from 'react';

const ItemInput = (props) => {
    return(
        <div className="input-field col s4">
          <input
            id={props.id}
            onChange={props.change}
            value={props.val}
            type="number" />
          <label htmlFor={props.id}>{props.labelText}</label>
        </div>
    );
}

export default ItemInput;