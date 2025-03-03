export const InputBox = ({type= "text", placeholder, value, onChange, onInput, onKeyDown, ...props }) => {
    return (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onInput={onInput}
          onKeyDown={onKeyDown}
          {...props}
        ></input>
    )
};