using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TipoStatus
    {
        public TipoStatus()
        {
            Veiculos = new HashSet<Veiculo>();
        }

        public byte IdStatus { get; set; }
        public string NomeStatus { get; set; }

        public virtual ICollection<Veiculo> Veiculos { get; set; }
    }
}
