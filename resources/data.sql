INSERT INTO hero(hero_name) VALUES('Dr Nice');
INSERT INTO hero(hero_name) VALUES('Narco');
INSERT INTO hero(hero_name) VALUES('Bombasto');
INSERT INTO hero(hero_name) VALUES('Celeritas');
INSERT INTO hero(hero_name) VALUES('Magneta');
INSERT INTO hero(hero_name) VALUES('RubberMan');
INSERT INTO hero(hero_name) VALUES('Dynama');
INSERT INTO hero(hero_name) VALUES('Dr IQ');
INSERT INTO hero(hero_name) VALUES('Magma');
INSERT INTO hero(hero_name) VALUES('Tornado');

INSERT INTO users(username, password, email, enabled) VALUES ('admin', '$2a$10$igIlvYV9lOf2n9j3SA3BM.m.cmAxkCbR/TcF57TY9Dl3R3wHnN6Fu', 'admin@itrunner.org', true);
INSERT INTO users(username, password, email, enabled) VALUES ('jason', '$2a$10$7hv9FPHJWMDHss90Mq3m7eG/FPdtHrVr.TpGdU2Z0zzDMfhA7zuF6', 'jason@itrunner.org', true);
INSERT INTO users(username, password, email, enabled) VALUES ('coco', '$2a$10$M/7EUC.lbNKhU7COEIO2c.lYnrFGqaUDeKI0DNQkmboF0IqpLFt.i', 'coco@itrunner.org', false);

INSERT INTO authority (authority_name) VALUES ('ROLE_USER');
INSERT INTO authority (authority_name) VALUES ('ROLE_ADMIN');

INSERT INTO user_authority (user_id, authority_id) VALUES (1, 1);
INSERT INTO user_authority (user_id, authority_id) VALUES (1, 2);
INSERT INTO user_authority (user_id, authority_id) VALUES (2, 1);
INSERT INTO user_authority (user_id, authority_id) VALUES (3, 1);