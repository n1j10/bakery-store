import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { links } from '@/utils/links'

type BreadCrumbProps = {
  name: string;
  category?: { id: string; title: string };
}

function BreadCrumb({ name, category }: BreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={links.HOME.href}>الرئيسية</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='rotate-180' />
        <BreadcrumbItem>
          <BreadcrumbLink href={links.PRODUCTS.href}>المنتجات</BreadcrumbLink>
        </BreadcrumbItem>
        {category && (
          <>
            <BreadcrumbSeparator className='rotate-180' />
            <BreadcrumbItem>
              <BreadcrumbLink href={`${links.PRODUCTS.href}?category=${category.id}`}>{category.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        <BreadcrumbSeparator className='rotate-180' />
        <BreadcrumbItem>
          <BreadcrumbPage>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb
