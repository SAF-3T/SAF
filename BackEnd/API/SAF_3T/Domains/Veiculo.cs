using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

        [Required(ErrorMessage = "É preciso informar o idMarca")]
        public byte IdMarca { get; set; }

        [Required(ErrorMessage = "É preciso informar o idTipoVeiculo")]
        public byte IdTipoVeiculo { get; set; }
        public byte? IdStatus { get; set; }
        public string ImagemVeiculo { get; set; }
        public int IdCarroceria { get; set; }

        [Required(ErrorMessage = "É preciso informar a placa")]
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
