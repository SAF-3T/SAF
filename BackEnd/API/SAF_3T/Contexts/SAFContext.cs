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
        public virtual DbSet<TipoUsuario> TipoUsuarios { get; set; }
        public virtual DbSet<TipoVeiculo> TipoVeiculos { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Veiculo> Veiculos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=NOTE0113E5\\SQLEXPRESS; initial catalog=SAF_3T; user Id=sa; pwd=Senai@132;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Carrocerium>(entity =>
            {
                entity.HasKey(e => e.IdCarroceria)
                    .HasName("PK__Carrocer__06E6D1D31EE9F62A");

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
                    .HasName("PK__CheckLis__8AB3BAB9C5DC112C");

                entity.ToTable("CheckList");

                entity.Property(e => e.DataCheckList).HasColumnType("datetime");

                entity.HasOne(d => d.IdTipoCheckListNavigation)
                    .WithMany(p => p.CheckLists)
                    .HasForeignKey(d => d.IdTipoCheckList)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CheckList__IdTip__5812160E");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.CheckLists)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CheckList__IdUsu__59FA5E80");

                entity.HasOne(d => d.IdVeiculoNavigation)
                    .WithMany(p => p.CheckLists)
                    .HasForeignKey(d => d.IdVeiculo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CheckList__IdVei__59063A47");
            });

            modelBuilder.Entity<Marca>(entity =>
            {
                entity.HasKey(e => e.IdMarca)
                    .HasName("PK__Marca__4076A8879277DE3C");

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
                    .HasName("PK__TabelaCo__4C74DFAA4F2A2D63");

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
                    .HasConstraintName("FK__TabelaCor__IdChe__619B8048");

                entity.HasOne(d => d.IdTipoErroNavigation)
                    .WithMany(p => p.TabelaCorrecaos)
                    .HasForeignKey(d => d.IdTipoErro)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TabelaCor__IdTip__60A75C0F");
            });

            modelBuilder.Entity<TabelaErro>(entity =>
            {
                entity.HasKey(e => e.IdErro)
                    .HasName("PK__TabelaEr__071D492332DBBF92");

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
                    .HasConstraintName("FK__TabelaErr__IdChe__5DCAEF64");

                entity.HasOne(d => d.IdTipoErroNavigation)
                    .WithMany(p => p.TabelaErros)
                    .HasForeignKey(d => d.IdTipoErro)
                    .HasConstraintName("FK__TabelaErr__IdTip__5CD6CB2B");
            });

            modelBuilder.Entity<TipoCarga>(entity =>
            {
                entity.HasKey(e => e.IdTipoCarga)
                    .HasName("PK__TipoCarg__5D382ACBA926EA43");

                entity.ToTable("TipoCarga");

                entity.HasIndex(e => e.NomeTipoCarga, "UQ__TipoCarg__4D91679A339067D0")
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
                    .HasName("PK__TipoCarr__69CC3D3AD5FAE652");

                entity.HasIndex(e => e.NomeTipoCarroceria, "UQ__TipoCarr__2E5807ABC8943F95")
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
                    .HasName("PK__TipoChec__2A1B477F956B5FF6");

                entity.ToTable("TipoCheckList");

                entity.HasIndex(e => e.NomeTipoCheckList, "UQ__TipoChec__400798D1633A90D5")
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
                    .HasName("PK__TipoErro__C45A405AEE541071");

                entity.ToTable("TipoErro");

                entity.HasIndex(e => e.NomeTipoErro, "UQ__TipoErro__8C1388AAA777106C")
                    .IsUnique();

                entity.Property(e => e.IdTipoErro).ValueGeneratedOnAdd();

                entity.Property(e => e.NomeTipoErro)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario)
                    .HasName("PK__TipoUsua__CA04062B2EC71543");

                entity.ToTable("TipoUsuario");

                entity.HasIndex(e => e.NomeTipoUsuario, "UQ__TipoUsua__C6FB90A891806101")
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
                    .HasName("PK__TipoVeic__14D60C48B8C1E12D");

                entity.ToTable("TipoVeiculo");

                entity.HasIndex(e => e.NomeTipoVeiculo, "UQ__TipoVeic__494F57D01C03DDE3")
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
                    .HasName("PK__Usuario__5B65BF97948AF4D6");

                entity.ToTable("Usuario");

                entity.HasIndex(e => e.Cpf, "UQ__Usuario__C1F897311CFC0492")
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
                    .HasName("PK__Veiculo__CAC4F3465221493F");

                entity.ToTable("Veiculo");

                entity.HasIndex(e => e.Placa, "UQ__Veiculo__8310F99D2937B975")
                    .IsUnique();

                entity.Property(e => e.DataAquisicao).HasColumnType("datetime");

                entity.Property(e => e.ImagemVeiculo)
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
                    .HasConstraintName("FK__Veiculo__IdCarro__5535A963");

                entity.HasOne(d => d.IdMarcaNavigation)
                    .WithMany(p => p.Veiculos)
                    .HasForeignKey(d => d.IdMarca)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Veiculo__IdMarca__534D60F1");

                entity.HasOne(d => d.IdTipoVeiculoNavigation)
                    .WithMany(p => p.Veiculos)
                    .HasForeignKey(d => d.IdTipoVeiculo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Veiculo__IdTipoV__5441852A");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Veiculos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Veiculo__IdUsuar__52593CB8");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
