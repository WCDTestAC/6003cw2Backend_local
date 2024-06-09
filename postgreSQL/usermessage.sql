CREATE TABLE public.usermessage(
petid int4,
userid int4,
username varchar(16) NOT NULL, 
messagetxt text NULL,
dateregistered timestamp NOT NULL DEFAULT now(),
datemodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);