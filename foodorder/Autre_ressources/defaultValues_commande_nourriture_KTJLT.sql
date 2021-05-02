INSERT INTO categorie (nom)
VALUES
('Appetisers'),
('Salads'),
('MainDishes'),
('Childrens'),
('Deserts');

INSERT INTO type_compte (nom)
VALUES
('clien'),
('travailleur'),
('administrateur');

INSERT INTO etat_commande (nom)
VALUES
('en traitement'),
('en cuisine'),
('en livraison'),
('terminée');

INSERT INTO compte (id_compte, mot_de_passe, nom, prenom, id_type_compte)
VALUES
("admin", "admin", "Leblond", "Jordan", 3)
("test","test","Testerino", "Tripototo",1);

INSERT INTO nourriture (image_url, nom, id_categorie, description, prix)
VALUES
('img/bifteck-filet-mignon-bœuf-grilrouge-porto-poivre-4677.jpg',
 'POROTO FILET MIGNON',
 3,
 '6oz filet mignons seared with porto served with vegetable & and a choise of side',
 39.00);

INSERT INTO nourriture (image_url, nom, id_categorie,  description, prix)
VALUES
 
('img/ribs.PNG',
 'LOUISIANA STYLE RIBS',
 3,
 '20 oz glazed with our mango BBQ sauce, served with fries, cajun corn salsa',
 46.00),
 
('img/SalmonSaladSpinache.PNG',
 'SALMON & SPINACH SALAD',
 2,
 'Grilled salmon, baby spinach, cucumber, strawberry, feta, quinoa, walnut, balsamic vinaigrette',
 46.00),
 
('img/LimeSpicyChicken.PNG',
 'STICKY CHICKEN',
 1,
 'Chili-lime glaze, green onion, sesame seed, chili pepper',
 15.00),
 
('img/SteakAndFries.PNG',
 'STEAK & FRIES',
 3,
 'Marinated flank steak, skinny fries, red wine reduction, vegetables',
 28.00),
 
('img/OnionSoup.PNG',
 'FRENCH ONION SOUP',
 1,
 'Gruyère, caramelized onion, green onion, crouton',
 10.00),
 
('img/ChickenCalifornianSalad.PNG',
 'CALIFORNIA CHICKEN SALAD',
 2,
 'Sambal glazed chicken, mixed lettuce, almond, parmesan, grilled avocado, tomato, cucumber, orange, tortillas, pistachio vinaigrette',
 22.00),
 
  ('img/ToscanSalad.PNG',
 'TUSCAN SALAD',
 2,
 'Arugula, radicchio, endive, parmesan, crouton, tomato, radish, cucumber, raspberry vinaigrette',
 9.00),
 
('img/FiletMignon.PNG',
 'FILET MIGNON',
 3,
 '7oz. Centre-cut tenderloin, very lean & tender, served with vegetable & and a choise of side',
 39.00),
 
('img/HousePoutine.PNG',
 'HOUSE POUTINE',
 3,
 'Prime rib with juice, BBQ demi-glace, cheese curd, green onions',
 16.00),
 
('img/SalmonPokebowl.PNG',
 'SALMON POKE',
 3,
 'Raw salmon cubes, maple-soy sauce, mango salsa, grilled avocado, green onion, white rice, nori, coriander, tobiko, sesame seed, crispy wontons',
 17.00),
 
 ('img/PhilySteakSandwitch.PNG',
 'PHILLY STEAK SANDWICH',
 3,
 "Baguette, sliced prime rib, Jack Daniel's caramelized onion, mushroom, pepper, tomato, iceberg lettuce, American sauce, cheddar, mozzarella, green onion",
 21.00),
 
('img/Nachos.PNG',
 'NACHOS',
 1,
 "Corn tortillas, cheddar, olive, green onion, tomato, onion, jalapeño",
 17.00),
 
 ('img/MediteraneanSalmon.PNG',
 'MEDITERRANEAN GRILLED SALMON',
 3,
 "Feta, cucumber, cherry tomato, kalamata olive, basil pesto pearl couscous",
25.00),

