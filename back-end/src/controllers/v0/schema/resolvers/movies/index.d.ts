export interface Actor {
  name: string,
  birthday: string,
  country: string
}

export interface Director {
  name: string,
  birthday: string,
  country: string
}

export interface Movie {
  scoutbase_rating?: number,
  title: string,
  year: number,
  rating: number,
  actors: Actor[],
  directors: Director[]
}
