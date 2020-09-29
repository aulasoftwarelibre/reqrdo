export interface Room {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly capacity: number;
  readonly occupation: number;
  readonly people: string[];
}
