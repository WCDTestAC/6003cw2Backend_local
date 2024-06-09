CREATE TABLE public.userlist (
	id serial,
	username varchar(16) NOT NULL,
	dateregistered timestamp NOT NULL DEFAULT now(),
	"password" varchar(32) NULL,
	email varchar(64) NOT NULL,
    role text, 
	CONSTRAINT userlist_email_key UNIQUE (email),
	CONSTRAINT userlist_pkey PRIMARY KEY (id),
	CONSTRAINT userlist_username_key UNIQUE (username)
);



INSERT INTO userlist (username, email, password, role) VALUES
	('alice0', 'alice@example.com', '123456', 'admin'),
	('bob1', 'bob@example.com','123456', 'user'),
	('colin2', 'colin@example.com','123456', 'user'),
	('cycheng3', 'cycheng@example.com','654321', 'admin');
  