'use client';

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type btnSize = 'default' | 'lg' | 'sm';

interface SubmitButtonProps {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton({ className = '', text = 'إرسال', size = 'lg', }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      disabled={pending}
      className={cn('mt-4', className)}
      size={size}
    >
      {pending ? (
        <>
          <Loader2 className='size-4 animate-spin' />
          لحظة...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export default SubmitButton

export const ProductSignInButton = () => {
  return (
    <Link href='/sign-in' className={cn(buttonVariants({ size: 'lg' }), 'mt-6 h-12 rounded-full px-8 text-base')}>
      سجّل دخولك حتى تطلب
    </Link>
  );
};
