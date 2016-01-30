----------------------------------------------------------------
-- Base de données :  BD_MARCOPOLO 
-- Script testé sur SQL Workbench --> résultats OK	vince le 29/02
--
-- desactivation des commandes DROP 
-- script ScriptBDD_marcopolo_V4.sql renommé V1__create_db.sql
-- pour eviter des erreurs lors de la creation de la base H2 --> cyril
-- internationalisation
----------------------------------------------------------------

-- suppression des séquences (attention: ordre à respecter)

--DROP SEQUENCE seq_preference;
--DROP SEQUENCE seq_tag;
--DROP SEQUENCE seq_marquepage;
--DROP SEQUENCE seq_cle;
--DROP SEQUENCE seq_person;
--DROP SEQUENCE seq_langue;


-- suppression des tables (attention: ordre à respecter)

--DROP TABLE preference;
--DROP TABLE tag;
--DROP TABLE marquepage;
--DROP TABLE traduction;
--DROP TABLE cle;
--DROP TABLE person;
--DROP TABLE langue;


-- création des tables

CREATE TABLE langue (
	id_langue NUMBER(8) CONSTRAINT PK_langue PRIMARY KEY,
	nom VARCHAR2(60) not null UNIQUE
);

CREATE TABLE cle (
	id_cle NUMBER(8) CONSTRAINT PK_cle PRIMARY KEY,
	cle VARCHAR2(60) not null UNIQUE
);

CREATE TABLE traduction (
	id_langue NUMBER(8) CONSTRAINT CIR_languetrad REFERENCES langue,
	id_cle NUMBER(8) CONSTRAINT CIR_cletrad REFERENCES cle
);

CREATE TABLE person (
	id_person NUMBER(8) CONSTRAINT PK_person PRIMARY KEY,
	id_langue NUMBER(8) CONSTRAINT CIR_langueper REFERENCES langue,
	mail VARCHAR2(200) not null,
	mdp VARCHAR2(10) not null
);

CREATE TABLE marquepage (
	id_marquepage NUMBER(8) CONSTRAINT PK_marquepage PRIMARY KEY,
	id_person NUMBER(8) CONSTRAINT CIR_personmarq REFERENCES person,
	nom VARCHAR2(60) not null,
	lien VARCHAR2(200) not null
);

CREATE TABLE tag (
	id_tag NUMBER(8) CONSTRAINT PK_tag PRIMARY KEY,
	id_marquepage NUMBER(8) CONSTRAINT CIR_marquepagetag REFERENCES marquepage,
	id_cle NUMBER(8) CONSTRAINT CIR_cletag REFERENCES cle,
	valeur VARCHAR2(100)
);

CREATE TABLE preference (
	id_preference NUMBER(8) CONSTRAINT PK_preference PRIMARY KEY,
	id_person NUMBER(8) CONSTRAINT CIR_personpref REFERENCES person,
	id_cle NUMBER(8) CONSTRAINT CIR_clepref REFERENCES cle,
	num_ordre NUMBER(8)
);


-- création des séquences (attention: ordre à respecter)


CREATE SEQUENCE seq_langue
	START WITH 1
	INCREMENT BY 1
	MINVALUE 1
	NOMAXVALUE
	NOCYCLE
	CACHE 20;

CREATE SEQUENCE seq_person
	START WITH 1
	INCREMENT BY 1
	MINVALUE 1
	NOMAXVALUE
	NOCYCLE
	CACHE 20;

CREATE SEQUENCE seq_cle
	START WITH 1000
	INCREMENT BY 1
	MINVALUE 1
	NOMAXVALUE
	NOCYCLE
	CACHE 20;
	
CREATE SEQUENCE seq_marquepage
	START WITH 1
	INCREMENT BY 1
	MINVALUE 1
	NOMAXVALUE
	NOCYCLE
	CACHE 20;	

CREATE SEQUENCE seq_tag
	START WITH 1
	INCREMENT BY 1
	MINVALUE 1
	NOMAXVALUE
	NOCYCLE
	CACHE 20;

CREATE SEQUENCE seq_preference
	START WITH 1
	INCREMENT BY 1
	MINVALUE 1
	NOMAXVALUE
	NOCYCLE
	CACHE 20;





