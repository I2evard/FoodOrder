DROP DATABASE IF EXISTS commande_nourriture_KT_JLT;
CREATE DATABASE commande_nourriture_KT_JLT

-- Assigne l'encodate UTF-8
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE commande_nourriture_KT_JLT;

CREATE TABLE type_compte(
    id_type_compte INT AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    CONSTRAINT PRIMARY KEY(id_type_compte)
);
CREATE TABLE categorie(
    id_categorie INT AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    CONSTRAINT PRIMARY KEY(id_categorie)
);

CREATE TABLE compte(
    id_compte VARCHAR(50) NOT NULL,
    mot_de_passe VARCHAR(50) NOT NULL,
    nom VARCHAR(50),
    prenom VARCHAR(25),
    id_type_compte INT NOT NULL,
    CONSTRAINT PRIMARY KEY(id_compte),
    CONSTRAINT fk_compte_type_compte FOREIGN KEY(id_type_compte) REFERENCES type_compte(id_type_compte) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE etat_commande(
    id_etat_commande INT AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    CONSTRAINT PRIMARY KEY(id_etat_commande)
);

CREATE TABLE nourriture(
    id_nourriture INT AUTO_INCREMENT,
    id_categorie INT,
    image_url VARCHAR(200),
    nom VARCHAR(50) NOT NULL,
    description VARCHAR(500),
    prix DECIMAL NOT NULL,
    CONSTRAINT PRIMARY KEY(id_nourriture),
	CONSTRAINT fk_nourriture_categorie FOREIGN KEY(id_categorie) REFERENCES categorie(id_categorie) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE commande(
    id_commande INT AUTO_INCREMENT,
    id_compte VARCHAR(50) NOT NULL,
    id_etat_commande INT NOT NULL,
    adresse VARCHAR(50) NOT NULL,
    prix_total DECIMAL NOT NULL,
    date_livraison DATETIME NOT NULL,
    CONSTRAINT PRIMARY KEY(id_commande),
    CONSTRAINT fk_commande_compte FOREIGN KEY(id_compte) REFERENCES compte(id_compte) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_commande_etat_commande FOREIGN KEY(id_etat_commande) REFERENCES etat_commande(id_etat_commande) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE nourriture_commande(
    id_commande INT,
    id_nourriture INT,
    quantite INT,
    CONSTRAINT PRIMARY KEY(id_commande, id_nourriture),
    CONSTRAINT fk_commande_nourriture FOREIGN KEY(id_commande) REFERENCES commande(id_commande) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_nourriture_commande FOREIGN KEY(id_nourriture) REFERENCES nourriture(id_nourriture) ON DELETE RESTRICT ON UPDATE CASCADE
);

