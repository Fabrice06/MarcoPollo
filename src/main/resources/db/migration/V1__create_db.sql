----------------------------------------------------------------
-- Base de données :  BD_MARCOPOLO 
-- Script testé sur SQL Workbench --> résultats OK	VJS le 15/01
--
-- desactivation des commandes DROP 
-- script ScriptBDD_marcopolo_V4.sql renommé V1__create_db.sql
-- pour eviter des erreurs lors de la creation de la base H2 --> cyril
----------------------------------------------------------------

-- suppression des séquences (attention: ordre à respecter)

--DROP SEQUENCE seq_preference;
--DROP SEQUENCE seq_tag;
--DROP SEQUENCE seq_marquepage;
--DROP SEQUENCE seq_cle;
--DROP SEQUENCE seq_person;


-- suppression des tables (attention: ordre à respecter)

--DROP TABLE preference;
--DROP TABLE tag;
--DROP TABLE marquepage;
--DROP TABLE cle;
--DROP TABLE person;


-- création des tables

CREATE TABLE person (
	id_person NUMBER(8) CONSTRAINT PK_person PRIMARY KEY,
	mail VARCHAR2(200) not null,
	mdp VARCHAR2(10) not null
);

CREATE TABLE cle (
	id_cle NUMBER(8) CONSTRAINT PK_cle PRIMARY KEY,
	cle VARCHAR2(60) not null UNIQUE
);

CREATE TABLE marquepage (
	id_marquepage NUMBER(8) CONSTRAINT PK_marquepage PRIMARY KEY,
	id_person NUMBER(8) CONSTRAINT CIR_person REFERENCES person,
	lien VARCHAR2(200) not null
);

CREATE TABLE tag (
	id_tag NUMBER(8) CONSTRAINT PK_tag PRIMARY KEY,
	id_marquepage NUMBER(8) CONSTRAINT CIR_marquepage REFERENCES marquepage,
	id_cle NUMBER(8) CONSTRAINT CIR_cle REFERENCES cle,
	valeur VARCHAR2(100)
);

CREATE TABLE preference (
	id_preference NUMBER(8) CONSTRAINT PK_preference PRIMARY KEY,
	id_person NUMBER(8) CONSTRAINT CIR_person2 REFERENCES person,
	id_cle NUMBER(8) CONSTRAINT CIR_cle2 REFERENCES cle,
	num_ordre NUMBER(8)
);


-- création des séquences (attention: ordre à respecter)


CREATE SEQUENCE seq_person
	START WITH 1
	INCREMENT BY 1
	MINVALUE 1
	NOMAXVALUE
	NOCYCLE
	CACHE 20;

CREATE SEQUENCE seq_cle
	START WITH 1
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





