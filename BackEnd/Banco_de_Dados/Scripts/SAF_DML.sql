USE SAF_3T

INSERT INTO TipoUsuario(NomeTipoUsuario)
VALUES ('Gestor','Motorista','Mecanico')

INSERT INTO Usuario(IdTipoUsuario,Nome,Sobrenome,DDD,Telefone,CPF)
VALUES (1,'Marcio','Pitanga','11','90028922','99999999999'),
	   (2,'Ricardo','Gosma','11','94528922','88888888888'),
	   (3,'Edyelson','da Silva','71','97417654','15715715769'),
	   (2,'Vitor','de Oliveira','11','982615102','55917785718'),
	   (2,'Mauricio','Carrasco','11','983108298','42784612785'),
	   (2,'Denilson','dos Santos','71','985712349','23719717724')

INSERT INTO TipoCarroceria(NomeTIpoCarroceria)
VALUES ('Bitrem'),
	   ('Cacamba'),
	   ('Prancha'),
	   ('Bau')

INSERT INTO TipoCarga(TipoCarga)
VALUES ('Concreto'),
	   ('Areia'),
	   ('Cimento'),
	   ('Tijolo')	

INSERT INTO Carroceria(IdTipoCarroceria,IdTipoCarga,Cubagem,Peso)
VALUES (1,1,'90m³','90000kg'),
		(2,2,'50m³','50000kg'),
		(3,3,'70m³','70000kg'),
		(4,4,'20m³','20000kg')



INSERT INTO TipoVeiculo(NomeTipoVeiculo)
VALUES ('Truck'),
	   ('Bitruck'),
	   ('Rodotrem'),
	   ('Van')

INSERT INTO Marca(NomeMarca)
VALUES ('Mercedes'),
       ('Caio'),
	   ('Scania'),
	   ('Volkswagen')

INSERT INTO Veiculo(IdTipoVeiculo,IdMarca,IdCarroceria,IdUsuario,Placa,DataAquisicao)
VALUES (1,2,2,4,'PCC1570','07/09/2015 13:13'),
       (2,1,3,2,'BCT2469','22/03/2015 22:22'),
	   (3,3,1,6,'PNC3333','08/11/2015 17:17'),
	   (4,4,4,5,'CVI1717','04/11/2015 16:20')




