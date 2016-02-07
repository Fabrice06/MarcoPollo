-- Script testé sur SQL Workbench --> résultats OK	vince 29 jan: internationalisation


--Insertion de données externes dans la table langue
INSERT INTO langue VALUES (seq_langue.nextval, 'français');
INSERT INTO langue VALUES (seq_langue.nextval, 'english');


--Insertion de données externes dans la table cle valeurs prédéfinies
INSERT INTO cle VALUES (1, 1, 'nom');
INSERT INTO cle VALUES (2, 2, 'name');
INSERT INTO cle VALUES (3, 1, 'lien');
INSERT INTO cle VALUES (4, 2, 'link');
INSERT INTO cle VALUES (5, 1, 'date de création');
INSERT INTO cle VALUES (6, 2, 'creation date');
INSERT INTO cle VALUES (7, 1, 'couleur');
INSERT INTO cle VALUES (8, 2, 'color');


--Insertion de données externes dans la table cle valeurs custom
INSERT INTO cle VALUES (seq_cle.nextval, 1, 'description');
INSERT INTO cle VALUES (seq_cle.nextval, 1, 'projets');


--Insertion de données externes dans la table traduction valeurs prédéfinies traduites
--INSERT INTO traduction VALUES (1, 1);
--INSERT INTO traduction VALUES (1, 3);
--INSERT INTO traduction VALUES (1, 5);
--INSERT INTO traduction VALUES (1, 7);
--INSERT INTO traduction VALUES (2, 2);
--INSERT INTO traduction VALUES (2, 4);
--INSERT INTO traduction VALUES (2, 6);
--INSERT INTO traduction VALUES (2, 8);


--Insertion de données externes dans la table person
INSERT INTO person VALUES (seq_person.nextval, 1, 'français@mail.fr', 'français');
INSERT INTO person VALUES (seq_person.nextval, 2, 'english@mail.fr', 'english');
INSERT INTO person VALUES (seq_person.nextval, 1, 'bob@mail.fr', 'bob');
INSERT INTO person VALUES (seq_person.nextval, 2, 'max@mail.fr', 'max');
INSERT INTO person VALUES (seq_person.nextval, 1, 'riton@mail.fr', 'riton');


--Insertion de données externes dans la table marquepage
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 1, 'google', 'http://www.google.fr');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 1, 'cours android', 'www.lri.fr/~keller/Enseignement/Orsay/LP-SRSI-AF/android.html');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 2, 'idée déco', 'www.philippesaucourt.com');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 3, 'cours réseau', 'http://lacour.xavier.free.fr/');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 4, 'gitlab', 'https://gitlab.com/users/sign_in');

INSERT INTO marquepage VALUES (seq_marquepage.nextval, 4, '2014', 'file://escapade.html');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 4, 'loterie', 'file://pasDeChance.pdf');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 5, 'festival du vent', 'file://mêmePasMal.txt');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 5, 'projet marcopolo', 'file://et_qu_on_veux_y_arriver_quand_même.html');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 5, 'derrière les nuages', 'je ne suis pas un lien valide');


--Insertion de données externes dans la table tag

INSERT INTO tag VALUES (seq_tag.nextval, 1, 1000, 'un ami ...');
INSERT INTO tag VALUES (seq_tag.nextval, 6, 1001, '2016');
INSERT INTO tag VALUES (seq_tag.nextval, 7, 1001, 'avec des fleurs');


--Insertion de données externes dans la table preference
INSERT INTO preference VALUES (seq_preference.nextval, 1, 1, 1);
INSERT INTO preference VALUES (seq_preference.nextval, 1, 3, 2);
INSERT INTO preference VALUES (seq_preference.nextval, 2, 2, 1);
INSERT INTO preference VALUES (seq_preference.nextval, 2, 4, 2);
INSERT INTO preference VALUES (seq_preference.nextval, 3, 1, 1);
INSERT INTO preference VALUES (seq_preference.nextval, 3, 3, 2);
INSERT INTO preference VALUES (seq_preference.nextval, 4, 2, 1);
INSERT INTO preference VALUES (seq_preference.nextval, 4, 4, 2);
INSERT INTO preference VALUES (seq_preference.nextval, 5, 1, 1);
INSERT INTO preference VALUES (seq_preference.nextval, 5, 3, 2);
