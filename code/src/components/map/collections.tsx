import { CollectionMarker } from '@/components/map/collection-marker';
import React from 'react';

type CollectionProps = {
    collections: Collection[];
};

export function Collections({ collections }: CollectionProps) {
    const collectionList = collections.map((collection: Collection) => (
        <CollectionMarker
            key={collection.id}
            lat={collection.lat}
            lng={collection.lng}
            name={collection.name}
            category={collection.category}
            id={collection.id}
        />
    ));

    return <div>{collectionList}</div>;
}
