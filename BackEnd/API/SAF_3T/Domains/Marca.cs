using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class Marca
    {
        public Marca()
        {
            Veiculos = new HashSet<Veiculo>();
        }

        public byte IdMarca { get; set; }
        public string NomeMarca { get; set; }

        public virtual ICollection<Veiculo> Veiculos { get; set; }
    }
}
