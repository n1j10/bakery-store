import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface FormInputProps {
    name: string;
    type: string;
    label?: string;
    defaultValue?: string;
    placeholder?: string;
};

function FormInput({ name, type, label, defaultValue, placeholder }: FormInputProps) {
    return (
        <div className='mb-4'>
            <Label htmlFor={name} className='mb-2 capitalize'>
                {label || name}
            </Label>
            <Input
                id={name}
                name={name}
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                // email/password stay left-to-right even in the Arabic layout
                dir={type === 'email' || type === 'password' ? 'ltr' : undefined}
                className='h-11 rounded-xl'
                required
            />
        </div>
    )
}

export default FormInput
