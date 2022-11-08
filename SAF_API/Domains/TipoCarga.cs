using System;
using System.Collections.Generic;

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
        public string NomeTipoCarga { get; set; }

        public virtual ICollection<Carrocerium> Carroceria { get; set; }
    }
}
