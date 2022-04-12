using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

        [Required(ErrorMessage = "É preciso informar qual a marca")]
        public string NomeMarca { get; set; }

        public virtual ICollection<Veiculo> Veiculos { get; set; }
    }
}
