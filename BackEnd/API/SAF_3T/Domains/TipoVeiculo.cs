using System;
using System.Collections.Generic;

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
        public string NomeTipoVeiculo { get; set; }

        public virtual ICollection<Veiculo> Veiculos { get; set; }
    }
}
