/*
  Will use input type date for brevity, it will
  be nice to use a nice calendar customizable plugin
*/

const InputCalendar = props => {
  const componentClass = 'c-inputCalendar'
  return (
    <div className={props.containerClass}>
    <label htmlFor={props.id} className={`${componentClass}__label`}>{props.label}</label>
    <input type='date' id={props.id} className={`${componentClass}__input`} />
    <style jsx global>{`

    .c-inputCalendar__label {
      width:100%;
      padding: 10px;
      color: dimgray;
      box-sizing: border-box;
    }

    .c-inputCalendar__input {
      width:100%;
      padding: 10px;
      background-color: cornflowerblue;
      color: white;
      box-sizing: border-box;
      border:1px solid whitesmoke;
    }
    
    @media screen and (min-width: 768px) {
      .c-inputCalendar__input {
        padding: 20px;
      }
      
    }

`}</style>
  </div>
  )
};

export default InputCalendar;