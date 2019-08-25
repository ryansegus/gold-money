const InputCalendar = props => {
  const componentClass = 'c-inputRadio'
  return (
    <div className={props.containerClass}>
    <label htmlFor={props.id} className={`${componentClass}__label`}>{props.label}</label>
    <input
      type='radio'
      id={props.id}
      className={`${componentClass}__input`}
      name={props.name}
      value={props.value}
      data-page-id={props.pageId}
      onChange={props.onChangeRadio}/>
    <style jsx global>{`

    .l-radioInputs__item {
      border:1px solid lightgray;
      text-align: center;
      padding: 20px;
    }
    .c-inputRadio__label {
      width:100%;
      padding: 10px;
      color: dimgray;
      box-sizing: border-box;
    }

    .c-inputRadio__input {
      margin-rigth: 20px;
      background-color: cornflowerblue;
      color: white;
      box-sizing: border-box;
      border:1px solid whitesmoke;
      margin: 0 auto;
      display: inline-block;
    }

`}</style>
  </div>
  )
};

export default InputCalendar;