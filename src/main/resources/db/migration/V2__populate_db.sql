----------------------------------------------------------------
-- Base de données :  BD_MARCOPOLO revu vero
-- Script testé sur SQL Workbench --> résultats ok	vero le 31JAN
--
----------------------------------------------------------------

--visualiser les tables
select * from langue;
select * from person;
select * from marquepage;
select * from cle;
select * from tag;

--Insertion de données externes dans la table langue
INSERT INTO langue VALUES (seq_langue.nextval, 'fr');
INSERT INTO langue VALUES (seq_langue.nextval, 'en');

--Insertion de données externes dans la table person
-- VALUES (id_person, id_langue, mail, mdp)
INSERT INTO person VALUES (seq_person.nextval, 1, 'toto@mail.fr', 'toto');
INSERT INTO person VALUES (seq_person.nextval, 1, 'tata@mail.fr', 'tata');
INSERT INTO person VALUES (seq_person.nextval, 2, 'tutu@mail.fr', 'tutu');

--Insertion de données externes dans la table marquepage
--VALUES (id_marquepage, id_person, nom, lien)
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 1, 'google', 'http://www.google.fr');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 1, 'cours android', 'www.lri.fr/~keller/Enseignement/Orsay/LP-SRSI-AF/android.html');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 2, 'idée déco', 'www.philippesaucourt.com');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 1, 'cours réseau', 'http://lacour.xavier.free.fr/');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 1, 'gitlab', 'https://gitlab.com/users/sign_in');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 2, 'StackOverFlow', 'http://stackoverflow.com/questions/22870930/recover-value-of-field-in-ng-repeat');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 3, 'jetTour', 'www.jettours.com/clubs');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 3, 'air france', 'www.airfrance.fr');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 3, 'my best cookbook',  'http://www.marmiton.org/recettes/recette_crumble-sale-carottes-poireaux-et-gruyere_167282.aspx');
INSERT INTO marquepage VALUES (seq_marquepage.nextval, 3, 'my best adress',  'www.picard.fr');

--Insertion de données externes dans la table cle valeurs prédéfinies
INSERT INTO cle VALUES (seq_cle.nextval, 1, 'description');
INSERT INTO cle VALUES (seq_cle.nextval, 2, 'details');
INSERT INTO cle VALUES (seq_cle.nextval, 1, 'lien');
INSERT INTO cle VALUES (seq_cle.nextval, 2, 'link');
INSERT INTO cle VALUES (seq_cle.nextval, 1, 'date de création');
INSERT INTO cle VALUES (seq_cle.nextval, 2, 'creation date');
INSERT INTO cle VALUES (seq_cle.nextval, 1, 'couleur');
INSERT INTO cle VALUES (seq_cle.nextval, 2, 'color');

--Insertion de données externes dans la table tag
-- VALUES (id_tag, id_marquepage, id_cle, valeur)
INSERT INTO tag VALUES (seq_tag.nextval, 1, 1000, 'site de recherche');
INSERT INTO tag VALUES (seq_tag.nextval, 3, 1006, 'bleu');
INSERT INTO tag VALUES (seq_tag.nextval, 5, 1000, 'site exemple');
INSERT INTO tag VALUES (seq_tag.nextval, 4, 1004, '2014');
INSERT INTO tag VALUES (seq_tag.nextval, 2, 1000, 'cours Chantal Keller');
INSERT INTO tag VALUES (seq_tag.nextval, 4, 1000, 'Systeme-Reseaux');
INSERT INTO tag VALUES (seq_tag.nextval, 6, 1000, 'ma recherche angular');
INSERT INTO tag VALUES (seq_tag.nextval, 7, 1001, 'holydays');
INSERT INTO tag VALUES (seq_tag.nextval, 8, 1001, 'holydays');
INSERT INTO tag VALUES (seq_tag.nextval, 9, 1001, 'cooking');
INSERT INTO tag VALUES (seq_tag.nextval, 10, 1001, 'cooking');
INSERT INTO tag VALUES (seq_tag.nextval, 7, 1005, '2016');
INSERT INTO tag VALUES (seq_tag.nextval, 8, 1005, '2016');



