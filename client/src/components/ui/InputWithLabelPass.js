import { Input } from "./input"
import { Label } from "./label"

function InputWithLabelPass({name,type,placeholder,setPassword}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{name}</Label>
      <Input onChange={
          (e)=> {
            setPassword(e.target.value);
          }
        }  type={type} id={type} placeholder={placeholder} />
    </div>
  )
}

export default InputWithLabelPass ;
