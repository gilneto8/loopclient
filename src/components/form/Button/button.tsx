import React from "react";

function Button(props: any) {

  return (
    <button
      disabled={props.disabled}
      className={'btn ' + (props.disabled ? ' disabled' : '')
      + (props.filled ? ' btn-secondary' : 'btn-outline-secondary')
      + (props.fullWidth ? ' _full-width' : '')
      + (props.style ? ' _' + props.style : '')
      }
      type={props.type}
      onClick={props.onClick}
    >
      {/*{props.icon &&
      <FontAwesomeIcon icon={props.icon} />
      }*/}
      {props.text || props.children}
    </button>
  )
}

export default Button;