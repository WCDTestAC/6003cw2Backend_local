CREATE TABLE public.petinfo (
	id serial,
	petname varchar(32) NOT NULL,
	petsummary text NOT NULL,
	datecreated timestamp NOT NULL DEFAULT now(), --The record creation date
	datemodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, --The record last modified date
	imageurl varchar(2048) NULL,
	authorid int4 NULL,
	description text NULL,
	CONSTRAINT petinfos_pkey PRIMARY KEY (id),
  CONSTRAINT fk_petinfo FOREIGN KEY (authorid) REFERENCES userlist (id)
);


INSERT INTO petinfo (petname, petsummary, imageurl, authorid, description) VALUES
	('Dog 1', 'Cute','http://localhost:10889/api/v1/images/1ae71b24-aa89-4b34-9c0c-340611102845',	 1,'Is m.'),
	('Dog2', 'cute','http://localhost:10889/api/v1/images/6e1d728a-b918-45d0-a6b1-6f58a0532c72',	 4,'Is fm.'),
	('Dog three', 'Very cute','http://localhost:10889/api/v1/images/695f886b-8116-4fde-a99f-e28566a5dcbf',1,'Strong.' ),
	('Dog IV', 'ccccute', 'http://localhost:10889/api/v1/images/524a51fe-1dce-4994-b750-91eba3f0d7e1',	4,'Week.');
