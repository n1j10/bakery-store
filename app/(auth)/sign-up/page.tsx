import Link from 'next/link'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import SubmitButton from '@/components/form/Buttons'
import AuthShell from '@/components/form/AuthShell'
import { registerAction } from '@/utils/api'

const SignUpPage = () => {
  return (
    <AuthShell title='انضم لعائلة السنابل' subtitle='سوّي حساب واطلب حلوياتك المفضلة'>
      <FormContainer action={registerAction}>
        <FormInput name='name' type='text' label='الاسم' />
        <FormInput name='email' type='email' label='البريد الإلكتروني' placeholder='name@example.com' />
        <FormInput name='password' type='password' label='كلمة المرور' />
        <SubmitButton text='إنشاء حساب' className='mt-6 h-12 w-full rounded-full text-base' />
      </FormContainer>
      <p className='mt-6 text-center text-sm text-muted-foreground'>
        عندك حساب؟{' '}
        <Link href='/sign-in' className='font-medium text-primary hover:underline underline-offset-4'>سجّل دخولك</Link>
      </p>
    </AuthShell>
  )
}

export default SignUpPage
