import React, { useState } from 'react';
import { VehicleCard } from '../VehicleCard';
import type { Vehicle } from '../../types';

interface VehicleTabProps {
  vehicles: Vehicle[];
}

export const VehicleTab: React.FC<VehicleTabProps> = ({ vehicles }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          isActive={activeLineId === vehicle.id}
          onClick={() => setActiveLineId(vehicle.id)}
          isTextVisible={true}
        />
      ))}
    </div>
  );
};