import FramedImage from '@/components/ui/framedImage';
import { createFileRoute } from '@tanstack/react-router'
import { RecognizedPlant } from 'model/recognized-plant.model';
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

  useEffect(() => {
    // load iamges from API
  });

  return (
    <div className="p-8">
      <div className='grid grid-cols-2 gap-8'>
        {dummyImgUrls.map((plant) => {
          return <FramedImage
            imgUrl={plant.imgUrl}
            name={plant.name}
            link={plant.detailsPageUrl} />
        })}

      </div>
    </div>
  )
}
