import { z } from 'zod';
import { IVehicle } from './IVehicle';

const CarZodSchema = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

type ICar = IVehicle & z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };
