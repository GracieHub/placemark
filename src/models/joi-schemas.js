import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required()
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/),

  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required().regex(/^[A-Z][a-z]{2,}$/).min(3).max(20),
  lastName: Joi.string().example("Simpson").required().regex(/^[A-Z][a-z]{2,}$/).min(3).max(20),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const SurfspotSpec = Joi.object()
.keys({
  name: Joi.string().required().example("Easkey"),
  latitude: Joi.number().allow("").optional().example(54.2863),
  longitude: Joi.number().allow("").optional().example(8.9624),
  typeOfWave: Joi.string().required().example("Advanced"),
  collectionid: IdSpec,
})
.label("Surfspot")

export const SurfspotSpecPlus = SurfspotSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("SurfspotPlus");

export const SurfspotArraySpec = Joi.array().items(SurfspotSpecPlus).label("SurfspotArray");

export const CollectionSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Donegal"),
    userid: IdSpec,
    surfspots: SurfspotArraySpec,
  })
  .label("Collection");

export const CollectionSpecPlus = CollectionSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CollectionPlus");

export const CollectionArraySpec = Joi.array().items(CollectionSpecPlus).label("CollectionArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");