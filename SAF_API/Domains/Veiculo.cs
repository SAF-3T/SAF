using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class Veiculo
    {
        public Veiculo()
        {
            CheckLists = new HashSet<CheckList>();
        }

        public int IdVeiculo { get; set; }
        public int IdUsuario { get; set; }
        public byte IdMarca { get; set; }
        public byte IdTipoVeiculo { get; set; }
        public byte? IdStatus { get; set; }
        public string ImagemFrontalPadrao { get; set; }
        public string ImagemTraseiraPadrao { get; set; }
        public string ImagemLateralDireitaPadrao { get; set; }
        public string ImagemLateralEsquerdaPadrao { get; set; }
        public int IdCarroceria { get; set; }
        public string Placa { get; set; }
        public DateTime DataAquisicao { get; set; }

        public virtual Carrocerium IdCarroceriaNavigation { get; set; }
        public virtual Marca IdMarcaNavigation { get; set; }
        public virtual TipoStatus IdStatusNavigation { get; set; }
        public virtual TipoVeiculo IdTipoVeiculoNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<CheckList> CheckLists { get; set; }
    }
}
