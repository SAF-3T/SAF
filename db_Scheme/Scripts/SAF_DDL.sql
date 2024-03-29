CREATE DATABASE SAF_3T;
GO
--N�o criar o banco pois j� est� na n�vem--

USE SAF-DB;
GO

CREATE TABLE TipoUsuario(
	IdTipoUsuario TINYINT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	NomeTipoUsuario VARCHAR (18) UNIQUE NOT NULL
);
GO 

CREATE TABLE TipoCarroceria(
	IdTipoCarroceria TINYINT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	NomeTipoCarroceria VARCHAR (30) UNIQUE NOT NULL
);
GO

CREATE TABLE TipoVeiculo(
	IdTipoVeiculo TINYINT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	NomeTipoVeiculo VARCHAR (20) UNIQUE NOT NULL
);
GO

CREATE TABLE TipoErro(
	IdTipoErro TINYINT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	NomeTipoErro VARCHAR (30) UNIQUE NOT NULL
);
GO

CREATE TABLE TipoCarga(
	IdTipoCarga TINYINT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	NomeTipoCarga VARCHAR (20) UNIQUE NOT NULL
);
GO

CREATE TABLE TipoCheckList(
	IdTipoCheckList TINYINT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	NomeTipoCheckList VARCHAR (15) UNIQUE NOT NULL
);
GO

CREATE TABLE Marca(
	IdMarca TINYINT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	NomeMarca VARCHAR (20) NOT NULL
);
GO

CREATE TABLE Usuario(
	IdUsuario INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	IdTipoUsuario TINYINT FOREIGN KEY REFERENCES TipoUsuario(IdTipoUsuario) NOT NULL,
	ImagemUsuario VARCHAR(255),
	Nome VARCHAR (12) NOT NULL,
	Sobrenome VARCHAR (25) NOT NULL,
	DDD VARCHAR (3) NOT NULL,
	Telefone VARCHAR (10) NOT NULL,
	CPF CHAR (11) UNIQUE NOT NULL,
	Senha CHAR(60)
);
GO

CREATE TABLE Carroceria(
	IdCarroceria INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	IdTipoCarga TINYINT FOREIGN KEY REFERENCES TipoCarga(IdTipoCarga) NOT NULL,
	IdTipoCarroceria TINYINT FOREIGN KEY REFERENCES TipoCarroceria(IdTipoCarroceria) NOT NULL,
	Cubagem VARCHAR (30) NOT NULL,
	Peso VARCHAR (30) NOT NULL,
);
GO

CREATE TABLE TipoStatus(
IdStatus TINYINT PRIMARY KEY IDENTITY(1,1) NOT NULL,
NomeStatus VARCHAR(21)
)
GO

CREATE TABLE Veiculo(
	IdVeiculo INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	IdUsuario INT FOREIGN KEY REFERENCES Usuario(IdUsuario) NOT NULL,
	IdMarca TINYINT FOREIGN KEY REFERENCES Marca(IdMarca) NOT NULL,
	IdTipoVeiculo TINYINT FOREIGN KEY REFERENCES TipoVeiculo(IdTipoVeiculo) NOT NULL,
	IdStatus TINYINT FOREIGN KEY REFERENCES TipoStatus(IdStatus),
	ImagemVeiculo VARCHAR(255),
	IdCarroceria INT FOREIGN KEY REFERENCES Carroceria(IdCarroceria) NOT NULL,
	Placa CHAR(8) UNIQUE NOT NULL,
	DataAquisicao DATETIME NOT NULL
);
GO

CREATE TABLE CheckList(
	IdCheckList INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	IdTipoCheckList TINYINT FOREIGN KEY REFERENCES TipoCheckList(IdTipoCheckList) NOT NULL,
	IdVeiculo INT FOREIGN KEY REFERENCES Veiculo(IdVeiculo) NOT NULL,
	IdUsuario INT FOREIGN KEY REFERENCES Usuario(IdUsuario) NOT NULL,
	DataCheckList DATETIME NOT NULL
);
GO

CREATE TABLE TabelaErro(
	IdErro INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	IdTipoErro TINYINT FOREIGN KEY REFERENCES TipoErro(IdTipoErro),
	IdCheckList INT FOREIGN KEY REFERENCES CheckList(IdCheckList),
	DescricaoErro VARCHAR (250),
	ImagemErro VARCHAR (255)
);
GO

CREATE TABLE TabelaCorrecao(
	IdCorrecao INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	IdTipoErro TINYINT FOREIGN KEY REFERENCES TipoErro(IdTipoErro) NOT NULL,
	IdCheckList INT FOREIGN KEY REFERENCES CheckList(IdCheckList) NOT NULL,
	DescricaoCorrecao VARCHAR (250),
	ImagemCorrecao VARCHAR (255),
);
GO