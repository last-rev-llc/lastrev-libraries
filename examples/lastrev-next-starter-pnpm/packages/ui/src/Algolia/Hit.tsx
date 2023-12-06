'use client';
import React from 'react';

import Card from '../Card';

const Hit = ({ hit, ownerState }: { hit: any; ownerState: any }) => (
  <Card
    {...hit}
    ownerState={ownerState}
    variant={ownerState.itemsVariant}
    aspectRatio={ownerState.itemsAspectRatio}
    backgroundColor={ownerState.backgroundColor}
  />
);

export default Hit;
