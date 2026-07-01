// error returned by the api
export type ApiError = {
  error: {
    code: number;
    message: string;
    details: unknown;
  };
};

// collection returned by the api
export type ApiCollection<T> = {
  type: string;
  count: number;
  items: T[];
};

// response returned by the api when uploading an image
export type ImageUploadResponse = {
  filename: string;
  url: string;
};

// data returned by the api for the home page
export type HomeData = {
  foodsOfPreviousMonth: number;
  foodsOfCurrentMonth: number;
  favoriteFoods: Food[];
  foodsOfThisWeek: FullCalendar[];
  oldestFoods: OldestFood[];
  mostEatenFoods: MostEatenFood[];
};
