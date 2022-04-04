using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TipoCarroceria
    {
        public TipoCarroceria()
        {
            Carroceria = new HashSet<Carroceria>();
        }

        public byte IdTipoCarroceria { get; set; }
        public string NomeTipoCarroceria { get; set; }

        public virtual ICollection<Carroceria> Carroceria { get; set; }
    }
}
