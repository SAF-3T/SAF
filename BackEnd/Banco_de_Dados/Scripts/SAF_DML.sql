USE SAF_3T

INSERT INTO TipoUsuario(NomeTipoUsuario)
VALUES ('Gestor'),('Motorista'),('Mecanico')
GO

INSERT INTO Usuario(IdTipoUsuario,Nome,Sobrenome,DDD,Telefone,CPF,Senha)
VALUES (1,'Marcio','Pitanga','11','90028922','24817482384','$2a$11$HRVl8dibD5Y.GBwdnqqpqutHgecxMskQ.KgesXqUGEtShb8Ocb1yy'),
	   (2,'Ricardo','Gosma','11','94528922','36671849213','$2a$11$HRVl8dibD5Y.GBwdnqqpqutHgecxMskQ.KgesXqUGEtShb8Ocb1yy'),
	   (3,'Edyelson','da Silva','71','97417654','92164372251','$2a$11$HRVl8dibD5Y.GBwdnqqpqutHgecxMskQ.KgesXqUGEtShb8Ocb1yy'),
	   (2,'Vitor','de Oliveira','11','982615102','55917785718','$2a$11$HRVl8dibD5Y.GBwdnqqpqutHgecxMskQ.KgesXqUGEtShb8Ocb1yy'),
	   (2,'Mauricio','Carrasco','11','983108298','42784612785','$2a$11$HRVl8dibD5Y.GBwdnqqpqutHgecxMskQ.KgesXqUGEtShb8Ocb1yy'),
	   (2,'Denilson','dos Santos','71','985712349','23719717724','$2a$11$HRVl8dibD5Y.GBwdnqqpqutHgecxMskQ.KgesXqUGEtShb8Ocb1yy')
GO

INSERT INTO TipoCarroceria(NomeTIpoCarroceria)
VALUES ('Bitrem'),
	   ('Cacamba'),
	   ('Prancha'),
	   ('Bau')
GO

INSERT INTO TipoCarga(NomeTipoCarga)
VALUES ('Concreto'),
	   ('Areia'),
	   ('Cimento'),
	   ('Tijolo')	
GO

INSERT INTO Carroceria(IdTipoCarroceria,IdTipoCarga,Cubagem,Peso)
VALUES (1,1,'90m³','90000kg'),
		(2,2,'50m³','50000kg'),
		(3,3,'70m³','70000kg'),
		(4,4,'20m³','20000kg')
GO

INSERT INTO TipoVeiculo(NomeTipoVeiculo)
VALUES ('Truck'),
	   ('Bitruck'),
	   ('Rodotrem'),
	   ('Van')
GO

INSERT INTO Marca(NomeMarca)
VALUES ('Mercedes'),
       ('Caio'),
	   ('Scania'),
	   ('Volkswagen')
GO

INSERT INTO Veiculo(IdTipoVeiculo,IdMarca,IdCarroceria,IdUsuario,Placa,DataAquisicao)
VALUES (1,2,2,4,'HJS4722','07/09/2015 13:13'),
       (2,1,3,2,'AML3512','22/03/2015 22:22'),
	   (3,3,1,6,'KAE3184','08/11/2015 17:17'),
	   (4,4,4,5,'CVI1717','04/11/2015 16:20')
GO




