using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SAF_3T.Domains;

#nullable disable

namespace SAF_3T.Contexts
{
    public partial class SAFContext : DbContext
    {
        public SAFContext()
        {
        }

        public SAFContext(DbContextOptions<SAFContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Carrocerium> Carroceria { get; set; }
        public virtual DbSet<CheckList> CheckLists { get; set; }
        public virtual DbSet<Marca> Marcas { get; set; }
        public virtual DbSet<TabelaCorrecao> TabelaCorrecaos { get; set; }
        public virtual DbSet<TabelaErro> TabelaErros { get; set; }
        public virtual DbSet<TipoCarga> TipoCargas { get; set; }
        public virtual DbSet<TipoCarrocerium> TipoCarroceria { get; set; }
        public virtual DbSet<TipoCheckList> TipoCheckLists { get; set; }
        public virtual DbSet<TipoErro> TipoErros { get; set; }
        public virtual DbSet<TipoStatus> TipoStatuses { get; set; }
        public virtual DbSet<TipoUsuario> TipoUsuarios { get; set; }
        public virtual DbSet<TipoVeiculo> TipoVeiculos { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Veiculo> Veiculos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseSqlServer("Data Source=NOTE0113E5\\SQLEXPRESS; initial catalog=SAF_DB; user Id=sa; pwd=Senai@132;");
                optionsBuilder.UseSqlServer("Data Source=dbserver-saf.database.windows.net; initial catalog=SAF-DB; user Id=masteruser; pwd=senai@132;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Carrocerium>(entity =>
            {
                entity.HasKey(e => e.IdCarroceria)
                    .HasName("PK__Carrocer__06E6D1D3C24E6E92");

                entity.Property(e => e.Cubagem)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Peso)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdTipoCargaNavigation)
                    .WithMany(p => p.Carroceria)
                    .HasForeignKey(d => d.IdTipoCarga)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Carroceri__IdTip__4D94879B");

                entity.HasOne(d => d.IdTipoCarroceriaNavigation)
                    .WithMany(p => p.Carroceria)
                    .HasForeignKey(d => d.IdTipoCarroceria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Carroceri__IdTip__4E88ABD4");
            });

            modelBuilder.Entity<CheckList>(entity =>
            {
                entity.HasKey(e => e.IdCheckList)
                    .HasName("PK__CheckLis__8AB3BAB9712231C2");

                entity.ToTable("CheckList");

                entity.Property(e => e.DataCheckList).HasColumnType("datetime");

                entity.Property(e => e.ImagemFrontal)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ImagemLateralDireita)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ImagemLateralEsquerda)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ImagemTraseira)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PorcentagemFrontal).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.PorcentagemLateralDireita).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.PorcentagemLateralEsquerda).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.PorcentagemTraseira).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.IdTipoCheckListNavigation)
                    .WithMany(p => p.CheckLists)
                    .HasForeignKey(d => d.IdTipoCheckList)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CheckList__IdTip__5AEE82B9");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.CheckLists)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CheckList__IdUsu__5CD6CB2B");

                entity.HasOne(d => d.IdVeiculoNavigation)
                    .WithMany(p => p.CheckLists)
                    .HasForeignKey(d => d.IdVeiculo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CheckList__IdVei__5BE2A6F2");
            });

            modelBuilder.Entity<Marca>(entity =>
            {
                entity.HasKey(e => e.IdMarca)
                    .HasName("PK__Marca__4076A8873F36673D");

                entity.ToTable("Marca");

                entity.Property(e => e.IdMarca).ValueGeneratedOnAdd();

                entity.Property(e => e.NomeMarca)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TabelaCorrecao>(entity =>
            {
                entity.HasKey(e => e.IdCorrecao)
                    .HasName("PK__TabelaCo__4C74DFAA64E821DC");

                entity.ToTable("TabelaCorrecao");

                entity.Property(e => e.DescricaoCorrecao)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ImagemCorrecao)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdCheckListNavigation)
                    .WithMany(p => p.TabelaCorrecaos)
                    .HasForeignKey(d => d.IdCheckList)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TabelaCor__IdChe__6477ECF3");

                entity.HasOne(d => d.IdTipoErroNavigation)
                    .WithMany(p => p.TabelaCorrecaos)
                    .HasForeignKey(d => d.IdTipoErro)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TabelaCor__IdTip__6383C8BA");
            });

            modelBuilder.Entity<TabelaErro>(entity =>
            {
                entity.HasKey(e => e.IdErro)
                    .HasName("PK__TabelaEr__071D49234A8C1D10");

                entity.ToTable("TabelaErro");

                entity.Property(e => e.DescricaoErro)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ImagemErro)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdCheckListNavigation)
                    .WithMany(p => p.TabelaErros)
                    .HasForeignKey(d => d.IdCheckList)
                    .HasConstraintName("FK__TabelaErr__IdChe__60A75C0F");

                entity.HasOne(d => d.IdTipoErroNavigation)
                    .WithMany(p => p.TabelaErros)
                    .HasForeignKey(d => d.IdTipoErro)
                    .HasConstraintName("FK__TabelaErr__IdTip__5FB337D6");
            });

            modelBuilder.Entity<TipoCarga>(entity =>
            {
                entity.HasKey(e => e.IdTipoCarga)
                    .HasName("PK__TipoCarg__5D382ACB3F0A69C5");

                entity.ToTable("TipoCarga");

                entity.HasIndex(e => e.NomeTipoCarga, "UQ__TipoCarg__4D91679AD867107D")
                    .IsUnique();

                entity.Property(e => e.IdTipoCarga).ValueGeneratedOnAdd();

                entity.Property(e => e.NomeTipoCarga)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoCarrocerium>(entity =>
            {
                entity.HasKey(e => e.IdTipoCarroceria)
                    .HasName("PK__TipoCarr__69CC3D3A5AD0AD20");

                entity.HasIndex(e => e.NomeTipoCarroceria, "UQ__TipoCarr__2E5807AB00487CB1")
                    .IsUnique();

                entity.Property(e => e.IdTipoCarroceria).ValueGeneratedOnAdd();

                entity.Property(e => e.NomeTipoCarroceria)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoCheckList>(entity =>
            {
                entity.HasKey(e => e.IdTipoCheckList)
                    .HasName("PK__TipoChec__2A1B477F8E002A6A");

                entity.ToTable("TipoCheckList");

                entity.HasIndex(e => e.NomeTipoCheckList, "UQ__TipoChec__400798D1FC270446")
                    .IsUnique();

                entity.Property(e => e.IdTipoCheckList).ValueGeneratedOnAdd();

                entity.Property(e => e.NomeTipoCheckList)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoErro>(entity =>
            {
                entity.HasKey(e => e.IdTipoErro)
                    .HasName("PK__TipoErro__C45A405AF5686DCA");

                entity.ToTable("TipoErro");

                entity.HasIndex(e => e.NomeTipoErro, "UQ__TipoErro__8C1388AAFFC599E9")
                    .IsUnique();

                entity.Property(e => e.IdTipoErro).ValueGeneratedOnAdd();

                entity.Property(e => e.NomeTipoErro)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoStatus>(entity =>
            {
                entity.HasKey(e => e.IdStatus)
                    .HasName("PK__TipoStat__B450643AC78229E2");

                entity.ToTable("TipoStatus");

                entity.Property(e => e.IdStatus).ValueGeneratedOnAdd();

                entity.Property(e => e.NomeStatus)
                    .HasMaxLength(21)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario)
                    .HasName("PK__TipoUsua__CA04062BE584646A");

                entity.ToTable("TipoUsuario");

                entity.HasIndex(e => e.NomeTipoUsuario, "UQ__TipoUsua__C6FB90A87A48B251")
                    .IsUnique();

                entity.Property(e => e.IdTipoUsuario).ValueGeneratedOnAdd();

                entity.Property(e => e.NomeTipoUsuario)
                    .IsRequired()
                    .HasMaxLength(18)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoVeiculo>(entity =>
            {
                entity.HasKey(e => e.IdTipoVeiculo)
                    .HasName("PK__TipoVeic__14D60C48CED17DD1");

                entity.ToTable("TipoVeiculo");

                entity.HasIndex(e => e.NomeTipoVeiculo, "UQ__TipoVeic__494F57D02DEAC6B3")
                    .IsUnique();

                entity.Property(e => e.IdTipoVeiculo).ValueGeneratedOnAdd();

                entity.Property(e => e.NomeTipoVeiculo)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuario__5B65BF974E98A184");

                entity.ToTable("Usuario");

                entity.HasIndex(e => e.Cpf, "UQ__Usuario__C1F8973126FE47E7")
                    .IsUnique();

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("CPF")
                    .IsFixedLength(true);

                entity.Property(e => e.Ddd)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasColumnName("DDD");

                entity.Property(e => e.ImagemUsuario)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Sobrenome)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Telefone)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__IdTipoU__4AB81AF0");
            });

            modelBuilder.Entity<Veiculo>(entity =>
            {
                entity.HasKey(e => e.IdVeiculo)
                    .HasName("PK__Veiculo__CAC4F3465EED422D");

                entity.ToTable("Veiculo");

                entity.HasIndex(e => e.Placa, "UQ__Veiculo__8310F99DAE04F5DE")
                    .IsUnique();

                entity.Property(e => e.DataAquisicao).HasColumnType("datetime");

                entity.Property(e => e.ImagemFrontalPadrao)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ImagemLateralDireitaPadrao)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ImagemLateralEsquerdaPadrao)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ImagemTraseiraPadrao)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Placa)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.IdCarroceriaNavigation)
                    .WithMany(p => p.Veiculos)
                    .HasForeignKey(d => d.IdCarroceria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Veiculo__IdCarro__5812160E");

                entity.HasOne(d => d.IdMarcaNavigation)
                    .WithMany(p => p.Veiculos)
                    .HasForeignKey(d => d.IdMarca)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Veiculo__IdMarca__5535A963");

                entity.HasOne(d => d.IdStatusNavigation)
                    .WithMany(p => p.Veiculos)
                    .HasForeignKey(d => d.IdStatus)
                    .HasConstraintName("FK__Veiculo__IdStatu__571DF1D5");

                entity.HasOne(d => d.IdTipoVeiculoNavigation)
                    .WithMany(p => p.Veiculos)
                    .HasForeignKey(d => d.IdTipoVeiculo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Veiculo__IdTipoV__5629CD9C");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Veiculos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Veiculo__IdUsuar__5441852A");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
