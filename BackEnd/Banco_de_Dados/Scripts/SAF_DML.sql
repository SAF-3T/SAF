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
	   ('Caçamba'),
	   ('Prancha'),
	   ('Baú')
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
VALUES ('Mercedes-Benz'),
       ('Caio'),
	   ('Scania'),
	   ('Volkswagen')
GO

INSERT INTO Veiculo(IdTipoVeiculo,IdMarca,IdCarroceria,IdUsuario,Placa,DataAquisicao,IdTipoStatus)
VALUES (1,2,2,4,'HJS-4722','09/07/2015 13:13',1),
       (2,1,3,2,'AML-3512','03/22/2015 22:22',2),
	   (3,3,1,6,'KAE-3184','11/08/2015 17:17',3),
	   (4,4,4,5,'CVI-1717','11/04/2015 16:20',1)
GO

INSERT INTO TipoChecklist VALUES ('CheckIn'),('CheckOut'),('Preventiva'),('Corretiva')
GO

INSERT iNTO CheckList VALUES (3,3,5,'03/29/2022 15:03')
GO

INSERT INTO TipoErro VALUES ('Pneu Furado'),('Parabriza Trincado')
GO

INSERT INTO TabelaErro VALUES (1,6,'Pneu dianteiro esquerdo furado',null),(2,6,'Parabrisa trincado médio',null)
GO

INSERT INTO TabelaCorrecao VALUES (1,6,'Pneus trocados por novos',null),(2,6,'Parabrisa trocado por um novo',null)

INSERT INTO TipoStatus VALUES ('Em Trajeto'),('Na garagem'),('Manutenção Necessária')
GO