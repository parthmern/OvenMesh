import { Input } from "./input"
import { Label } from "./label"

function InputWithLabelEmail({name,type,placeholder,setEmail, setPhoneNum}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{name}</Label>
      <Input onChange={
          (e)=> {
          setEmail ? setEmail(e.target.value) : setPhoneNum(e.target.value)
          }
        }  type={type} id={type} placeholder={placeholder} />
    </div>
  )
}

export default InputWithLabelEmail ;
