using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TipoCarrocerium
    {
        public TipoCarrocerium()
        {
            Carroceria = new HashSet<Carrocerium>();
        }

        public byte IdTipoCarroceria { get; set; }
        public string NomeTipoCarroceria { get; set; }

        public virtual ICollection<Carrocerium> Carroceria { get; set; }
    }
}
