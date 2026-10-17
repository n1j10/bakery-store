"use client";

import { useState } from 'react'
import { Search } from 'lucide-react';
import { Input } from '../ui/input'
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { links } from '@/utils/links';

function NavSearch() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  );
  const { replace } = useRouter()

  // Waits for the user to stop typing, then shows the results on the products page
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`${links.PRODUCTS.href}?${params.toString()}`);
  }, 700);

  return (
    <div className='relative'>
      <Search className='pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder='ابحث عن كيك، بقلاوة، كرواسون...'
        aria-label='بحث'
        className='h-10 rounded-full bg-secondary/60 border-transparent ps-10 focus-visible:bg-background'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  )
}

export default NavSearch
