using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TipoCarga
    {
        public TipoCarga()
        {
            Carroceria = new HashSet<Carrocerium>();
        }

        public byte IdTipoCarga { get; set; }

        [Required(ErrorMessage = "É preciso informar o nome do idTipoCarga")]
        public string NomeTipoCarga { get; set; }

        public virtual ICollection<Carrocerium> Carroceria { get; set; }
    }
}
