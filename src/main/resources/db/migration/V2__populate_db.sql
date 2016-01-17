-- Script testé sur SQL Workbench --> résultats OK	VJS le 15/01

--Insertion de données externes dans la table person
INSERT INTO person VALUES (seq_person.nextval, 'aabb@mail.fr', 'toto');
INSERT INTO person VALUES (seq_person.nextval, 'ccdd@mail.fr', 'titi');
INSERT INTO person VALUES (seq_person.nextval, 'eeff@mail.fr', 'tutu');
INSERT INTO person VALUES (seq_person.nextval, 'gghh@mail.fr', 'tete');


--Insertion de données externes dans la table cle
INSERT INTO cle VALUES (seq_cle.nextval, 'nom');
INSERT INTO cle VALUES (seq_cle.nextval, 'description');
INSERT INTO cle VALUES (seq_cle.nextval, 'couleur');
INSERT INTO cle VALUES (seq_cle.nextval, 'date');


--Insertion de données externes dans la table marquepage
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 1, 'http://www.google.fr');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 1, 'www.lri.fr/~keller/Enseignement/Orsay/LP-SRSI-AF/android.html');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 2, 'www.philippesaucourt.com');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 3, 'http://lacour.xavier.free.fr/');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 4, 'https://gitlab.com/users/sign_in');


--Insertion de données externes dans la table tag
INSERT INTO tag VALUES (seq_tag.nextval, 1, 1, 'google');
INSERT INTO tag VALUES (seq_tag.nextval, 3, 2, 'idée déco');
INSERT INTO tag VALUES (seq_tag.nextval, 5, 1, 'google');
INSERT INTO tag VALUES (seq_tag.nextval, 4, 4, '2014');
INSERT INTO tag VALUES (seq_tag.nextval, 2, 2, 'cours android');
