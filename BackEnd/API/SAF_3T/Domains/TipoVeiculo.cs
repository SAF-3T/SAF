using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TipoVeiculo
    {
        public TipoVeiculo()
        {
            Veiculos = new HashSet<Veiculo>();
        }

        public byte IdTipoVeiculo { get; set; }

        [Required(ErrorMessage = "É preciso informar o nome do tipoVeiculo")]
        public string NomeTipoVeiculo { get; set; }

        public virtual ICollection<Veiculo> Veiculos { get; set; }
    }
}
