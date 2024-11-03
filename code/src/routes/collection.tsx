import FramedImage from '@/components/ui/framedImage';
import { useSuspenseQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/collection')({
  component: CollectionComponent,
})

function CollectionComponent() {

  const [images, setImages] = useState<string[]>([]);
  const dummyImgUrls: { imgUrl: string, name: string, detailsPageUrl: string }[] = [{
    imgUrl: 'https://rgcbaftxplqejgurmxyx.supabase.co/storage/v1/object/public/plants/07b83d94-47f2-4259-b919-89027157b23d.png',
    name: 'Kaktus',
    detailsPageUrl: ''
  },
  {
    imgUrl: 'https://i0.wp.com/plant.pk/wp-content/uploads/2020/09/monstera.jpeg?fit=1920%2C1984&ssl=1',
    name: 'Blume',
    detailsPageUrl: ''
  },
  {
    imgUrl: 'https://cdn.britannica.com/50/157550-050-56DA0685/Venus-flytrap-traps-insects.jpg',
    name: 'Baum',
    detailsPageUrl: ''
  }];

  document.body.style.backgroundColor = "#FFEDE8";

  useEffect(() => {
    // load iamges from API
  });

  return (
    <div className="pt-20 pb-8 px-8">
      {dummyImgUrls.length ?
        <div className='grid grid-cols-2 gap-8'>
          {dummyImgUrls.map((ooi) => {
            return <div className="flex flex-col justify-center">
              <FramedImage
                imgUrl={ooi.imgUrl}
                link={ooi.detailsPageUrl} />
              <span className="mt-4 text-center text-hibiscus-orange" >{ooi.name}</span>
            </div>
          })}

        </div>
        :
        <p className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-hibiscus-orange'>Nothing to see here ... {`:)`}</p>
      }
    </div>
  )
}
