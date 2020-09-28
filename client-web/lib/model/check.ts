import { Person } from './person';
import { Room } from './room';

export interface Check {
  readonly id: string;
  readonly room: Room;
  readonly person: Person;
  readonly inAt: string;
  readonly outAt?: string;
}
