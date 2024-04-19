import { Input } from "./input"
import { Label } from "./label"

function InputWithLabelEmail({name,type,placeholder,setEmail}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{name}</Label>
      <Input onChange={
          (e)=> {
          setEmail(e.target.value)
          }
        }  type={type} id={type} placeholder={placeholder} />
    </div>
  )
}

export default InputWithLabelEmail ;
