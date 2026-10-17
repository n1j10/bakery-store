import React from 'react'

type SectionTitleProps = {
  text: string;
  eyebrow?: string;
  action?: React.ReactNode;
}

function SectionTitle({ text, eyebrow, action }: SectionTitleProps) {
  return (
    <div className='mb-8 flex items-end justify-between gap-4'>
      <div>
        {eyebrow && (
          <p className='mb-2 flex items-center gap-2 text-sm font-medium text-primary'>
            <span className='h-0.5 w-6 rounded-full bg-honey' />
            {eyebrow}
          </p>
        )}
        <h2 className='text-2xl font-bold sm:text-3xl'>{text}</h2>
      </div>
      {action}
    </div>
  )
}

export default SectionTitle
