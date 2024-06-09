CREATE TABLE public.petfavs(
petid int4,
userid int4,
CONSTRAINT NoDuplicateFav UNIQUE (petinfo, userid)
);