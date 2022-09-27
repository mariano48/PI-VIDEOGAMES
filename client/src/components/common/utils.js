export function searchGenre(value, list) {
  const genre = list.filter((g) => g.name === value);
  if (genre.length !== 0) {
    return genre[0];
  }
}

export function validateUrl(url) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export function validateForm(values) {
  let errors = {};
  let year = Number(values.released.slice(0, 4));
  if (values.name === "") {
    errors.name = "This field is required";
  } else if (values.name.length < 2 || values.name.length > 10) {
    errors.name = "The length of the input must be between 1 and 10 characters";
  } else if (values.description.length === 0) {
    errors.description = "This field is required";
  } else if (values.description.length < 5) {
    errors.description = "The description must be at least 5 characters long";
  } else if (year < 1970 || year > 2022) {
    errors.released = "Please insert a valid date";
  } else if (Number(values.rating) < 1 || Number(values.rating) > 5) {
    errors.rating = "The ratings for the game must be between 1 and 5";
  } else if (!validateUrl(values.image)) {
    errors.image = "The link must be to a valid image extension";
  } else if (values.genres.length < 1) {
    errors.genres = "Select at least 1 genre";
  } else if (values.platforms.length < 1) {
    errors.platforms = "Select at least 1 platform";
  }
  return errors;
}
