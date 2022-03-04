import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const SurfspotSpec = {
  name: Joi.string().required(),
  location: Joi.string().required(),
  typeOfWave: Joi.string().required(),
};

export const CollectionSpec = {
  title: Joi.string().required(),
};