('img/MacreuseGresillanteAuBri.PNG',
 'SIZZLING BRIE FLAT IRON STEAK',
 3,
 "Red wine sauce, mushroom ragu, melted brie, well-garnished smashed potato",
34.00),

('img/HouseBurger.PNG',
 'HOUSE BURGER',
 3,
 "100% beef, Jack Daniel's caramelized onion, garlic & herb Boursin, capicollo, arugula, roasted tomatoes",
19.00),

('img/ShrimpPopcorn.PNG',
 'POPCORN SHRIMP',
 1,
 "Breaded shrimp, mango, banana & avocado purée, sesame seed, chili-thaï sauce",
16.00),

('img/FriedCalmar.PNG',
 'CRISPY CALAMARI',
 1,
 "Fried calamari, spicy aïoli, green onion, pickled ginger, sesame seed, chili pepper, pineapple brunoise",
15.00),

('img/SeasonedChickenWings.PNG',
 'SALT & PEPPER CHICKEN WINGS',
 1,
 "1Lb whole chicken wings, salt, pepper, buffalo ranch vinaigrette",
16.00),

('img/CheddarBaconBurger.PNG',
 'BACON & CHEDDAR BURGER',
 3,
 "100% beef, bacon, cheddar, onion, tomato, pickle, romaine lettuce",
17.00),

('img/ClassicCeaserSalad.PNG',
 'CLASSIC CAESAR',
 2,
 "Romaine hearts, bacon, parmesan, croutons, roasted garlic vinaigrette",
10.00),

('img/MeltingBrie.PNG',
 'MELTED BRIE',
 1,
 "Walnut, dried cranberry, maple syrup, crostinis",
15.00),

('img/SalmonTartar.PNG',
 'SALMON TARTARE',
 1,
 "115g Salmon, red tobiko, apple & cucumber, avocado purée, sesame seed, soy-lemon vinaigrette, chive, pickled ginger, mango purée, crispy wontons",
16.00),

('img/SalmonTartar.PNG',
 'SALMON TARTARE',
 3,
 "175g Salmon, red tobiko, apple & cucumber, avocado purée, sesame seed, soy-lemon vinaigrette, chive, pickled ginger, mango purée, crispy wontons",
26.00),

('img/BeefTartar.PNG',
 'BEEF TARTARE',
 1,
 "115g hand-cut beef, capers, chive, parmesan shaving, french shallot, gherkins, dijon & sriracha, crostinis",
17.00),

('img/BeefTartar.PNG',
 'BEEF TARTARE',
 3,
 "175g hand-cut beef, capers, chive, parmesan shaving, french shallot, gherkins, dijon & sriracha, crostinis",
27.00),

('img/AppleCrumble.jpg',
 'APPLE CRUMBLE',
 5,
 "Apple crisp is a dessert made with a streusel topping. An apple crumble is a dessert of baked chopped apples topped with rolled oats and brown sugar.",
11.00),

('img/CheeseCake.jpg',
 'CHEESECAKE',
 5,
 "Soft and fresh cheese where the bottom layer is made from crushed graham crackers cookies",
12.00),

('img/ChocolateCake.jpg',
 'CHOCOLATE CAKE',
 5,
 "Flavored with melted milk chocolate and 75% dark chocolate",
12.00),

('img/LimePie.jpg',
 'LIME PIE',
 5,
 "Key lime juice, brown egg yolks, and sweetened condensed fresh local milk",
12.00),

('img/HouseBurger.PNG',
 '.5 HOUSE BURGER',
 4,
 "The half of our house burger",
9.50),

('img/ShrimpPopcorn.PNG',
 'POPCORN SHRIMP',
 4,
 "Breaded shrimp, mango, banana & avocado purée, sesame seed",
 10.00),
 
 ('img/ChickenPanini.jpg',
 'CHICKEN PANINI',
 4,
 "Local bread layered with our house mayonaise, local salade, sweet peppers and cheddar cheese",
 12.00)
 ;
