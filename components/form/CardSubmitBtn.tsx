"use client"

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function FavSubmitButton({ isFav }: { isFav: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant='ghost'
      size='icon-lg'
      type='submit'
      aria-label={isFav ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
      className='rounded-full text-rose-500 hover:text-rose-600 cursor-pointer'
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Heart className={cn('size-[18px] transition-transform active:scale-125', isFav && 'fill-current')} />
      )}
    </Button>
  )
}

export default FavSubmitButton
