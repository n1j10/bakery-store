import Link from 'next/link'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import SubmitButton from '@/components/form/Buttons'
import AuthShell from '@/components/form/AuthShell'
import { loginAction } from '@/utils/api'

function SignInPage() {
  return (
    <AuthShell title='أهلاً بعودتك' subtitle='سجّل دخولك حتى تكمل طلبك'>
      <FormContainer action={loginAction}>
        <FormInput name='email' type='email' label='البريد الإلكتروني' placeholder='name@example.com' />
        <FormInput name='password' type='password' label='كلمة المرور' />
        <SubmitButton text='تسجيل الدخول' className='mt-6 h-12 w-full rounded-full text-base' />
      </FormContainer>
      <p className='mt-6 text-center text-sm text-muted-foreground'>
        ما عندك حساب؟{' '}
        <Link href='/sign-up' className='font-medium text-primary hover:underline underline-offset-4'>أنشئ حساب جديد</Link>
      </p>
    </AuthShell>
  )
}

export default SignInPage
