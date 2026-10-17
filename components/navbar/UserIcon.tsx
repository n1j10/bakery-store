import { User } from 'lucide-react';

function UserIcon({ imageUrl, name }: { imageUrl?: string | null; name?: string }) {
  if (imageUrl) {
    return (
      <img src={imageUrl} className='size-7 rounded-full object-cover' alt={name || 'المستخدم'} />
    );
  }

  return (
    <span className='grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground'>
      {name ? name.trim().charAt(0) : <User className='size-4' />}
    </span>
  );
}
export default UserIcon;
