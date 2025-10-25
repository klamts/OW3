import React, { useState } from 'react';
import { VehicleCard } from '../VehicleCard';
import type { Vehicle } from '../../types';

interface Vocabulary2TabProps {
  vocabulary2Items: Vehicle[];
}

export const Vocabulary2Tab: React.FC<Vocabulary2TabProps> = ({ vocabulary2Items }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {vocabulary2Items.map((item) => (
        <VehicleCard
        key={item.id}
        vehicle={item}
        isActive={activeLineId === item.id}
        onClick={() => setActiveLineId(item.id)}
        isTextVisible={true}
        />
    ))}
    </div>
  );
};