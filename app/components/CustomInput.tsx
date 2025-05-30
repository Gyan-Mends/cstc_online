import { Input } from "@heroui/react"
import { ReactNode } from "react"

interface customInputProps {
    label?: string
    isRequired?: boolean
    isClearable?: boolean
    name?: string
    placeholder?: string
    type?: string
    labelPlacement?: string |any
    defaultValue?: string
    endContent?: string
    onChange?:ReactNode | any
    className?: string
}
const CustomInput = ({
    label,
    isRequired,
    isClearable,
    name,
    placeholder,
    type,
    labelPlacement,
    defaultValue,
    endContent,
    onChange,
    className
}: customInputProps) => {
    return (
        <div>
            <Input
                endContent={endContent}
                defaultValue={defaultValue}
                label={label}
                isRequired={isRequired}
                isClearable={isClearable}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                type={type}
                labelPlacement={labelPlacement}
                className={className}
                classNames={{
                    label: "font-nunito text-sm text-default-100",
                    inputWrapper: ""
                }}
            />
        </div>
    )
}

export default CustomInput